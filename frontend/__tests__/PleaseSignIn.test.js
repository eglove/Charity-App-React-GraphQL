import {mount} from "enzyme";
import wait from "waait";
import PleaseSignIn from "../components/PleaseSignIn";
import {CURRENT_USER_QUERY} from "../components/User";
import {MockedProvider} from "react-apollo/test-utils";

const notSignedInMocks = [
    {
        request: {query: CURRENT_USER_QUERY},
        result: {data: {me: null}},
    },
];

describe('<PleaseSignIn/>', () => {
    it('renders the sign in dialog to logged out users', async () => {
        const wrapper = mount(
            <MockedProvider mocks={notSignedInMocks}>
                <PleaseSignIn/>
            </MockedProvider>
        );

        await wait();
        wrapper.update();
        expect(wrapper.text()).toContain('Please sign in in before continuing.');
        expect(wrapper.find('SignIn').exists()).toBe(true);
    });
});
