import React from 'react';
import gql from "graphql-tag";
import {Query} from 'react-apollo';
import {perPage} from '../config';
import Link from "next/link";

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        nonProfitsConnection {
            aggregate {
                count
            }
        }
    }
`;

const Pagination = props => (
    <Query query={PAGINATION_QUERY}>
        {({data, loading, error}) => {
            if (loading) return <p>Loading...</p>;
            const count = data.nonProfitsConnection.aggregate.count;
            const pages = Math.ceil(count / perPage);
            const page = props.page;
            return (
                <>
                    <Link href={{
                        pathname: '/nonProfits',
                        query: {page: page - 1}
                    }}>
                        <a className="paginationDisabler" aria-disabled={page <= 1}>&#8592; Prev</a>
                    </Link>
                    <span> Page {page} of {pages} | ({count} total) </span>
                    <Link href={{
                        pathname: '/nonProfits',
                        query: {page: page + 1}
                    }}>
                        <a className="paginationDisabler" aria-disabled={page >= pages}>Next &#8594;</a>
                    </Link>
                </>
            )
        }}
    </Query>
)

export default Pagination;