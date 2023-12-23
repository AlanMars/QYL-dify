"""flask db merge bcb4f142a721 88072f0caa04, sync up code to 0.3.34

Revision ID: 91318dd75587
Revises: bcb4f142a721, 88072f0caa04
Create Date: 2023-12-23 07:06:21.323037

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '91318dd75587'
down_revision = ('bcb4f142a721', '88072f0caa04')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
