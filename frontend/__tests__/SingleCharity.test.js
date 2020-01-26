import {mount} from "enzyme";
import wait from "waait";
import SingleCharity, {SINGLE_CHARITY_QUERY} from "../components/SingleCharity";
import {MockedProvider} from "react-apollo/test-utils";
import {fakeCharity} from "../lib/testUtils";
import toJson from "enzyme-to-json";

describe('<SingleCharity/>', () => {
    it('renders with proper data', async () => {
        const mocks = [
            {
                // when someone makes request with this query & variable
                request: {query: SINGLE_CHARITY_QUERY, variables: {id: '123'}},
                // return this fake data
                result: {
                    data: {
                        charity: fakeCharity(),
                    },
                },
            },
        ];

        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <SingleCharity id="123"/>
            </MockedProvider>
        );

        expect(wrapper.text()).toContain('Loading...');

        // Wait and update wrapper after query finishes
        await wait();
        wrapper.update();

        expect(toJson(wrapper.find('img'))).toMatchSnapshot();
        expect(toJson(wrapper.find('p'))).toMatchSnapshot();
    });

    it('Errors with a not found charity', async () => {
        const mocks = [
            {
                request: {query: SINGLE_CHARITY_QUERY, variables: {id: '123'}},
                result: {
                        errors: [{message: 'Charity Not Found!'}],
                },
            },
        ];

        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <SingleCharity id="123"/>
            </MockedProvider>
        );

        await wait();
        wrapper.update();
        // console.log(wrapper.debug());
        const charity = wrapper.find('[data-test="graphql-error"]');
        expect(charity.text()).toContain('Charity Not Found!');
        expect(toJson(charity)).toMatchSnapshot();
    });
});