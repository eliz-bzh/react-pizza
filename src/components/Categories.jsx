import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Categories = memo(({ activeItem, items, onClickItem }) => {
    return (
        <div className="categories">
            <ul>
                <li className={activeItem === null ? 'active' : ''} onClick={() => onClickItem(null)}>Все</li>
                {items && items.map((item, index) =>
                    <li className={activeItem === index ? 'active' : ''} onClick={() => onClickItem(index)} key={index}>{item}</li>
                )}
            </ul>
        </div>
    )
})

//typing of object
Categories.propTypes = {
    activeItem: PropTypes.oneOf([PropTypes.number, null]),
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickItem: PropTypes.func.isRequired
};

Categories.defaultProps = {
    activeItem: null,
    items: []
};

export default Categories;