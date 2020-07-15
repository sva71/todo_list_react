import React from 'react';
import {useSelector} from 'react-redux';

import style from './style.sass';
import Item from '../Item';

const List = () => {
    const {articles} = useSelector(store => store);
    return (
        <div className={style.articles}>
            {articles.map((item) => <Item key={item.id} id={item.id} title={item.title} list={item.list} />)}
        </div>
    )
}

export default List;