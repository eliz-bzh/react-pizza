import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from './Button';
import cartEmptyImage from '../assets/img/empty-cart.png';
import CartItem from './CartItem';

const CartComponent = () => {

    const dispatch = useDispatch();
    const { items, totalPrice, totalCount } = useSelector(({ cartReducer }) => cartReducer);

    const pizzasCart = Object.keys(items).map((key) => {
        return items[key];
      });
    
    console.log(pizzasCart)
    
    return (
        <div className="container">
            <div className="content">
                <div className="container container--cart">
                    { totalCount ? (
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
                                {pizzasCart.map((obj)=>
                                    <CartItem {...obj} totalCount totalPrice/>
                                )}
                                


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
                    ) : (
                        <div className="cart cart--empty">
                        <h2>
                        Корзина пустая <i>😕</i>
                        </h2>
                        <p>
                        Вероятней всего, вы не заказывали ещё пиццу.
                        <br />
                        Для того, чтобы заказать пиццу, перейди на главную страницу.
                        </p>
                        <img src={cartEmptyImage} alt="Empty cart" />
                        <Link to="/" className="button button--black">
                        <span>Вернуться назад</span>
                        </Link>
                    </div>
                  )}
                </div>
            </div>
        </div>
    )
}

export default CartComponent;