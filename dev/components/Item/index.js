import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

import Icon from '../Icon';
import Hint from '../Hint';
import {deleteArticle} from '../../actions';
import useOkCancelModal from '../../hooks/useModal/useOkCancelModal';

import style from './style.sass';

const Item = ({ id, title, list}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const list2 = list.slice(0, 2);
    const listFull = list.length > 2 ? list.slice(2, list.length) : [];

    const [expandText, setExpandText] = useState('Еще...');

    const expandPressed = () => {
        expandText === 'Еще...' ? setExpandText('Свернуть') : setExpandText('Еще...');
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
                    {list2
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
                    <Accordion defaultActiveKey="0">
                        <Card className={style['accordion']}>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body className={style['accordion-body']}>
                                    <ul>
                                        {listFull
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
                                </Card.Body>
                            </Accordion.Collapse>
                            <Card.Header className={style['accordion']}>
                                <Accordion.Toggle as={Button} variant="outline-secondary" eventKey="1" onClick={expandPressed}>
                                    {expandText}
                                </Accordion.Toggle>
                            </Card.Header>
                        </Card>
                    </Accordion>
                )}

                <hr/>

                <Button variant="secondary" onClick={() => history.push(`/articles/${id}`)}>
                    Редактировать
                </Button>

            </Card.Body>

            {deleteModal.render()}

        </Card>

    )
}

export default Item;