import { ActivityOption } from '../Idle'

export type ChangeActivity = {
    type: 'CHANGE_ACTIVITY',
    activity: ActivityOption,
    when: number,
}

// Identical to changing activity to idle
export type ClearActivity = {
    type: 'CLEAR_ACTIVITY',
    when: number,
}

export type Action =
    ChangeActivity |
    ClearActivity
;
