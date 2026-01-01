from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Frontend origins allowed to access this backend
origins = [
    "http://localhost:3000",
    "https://supply-chain-resilience-frontend.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # or ["*"] for quick testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def sample():
    return {"message": "Supply Chain Resilience Backend is running."}
