from fastapi import APIRouter
from app.services.user_service import *
from app.services.mongo_service import users_collection

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/profile/{email}")
def get_profile(email: str):
    user = users_collection.find_one(
        {"email": email},
        {"_id": 0}
    )

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user

@router.post("/executive/register")
def register_executive(data: dict):
    return create_executive(data)


@router.post("/analyst/register")
def register_analyst(data: dict):
    return create_analyst(data)


@router.get("/executives")
def executives():
    return get_executives()


@router.get("/analysts")
def analysts(executive_email: str):
    return get_analysts_by_executive(executive_email)


@router.get("/profile")
def profile(email: str):
    return get_user_profile(email)