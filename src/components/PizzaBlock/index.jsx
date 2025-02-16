import React from 'react';
import PropTypes from 'prop-types';
import { LoadingBlock } from '..';
import Button from '../Button';

const PizzaBlock = ({ id, images, name, types, prices, ingredients, isLoading, onClickItem, addedCount, handleClickPizza, handleDialogShow }) => {

    if (isLoading) {
        return <LoadingBlock />;
    }

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
            <div className="pizza-block__ingredients">{ingredients.map((ing, index)=><span key={index}>{!(index === ingredients.length-1) ? `${ing}, ` : ing}</span>)}</div>

            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {prices[25]} ₽</div>
                <Button className='button--add' outline>
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
                    <span>Выбрать</span>
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