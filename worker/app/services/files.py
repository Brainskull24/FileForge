from app.config.db import MongoDB
from datetime import datetime, timezone

async def save_file_metadata(data: dict):
    db = MongoDB.get_db()
    data["created_at"] = datetime.now(timezone.utc)
    await db["files"].insert_one(data)

async def ensure_file_indexes():
    db = MongoDB.get_db()
    await db["files"].create_index("file_hash", unique=True, sparse=True)  
    await db["files"].create_index("expires_at", expireAfterSeconds=0)   
