import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { Store } from '../@types/redux/store';
import { Skill } from '../@types/Idle';

type LevelProps = {
    skill: Skill,
    exp: number,
};

// NOTE 0.4054651081081644 = log(1.5)
const expToLevel = (exp: number): number =>
    (Math.floor(Math.log(exp+100)/0.4054651081081644)) - 10

const Level = (props: LevelProps): ReactElement => <div className='level'>
    { props.skill }: Level { expToLevel(props.exp) } ({ props.exp } exp)
</div>;

export default (): ReactElement => {
    const experience = useSelector((state: Store) => state.experience);
    return <div className='levels'> {
        Object.entries(experience).map(([skill, exp]) =>
            <Level key={ skill } skill={ skill as Skill } exp={ exp } />
        )
    } </div>;
};
