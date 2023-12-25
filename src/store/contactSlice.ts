import {Contact} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchContacts} from './contactThunks';
import {RootState} from '../app/store';

interface ContactState {
  contacts: Contact[];
  fetchLoading: boolean,
  editLoading: false | string;
  deleteLoading: false | string;
}

const initialState: ContactState = {
  contacts: [],
  fetchLoading: false,
  editLoading: false,
  deleteLoading: false,
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
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
  }
});

export const contactReducer = contactSlice.reducer;
export const selectContacts = (state: RootState) => state.contact.contacts;
export const selectFetchLoading = (state: RootState) => state.contact.fetchLoading;
export const selectDeleteLoading = (state: RootState) => state.contact.deleteLoading;
