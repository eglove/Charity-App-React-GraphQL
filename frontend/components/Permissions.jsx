import {Query} from 'react-apollo';
import gql from 'graphql-tag';

const possiblePermissions = [
    'ADMIN',
    'USER',
    'ITEMCREATE',
    'ITEMUPDATE',
    'ITEMDELETE',
    'PERMISSIONUPDATE',
];

const ALL_USERS_QUERY = gql`
    query {
        users {
            id
            name
            email
            permissions
        }
    }
`;

const Permissions = props => (
    <Query query={ALL_USERS_QUERY}>
        {({data, loading, error}) => (
            <>
                <h2>Manage Permissions</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        {possiblePermissions.map(permission =>
                            <th>{permission}</th>)}
                        <th>&darr;</th>
                    </tr>
                    </thead>
                    <tbody>{data.users.map(user => <User user={user}/>)}</tbody>
                </table>
            </>
        )}
    </Query>
);

class User extends React.Component {
    render() {
        const user = this.props.user;

        return (
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {possiblePermissions.map(permission => (
                    <td>
                        <label htemlFor={`${user.id}-permission-${permission}`}>
                            <input type="checkbox"/>
                        </label>
                    </td>
                ))}
                <td>
                    <button>Update</button>
                </td>
            </tr>
        )
    }
}

export default Permissions;