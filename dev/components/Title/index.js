import React from 'react';

import picture from './todopic.jpg';
import style from './style.sass';

const Title = () => (
    <div className={style.title}>
        <img src={picture} alt="picture"/>
        <p className={style['title-text']}>Мои заметки и мероприятия</p>
    </div>
);

export default Title;