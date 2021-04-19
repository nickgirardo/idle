import { TreeStats, ActivityOption, Skill } from '../@types/Idle';

import { ItemQuantity } from '../@types/Idle';
import { Item } from './Items';

const isLoot = (loot: ItemQuantity | undefined): loot is ItemQuantity =>
    Boolean(loot);

const loot = (item: Item, quantity: number): ItemQuantity =>
    [item, quantity];

export const TreeClasses: TreeStats[] = [
    {
        name: 'Oak',
        hardiness: 3000,
        levelReq: 15,
        activity: ActivityOption.CHOP_OAK,
        onComplete: () => ({
            experience: [[Skill.CHOPPING, 8]],
            loot: [
                loot(Item.OAK_LOG, 1),
                Math.random() < 0.01 ? loot(Item.BIRDS_NEST, 1) : undefined,
            ].filter(isLoot),
        }),
    },
    {
        name: 'Willow',
        hardiness: 4000,
        levelReq: 30,
        activity: ActivityOption.CHOP_WILLOW,
        onComplete: () => ({
            experience: [[Skill.CHOPPING, 12]],
            loot: [
                loot(Item.WILLOW_LOG, 1),
                Math.random() < 0.015 ? loot(Item.BIRDS_NEST, 1) : undefined,
            ].filter(isLoot),
        }),
    },
    {
        name: 'Yew',
        hardiness: 8000,
        levelReq: 60,
        activity: ActivityOption.CHOP_YEW,
        onComplete: () => ({
            experience: [[Skill.CHOPPING, 20]],
            loot: [
                loot(Item.YEW_LOG, 1),
                Math.random() < 0.02 ? loot(Item.BIRDS_NEST, 1) : undefined,
            ].filter(isLoot),
        }),
    },
];

