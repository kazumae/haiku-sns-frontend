from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, validator

from .user import User


class CommentBase(BaseModel):
    first_phrase: str = Field(..., min_length=1, max_length=30)
    second_phrase: str = Field(..., min_length=1, max_length=30)

    @validator('first_phrase', 'second_phrase')
    def validate_phrase_length(cls, v):
        # 簡易的な音数チェック（より厳密なチェックは別途実装が必要）
        if len(v.replace('ー', '').replace('っ', '')) != 7:
            raise ValueError('フレーズは7音である必要があります')
        return v

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    post_id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    user: Optional[User] = None

    class Config:
        orm_mode = True

class CommentResponse(Comment):
    pass 