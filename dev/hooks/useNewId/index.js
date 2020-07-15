import React from 'react';
import {useSelector} from 'react-redux';

export default function useNewId() {
    const id = useSelector(store => store.articles[store.articles.length - 1].id);
    return id + 1;
}