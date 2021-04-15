import { TreeStats, ActivityOption, Skill } from '../@types/Idle';

import { Item } from './Items';

export const TreeClasses: TreeStats[] = [
    {
        name: 'Oak',
        hardiness: 3000,
        levelReq: 15,
        activity: ActivityOption.CHOP_OAK,
        onComplete: () => ({
            experience: [[Skill.CHOPPING, 8]],
            loot: [[Item.OAK_LOG, 1]],
        }),
    },
    {
        name: 'Willow',
        hardiness: 4000,
        levelReq: 30,
        activity: ActivityOption.CHOP_WILLOW,
        onComplete: () => ({
            experience: [[Skill.CHOPPING, 12]],
            loot: [[Item.WILLOW_LOG, 1]],
        }),
    },
    {
        name: 'Yew',
        hardiness: 8000,
        levelReq: 60,
        activity: ActivityOption.CHOP_YEW,
        onComplete: () => ({
            experience: [[Skill.CHOPPING, 20]],
            loot: [[Item.YEW_LOG, 1]],
        }),
    },
];

