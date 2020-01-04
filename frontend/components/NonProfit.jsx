import React, {Component} from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import NonProfitButtonList from "./NonProfitButtonList";

class NonProfit extends Component {

    static PropTypes = {
        nonProfit: PropTypes.object.isRequired,
    };

    render() {
        const {nonProfit} = this.props;
        return (
            <>
                <div className="component">
                    <div className="nonProfitInfo">
                        <Link href={`/nonProfit?id=${nonProfit.id}`}>
                            <a>{nonProfit.name}</a>
                        </Link>
                    </div>
                    <NonProfitButtonList nonProfit={nonProfit}/>
                </div>
                <style jsx>{`
                    .nonProfitInfo > a {
						text-decoration: none;
						color: black;
						font-size: 2em;
					}
                `}</style>
            </>
        );
    }
}

NonProfit.propTypes = {
    nonProfit: PropTypes.object.isRequired,
};

export default NonProfit;