import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { Item, ItemData } from '../data/Items';
import { Store } from '../@types/redux/store';

type EntryProps = {
    item: Item,
    quantity: number,
};

const itemToName = (item: Item): string => {
    const matchingItem = ItemData.find(i => i.item === item);
    return matchingItem ? matchingItem.name : '';
};

const InventoryEntry = (props: EntryProps): ReactElement => <div className='entry'>
    { itemToName(props.item) }: { props.quantity }
</div>;

export default (): ReactElement => {
    const inventory = useSelector((state: Store) => state.inventory);
    return <div className='inventory'> {
        Object.entries(inventory)
            .filter(([item, quantity]) => quantity)
            .map(([item, quantity]) =>
                <InventoryEntry key={ item } item={ item as Item } quantity={ quantity || 0 } />
            )
    } </div>;
};
