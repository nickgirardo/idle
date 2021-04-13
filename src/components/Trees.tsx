import { ReactElement, useState } from 'react';

import { TreeClasses } from '../data/Trees';
import Tree from './Tree';

export default (): ReactElement => {
    const [activeTree, setActiveTree] = useState<string | null>(null);

    const toggleActiveTree = (name: string) => {
        if (name === activeTree)
            setActiveTree(null);
        else
            setActiveTree(name);
    }

    return (
        <div className='trees'>
            {
                TreeClasses.map(t =>
                    <Tree
                        key={ t.name }
                        onClick={ () => toggleActiveTree(t.name) }
                        active={ activeTree === t.name }
                        { ...t }
                    />
                )
            }
        </div>
    );
};
