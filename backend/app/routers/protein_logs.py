from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import datetime, date, timedelta

from ..database import get_db
from ..models import User, ProteinLog
from ..schemas import ProteinLogCreate, ProteinLogOut
from ..auth import get_current_active_user

router = APIRouter(prefix="/protein-logs", tags=["Protein Logs"])


@router.post("/", response_model=ProteinLogOut, status_code=status.HTTP_201_CREATED)
async def create_log(
    log_data: ProteinLogCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Log a protein intake."""
    new_log = ProteinLog(
        user_id=current_user.id,
        food_name=log_data.food_name,
        protein_amount=log_data.protein_amount,
    )
    
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    
    return new_log


@router.get("/", response_model=List[ProteinLogOut])
async def get_logs(
    date_filter: Optional[date] = Query(None, description="Filter by specific date"),
    limit: int = Query(50, le=100),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get protein logs for current user."""
    query = db.query(ProteinLog).filter(ProteinLog.user_id == current_user.id)
    
    if date_filter:
        query = query.filter(func.date(ProteinLog.logged_at) == date_filter)
    
    logs = query.order_by(ProteinLog.logged_at.desc()).limit(limit).all()
    return logs


@router.get("/today")
async def get_today_summary(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get today's protein summary."""
    today = date.today()
    
    logs = db.query(ProteinLog).filter(
        ProteinLog.user_id == current_user.id,
        func.date(ProteinLog.logged_at) == today
    ).all()
    
    total_protein = sum(log.protein_amount for log in logs)
    goal = current_user.protein_goal
    remaining = max(goal - total_protein, 0)
    progress = min((total_protein / goal) * 100, 100) if goal > 0 else 0
    
    return {
        "date": today.isoformat(),
        "total_protein": round(total_protein, 1),
        "goal": goal,
        "remaining": round(remaining, 1),
        "progress_percent": round(progress, 1),
        "log_count": len(logs),
        "logs": [
            {
                "id": log.id,
                "food_name": log.food_name,
                "protein_amount": log.protein_amount,
                "logged_at": log.logged_at.isoformat()
            }
            for log in logs
        ]
    }


@router.delete("/{log_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_log(
    log_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete a protein log."""
    log = db.query(ProteinLog).filter(
        ProteinLog.id == log_id,
        ProteinLog.user_id == current_user.id
    ).first()
    
    if not log:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Log not found"
        )
    
    db.delete(log)
    db.commit()


@router.get("/weekly")
async def get_weekly_summary(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get weekly protein summary."""
    today = date.today()
    week_start = today - timedelta(days=6)
    
    daily_totals = []
    
    for i in range(7):
        day = week_start + timedelta(days=i)
        total = db.query(func.sum(ProteinLog.protein_amount)).filter(
            ProteinLog.user_id == current_user.id,
            func.date(ProteinLog.logged_at) == day
        ).scalar() or 0
        
        daily_totals.append({
            "date": day.isoformat(),
            "day_name": day.strftime("%a"),
            "protein": round(total, 1),
            "goal_met": total >= current_user.protein_goal
        })
    
    total_weekly = sum(d["protein"] for d in daily_totals)
    days_goal_met = sum(1 for d in daily_totals if d["goal_met"])
    
    return {
        "week_start": week_start.isoformat(),
        "week_end": today.isoformat(),
        "daily_totals": daily_totals,
        "total_weekly_protein": round(total_weekly, 1),
        "average_daily": round(total_weekly / 7, 1),
        "days_goal_met": days_goal_met,
        "goal": current_user.protein_goal
    }
