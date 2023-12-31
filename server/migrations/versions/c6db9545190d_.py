"""empty message

Revision ID: c6db9545190d
Revises: beb7672a6edf
Create Date: 2023-07-07 13:46:27.650666

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c6db9545190d'
down_revision = 'beb7672a6edf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('competitionByTeam',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('teamId', sa.Integer(), nullable=True),
    sa.Column('competitionId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['competitionId'], ['competitions.id'], name=op.f('fk_competitionByTeam_competitionId_competitions')),
    sa.ForeignKeyConstraint(['teamId'], ['teams.id'], name=op.f('fk_competitionByTeam_teamId_teams')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_competitionByTeam'))
    )
    op.drop_table('competitionTeams')
    with op.batch_alter_table('matches', schema=None) as batch_op:
        batch_op.add_column(sa.Column('competition', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_matches_competition_competitions'), 'competitions', ['competition'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('matches', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_matches_competition_competitions'), type_='foreignkey')
        batch_op.drop_column('competition')

    op.create_table('competitionTeams',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('teamId', sa.INTEGER(), nullable=True),
    sa.Column('competitionId', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['competitionId'], ['competitions.id'], ),
    sa.ForeignKeyConstraint(['teamId'], ['teams.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('competitionByTeam')
    # ### end Alembic commands ###
