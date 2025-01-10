from fastapi import FastAPI

app = FastAPI(
    title="Roam_Agent",
)

@app.get("/")
async def greet():
    return {"hello": "world"}