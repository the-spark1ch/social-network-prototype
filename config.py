import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = "change-this-secret-key"
    SQLALCHEMY_DATABASE_URI = "sqlite:///social.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
