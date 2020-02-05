import {mount} from "enzyme";
import SignUp, {SIGNUP_MUTATION} from "../components/SignUp";
import {CURRENT_USER_QUERY} from "../components/User";
import {fakeUser} from "../lib/testUtils";
import {MockedProvider} from "react-apollo/test-utils";
import toJson from "enzyme-to-json";
import {ApolloConsumer} from "react-apollo";
import wait from "waait";

function type(wrapper, name, value) {
    wrapper.find(`input[name="${name}"]`).simulate('change', {
        target: {name, value},
    });
}

const me = fakeUser();
// signup mock mutation
const mocks = [
    {
        request: {
            query: SIGNUP_MUTATION,
            variables: {
                email: me.email,
                name: me.name,
                password: 'fakePassword',
                totalDonated: me.totalDonated,
            },
        },

        result: {
            data: {
                signup: {
                    __typename: 'User',
                    id: 'abc123',
                    email: me.email,
                    name: me.name,
                    password: 'fakePassword',
                    totalDonated: me.password,
                },
            },
        },
    },

    // current user query mock
    {
        request: {query: CURRENT_USER_QUERY},
        result: {data: {me}},
    },
];

describe('<Signup/>', () => {
    it('renders matches snapshot', async () => {
        const wrapper = mount(
            <MockedProvider>
                <SignUp/>
            </MockedProvider>
        );
        expect(toJson(wrapper.find('form'))).toMatchSnapshot();
    });

    xit('calls the mutation properly', async () => {
        let apolloClient;
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <ApolloConsumer>
                    {client => {
                        apolloClient = client;
                        return <SignUp/>
                    }}
                </ApolloConsumer>
            </MockedProvider>
        );

        await wait();
        wrapper.update();
        type(wrapper, 'email', me.email);
        type(wrapper, 'name', me.name);
        type(wrapper, 'password', 'fakePassword');
        type(wrapper, 'totalDonated', me.totalDonated);

        wrapper.find('form').simulate('submit');
        await wait();
        // query the user of the apollo client
        const user = await apolloClient.query({query: CURRENT_USER_QUERY});
        expect(user.data.me).toMatchObject(me);
    });
});
