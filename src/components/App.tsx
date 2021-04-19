import Clock from './Clock';
import Trees from './Trees';
import { Levels } from './Levels';
import { Inventory } from './Inventory';
import { Returning } from './Returning';

export default () => <>
    <Clock />
    <Returning>
        <Trees />
        <Levels />
        <Inventory />
    </Returning>
</>;
