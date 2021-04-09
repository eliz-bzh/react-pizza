import React from 'react';
import { Pizza } from '../components';

const Home = ({ items }) => {
    return (
        <Pizza items={items} />
    )
}

export default Home;