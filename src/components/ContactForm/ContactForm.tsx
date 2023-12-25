import * as React from 'react';
import {useState} from 'react';
import {ContactMutation} from '../../types';
import {useAppDispatch} from '../../app/hooks';
import {postContact} from '../../store/contactThunks';

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
  const dispatch = useAppDispatch();
  const [contact, setContact] = useState<ContactMutation>(initialState);

  const changeContact = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(postContact(contact));
    setContact(initialState);
  };

  return (
    <>
      <form onSubmit={onFormSubmit} style={{maxWidth: '300px'}}>
        {/*<h4>{isEdit ? 'Edit contact' : 'Add new contact'}</h4>*/}
        <div className="form-group">
          <label htmlFor="phone">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={contact.name}
            onChange={changeContact}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
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
        <div className="form-group">
          <label htmlFor="phone">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="form-control"
            value={contact.email}
            onChange={changeContact}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Photo</label>
          <input
            type="url"
            name="photo"
            id="photo"
            className="form-control"
            value={contact.photo}
            onChange={changeContact}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          save
        </button>
      </form>
    </>
  );
};

export default ContactForm;