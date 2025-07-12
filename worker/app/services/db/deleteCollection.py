import sys
import os

# Add EncodeMaster/EncodeMaster to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../')))

from app.config.db import MongoDB
import asyncio

async def delete_collection():
    await MongoDB.connect()
    db = MongoDB.get_db()
    # await db["files"].drop()
    await MongoDB.close()

if __name__ == "__main__":
    asyncio.run(delete_collection())
