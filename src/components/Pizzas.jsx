import React, {useCallback, useEffect, useState} from 'react';
import { Categories, LoadingBlock, PizzaBlock, SortPopup } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setSortBy } from '../redux/actions/actionsFilter';
import { fetchPizzas } from '../redux/actions/actionPizzas';
import { addToCart } from '../redux/actions/actionCart';
import classNames from "classnames";
import Button from "./Button";

const categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
    { name: 'популярности', type: 'rating', order: 'asc' },
    { name: 'цене', type: 'prices.25', order: 'desc' },
    { name: 'алфавиту', type: 'name', order: 'asc' }
];

const Pizzas = () => {

    const dispatch = useDispatch();
    const { items, isLoaded } = useSelector(({ pizzasReducer }) => {
        return {
            items: pizzasReducer.items,
            isLoaded: pizzasReducer.isLoaded
        }
    });
    const { category, sortBy } = useSelector(({ filtersReducer }) => filtersReducer);
    const { items: cartItems } = useSelector(({ cartReducer }) => cartReducer);

    const onSelectCategory = useCallback((index) => {
        dispatch(setCategory(index));
    }, [dispatch])

    const onSelectSortBy = useCallback((item) => {
        dispatch(setSortBy(item));
    }, [dispatch])

    const addPizzaToCart = useCallback((obj)=>{
        dispatch(addToCart(obj))
    },[dispatch])

    useEffect(() => {
        dispatch(fetchPizzas(sortBy, category));
    }, [category, dispatch, sortBy])


    const [dialogShow, setDialogShow] = useState(false);
    const [selectedPizza, setSelectedPizza] = useState({});
    const availableTypes = ['традиционное', 'тонкое'];
    const availableSizes = [25, 30, 35];
    const [activeType, setActiveType] = useState(0);
    const [activeSize, setActiveSize] = useState(25);

    const onAddPizza = () =>{
        const { id, name, images, prices } = selectedPizza;
        const obj = { id, name, imageUrl: images[activeType][activeSize], price: prices[activeSize], size: activeSize, type: availableTypes[activeType] };
        addPizzaToCart(obj);
    }

    useEffect(() => {
        if (isLoaded && items.length > 0) {
            setSelectedPizza(items[0]);
            if (items[0].types.length > 0) {
                setActiveSize(items[0].types[0].availableSizes[0].size);
                setActiveType(items[0].types[0].id);
            }
        }

    }, [isLoaded, items]);

    const  { images, name, ingredients, types, prices } = selectedPizza;

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeItem={category} onClickItem={onSelectCategory} items={categories} />
                <SortPopup sortBy={sortBy.type} onClickItem={onSelectSortBy} items={sortItems} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded ? items.map(item =>
                    <PizzaBlock onClickItem={addPizzaToCart} key={item.id} addedCount={cartItems[item.id]?.items.length} handleClickPizza={()=>setSelectedPizza(item)} handleDialogShow={setDialogShow} {...item} />
                ) : Array(12).fill(0).map((_, index) => (<LoadingBlock key={index} />))}
            </div>
            {dialogShow && (<div className="dialog">
                <div className="dialog__container">
                    <div className="dialog__container__content">
                        <div className="left">
                            <img
                                //className={`pizza-block__image`}
                                className={classNames({
                                    'pizza-block__image': 1,
                                    'pizza_30': activeSize === 30,
                                    'pizza_35': activeSize === 35
                                })}
                                src={images[activeType][activeSize]}
                                alt="Pizza"
                            />
                        </div>
                        <div className="right">
                            <div className="dialog__container__header" onClick={() => setDialogShow(false)}>
                                <h4 className="pizza-block__title">{name}</h4>
                                <span className="close">&times;</span>
                            </div>

                            <div className="pizza-block__details">{types[activeType]?.availableSizes?.find(el=>el.size === activeSize)?.size} см, {availableTypes[activeType]} тесто {activeSize}, {types[activeType]?.availableSizes?.find(el=>el.size === activeSize)?.weight} г</div>

                            <div className="pizza-block__ingredients">{ingredients.map((ing, index)=><span key={index}>{!(index === ingredients.length-1) ? `${ing}, ` : ing}</span>)}</div>

                            <div className="pizza-block__selector">
                                <ul>
                                    {availableTypes.map((type, index) =>
                                        <li key={type} onClick={() => {
                                            setActiveType(types[index]?.id);
                                            setActiveSize(types[index]?.availableSizes[0].size);
                                        }} className={classNames({
                                            'active': activeType === types[index]?.id,
                                            'disabled': !types?.some(s=>s.id === types[index]?.id)
                                        })}>{type}</li>
                                    )}
                                </ul>
                                <ul>
                                    {availableSizes.map((size, index) =>
                                        <li key={size} onClick={() => setActiveSize(size)} className={classNames({
                                            'active': activeSize === size,
                                            'disabled': !types?.find(el=>el.id === activeType)?.availableSizes.some(el=>el.size === size)
                                        })}>{size} см.</li>
                                    )}
                                </ul>
                            </div>

                            <div className="pizza-block__bottom">
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
                                    <span>В корзину за {prices[activeSize]} ₽</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}

        </div >
    )
}

export default Pizzas;