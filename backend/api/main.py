from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def sample():
    return {"message": "Supply Chain Resilience Backend is running."}