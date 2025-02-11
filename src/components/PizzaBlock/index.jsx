import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { LoadingBlock } from '..';
import Button from '../Button';

const PizzaBlock = ({ id, images, name, types, sizes, prices, isLoading, onClickItem, addedCount }) => {

    const availableTypes = ['традиционное', 'тонкое'];
    const availableSizes = [25, 30, 35];
    const [activeType, setActiveType] = useState(0);
    const [activeSize, setActiveSize] = useState(types[0].availableSizes[0]);

    if (isLoading) {
        return <LoadingBlock />;
    }

    const onAddPizza = () => {
        const obj = { id, name, imageUrl: images[activeType][activeSize], price: prices[activeSize], size: activeSize, type: availableTypes[activeType] };
        onClickItem(obj)
    };

    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={images[activeType][activeSize]}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {types.map((type, index) =>
                        <li key={type.id} onClick={() => setActiveType(index)} className={classNames({
                            'active': activeType === index,
                            'disabled': !types.includes(type)
                        })}>{availableTypes[type.id]}</li>
                    )}
                </ul>
                <ul>
                    {availableSizes.map(size =>
                        <li key={size} onClick={() => setActiveSize(size)} className={classNames({
                            'active': activeSize === size,
                            'disabled': !types[activeType].availableSizes.includes(size)
                        })}>{size} см.</li>
                    )}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {prices[activeSize]} ₽</div>
                <Button onClick={onAddPizza} className='button--add' outline>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {addedCount && <i>{addedCount}</i>}
                </Button>
            </div>
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