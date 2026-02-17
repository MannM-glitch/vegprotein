from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from ..database import get_db
from ..models import Food
from ..schemas import FoodOut

router = APIRouter(prefix="/foods", tags=["Foods"])


# Sample seed data for foods
SEED_FOODS = [
    {"name": "Tofu (Firm)", "protein_per_100g": 17.3, "category": "Soy Products", "is_vegan": True},
    {"name": "Tempeh", "protein_per_100g": 20.3, "category": "Soy Products", "is_vegan": True},
    {"name": "Edamame", "protein_per_100g": 11.9, "category": "Soy Products", "is_vegan": True},
    {"name": "Red Lentils", "protein_per_100g": 24.6, "category": "Legumes", "is_vegan": True},
    {"name": "Black Beans", "protein_per_100g": 21.6, "category": "Legumes", "is_vegan": True},
    {"name": "Chickpeas", "protein_per_100g": 19.3, "category": "Legumes", "is_vegan": True},
    {"name": "Peanuts", "protein_per_100g": 25.8, "category": "Nuts & Seeds", "is_vegan": True},
    {"name": "Almonds", "protein_per_100g": 21.2, "category": "Nuts & Seeds", "is_vegan": True},
    {"name": "Hemp Seeds", "protein_per_100g": 31.6, "category": "Nuts & Seeds", "is_vegan": True},
    {"name": "Chia Seeds", "protein_per_100g": 16.5, "category": "Nuts & Seeds", "is_vegan": True},
    {"name": "Quinoa", "protein_per_100g": 14.1, "category": "Grains", "is_vegan": True},
    {"name": "Oats", "protein_per_100g": 16.9, "category": "Grains", "is_vegan": True},
    {"name": "Seitan", "protein_per_100g": 75.0, "category": "Wheat Protein", "is_vegan": True},
    {"name": "Spirulina", "protein_per_100g": 57.5, "category": "Supplements", "is_vegan": True},
    {"name": "Nutritional Yeast", "protein_per_100g": 50.0, "category": "Supplements", "is_vegan": True},
    {"name": "Pea Protein Powder", "protein_per_100g": 80.0, "category": "Supplements", "is_vegan": True},
    {"name": "Greek Yogurt", "protein_per_100g": 10.0, "category": "Dairy", "is_vegan": False},
    {"name": "Cottage Cheese", "protein_per_100g": 11.1, "category": "Dairy", "is_vegan": False},
]


@router.get("/", response_model=List[FoodOut])
async def list_foods(
    search: Optional[str] = Query(None, description="Search by food name"),
    category: Optional[str] = Query(None, description="Filter by category"),
    vegan_only: bool = Query(False, description="Show only vegan foods"),
    limit: int = Query(50, le=100),
    db: Session = Depends(get_db)
):
    """List all foods with optional filtering."""
    query = db.query(Food)
    
    if search:
        query = query.filter(Food.name.ilike(f"%{search}%"))
    
    if category:
        query = query.filter(Food.category == category)
    
    if vegan_only:
        query = query.filter(Food.is_vegan == True)
    
    foods = query.order_by(Food.protein_per_100g.desc()).limit(limit).all()
    return foods


@router.get("/categories")
async def get_categories(db: Session = Depends(get_db)):
    """Get all food categories."""
    from sqlalchemy import distinct
    
    categories = db.query(distinct(Food.category)).filter(
        Food.category.isnot(None)
    ).all()
    
    return [c[0] for c in categories]


@router.get("/top-protein", response_model=List[FoodOut])
async def get_top_protein_foods(
    limit: int = Query(10, le=50),
    vegan_only: bool = Query(True),
    db: Session = Depends(get_db)
):
    """Get top protein foods sorted by protein content."""
    query = db.query(Food)
    
    if vegan_only:
        query = query.filter(Food.is_vegan == True)
    
    foods = query.order_by(Food.protein_per_100g.desc()).limit(limit).all()
    return foods


@router.post("/seed")
async def seed_foods(db: Session = Depends(get_db)):
    """Seed the database with sample foods (dev only)."""
    existing = db.query(Food).first()
    if existing:
        return {"message": "Foods already seeded", "count": db.query(Food).count()}
    
    for food_data in SEED_FOODS:
        food = Food(**food_data)
        db.add(food)
    
    db.commit()
    
    return {"message": "Foods seeded successfully", "count": len(SEED_FOODS)}


@router.get("/{food_id}", response_model=FoodOut)
async def get_food(food_id: int, db: Session = Depends(get_db)):
    """Get a specific food by ID."""
    from fastapi import HTTPException, status
    
    food = db.query(Food).filter(Food.id == food_id).first()
    if not food:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Food not found"
        )
    return food
