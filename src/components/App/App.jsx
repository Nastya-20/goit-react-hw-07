import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { fetchContacts } from '../../redux/contactsOps';
import { persistor } from '../../redux/store';
import ContactForm from '../ContactForm/ContactForm';
import SearchBox from '../SearchBox/SearchBox';
import ContactList from '../ContactList/ContactList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import css from './App.module.css';

export default function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <PersistGate loading={<Loader />} persistor={persistor}>
      <h1 className={css.title}>
        <FontAwesomeIcon icon={faBook} className={css.iconBook} />
        Phonebook
      </h1>
      <div className={css.container}>
        <div className={css.wrapper}>
          {loading && <Loader></Loader>}
          {error && <Error>Error loading contacts</Error>}
          <ContactForm />
          <SearchBox />
        </div>
        <ContactList />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </PersistGate>
  );
}





