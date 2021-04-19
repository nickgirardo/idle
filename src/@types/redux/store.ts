
import { Item } from '../../data/Items';
import { ActivityOption, Skill } from '../Idle';

export type Activity = {
    id: ActivityOption,
    duration: number,
    when: number,
    lastRun: number,
}

export type Inventory = {
    [key in Item]?: number
}

export type Experience = {
    [key in Skill]?: number
}

export type Returning = {
    claimed: boolean,
    inventory: Inventory,
    experience: Experience,
}

export type Store = {
    activity: Activity,
    inventory: Inventory,
    experience: Experience,
    returning: Returning,
}
