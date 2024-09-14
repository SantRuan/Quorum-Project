import pandas as pd


legislators_df = pd.read_csv("legislators.csv")
bills_df = pd.read_csv("bills.csv")
votes_df = pd.read_csv("votes.csv")
vote_results_df = pd.read_csv("vote_results.csv")


def get_legislator_stats(legislator_id: int):
    legislator_votes = vote_results_df[vote_results_df['legislator_id']
                                       == legislator_id]
    supported = len(legislator_votes[legislator_votes['vote_type'] == 1])
    opposed = len(legislator_votes[legislator_votes['vote_type'] == 2])
    return supported, opposed


def get_bill_stats(bill_id: int):
    bill_votes = votes_df[votes_df['bill_id'] == bill_id]
    if len(bill_votes) == 0:
        return 0, 0
    vote_id = bill_votes.iloc[0]['id']
    vote_results = vote_results_df[vote_results_df['vote_id'] == vote_id]
    supporters = len(vote_results[vote_results['vote_type'] == 1])
    opposers = len(vote_results[vote_results['vote_type'] == 2])
    return supporters, opposers
