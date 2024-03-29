"""add liked/disliked relationship to users/articles

Revision ID: 50eb62e05f4e
Revises: 3c3f1db484b6
Create Date: 2024-01-26 11:22:38.207031

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '50eb62e05f4e'
down_revision = '3c3f1db484b6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users_disliked_articles',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('article_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['article_id'], ['articles.id'], name=op.f('fk_users_disliked_articles_article_id_articles')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_users_disliked_articles_user_id_users'))
    )
    op.create_table('users_liked_articles',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('article_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['article_id'], ['articles.id'], name=op.f('fk_users_liked_articles_article_id_articles')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_users_liked_articles_user_id_users'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users_liked_articles')
    op.drop_table('users_disliked_articles')
    # ### end Alembic commands ###
