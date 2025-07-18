from fastapi import APIRouter
from utils.supabase import supa

router = APIRouter()

@router.post("/sign_up")
async def sign_up(email: str, password: str):
    user = await supa.auth.sign_up({"email": email, "password": password})
    return {"user": user}

@router.post("/sign_in")
async def sign_in(email: str, password: str):
    session = await supa.auth.sign_in_with_password({"email": email, "password": password})
    return {"session": session}
