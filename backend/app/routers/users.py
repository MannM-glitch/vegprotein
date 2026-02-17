from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from ..database import get_db
from ..models import User
from ..schemas import UserOut, UserUpdate
from ..auth import get_current_active_user

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserOut)
async def get_profile(current_user: User = Depends(get_current_active_user)):
    """Get current user profile."""
    return current_user


@router.patch("/me", response_model=UserOut)
async def update_profile(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update current user profile."""
    update_data = user_update.model_dump(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(current_user, field, value)
    
    db.commit()
    db.refresh(current_user)
    
    return current_user


@router.get("/me/stats")
async def get_user_stats(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get user statistics."""
    from ..models import ProteinLog
    from datetime import datetime, timedelta
    from sqlalchemy import func
    
    today = datetime.now().date()
    week_ago = today - timedelta(days=7)
    
    # Total logs
    total_logs = db.query(func.count(ProteinLog.id)).filter(
        ProteinLog.user_id == current_user.id
    ).scalar()
    
    # This week's protein
    weekly_protein = db.query(func.sum(ProteinLog.protein_amount)).filter(
        ProteinLog.user_id == current_user.id,
        func.date(ProteinLog.logged_at) >= week_ago
    ).scalar() or 0
    
    # Days with logs this week (streak approximation)
    days_logged = db.query(func.count(func.distinct(func.date(ProteinLog.logged_at)))).filter(
        ProteinLog.user_id == current_user.id,
        func.date(ProteinLog.logged_at) >= week_ago
    ).scalar()
    
    return {
        "total_logs": total_logs,
        "weekly_protein": round(weekly_protein, 1),
        "days_logged_this_week": days_logged,
        "protein_goal": current_user.protein_goal,
    }
