import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartComponent = () => {

    const dispatch = useDispatch();
    const { items, totalPrice, totalCount } = useSelector(({ cartReducer }) => {
        return {
            items: cartReducer.items,
            totalPrice: cartReducer.totalPrice,
            totalCount: cartReducer.totalCount
        }
    });
    const [pizzaCart, setPizzaCart] = useState([]);

    return (
        <div className="container">
            <div className="content">
                <div className="container container--cart">
                    {(pizzaCart && pizzaCart.length === 0) ? (
                        <div className="cart">
                            <div className="cart__top">
                                <h2 className="content__title">{/*<% include ../../public/img/cart.svg %>*/} Корзина</h2>
                                <div className="cart__clear">
                                    {/*<% include ../../public/img/trash.svg %>*/}
                                    <span>Очистить корзину</span>
                                </div>
                            </div>
                            <div className="content__items">
                                { /* <% include components/cart-item.ejs %> <% include components/cart-item.ejs %> <%
              include components/cart-item.ejs %> <% include components/cart-item.ejs %>*/}
                            </div>
                            <div className="cart__bottom">
                                <div className="cart__bottom-details">
                                    <span> Всего пицц: <b>{totalCount} шт.</b> </span>
                                    <span> Сумма заказа: <b>{totalPrice} ₽</b> </span>
                                </div>
                                <div className="cart__bottom-buttons">
                                    <Link to="/" className="button button--outline button--add go-back-btn">
                                        {/*<% include ../../public/img/grey-arrow-left.svg %>*/}
                                        <span>Вернуться назад</span>
                                    </Link>
                                    <div className="button pay-btn">
                                        <span>Оплатить сейчас</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ('Clear')}
                </div>
            </div>
        </div>
    )
}

export default CartComponent;