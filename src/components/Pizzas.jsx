import React, {useCallback, useEffect, useState} from 'react';
import { Categories, LoadingBlock, PizzaBlock, SortPopup } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setSortBy } from '../redux/actions/actionsFilter';
import { fetchPizzas } from '../redux/actions/actionPizzas';
import { addToCart } from '../redux/actions/actionCart';

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

    const handlePizzaClick = (pizza)=>{
        setSelectedPizza(pizza);
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeItem={category} onClickItem={onSelectCategory} items={categories} />
                <SortPopup sortBy={sortBy.type} onClickItem={onSelectSortBy} items={sortItems} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded ? items.map(item =>
                    <PizzaBlock onClickItem={addPizzaToCart} key={item.id} addedCount={cartItems[item.id]?.items.length} handleClickPizza={()=>handlePizzaClick(item)} handleDialogShow={setDialogShow} {...item} />
                ) : Array(12).fill(0).map((_, index) => (<LoadingBlock key={index} />))}
            </div>
            {dialogShow && (<div className="dialog">
                <div className="dialog__container">
                    <div className="dialog__container__content">
                        <div className="left">{selectedPizza.name}</div>
                        <div className="right">
                            <div className="dialog__container__header" onClick={() => setDialogShow(false)}>
                                <span className="close">&times;</span>
                            </div>
                            right
                        </div>
                    </div>
                </div>
            </div>)}

        </div >
    )
}

export default Pizzas;