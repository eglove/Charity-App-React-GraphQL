import React from "react";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from "./styles/PaginationStyles";
import {perPage} from "../config";

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        charitiesConnection {
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
            const count = data.charitiesConnection.aggregate.count;
            const pages = Math.ceil(count / perPage);
            const currentPage = props.page;
            return (
                <>
                    <Head>
                        <title>Cognitame 📄 Page {currentPage} of {pages}</title>
                    </Head>
                    <PaginationStyles>
                        <Link prefetch href={{
                            pathname: '/charities',
                            query: {page: currentPage - 1}
                        }}>
                            <a className="prev" aria-disabled={currentPage <= 1}>◀</a>
                        </Link>
                        <p>Page {currentPage} of {pages} Pages</p>
                        <p>💙 {count} Charities Total 💙</p>
                        <Link prefetch href={{
                            pathname: '/charities',
                            query: {page: currentPage + 1}
                        }}>
                            <a className="next" aria-disabled={currentPage >= pages}>▶</a>
                        </Link>
                    </PaginationStyles>
                </>
            );
        }}
    </Query>
);

export default Pagination;