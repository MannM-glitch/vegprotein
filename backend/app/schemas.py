from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# ============ User Schemas ============

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    location: Optional[str] = None
    protein_goal: Optional[int] = None


class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: Optional[str] = None
    location: Optional[str] = None
    protein_goal: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ============ Token Schemas ============

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


# ============ Protein Log Schemas ============

class ProteinLogCreate(BaseModel):
    food_name: str
    protein_amount: float


class ProteinLogOut(BaseModel):
    id: int
    food_name: str
    protein_amount: float
    logged_at: datetime

    class Config:
        from_attributes = True


# ============ Food Schemas ============

class FoodOut(BaseModel):
    id: int
    name: str
    protein_per_100g: float
    category: Optional[str] = None
    is_vegan: bool
    image_url: Optional[str] = None

    class Config:
        from_attributes = True

