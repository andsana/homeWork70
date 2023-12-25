import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiContact, Contact, ContactMutation} from '../types';
import axiosApi from '../axiosApi/axiosApi';
import {AppDispatch} from '../app/store';

export const postContact = createAsyncThunk<void, ContactMutation, {dispatch: AppDispatch}>(
  'contact/post',
  async (contact, thunkAPI) => {
    const data: ApiContact = {
      ...contact,
      phone: parseFloat(contact.phone),
    };
    await axiosApi.post('/contact.json', data);
    await thunkAPI.dispatch(fetchContacts());
  }
);

export const fetchContacts = createAsyncThunk<Contact[]>(
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

export const deleteContact = createAsyncThunk<void, string, {dispatch: AppDispatch}>(
  'contact/delete',
  async (id: string, thunkAPI) => {
    await axiosApi.delete(`/contact/${id}.json`);
    await thunkAPI.dispatch(fetchContacts());
  }
);

