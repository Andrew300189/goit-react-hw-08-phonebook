import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPrivateContact } from '../../redux/contactsSlice';
import { selectContacts } from 'redux/selectors';
import ContactList from 'components/ContactList/ContactList';
import styles from './ContactForm.module.css';

function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => selectContacts(state));

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === '' || number.trim() === '') {
      alert('Name and number cannot be empty');
      return;
    }

    const isContactExists = contacts.some(
      (contact) => contact.name === name && contact.number === number
    );

    if (isContactExists) {
      alert(`${name} with number ${number} is already in contacts.`);
      return;
    }

    dispatch(addPrivateContact({ name, number }));

    setName('');
    setNumber('');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name" className={styles.formLabel}>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.formInput}
        />
        <label htmlFor="number" className={styles.formLabel}>
          Number
        </label>
        <input
          type="tel"
          id="number"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className={styles.formInput}
        />
        <button type="submit" className={styles.formButton}>
          Add contact
        </button>
        <label htmlFor="search" className={styles.formLabel}>
          Search
        </label>
        <input
          type="text"
          id="search"
          name="search"
          value={searchTerm}
          onChange={handleSearch}
          className={styles.formInput}
        />
      </form>
      <ContactList contacts={filteredContacts} />
    </div>
  );
}

export default ContactForm;