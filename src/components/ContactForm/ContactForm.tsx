import * as React from 'react';
import {useState} from 'react';
import {ContactMutation} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {postContact} from '../../store/contactThunks';
import {selectFetchLoading} from '../../store/contactSlice';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {Link, useNavigate} from 'react-router-dom';

const initialState: ContactMutation = {
  name: '',
  phone: '',
  email: '',
  photo: '',
};

// interface Props {
//   onSubmit: (contact: ApiContact) => void;
//   existingContact?: ContactMutation;
//   isEdit?: boolean;
//   isLoading?: boolean;
// }


const ContactForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fetchLoading = useAppSelector(selectFetchLoading);
  const [contact, setContact] = useState<ContactMutation>(initialState);
  const [photoPreview, setPhotoPreview] = useState<string | null>('');

  const changeContact = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.name === 'photo') {
      console.log(e.target.value);
      setPhotoPreview(e.target.value);
    }

    setContact((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(postContact(contact));
    setContact(initialState);
    setPhotoPreview('');
    navigate('/');
  };

  return (
    <>
      <form className="mt-3" onSubmit={onFormSubmit} style={{maxWidth: '400px'}}>
        {/*<h4>{isEdit ? 'Edit contact' : 'Add new contact'}</h4>*/}
        <div className="form-group">
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label" htmlFor="phone">Name</label>
            <div className="col-sm-10">
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={contact.name}
                onChange={changeContact}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label" htmlFor="phone">Phone</label>
            <div className="col-sm-10">
              <input
                type="number"
                name="phone"
                id="phone"
                className="form-control"
                value={contact.phone}
                onChange={changeContact}
                required
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label" htmlFor="phone">Email</label>
            <div className="col-sm-10">
              <input
                type="text"
                name="email"
                id="email"
                className="form-control"
                value={contact.email}
                onChange={changeContact}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label" htmlFor="phone">Photo</label>
            <div className="col-sm-10">
              <input
                type="url"
                name="photo"
                id="photo"
                className="form-control"
                value={contact.photo}
                onChange={changeContact}
              />
            </div>
          </div>
        </div>
        {photoPreview && (
          <div className="form-group">
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label" htmlFor="phone">Photo preview</label>
              <div className="col-sm-8">
                <img src={photoPreview} alt="Preview" style={{ maxWidth: '200px' }}/>
              </div>
            </div>
          </div>

        )}
        {/*{photoPreview && (*/}
        {/*  <div className="form-group mt-3 d-flex text-start">*/}
        {/*    <label className="me-3">Photo preview</label>*/}
        {/*    <img src={photoPreview} alt="Preview" style={{ maxWidth: '150px' }} />*/}
        {/*  </div>*/}
        {/*)}*/}
          <button type="submit" className="btn btn-primary m-2" disabled={fetchLoading}>
            {fetchLoading && <ButtonSpinner/>}
            save
          </button>

        <Link to="/" className="btn btn-primary">
          Back to contacts
        </Link>
      </form>
    </>
  );
};

export default ContactForm;