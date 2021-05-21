import React, { memo, useState } from 'react';

const Categories = memo(({ items, onClickItem }) => {

    const [activeItem, setActiveItem] = useState(null);

    const onSelectItem = (index) => {
        setActiveItem(index);
        onClickItem(index);
    }
    console.log('categories render')

    return (
        <div className="categories">
            <ul>
                <li className={activeItem === null ? 'active' : ''} onClick={() => onSelectItem(null)}>Все</li>
                {items && items.map((item, index) =>
                    <li className={activeItem === index ? 'active' : ''} onClick={() => onSelectItem(index)} key={index}>{item}</li>
                )}
            </ul>
        </div>
    )
}
)
export default Categories;