from datetime import datetime, timezone
from app.config.db import MongoDB

async def save_file_metadata(file_name, file_size, mime_type, file_hash, metadata=None):
    """
    Asynchronously saves metadata about an uploaded file into the MongoDB `fileHistory` collection.

    Args:
        file_name (str): Original name of the uploaded file.
        file_size (int): Size of the file in bytes.
        mime_type (str): MIME type of the file (e.g., 'application/pdf').
        file_hash (str): SHA-256 hash of the file for deduplication or tracking.
        metadata (dict, optional): Additional metadata to store. Defaults to an empty dict.

    Notes:
        - `user_id` is set to None for anonymous uploads.
        - `file_path` is marked as "N/A" since actual file path storage is not implemented here.
        - `expires_at` is left None; expiry logic should be handled externally if needed.
        - Automatically adds `created_at` timestamp in UTC.
    """
    db = MongoDB.get_db()
    await db["fileHistory"].insert_one({
        "user_id": None,
        "original_name": file_name,
        "file_path": "N/A",
        "file_size": file_size,
        "mime_type": mime_type,
        "file_hash": file_hash,
        "upload_source": "direct",
        "expires_at": None,
        "created_at": datetime.now(timezone.utc),
        "metadata": metadata or {}
    })
