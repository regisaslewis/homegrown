"""added plant

Revision ID: c9404ad769b3
Revises: 6c224b0a25e4
Create Date: 2024-01-16 16:03:35.394201

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c9404ad769b3'
down_revision = '6c224b0a25e4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('articles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('success_rating', sa.Integer(), nullable=True),
    sa.Column('body', sa.String(), nullable=True),
    sa.Column('likes', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('groups',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('plant_families',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('image', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('plants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('image', sa.String(), nullable=True),
    sa.Column('family_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['family_id'], ['plant_families.id'], name=op.f('fk_plants_family_id_plant_families')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('users_plants',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('plant_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['plant_id'], ['plants.id'], name=op.f('fk_users_plants_plant_id_plants')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_users_plants_user_id_users'))
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('group_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_users_group_id_groups'), 'groups', ['group_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_users_group_id_groups'), type_='foreignkey')
        batch_op.drop_column('group_id')

    op.drop_table('users_plants')
    op.drop_table('plants')
    op.drop_table('plant_families')
    op.drop_table('groups')
    op.drop_table('articles')
    # ### end Alembic commands ###
