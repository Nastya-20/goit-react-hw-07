import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://66e99b9f87e41760944a2711.mockapi.io";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get("/contacts");
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (newContact, thunkAPI) => {
        try {
            const res = await axios.post("/contacts", newContact);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
     }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
        try {
            await axios.delete(`/contacts/${contactId}`);
            return contactId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
     }
);

