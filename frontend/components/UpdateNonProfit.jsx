import React, {Component} from 'react';
import {Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag'

const SINGLE_NONPROFIT_QUERY = gql`
    query SINGLE_NONPROFIT_QUERY($id: ID!) {
        nonProfit(where: {id: $id}) {
            id
            ein
            name
            street
            city
            state
            zip
            ico
        }
    }
`;

const UPDATE_NONPROFIT_MUTATION = gql`
    mutation UPDATE_NONPROFIT_MUTATION(
        $id: ID!,
        $ein: Int,
        $name: String,
        $ico: String,
        $street: String,
        $city: String,
        $state: String,
        $zip: String,
        $group: Int,
        $subsection: Int,
        $affiliation: Int,
        $classification: Int,
        $ruling: Int,
        $deductibility: Int,
        $foundation: Int,
        $activity: Int,
        $organization: Int,
        $status: Int,
        $taxperiod: Int,
        $assetCd: Int,
        $incomeCd: Int,
        $filingReqCd: Int,
        $pfFilingReqCd: Int,
        $acctPd: Int,
        $assetAmt: Int,
        $revenueAmt: Int,
        $nteeCd: String,
        $sortName: String
    ) {
        updateNonProfit(data: {
            ein: $ein,
            name: $name,
            ico: $ico,
            street: $street,
            city: $city,
            state: $state,
            zip: $zip,
            group: $group,
            subsection: $subsection,
            affiliation: $affiliation,
            classification: $classification,
            ruling: $ruling,
            deductibility: $deductibility,
            foundation: $foundation,
            activity: $activity,
            organization: $organization,
            status: $status,
            taxperiod: $taxperiod,
            assetCd: $assetCd,
            incomeCd: $incomeCd,
            filingReqCd: $filingReqCd,
            pfFilingReqCd: $pfFilingReqCd,
            acctPd: $acctPd,
            assetAmt: $assetAmt,
            revenueAmt: $revenueAmt,
            nteeCd: $nteeCd,
            sortName: $sortName,
        } where: {
            id: $id
        }
        ) {
            id
            ein
            name
            street
            city
            state
            zip
            ico
        }
    }
`;

class UpdateNonProfit extends Component {
    state = {};

    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    };

    updateNonProfit = async (e, updateNonProfitMutation) => {
        e.preventDefault();
        console.log('Updating Non Profit.');
        console.log(this.state);
        const res = await updateNonProfitMutation({
            variables: {
                id: this.props.id,
                ...this.state,
            },
        });
        console.log('Updated.');
    };

    render() {
        return (
            <div className="component">
                <Query query={SINGLE_NONPROFIT_QUERY} variables={{id: this.props.id}}>
                    {({data, loading}) => {
                        if (loading) return <p>Loading...</p>;
                        if (!data.nonProfit) return <p>No NonProfit Found for ID: {this.props.id}</p>;
                        return (
                            <Mutation mutation={UPDATE_NONPROFIT_MUTATION} variables={this.state}>
                                {(updateNonProfit, {loading, error}) => (
                                    <form onSubmit={async e => this.updateNonProfit(e, updateNonProfit)}>
                                        <fieldset disabled={loading} aria-busy={loading}>
                                            <label htmlFor="ein">
                                                EIN:&emsp;<input
                                                type="number"
                                                id="ein"
                                                name="ein"
                                                placeholder="EIN"
                                                required
                                                defaultValue={data.nonProfit.ein}
                                                onChange={this.handleChange}
                                            />
                                            </label>
                                            <br/>
                                            <label htmlFor="name">
                                                Name:&emsp;<input
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="Name"
                                                required
                                                defaultValue={data.nonProfit.name}
                                                onChange={this.handleChange}
                                            />
                                            </label>
                                            <br/>
                                            <label htmlFor="street">
                                                Street:&emsp;<input
                                                type="text"
                                                id="street"
                                                name="street"
                                                placeholder="Street"
                                                required
                                                defaultValue={data.nonProfit.street}
                                                onChange={this.handleChange}
                                            />
                                            </label>
                                            <br/>
                                            <label htmlFor="city">
                                                City:&emsp;<input
                                                type="text"
                                                id="city"
                                                name="city"
                                                placeholder="City"
                                                required
                                                defaultValue={data.nonProfit.city}
                                                onChange={this.handleChange}
                                            />
                                            </label>
                                            <br/>
                                            <label htmlFor="state">
                                                State:&emsp;<input
                                                type="text"
                                                id="state"
                                                name="state"
                                                placeholder="State"
                                                required
                                                defaultValue={data.nonProfit.state}
                                                onChange={this.handleChange}
                                            />
                                            </label>
                                            <br/>
                                            <label htmlFor="zip">
                                                Zip Code:&emsp;<input
                                                type="text"
                                                id="zip"
                                                name="zip"
                                                placeholder="Zip Code"
                                                required
                                                defaultValue={data.nonProfit.zip}
                                                onChange={this.handleChange}
                                            />
                                            </label>
                                            <p>Optional</p>
                                            <label htmlFor="ico">
                                                ICO:&emsp;<input
                                                type="text"
                                                id="ico"
                                                name="ico"
                                                placeholder="ICO"
                                                defaultValue={data.nonProfit.ico}
                                                onChange={this.handleChange}
                                            />
                                            </label>
                                            <br/>
                                            <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
                                        </fieldset>
                                    </form>
                                )}
                            </Mutation>
                        )
                    }}
                </Query>
            </div>
        );
    }
}

export default UpdateNonProfit;
export {UPDATE_NONPROFIT_MUTATION};