import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiContact, Contact} from '../types';
import axiosApi from '../axiosApi/axiosApi';
import {AppDispatch} from '../app/store';

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

export const fetchOneContact = createAsyncThunk<ApiContact, string>(
    'contact/fetchOne',
    async (contactId) => {
        const response = await axiosApi.get<ApiContact | null>(`/contact/${contactId}.json`);
        const contact = response.data;

        if (contact === null) {
            throw new Error('Not found');
        }
        return contact;
    }
);

interface UpdateContactParams {
    id: string,
    contact: ApiContact,
}

export const createContact = createAsyncThunk<void, ApiContact>(
    'contact/create',
    async (contact) => {
        await axiosApi.post('/contact.json', contact);
    }
);

export const editContact = createAsyncThunk<void, UpdateContactParams>(
    'contact/edit',
    async ({id, contact}) => {
        await axiosApi.put(`/contact/${id}.json`, contact);
    }
);

export const deleteContact = createAsyncThunk<void, string, { dispatch: AppDispatch }>(
  'contact/delete',
  async (id: string, thunkAPI) => {
    await axiosApi.delete(`/contact/${id}.json`);
    await thunkAPI.dispatch(fetchContacts());
  }
);

