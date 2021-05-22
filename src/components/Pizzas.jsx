import React, { useCallback, useEffect } from 'react';
import { Categories, LoadingBlock, PizzaBlock, SortPopup } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setSortBy } from '../redux/actions/actionsFilter';
import { fetchPizzas } from '../redux/actions/actionPizzas';

const categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
    { name: 'популярности', type: 'rating', order: 'asc' },
    { name: 'цене', type: 'price', order: 'desc' },
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

    const onSelectCategory = useCallback((index) => {
        dispatch(setCategory(index));
    }, [])

    const onSelectSortBy = useCallback((item) => {
        dispatch(setSortBy(item));
    }, [])

    useEffect(() => {
        dispatch(fetchPizzas(sortBy, category));
    }, [category, sortBy])

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeItem={category} onClickItem={onSelectCategory} items={categories} />
                <SortPopup sortBy={sortBy.type} onClickItem={onSelectSortBy} items={sortItems} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded ? items.map(item =>
                    <PizzaBlock key={item.id} {...item} />
                ) : Array(12).fill(0).map((_, index) => (<LoadingBlock key={index} />))}
            </div>
        </div >
    )
}

export default Pizzas;