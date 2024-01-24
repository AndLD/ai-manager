import pymongo
from utils import load_env_key

db = None

def init():
    global db
    # MongoDB connection details
    mongo_db_name = "ai-manager"
    # MongoDB connection string
    mongo_uri = load_env_key('MONGO_DB_URI')
    # Connect to MongoDB
    client = pymongo.MongoClient(mongo_uri)
    # Select the database
    db = client[mongo_db_name]
