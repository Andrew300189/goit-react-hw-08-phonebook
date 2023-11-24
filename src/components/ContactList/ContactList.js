import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContact,
  fetchContacts,
} from '../../redux/contactsSlice';
import { selectContacts, selectFilter } from 'redux/selectors';
import styles from './ContactList.module.css';

function ContactList() {
  
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id))
      .unwrap()
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <ul className={styles.contactList}>
      {filteredContacts.map((contact) => (
          <li key={contact.id} className={styles.contactItem}>
            {contact.name}: {contact.number}
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
