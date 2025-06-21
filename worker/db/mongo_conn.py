import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load from .env if exists
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["EncodeMasterDB"]  

print("MongoDB connected (worker)")
