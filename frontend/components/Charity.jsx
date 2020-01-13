import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ItemStyles from "./styles/ItemStyles";
import DeleteCharity from "./DeleteCharity";
import AddToFavorites from "./AddToFavorites";
import FavoritesButtonList from "./FavoritesButtonList";

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