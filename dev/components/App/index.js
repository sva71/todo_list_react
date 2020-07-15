import React from 'react';
import {useHistory} from 'react-router';

import List from '../List';
import style from "./style.sass";
import Hint from "../Hint";
import Icon from "../Icon";

import useOkCancelModal from "../../hooks/useModal/useOkCancelModal";

const App = () => {

    const history = useHistory();

    const clearModal = useOkCancelModal(
        'Внимание!',
        () => (
            <>
                <p className="my-4">Вы действительно хотите очистить локальное хранилище?</p>
                <p className="my-3">(действие этой операции невозможно будет отменить)</p>
            </>
        ),
        () => localStorage.clear()
    );

    return (

        <div className={style.home}>

            <div className={style['icon-wrapper']}>

                <Hint placement="right" caption="Добавить заметку">
                    <div className={style['add-icon']} onClick={() => history.push('/articles/0')}>
                        <Icon name="plus" />
                    </div>
                </Hint>

                <Hint placement="left" caption="Очистить хранилище">
                    <div className={style['add-icon']} onClick={clearModal.show}>
                        <Icon name="trash" />
                    </div>
                </Hint>

            </div>

            <div className={style.articles}>
                <List />
            </div>

            {clearModal.render()}

        </div>

    )
}

export default App;
