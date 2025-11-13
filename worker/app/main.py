from fastapi import FastAPI # type: ignore
from app.api.routes import convert_routes
from app.config.db import MongoDB

app = FastAPI()

app.include_router(convert_routes.router, prefix="/api/v1/file-conversion")

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {"status": "healthy", "service": "file-conversion-worker"}

@app.on_event("startup")
async def startup_event():
    await MongoDB.connect()

@app.on_event("shutdown")
async def shutdown_event():
    await MongoDB.close()
