import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../store';

import { Item, ItemData } from '../data/Items';
import { Store } from '../@types/redux/store';
import { Skill } from '../@types/Idle';

import { claimReturning } from '../redux/returning';
import { mergeInventory } from '../redux/inventory';
import { mergeExperience } from '../redux/experience';

import { LevelEntry } from './Levels';
import { InventoryEntry } from './Inventory';

export const Returning = (): ReactElement => {
    const returning = useSelector((state: Store) => state.returning);
    const dispatch = useAppDispatch();

    const claim = () => {
        dispatch(mergeExperience(returning.experience));
        dispatch(mergeInventory(returning.inventory));
        dispatch(claimReturning());
    };

    if (returning.claimed)
        return <></>;

    return <div className='returning'> 
        Since you&apos;ve been gone, you&apos;ve done this:
        <div className='returning-exp'> {
            Object.entries(returning.experience).map(([skill, exp]) =>
                <LevelEntry key={ skill } skill={ skill as Skill } exp={ exp || 0 } />
            )
        } </div>
        <div className='returning-inv'> {
            Object.entries(returning.inventory)
                .filter(([item, quantity]) => quantity)
                .map(([item, quantity]) =>
                    <InventoryEntry key={ item } item={ item as Item } quantity={ quantity || 0 } />
                )
        } </div>
        <button onClick={ claim }> Claim </button>
    </div>;
};

