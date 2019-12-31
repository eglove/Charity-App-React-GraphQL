import React, {Component} from 'react';
import gql from 'graphql-tag'
import {Mutation} from 'react-apollo';
import Router from 'next/router';
import Error from './ErrorMessage';

const CREATE_NONPROFIT_MUTATION = gql`
    mutation CREATE_NONPROFIT_MUTATION(
        $ein: Int!
        $name: String!
        $ico: String
        $street: String!
        $city: String!
        $state: String!
        $zip: String!
        $group: Int
        $subsection: Int
        $affiliation: Int
        $classification: Int
        $ruling: Int
        $deductibility: Int
        $foundation: Int
        $activity: Int
        $organization: Int
        $status: Int
        $taxperiod: Int
        $assetCd: Int
        $incomeCd: Int
        $filingReqCd: Int
        $pfFilingReqCd: Int
        $acctPd: Int
        $assetAmt: Int
        $revenueAmt: Int
        $nteeCd: String
        $sortName: String
    ) {
        createNonProfit(data: {
            ein: $ein
            name: $name
            ico: $ico
            street: $street
            city: $city
            state: $state
            zip: $zip
            group: $group
            subsection: $subsection
            affiliation: $affiliation
            classification: $classification
            ruling: $ruling
            deductibility: $deductibility
            foundation: $foundation
            activity: $activity
            organization: $organization
            status: $status
            taxperiod: $taxperiod
            assetCd: $assetCd
            incomeCd: $incomeCd
            filingReqCd: $filingReqCd
            pfFilingReqCd: $pfFilingReqCd
            acctPd: $acctPd
            assetAmt: $assetAmt
            revenueAmt: $revenueAmt
            nteeCd: $nteeCd
            sortName: $sortName
        }) {
            id
        }
    }
`;

class CreateNonProfit extends Component {
    state = {
        ein: 0,
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        ico: '',
        group: 0,
        subsection: 0,
        affiliation: 0,
        classification: 0,
        ruling: 0,
        deductibility: 0,
        foundation: 0,
        activity: 0,
        organization: 0,
        status: 0,
        taxperiod: 0,
        assetCd: 0,
        incomeCd: 0,
        filingReqCd: 0,
        pfFilingReqCd: 0,
        acctPd: 0,
        assetAmt: 0,
        revenueAmt: 0,
        nteeCd: '',
        sortName: ''
    };

    handleChange = (e) => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: val})
    };

    render() {
        return (
            <div className="component">
                <Mutation mutation={CREATE_NONPROFIT_MUTATION} variables={this.state}>
                    {(createNonProfit, {loading, error}) => (
                        <form onSubmit={async e => {
                            e.preventDefault();
                            const res = await createNonProfit();
                            console.log(res);
                            await Router.push(`/nonProfit?id=${res.data.createNonProfit.id}`);
                        }}>
                            <Error error={error}/>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <label htmlFor="ein">
                                    EIN:&emsp;<input
                                    type="number"
                                    id="ein"
                                    name="ein"
                                    placeholder="EIN"
                                    required
                                    value={this.state.ein}
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
                                    value={this.state.name}
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
                                    value={this.state.street}
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
                                    value={this.state.city}
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
                                    value={this.state.state}
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
                                    value={this.state.zip}
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
                                    value={this.state.ico}
                                    onChange={this.handleChange}
                                />
                                </label>
                                <br/>
                                <button type="submit">Add</button>
                            </fieldset>
                        </form>
                    )}
                </Mutation>
            </div>
        );
    }
}

export default CreateNonProfit;
export {CREATE_NONPROFIT_MUTATION};