// import libs
import React from "react"

// contact list component, componet is ui
// stuffing the contacts, updateContact, updateCallback data as props
const ContactList = ({ contacts, updateContact, updateCallback }) => {
    // delete contact function by targeting specific id, async cuz involves db
    const onDelete = async (id) => {
        try {
            // use method delete
            const options = {
                method: "DELETE"
            }
            // fetch specific id from the localhost server and apply options (delete method)
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            // if response status is 200
            if (response.status === 200) {
                // fires the update callback func
                updateCallback()
            } else {
                // logs error
                console.error("Failed to delete")
            }
        } catch (error) {
            //if error, alert
            alert(error)
        }
    }
    // make the ui
    return <div>
        <h2>Contacts</h2>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                    <tr key={contact.id}>
                        <td>{contact.firstName}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.email}</td>
                        <td>
                            <button onClick={() => updateContact(contact)}>Update</button>
                            <button onClick={() => onDelete(contact.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

//export the funcs
export default ContactList