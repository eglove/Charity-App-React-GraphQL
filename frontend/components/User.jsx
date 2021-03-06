import {Query} from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

const CURRENT_USER_QUERY = gql`
    query {
        me {
            id
            email
            name
            permissions
            totalDonated
            favorites {
                id
                charity {
                    id
                    ein
                    name
                    description
                    website
                    largeImage
                    imageDescription
                    street
                    city
                    state
                    zip
                }
                donations {
                    id
                    amount
                    yearDonated
                }
                totalDonatedToFavorite
            }
        }
    }
`;

const User = props => (
    <Query {...props} query={CURRENT_USER_QUERY}>
        {payload => props.children(payload)}
    </Query>
);

User.propTypes = {
    children: PropTypes.func.isRequired,
};

export default User;
export {CURRENT_USER_QUERY};