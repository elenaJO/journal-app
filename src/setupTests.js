import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {createSerializer} from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

//en la prueba hay en alguna parte q llama al scroll y en la console no accede asi q nos saltareos ese erro

const noScroll = () => {};
Object.defineProperty(window, 'scrollTo', { value: noScroll, writable: true });