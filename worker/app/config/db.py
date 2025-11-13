from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv() 

class MongoDB:
    _client = None
    _db = None

    @classmethod
    async def connect(cls):
        uri = os.getenv("MONGODB_URI")
        db_name = os.getenv("MONGODB_DB")

        cls._client = AsyncIOMotorClient(uri)
        cls._db = cls._client[db_name]

    @classmethod
    def get_db(cls):
        if cls._db is None:
            raise Exception("MongoDB client not initialized. Call connect() first.")
        return cls._db
    
    @classmethod
    async def close(cls): 
        if cls._client:
            cls._client.close()
            cls._client = None
            cls._db = None
