import {createSlice} from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const contactsSlice = createSlice({
    name: "contacts",
    initialState: [],
    reducers: {
        addContacts: {
            reducer: (state, {payload}) => {
                state.push(payload);
            },
            prepare: data => {
                return {
                    payload: {
                        id: nanoid(),
                        ...data,
                    }
                }
            }
        },
        deleteContacts: (state, {payload}) => state.filter(item => item.id !== payload),
    }
});

export const {addContacts, deleteContacts} = contactsSlice.actions;

export default contactsSlice.reducer;