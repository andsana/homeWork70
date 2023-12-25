import {Contact} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createContact, deleteContact, editContact, fetchContacts} from './contactThunks';
import {RootState} from '../app/store';

interface ContactState {
  contacts: Contact[];
  contact: Contact | null;
  fetchLoading: boolean,
  createLoading: boolean,
  editLoading: boolean;
  deleteLoading: false | string;
  showModal: boolean;
}

const initialState: ContactState = {
  contacts: [],
  // contact: {id: '', name: '', phone: 0, email: '', photo: ''},
  contact: null,
  fetchLoading: false,
  createLoading: false,
  editLoading: false,
  deleteLoading: false,
  showModal: false,
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    showModal: (state, {payload: contact}: PayloadAction<Contact>) => {
      state.contact = contact;
      state.showModal = !state.showModal;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchContacts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, {payload: contacts}: PayloadAction<Contact[]>) => {
      state.fetchLoading = false;
      state.contacts = contacts;
    });
    builder.addCase(fetchContacts.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(editContact.pending, (state) => {
      state.editLoading = true;
    });
    builder.addCase(editContact.fulfilled, (state) => {
      state.editLoading = false;
    });
    builder.addCase(editContact.rejected, (state) => {
      state.editLoading = false;
    });

    builder.addCase(deleteContact.pending, (state, {meta}) => {
      state.deleteLoading = meta.arg;
    });
    builder.addCase(deleteContact.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteContact.rejected, (state) => {
      state.deleteLoading = false;
    });


    builder.addCase(createContact.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createContact.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createContact.rejected, (state) => {
      state.createLoading = false;
    });
  }
});

export const {showModal} = contactSlice.actions;
export const selectContact = (state: RootState) => state.contact.contact;

export const selectShowModal = (state: RootState) => state.contact.showModal;

export const contactReducer = contactSlice.reducer;
export const selectContacts = (state: RootState) => state.contact.contacts;
export const selectFetchLoading = (state: RootState) => state.contact.fetchLoading;

export const selectCreateLoading = (state: RootState) => state.contact.createLoading;
export const selectEditLoading = (state: RootState) => state.contact.editLoading;
export const selectDeleteLoading = (state: RootState) => state.contact.deleteLoading;

