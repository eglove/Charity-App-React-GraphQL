import {mount} from "enzyme";
import wait from "waait";
import toJson from "enzyme-to-json";
import {MockedProvider} from "react-apollo/test-utils";
import CreateCharity, {CREATE_CHARITY_MUTATION} from "../components/CreateCharity";
import {fakeCharity} from "../lib/testUtils";

const imageLink = "https://pics.com/pic.png";
// mocked global fetch API
global.fetch = jest.fn().mockResolvedValue({
    json: () => ({
        secure_url: imageLink,
        eager: [{secure_url: imageLink}],
    })
});

describe('<CreateItem/>', () => {
    it('renders and matches snapshot', async () => {
        const wrapper = mount(
            <MockedProvider>
                <CreateCharity/>
            </MockedProvider>
        );

        const form = wrapper.find('form[data-test="form"]');
        expect(toJson(form)).toMatchSnapshot();
    });

    it('uploads a file when changed', async () => {
        const wrapper = mount(
            <MockedProvider>
                <CreateCharity/>
            </MockedProvider>
        );

        const input = wrapper.find('input[type="file"]');
        input.simulate('change', {target: {files: ['fakeImage.png']}});
        await wait();
        const component = wrapper.find('CreateCharity').instance();
        expect(component.state.image).toEqual(imageLink);
        expect(component.state.largeImage).toEqual(imageLink);
        expect(global.fetch).toHaveBeenCalled();
        global.fetch.mockReset();
    });

    it('handles state updating', async () => {
        const wrapper = mount(
            <MockedProvider>
                <CreateCharity/>
            </MockedProvider>
        );

        wrapper.find('#name').simulate('change', {target: {value: 'Testing', name: 'name'}});
        wrapper.find('#website').simulate('change', {target: {value: 'example.com', name: 'website'}});
        wrapper.find('#description').simulate('change', {target: {value: 'A description', name: 'description'}});
        wrapper.find('#city').simulate('change', {target: {value: 'Springfield', name: 'city'}});
        wrapper.find('#ein').simulate('change', {target: {value: '1234', name: 'ein'}});
        wrapper.find('#imageDescription').simulate('change', {target: {value: 'Descriptive description', name: 'imageDescription'}});
        wrapper.find('#state').simulate('change', {target: {value: 'Aknas', name: 'state'}});
        wrapper.find('#street').simulate('change', {target: {value: '123 Main', name: 'street'}});
        wrapper.find('#zip').simulate('change', {target: {value: '00001', name: 'zip'}});

        expect(wrapper.find('CreateCharity').instance().state).toMatchObject({
            name: 'Testing',
            website: 'example.com',
            description: 'A description',
            city: "Springfield",
            ein: "1234",
            image: "",
            imageDescription: "Descriptive description",
            largeImage: "",
            state: "Aknas",
            street: "123 Main",
            zip: "00001",
        });
    });

    xit('create a charity when form is submitted', async () => {
        const charity = fakeCharity();
        const mocks = [
            {
                request: {
                    query: CREATE_CHARITY_MUTATION,
                    variables: {
                        name: charity.name,
                        website: charity.website,
                        description: charity.description,
                        city: charity.city,
                        ein: charity.ein,
                        image: charity.image,
                        imageDescription: charity.imageDescription,
                        largeImage: charity.largeImage,
                        state: charity.state,
                        street: charity.street,
                        zip: charity.zip,
                    },
                },

                result: {
                    data: {
                        createCharity: {
                            ...fakeCharity,
                            typeName: 'Charity',
                        },
                    },
                },
            },
        ];

        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <CreateCharity/>
            </MockedProvider>
        );

        // simulate someone filling out form
        wrapper.find('#name').simulate('change', {target: {value: charity.name, name: 'name'}});
        wrapper.find('#website').simulate('change', {target: {value: charity.website, name: 'website'}});
        wrapper.find('#description').simulate('change', {target: {value: charity.description, name: 'description'}});
        wrapper.find('#city').simulate('change', {target: {value: charity.city, name: 'city'}});
        wrapper.find('#ein').simulate('change', {target: {value: charity.ein, name: 'ein'}});
        wrapper.find('#file').simulate('change', {target: {value: "", name: 'file'}});
        // wrapper.find('#largeImage').simulate('change', {target: {value: "", name: 'largeImage'}});
        wrapper.find('#imageDescription').simulate('change', {target: {value: charity.imageDescription, name: 'imageDescription'}});
        wrapper.find('#state').simulate('change', {target: {value: charity.state, name: 'state'}});
        wrapper.find('#street').simulate('change', {target: {value: charity.street, name: 'street'}});
        wrapper.find('#zip').simulate('change', {target: {value: charity.zip, name: 'zip'}});

        // mock the router
        Router.router = {push: jest.fn() };
        wrapper.find('form').simulate('submit');
        await wait(50);
        expect(Router.router.push).toHaveBeenCalled();
    });
});
