import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivityOption, ItemQuantity } from '../@types/Idle';
import { Inventory } from '../@types/redux/store';

import { Item } from '../data/Items';

// Read in past state from localStorage if possible
const getInitialState = (): Inventory => {
    // Fallback state if we can't find it in localStorage
    const baseInitialState = {};

    // Get relevant information from localStorage
    const lsInventory = localStorage.getItem('inventory');

    // If we don't have inventory information, return fallback
    if (!lsInventory)
        return baseInitialState;

    return JSON.parse(lsInventory);
};

export const slice = createSlice({
    name: 'activity',
    initialState: getInitialState(),
    reducers: {
        getItem: (state: Inventory, { payload }: PayloadAction<ItemQuantity[]>) => {
            payload.forEach(loot => {
                const [ item, quantity ] = loot;
                state[item] = (state[item] || 0) + quantity;
            });
        },
        mergeInventory: (state: Inventory, { payload }: PayloadAction<Inventory>) => {
            Object.entries(payload).forEach(([item, quantity]) => {
                state[item as Item] = (state[item as Item] || 0) + (quantity || 0);
            });
        },
    },
});

export const { getItem, mergeInventory } = slice.actions;
export const { reducer }  = slice;
export default slice.reducer;
