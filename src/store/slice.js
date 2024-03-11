import { createSlice } from '@reduxjs/toolkit';

import { fetchIds, fetchItems, fetchFilteredIds, fetchFields} from './actions';

const slice = createSlice({
    name: 'data',
    initialState: {
        ids: [],
        items: [],
        offset: 100,
        limit: 5000,
        fields: [],
        loadingIds: null,
        loadingItems: null,
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchIds.pending, state => {
                state.loadingIds = 'loading';
                state.error = null;
            })
            .addCase(fetchIds.fulfilled, (state, action) => {
                state.loadingIds = 'fulfilled';
                state.ids = action.payload;
            })
            .addCase(fetchIds.rejected, (state, action) => {
                state.loadingIds = 'rejected';
                state.error = action.error.message;
            })
            .addCase(fetchFields.pending, state => {
                state.loadingIds = 'loading';
                state.error = null;
            })
            .addCase(fetchFields.fulfilled, (state, action) => {
                state.loadingIds = 'fulfilled';
                state.fields = action.payload;
            })
            .addCase(fetchFields.rejected, (state, action) => {
                state.loadingIds = 'rejected';
                state.error = action.error.message;
            })            
            .addCase(fetchFilteredIds.pending, state => {
                state.loadingIds = 'loading';
                state.error = null;
            })
            .addCase(fetchFilteredIds.fulfilled, (state, action) => {
                state.loadingIds = 'fulfilled';
                state.ids = action.payload;
            })
            .addCase(fetchFilteredIds.rejected, (state, action) => {
                state.loadingIds = 'rejected';
                state.error = action.error.message;
            })
            .addCase(fetchItems.pending, state => {
                state.loadingItems = 'loading';
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loadingItems = 'fulfilled';
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loadingItems = 'rejected';
                state.error = action.error.message;
            });
    },
});

export const {} = slice.actions;

export default slice.reducer;
