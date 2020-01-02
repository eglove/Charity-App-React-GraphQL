import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import DeleteNonProfit from "./DeleteNonProfit";

class NonProfit extends Component {

	static PropTypes = {
		nonProfit: PropTypes.object.isRequired,
	};

	render() {
		const { nonProfit } = this.props;
		return (
			<div>
				<div className="nonProfitInfo">
					<Link href={`/nonProfit?id=${nonProfit.id}`} >
						<a>{nonProfit.name}</a>
					</Link>
				</div>
				<div className="buttonList">
					<Link href={`/update?id=${nonProfit.id}`}>
						<a>Edit</a>
					</Link>
					<button>Add To Favorites</button>
					<DeleteNonProfit id={nonProfit.id}>Delete This Item</DeleteNonProfit>
				</div>
			</div>
		);
	}
}

NonProfit.propTypes = {
	nonProfit: PropTypes.object.isRequired,
};

export default NonProfit;