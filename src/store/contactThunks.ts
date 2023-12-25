import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiContact, Contact, ContactMutation} from '../types';
import axiosApi from '../axiosApi/axiosApi';

export const postContact = createAsyncThunk<void, ContactMutation>(
  'contact/post',
  async (contact) => {
    const data: ApiContact = {
      ...contact,
      phone: parseFloat(contact.phone),
    };
    await axiosApi.post('/contact.json', data);
  }
);

export const fetchContact = createAsyncThunk<Contact[]>(
  'contact/fetchContacts',
  async () => {
    const contactResponse = await axiosApi.get('/contact.json');
    const contacts = contactResponse.data;

    let contactArr = [];

    if (contacts) {
      contactArr = Object.keys(contacts).map((key) => {
        const contact = contacts[key];
        return {
          ...contact,
          id: key,
        };
      });
    }

    return contactArr;
  }
);

