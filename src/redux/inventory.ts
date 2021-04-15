import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivityOption, ItemQuantity } from '../@types/Idle';
import { Inventory } from '../@types/redux/store';

import { Item } from '../data/Items';

// Read in past state from localStorage if possible
const getInitialState = (): Inventory => {
    const baseInitialState = {};
    const inventory = localStorage.getItem('inventory');

    if (!inventory)
        return baseInitialState;

    return JSON.parse(inventory);
};

type InventoryPayload = ItemQuantity[];

export const slice = createSlice({
    name: 'activity',
    initialState: getInitialState(),
    reducers: {
        getItem: (state: Inventory, { payload }: PayloadAction<InventoryPayload>) => {
            payload.forEach(loot => {
                const [ item, quantity ] = loot;
                state[item] = (state[item] || 0) + quantity;
            });
        },
    },
});

export const { getItem } = slice.actions;
export const { reducer }  = slice;
export default slice.reducer;
