// import libs
import { useState } from "react";

// contact form component, stuffing existingContact as object, and updateCallback as func into the compoenent as props
const ContactForm = ({ existingContact = {}, updateCallback }) => {
    // react hooks
    // when hooks are used, usually those are forms, means there will be data manipulation
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");

    // checking the existingContact object inside got objects or not
    const updating = Object.entries(existingContact).length !== 0

    // submit form to db operation
    const onSubmit = async (e) => {
        // page doesnt reload when submit form
        e.preventDefault()
        // store data in javascript object format
        const data = {
            firstName,
            lastName,
            email
        }
        // target localhost url, 
        // If I'm editing a contact, send request to update endpoint, otherwise send to create endpoint
        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")
        // method can be modify or send (patch = modify, post = send)
        const options = {
            method: updating ? "PATCH" : "POST",
            // headers of json
            headers: {
                "Content-Type": "application/json"
            },
            // json the data
            body: JSON.stringify(data)
        }
        // response var fetch url and methods
        const response = await fetch(url, options)
        // if not 200 code, alert data msg
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            // stuff the data into the func
            updateCallback()
        }
    }
    // form ui
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );
};
// export the component
export default ContactForm