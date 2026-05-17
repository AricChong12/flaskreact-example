// import libs
import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import "./App.css";
import ContactForm from "./ContactForm";

// main react app entry
function App() {
  // hooks, data modification in real time
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})
  // hooks = run side effects which is always fetches the contacts 
  useEffect(() => {
    fetchContacts()
  }, []);
  // [] means run this effect only once the compoenent first laods

  // fetch contacts async func, why async ? because db
  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };
  // arrow func 
  const closeModal = () => {
    // set boolean to false
    setIsModalOpen(false)
    // set an object in it
    setCurrentContact({})
  }
  // create modal
  const openCreateModal = () => {
    // if it is true then it is true
    if (!isModalOpen) setIsModalOpen(true)
  }

  // edit modal
  // pass contact as parameter
  // if true , return the current contact
  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    // set boolean true
    setIsModalOpen(true)
  }

  // update arrow func
  const onUpdate = () => {
    // close modal and fetch contacts
    closeModal()
    fetchContacts()
  }

  // ui
  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
      <button onClick={openCreateModal}>Create New Contact</button>
      {isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
        </div>
      </div>
      }
    </>
  );
}

// export the reat app
export default App;
