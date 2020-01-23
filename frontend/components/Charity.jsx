import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FavoritesButtonList from "./FavoritesButtonList";
import ItemStyles from "./styles/ItemStyles";

class Charity extends Component {

    static propTypes = {
        charity: PropTypes.object.isRequired,
    };

    render() {
        const {charity} = this.props;
        return (
            <ItemStyles>
                <Link href={{
                    pathname: '/charity',
                    query: {id: charity.id}
                }}>
                    <a>{charity.image && <img src={charity.image} alt={charity.imageDescription}/>}</a>
                </Link>
                <p>{charity.description.substring(0, 150)}...</p>
                <FavoritesButtonList charity={charity}/>
            </ItemStyles>
        );
    }
}

export default Charity;