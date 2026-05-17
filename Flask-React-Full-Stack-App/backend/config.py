# import libs
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# instantiate the app
app = Flask(__name__)
# use cors for frontend and backend communication
CORS(app)

# link the app to the db
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# export the db
db = SQLAlchemy(app)
