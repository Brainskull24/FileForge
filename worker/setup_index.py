import asyncio
from app.config.db import MongoDB

async def setup_indexes():
    await MongoDB.connect()
    db = MongoDB.get_db()

    indexes = await db["files"].index_information()
    if "file_hash_1" in indexes and indexes["file_hash_1"].get("unique"):
        print("Dropping unique index on file_hash")
        await db["files"].drop_index("file_hash_1")

    await db["files"].create_index("file_hash") 
    print("Created non-unique index on file_hash")

    await MongoDB.close()

if __name__ == "__main__":
    asyncio.run(setup_indexes())
