from fastapi import FastAPI
from app.api.routes import convert_routes
from app.config.db import MongoDB

app = FastAPI()

app.include_router(convert_routes.router, prefix="/api/v1/convert")

@app.on_event("startup")
async def startup_event():
    await MongoDB.connect()

@app.on_event("shutdown")
async def shutdown_event():
    await MongoDB.disconnect()
