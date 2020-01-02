import FavoritesComponent from "../components/Favorites";
import PleaseSignIn from "../components/PleaseSignIn";

const Favorites = props => (
    <PleaseSignIn>
        <FavoritesComponent/>
    </PleaseSignIn>
);

export default Favorites;