import React, {useState} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { LoadingBlock } from '..';
import Button from '../Button';

const PizzaBlock = ({ id, images, name, types, prices, ingredients, isLoading, onClickItem, addedCount, handleClickPizza, handleDialogShow }) => {

    const availableTypes = ['традиционное', 'тонкое'];
    const availableSizes = [25, 30, 35];
    //const [activeType, setActiveType] = useState(0);
    const [activeSize, setActiveSize] = useState(types[0].availableSizes[0].size);

    if (isLoading) {
        return <LoadingBlock />;
    }

    /*const onAddPizza = () => {
        const obj = { id, name, imageUrl: images[activeType][activeSize], price: prices[activeSize], size: activeSize, type: availableTypes[activeType] };
        onClickItem(obj)
    };*/

    // Установить активный размер на первый доступный, если текущий недоступен
    /*if (!types[activeType].availableSizes.some(s=>s.size === activeSize)) {
        setActiveSize(types[activeType].availableSizes[0].size);
    }*/

    return (
        <div className="pizza-block" onClick={()=> {
            handleClickPizza();
            handleDialogShow(true);
        }}>
            <img
                className="pizza-block__image"
                src={images[0][25]}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{name}</h4>

        </div>
    )
}

//typing of object
PizzaBlock.propTypes = {
    name: PropTypes.string,
    images: PropTypes.object.isRequired,
    types: PropTypes.arrayOf(PropTypes.object).isRequired,
    prices: PropTypes.object.isRequired,
    isLoading: PropTypes.bool, 
    onAddPizza: PropTypes.func,
    addedCount: PropTypes.number
};

PizzaBlock.defaultProps = {
    isLoading: false
};

export default PizzaBlock;