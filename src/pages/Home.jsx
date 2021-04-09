import React from 'react';
import { Pizzas } from '../components';

const Home = ({ items }) => {
    return (
        <Pizzas items={items} />
    )
}

export default Home;