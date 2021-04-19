import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { Item, ItemData } from '../data/Items';
import { Store } from '../@types/redux/store';

type EntryProps = {
    item: Item,
    quantity: number,
};

const itemToName = (item: Item, quantity: number): string => {
    const matchingItem = ItemData.find(i => i.item === item);
    if (!matchingItem)
        return '';
    if (quantity === 1)
        return matchingItem.name;
    return matchingItem.plural;
};

export const InventoryEntry = (props: EntryProps): ReactElement => <div className='entry'>
    { itemToName(props.item, props.quantity) }: { props.quantity }
</div>;

export const Inventory = (): ReactElement => {
    const inventory = useSelector((state: Store) => state.inventory);

    return <div className='inventory'> {
        Object.entries(inventory)
            .filter(([item, quantity]) => quantity)
            .map(([item, quantity]) =>
                <InventoryEntry key={ item } item={ item as Item } quantity={ quantity || 0 } />
            )
    } </div>;
};
