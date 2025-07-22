from pydantic import BaseModel

class ConvertResponse(BaseModel):
    success: bool
    content: str