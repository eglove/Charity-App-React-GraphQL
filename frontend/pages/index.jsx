import Charities from "../components/Charities";

const Home = props => (
    <>
        <Charities page={parseFloat(props.query.page) || 1}/>
    </>
);

export default Home;