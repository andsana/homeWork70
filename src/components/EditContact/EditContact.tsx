import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectContact, selectEditLoading, selectFetchLoading} from '../../store/contactSlice';
import {useEffect} from 'react';
import {editContact, fetchOneContact} from '../../store/contactThunks';
import Spinner from '../Spinner/Spinner';
import ContactForm from '../ContactForm/ContactForm';
import {ApiContact} from '../../types';

const EditContact = () => {
  const {id} = useParams() as {id: string};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const contact = useAppSelector(selectContact);
  const fetchLoading = useAppSelector(selectFetchLoading);
  const editContactLoading = useAppSelector(selectEditLoading);

    useEffect(() => {
      dispatch(fetchOneContact(id));
    }, [dispatch, id]);

    const onSubmit = async (contact: ApiContact) => {
        await dispatch(editContact({id, contact}));
        navigate('/');
    };

    let formSection = <Spinner/>;

    const existingContact = contact ? {
      ...contact,
        phone: contact.phone.toString(),
    } : undefined;

    if (!fetchLoading) {
        if (contact) {
            formSection = (
                <ContactForm
                    isEdit
                    onSubmit={onSubmit}
                    existingContact={existingContact}
                    isLoading={editContactLoading}
                />
            );
        } else {
            formSection = <h4>Not found</h4>;
        }
    }

  return (
    <div>
      <div className="row mt-2">
        <div className="col">
          {formSection}
        </div>
      </div>
    </div>
  );
};

export default EditContact;