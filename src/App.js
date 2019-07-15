import React from 'react';
import './App.css';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const GET_BASKET = gql`
    {
        basketById(basketId: "7953FCFB-A98E-4689-A0A0-65C069C99000") {
            basketId
            basketValueWithShippingFormatted
            positions {
                positionValueFormatted
                article {
                    ean
                }
            }
        }
    }
`;

const Basket = () => (
    <Query query={GET_BASKET}>
        {({loading, error, data}) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            return (
                <div>
                <ul>
                    {data.basketById.positions.map(position => (
                        <li>{position.article.ean}</li>
                    ))}
                </ul>
                    <b>Sum: {data.basketById.basketValueWithShippingFormatted}</b>
                </div>
            );
        }}
    </Query>
);

function App() {
    return (
        <div className="App">
            <Basket/>
        </div>
    );
}

export default App;
