import { Item } from '../data/Items';
import { Experience } from './redux/store';

// Tuple of item id and quantity
export type ItemQuantity = [Item, number];

export enum Skill {
    CHOPPING = 'CHOPPING',
    BURNING = 'BURNING',
}

// Tuple of skill id and quantity
export type ExperienceDrop = [Skill, number];

export type ActivityResult = {
    experience?: ExperienceDrop[],
    loot?: ItemQuantity[],
}

export type TreeStats = {
    name: string,
    hardiness: number,
    available: (arg0: Experience) => boolean,
    activity: ActivityOption,
    onComplete: () => ActivityResult,
}

export enum ActivityOption {
    // Not doing anything (default)
    IDLE,
    // Chopping wood
    CHOP_OAK,
    CHOP_WILLOW,
    CHOP_YEW,
}

