from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel

from ..database import get_db
from ..models import Store, FoodPrice, Food

router = APIRouter(prefix="/stores", tags=["Stores"])


# Schemas
class StoreOut(BaseModel):
    id: int
    name: str
    address: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

    class Config:
        from_attributes = True


class StorePriceOut(BaseModel):
    store_id: int
    store_name: str
    food_name: str
    price: float
    unit: str
    protein_per_dollar: float


# Sample seed data
SEED_STORES = [
    {"name": "Whole Foods Market", "address": "123 Market St, San Francisco, CA", "latitude": 37.7749, "longitude": -122.4194},
    {"name": "Trader Joe's", "address": "456 Valencia St, San Francisco, CA", "latitude": 37.7649, "longitude": -122.4214},
    {"name": "Safeway", "address": "789 Mission St, San Francisco, CA", "latitude": 37.7849, "longitude": -122.4094},
    {"name": "Sprouts Farmers Market", "address": "321 Folsom St, San Francisco, CA", "latitude": 37.7869, "longitude": -122.3914},
    {"name": "Costco", "address": "555 S Van Ness Ave, San Francisco, CA", "latitude": 37.7609, "longitude": -122.4174},
]


@router.get("/", response_model=List[StoreOut])
async def list_stores(
    search: Optional[str] = Query(None, description="Search by store name"),
    limit: int = Query(20, le=50),
    db: Session = Depends(get_db)
):
    """List all stores."""
    query = db.query(Store)
    
    if search:
        query = query.filter(Store.name.ilike(f"%{search}%"))
    
    stores = query.limit(limit).all()
    return stores


@router.get("/nearby")
async def get_nearby_stores(
    latitude: float = Query(..., description="User latitude"),
    longitude: float = Query(..., description="User longitude"),
    radius_miles: float = Query(5.0, description="Search radius in miles"),
    db: Session = Depends(get_db)
):
    """Get stores near a location (simplified distance calc)."""
    # Simple approximate distance calculation
    # 1 degree lat ≈ 69 miles, 1 degree lon ≈ 55 miles (varies by latitude)
    lat_range = radius_miles / 69.0
    lon_range = radius_miles / 55.0
    
    stores = db.query(Store).filter(
        Store.latitude.isnot(None),
        Store.longitude.isnot(None),
        Store.latitude.between(latitude - lat_range, latitude + lat_range),
        Store.longitude.between(longitude - lon_range, longitude + lon_range)
    ).all()
    
    # Calculate approximate distances
    result = []
    for store in stores:
        # Haversine-like approximation
        lat_diff = abs(store.latitude - latitude) * 69
        lon_diff = abs(store.longitude - longitude) * 55
        distance = (lat_diff ** 2 + lon_diff ** 2) ** 0.5
        
        if distance <= radius_miles:
            result.append({
                "id": store.id,
                "name": store.name,
                "address": store.address,
                "latitude": store.latitude,
                "longitude": store.longitude,
                "distance_miles": round(distance, 2)
            })
    
    # Sort by distance
    result.sort(key=lambda x: x["distance_miles"])
    return result


@router.post("/seed")
async def seed_stores(db: Session = Depends(get_db)):
    """Seed the database with sample stores (dev only)."""
    existing = db.query(Store).first()
    if existing:
        return {"message": "Stores already seeded", "count": db.query(Store).count()}
    
    for store_data in SEED_STORES:
        store = Store(**store_data)
        db.add(store)
    
    db.commit()
    
    return {"message": "Stores seeded successfully", "count": len(SEED_STORES)}


@router.get("/{store_id}", response_model=StoreOut)
async def get_store(store_id: int, db: Session = Depends(get_db)):
    """Get a specific store by ID."""
    from fastapi import HTTPException, status
    
    store = db.query(Store).filter(Store.id == store_id).first()
    if not store:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Store not found"
        )
    return store
