from fastapi import FastAPI
from src.db.postgresql import init_db

app = FastAPI(
    title="Roam_Agent",
)

@app.on_event("startup")
async def on_startup():
    await init_db()

@app.get("/")
async def greet():
    return {"hello": "world"}