"""add dislike to Articles

Revision ID: 50d9335dd7ab
Revises: 50eb62e05f4e
Create Date: 2024-01-26 16:11:57.823176

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '50d9335dd7ab'
down_revision = '50eb62e05f4e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('articles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('dislikes', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('articles', schema=None) as batch_op:
        batch_op.drop_column('dislikes')

    # ### end Alembic commands ###
