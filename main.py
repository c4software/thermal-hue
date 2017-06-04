import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--stdin", help="Output the current temperature value to the stdin")
parser.add_argument("--init", help="Init the database")
parser.parse_args()
