import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../../redux/contactsSlice';
import styles from '../ContactForm/ContactForm.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.contacts.filter);

  const handleFilterChange = (e) => {
    dispatch(updateFilter(e.target.value));
  };

  return (
    <>
      <label htmlFor="search" className={styles.formLabel}>
        Search
      </label>
      <input
        type="text"
        className={styles.formInput}
        value={filter}
        onChange={handleFilterChange}
      />
    </>
  );
}

export default Filter;
