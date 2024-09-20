import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contactsSlice';
import { deleteContact } from '../../redux/contactsOps';
import Contact from '../Contact/Contact';
import { toast } from 'react-toastify';
import css from './ContactList.module.css';

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const handleDelete = (contactId) => {
     dispatch(deleteContact(contactId))
      .then(() => {
        toast.success('Contact deleted successfully!');
      })
      .catch(() => {
        toast.error('Failed to delete contact.');
      });
  };

  return (
    <ul className={css.list}>
      {filteredContacts.length === 0 ? (
        <li className={css.textItem}>No contacts to display</li>
      ) : (
        filteredContacts.map(({ id, name, number }) => (
          <li key={id} className={css.item}>
            <Contact id={id} name={name} number={number} onDelete={handleDelete} />
          </li>
        ))
      )}
    </ul>
  );
}

