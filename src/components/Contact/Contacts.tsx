import {useEffect} from 'react';
import Spinner from '../Spinner/Spinner';
import Contact from './Contact';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchContacts} from '../../store/contactThunks';
import {selectContacts, selectFetchLoading} from '../../store/contactSlice';

const Contacts = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const fetchLoading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);


  return (
    <>
      {fetchLoading ? <Spinner/> : contacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          // editLoading = {editLoading}
          // deleteLoading = {deleteLoading}
          // onDelete={() => removeContact(contact.id)}
        />
      ))}
    </>
  );
};

export default Contacts;