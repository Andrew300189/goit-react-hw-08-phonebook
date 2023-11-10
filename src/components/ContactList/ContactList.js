import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deletePrivateContact,
  fetchPrivateContacts,
} from '../../redux/contactsSlice';
import { selectContacts, selectFilter } from 'redux/selectors';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  // const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchPrivateContacts());
  }, [dispatch]);

  // const filteredContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(filter.toLowerCase())
  // );

  const handleDeleteContact = id => {
    dispatch(deletePrivateContact(id));
  };

  return (
    <div>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id} className="contact-item">
            {contact.name}: {contact.number}
            <button
              className="delete-button"
              onClick={() => handleDeleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
