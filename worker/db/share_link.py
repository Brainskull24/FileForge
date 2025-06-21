from .mongo_conn import db
from datetime import datetime, timedelta
from bson.objectid import ObjectId

def create_share_link(data: dict, expires_in_minutes: int = 10):
    data['createdAt'] = datetime.utcnow()
    data['expiresAt'] = datetime.utcnow() + timedelta(minutes=expires_in_minutes)
    result = db.share_links.insert_one(data)
    return str(result.inserted_id)

def get_share_link(id: str):
    return db.share_links.find_one({
        "_id": ObjectId(id),
        "expiresAt": { "$gt": datetime.utcnow() }
    })
