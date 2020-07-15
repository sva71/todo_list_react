import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Icon from '../Icon';
import Hint from '../Hint';
import {deleteArticle} from '../../actions';
import useOkCancelModal from '../../hooks/useModal/useOkCancelModal';

import style from './style.sass';

const Item = ({ id, title, list}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [visible, setVisible] = useState(2);
    const [iconName, setIconName] = useState('down');
    const [expandTitle, setExpandTitle] = useState('Показать все');

    const expandPressed = () => {
        visible < list.length ? setVisible(list.length) : setVisible(2);
        iconName === 'down' ? setIconName('up') : setIconName('down');
        expandTitle === 'Показать все' ? setExpandTitle('Свернуть') : setExpandTitle('Показать все');
    }
    
    const deleteModal = useOkCancelModal('Внимание!',() => (
        <div>
            <p>Заметка "{title}"</p>
            <p>Вы действительно хотите удалить эту заметку?</p>
        </div>
            ), () => dispatch(deleteArticle(id)));

    return (

        <Card className={style['article-card']}>
            <Card.Body>

                <Card.Title>
                    <Hint placement="top" caption="Удалить заметку">
                        <div className={style['close-icon']} onClick={deleteModal.show}>
                            <Icon name="cross" />
                        </div>
                    </Hint>
                    {title}
                </Card.Title>

                <hr/>

                <ul>
                    {list
                        .filter((item, index) => index <= visible - 1)
                        .map((item, index) => <li key={index}>
                        <div className={style['icon-wrapper']}>
                            {item.done ?
                                <div className={style['check-icon']}>
                                    <Icon name="check" />
                                </div> : <></>}
                        </div>
                        {item.text}
                    </li>)}
                </ul>

                {(list.length > 2) && (
                    <Hint placement="top" caption={expandTitle}>
                        <Button variant="light" block size="sm" onClick={expandPressed}>
                            <Icon name={iconName} />
                        </Button>
                    </Hint>
                )}

                <hr/>

                <Button variant="outline-primary" onClick={() => history.push(`/articles/${id}`)}>
                    Редактировать
                </Button>

            </Card.Body>

            {deleteModal.render()}

        </Card>

    )
}

export default Item;