from fastapi import FastAPI
from app.api.routes import convert_routes

app = FastAPI(title="FileForge Conversion API")
app.include_router(convert_routes.router, prefix="/api/v1/convert")