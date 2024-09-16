import pytest
import pandas as pd
from app.domain.database.database import get_legislator_stats, get_bill_stats


@pytest.fixture
def setup_data(monkeypatch):
    legislators_df = pd.DataFrame({
        'id': [1, 2],
        'name': ['John Doe', 'Jane Smith']
    })
    bills_df = pd.DataFrame({
        'id': [1, 2],
        'title': ['Tax Reform', 'Healthcare'],
        'sponsor_id': [1, 2]
    })
    votes_df = pd.DataFrame({
        'id': [1, 2],
        'bill_id': [1, 2]
    })
    vote_results_df = pd.DataFrame({
        'id': [1, 2, 3, 4],
        'legislator_id': [1, 1, 2, 2],
        'vote_id': [1, 1, 2, 2],
        'vote_type': [1, 2, 1, 2]
    })

    import app.domain.database.database as database
    monkeypatch.setattr(database, 'legislators_df', legislators_df)
    monkeypatch.setattr(database, 'bills_df', bills_df)
    monkeypatch.setattr(database, 'votes_df', votes_df)
    monkeypatch.setattr(database, 'vote_results_df', vote_results_df)


def test_get_legislator_stats(setup_data):
    supported, opposed = get_legislator_stats(1)
    assert supported == 1
    assert opposed == 1


def test_get_bill_stats(setup_data):
    supporters, opposers = get_bill_stats(1)
    assert supporters == 1
    assert opposers == 1
