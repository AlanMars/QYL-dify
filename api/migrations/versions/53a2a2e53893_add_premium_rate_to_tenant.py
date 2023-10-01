"""Add premium_rate to tenant.

Revision ID: 53a2a2e53893
Revises: 6e2cfb077b04
Create Date: 2023-10-01 20:16:07.207477

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '53a2a2e53893'
down_revision = '6e2cfb077b04'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tenants', schema=None) as batch_op:
        batch_op.add_column(sa.Column('premium_rate', sa.Numeric(precision=10, scale=4), server_default=sa.text('1.000'), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tenants', schema=None) as batch_op:
        batch_op.drop_column('premium_rate')

    # ### end Alembic commands ###
