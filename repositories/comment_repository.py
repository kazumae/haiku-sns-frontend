from typing import List, Optional

from db.models import Comment, Post, User
from sqlalchemy.orm import Session

from models.comment import CommentCreate


class CommentRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, post_id: int, user_id: int, comment: CommentCreate) -> Comment:
        db_comment = Comment(
            post_id=post_id,
            user_id=user_id,
            first_phrase=comment.first_phrase,
            second_phrase=comment.second_phrase
        )
        self.db.add(db_comment)
        self.db.commit()
        self.db.refresh(db_comment)
        return db_comment

    def get_by_post_id(self, post_id: int, skip: int = 0, limit: int = 100) -> List[Comment]:
        return self.db.query(Comment)\
            .filter(Comment.post_id == post_id)\
            .order_by(Comment.created_at.desc())\
            .offset(skip)\
            .limit(limit)\
            .all()

    def delete(self, comment_id: int, user_id: int) -> bool:
        comment = self.db.query(Comment)\
            .filter(Comment.id == comment_id, Comment.user_id == user_id)\
            .first()
        if comment:
            self.db.delete(comment)
            self.db.commit()
            return True
        return False 