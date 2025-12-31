from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def sample():
    return {"Happy New Year Puppyyyyyyyyyyy"}