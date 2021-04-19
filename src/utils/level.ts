
import { Skill } from '../@types/Idle';
import { Experience } from '../@types/redux/store';

// NOTE 0.4054651081081644 = log(1.5)
export const expToLevel = (exp: number): number =>
    (Math.floor(Math.log(exp+100)/0.4054651081081644)) - 10;

export const hasLevel = (experience: Experience, skill: Skill, level: number): boolean =>
    expToLevel(experience[skill] || 0) >= level;
