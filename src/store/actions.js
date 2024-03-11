import { createAsyncThunk } from '@reduxjs/toolkit';
import { token, url } from '../utils';
import { filterUniqueIds } from '../utils';

export const fetchIds = createAsyncThunk('data/fetchIds', async ({ offset, limit }) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Auth': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'get_ids',
                params: { offset: offset, limit: limit },
            }),
        });

        if (!response.ok) {
            throw new Error(`Сервер вернул ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error:', error.message);

        if (error.message.includes('401')) {
            return fetchIds({ offset, limit });
        }

        throw error;
    }
});

export const fetchItems = createAsyncThunk('data/fetchItems', async ids => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Auth': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'get_items',
                params: { ids: ids },
            }),
        });

        if (!response.ok) {
            throw new Error(`Сервер вернул ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        return filterUniqueIds(data.result);
    } catch (error) {
        console.error('Error:', error.message);

        if (error.message.includes('401')) {
            return fetchItems(ids);
        }

        throw error;
    } 
});

export const fetchFields = createAsyncThunk('data/fetchFields', async () => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Auth': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'get_fields',
            }),
        });

        if (!response.ok) {
            throw new Error(`Сервер вернул ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error:', error.message);

        if (error.message.includes('401')) {
            return fetchFields();
        }

        throw error;
    }
});

export const fetchFilteredIds = createAsyncThunk('data/fetchFilteredIds', async ({ field, value }) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Auth': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'filter',
                params: { [field]: value },
            }),
        });

        if (!response.ok) {
            throw new Error(`Сервер вернул ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error:', error.message);

        if (error.message.includes('401')) {
            return fetchFilteredIds({ field, value });
        }

        throw error;
    }
});
