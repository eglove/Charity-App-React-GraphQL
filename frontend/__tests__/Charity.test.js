import CharityComponent from "../components/Charity";
import {shallow, mount} from 'enzyme';
import toJson from "enzyme-to-json";

const fakeCharity = {
    id: 'ABC123',
    ein: '123456',
    name: 'Good Dooers',
    description: 'We do good',
    website: 'goodooer.com',
    image: 'image.png',
    largeImage: 'largeImage.png',
    imageDescription: 'descriptive description',
    user: 'user1',
};

describe('<Charity/>', () => {

    it('renders and matches the snapshot', () => {
        const wrapper = shallow(<CharityComponent charity={fakeCharity}/> );
        expect(toJson(wrapper)).toMatchSnapshot();
    })

    // it('renders the image properly', () => {
    //     const wrapper = shallow(<CharityComponent charity={fakeCharity}/>);
    //     const img = wrapper.find('img');
    //     expect(img.props().src).toBe(fakeCharity.image);
    //     expect(img.props().alt).toBe(fakeCharity.imageDescription);
    // });
    //
    // it('renders the description properly', () => {
    //     const wrapper = shallow(<CharityComponent charity={fakeCharity}/>);
    //     const p = wrapper.find('p');
    //     expect(p.text()).toBe('We do good...');
    // });
});