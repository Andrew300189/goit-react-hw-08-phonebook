import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deletePrivateContact,
  fetchPrivateContacts,
} from '../../redux/contactsSlice';
import { selectContacts } from 'redux/selectors';
import styles from './ContactList.module.css';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchPrivateContacts());
  }, [dispatch]);

  const handleDeleteContact = id => {
    dispatch(deletePrivateContact(id));
  };

  return (
    <div>
      <ul className={styles.contactList}>
        {contacts.map((contact) => (
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
