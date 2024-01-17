"""add foreign_keys to articles

Revision ID: a16efb913a70
Revises: c9404ad769b3
Create Date: 2024-01-16 16:12:34.337811

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a16efb913a70'
down_revision = 'c9404ad769b3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('articles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('plant_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_articles_user_id_users'), 'users', ['user_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_articles_plant_id_plants'), 'plants', ['plant_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('articles', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_articles_plant_id_plants'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_articles_user_id_users'), type_='foreignkey')
        batch_op.drop_column('plant_id')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###
