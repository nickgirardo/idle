import { ReactElement, MouseEvent } from 'react';
import cx from 'classnames';

import { TreeStats } from '../@types/Idle';

type TreeProps = TreeStats & {
    onClick: (event: MouseEvent<HTMLElement>) => void,
    active: boolean,
}

const Tree = (props: TreeProps): ReactElement =>
    <div
        className={ cx('tree', props.active && 'active') }
        onClick={ props.onClick }
    >
        <div className='name'> { props.name } </div>
        <div className='img'> { /* TODO img here */ } </div>
        <div className='progress'>
            <div className={ cx('part-complete', props.active && 'active') } />
        </div>
    </div>;

export default Tree;
