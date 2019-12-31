import NonProfits from '../components/NonProfits';

const Home = props => (
	<div className="component">
		<NonProfits page={parseFloat(props.query.page) || 1} />
	</div>
);

export default Home;