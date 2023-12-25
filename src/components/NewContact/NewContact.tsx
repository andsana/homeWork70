import React from 'react';
import {useNavigate} from 'react-router-dom';
import {createContact, fetchContacts} from "../../store/contactThunks";
import {ApiContact} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCreateLoading} from "../../store/contactSlice";
import ContactForm from "../ContactForm/ContactForm";

const NewContact: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const creatingLoading = useAppSelector(selectCreateLoading);

  const onSubmit = async (contact: ApiContact) => {
   await dispatch(createContact(contact));
    await dispatch(fetchContacts());
    navigate('/');
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <ContactForm onSubmit={onSubmit} isLoading={creatingLoading}/>
      </div>
    </div>
  );
};

export default NewContact;