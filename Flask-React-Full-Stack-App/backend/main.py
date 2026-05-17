# import libs and modules
from flask import request, jsonify
from config import app, db
from models import Contact

# contacts route, get all contacts
@app.route("/contacts", methods=["GET"])
def get_contacts():
    # query all contacts
    contacts = Contact.query.all()
    # store json in an list (array)
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    # returns json contacts
    return jsonify({"contacts": json_contacts})

# create contact route and send method
# creating contact which through form ui
@app.route("/create_contact", methods=["POST"])
def create_contact():
    # get json data for the following
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    # error handling if not three of them
    if not first_name or not last_name or not email:
        return (
            jsonify({"message": "You must include a first name, last name and email"}),
            400,
        )

    # make a new contact by making a class, stuffing all json into it
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
    try:
        # add data
        db.session.add(new_contact)
        # commit data
        db.session.commit()
    except Exception as e:
        # return error code 400
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created!"}), 201

# update contact query specific id route, patch method means update
@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    # query the contact class (real data), targets user_id
    contact = Contact.query.get(user_id)
    # if not contact data, return error code
    if not contact:
        return jsonify({"message": "User not found"}), 404
    # store request json data in data var
    data = request.json
    # get the following data
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)
    # commit the data
    db.session.commit()
    # return error code
    return jsonify({"message": "Usr updated."}), 200

# delete route, method delete
@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    # query the contact class (real data), targets user_id
    contact = Contact.query.get(user_id)
    # if not contact data, return error code
    if not contact:
        return jsonify({"message": "User not found"}), 404
    # delete the data and commit changes
    db.session.delete(contact)
    db.session.commit()
    # return success code
    return jsonify({"message": "User deleted!"}), 200


if __name__ == "__main__":
    # creates app context
    with app.app_context():
        # create all db tables
        db.create_all()
    # starts the flask server
    app.run(debug=True)
