import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {Form, Card, Button} from 'react-bootstrap';

import Icon from '../Icon';

import style from './style.sass';
import useOkCancelModal from '../../hooks/useModal/useOkCancelModal';
import useNewId from '../../hooks/useNewId';
import {addArticle, updateArticle, deleteArticle} from "../../actions";

const Article = (props) => {

    const [id, setId] = useState(+props.match.params.id);

    const dispatch = useDispatch();
    const history = useHistory();
    const newId = id || useNewId();

    const article = id ? useSelector(store => store.articles)[id - 1] : { id, title: '', list: [] };

    const [storeArticle, setStoreArticle] = useState(JSON.parse(JSON.stringify(article)));
    const [backupArticle, setBackupArticle] = useState(JSON.parse(JSON.stringify(article)));
    const [localArticle, setLocalArticle] = useState(JSON.parse(JSON.stringify(article)));

    const [changed, setChanged] = useState(false);
    const formModes = [
        { buttonText: 'Отменить изменения', modalText: 'Отменить сделанные изменения?' },
        { buttonText: 'Вернуть изменения', modalText: 'Вернуть отмененные изменения?' }
    ];
    const [currentMode, setCurrentMode] = useState(0);
    const [newListItem, setNewListItem] = useState('');

    // const bigButtonClass = `${style['icon-delete']} ${style.main}`;

    const titleChanged = (event) => setLocalArticle({...localArticle, title: event.target.value });

    const formChanged = (event) => {
        if (event.target.id !== 'new-item-input') {
            setChanged(true);
            setCurrentMode(0);
        }
    };

    const checkChanged = (event, id) => {
        setLocalArticle({
            ...localArticle,
            list: localArticle.list.map((item, index) =>
                index === id ? {...item, done: event.target.checked } : item)
        });
    }

    const inputChanged = (event, id) => {
        setLocalArticle({
            ...localArticle,
            list: localArticle.list.map((item, index) =>
                index === id ? {...item, text: event.target.value } : item)
        });
    }

    const deleteListItem = (id) => {
        setLocalArticle({
            ...localArticle,
            list: localArticle.list.filter((item, index) => index !== id)
        });
    }

    const addListItem = () => {
        newListItem && setLocalArticle({
            ...localArticle,
            list: [...localArticle.list, {done: false, text: newListItem}]});
        setNewListItem('');
        setChanged(true);
        setCurrentMode(0);
    }

    const onSave = () => {
        if (id) {
            dispatch(updateArticle(localArticle));
        } else {
            setLocalArticle({ ...localArticle, id: newId });
            dispatch(addArticle({ ...localArticle, id: newId }));
            setId(newId);
        }
        setStoreArticle(JSON.parse(JSON.stringify(localArticle)));
        setCurrentMode(0);
        setChanged(false);
    }

    const reloadData = () => {
        if (currentMode) {
            setLocalArticle(JSON.parse(JSON.stringify(backupArticle)));
            setCurrentMode(currentMode - 1);
        } else {
            setBackupArticle(JSON.parse(JSON.stringify(localArticle)));
            setLocalArticle(JSON.parse(JSON.stringify(storeArticle)));
            setCurrentMode(currentMode + 1);
        }
    }

    const onDelete = (id) => {
        dispatch(deleteArticle(id));
        history.push('/');
    }

    const exitModal = useOkCancelModal(
        'Внимание!',
        () => (
            <>
                <p className="my-4">Вы действительно хотите вернуться на главную страницу?</p>
                <p className="my-3">(все несохраненные изменения будут потеряны)</p>
            </>
        ),
        () => history.push('/')
    );

    const resetModal = useOkCancelModal(
        'Внимание!',
        () => <p className="my-4">{formModes[currentMode].modalText}</p>,
        () => reloadData()
    );

    const deleteModal = useOkCancelModal(
        'Внимание!',
        () => (
            <>
                <p className="my-4">Вы действительно хотите уделить всю заметку?</p>
                <p className="my-3">(это действие невозможно будет отменить)</p>
            </>
        ),
        () => onDelete(id)
    );

    return (

        <div className={style.wrapper}>

            <Form className={style.article} onChange={(e) => formChanged(e)}>

                <Card className="bg-light" id="input-card-1">
                    <Card.Body >

                        <div className={style['button-main']} onClick={deleteModal.show}>
                            <Icon name="cross_main" />
                        </div>

                        <Form.Group id="input-group-1">
                            <Form.Label htmlFor="input-1">Заголовок заметки:</Form.Label>
                            <Form.Control
                                id="input-1"
                                type="text"
                                required
                                placeholder="Заголовок"
                                value={localArticle.title}
                                onChange={titleChanged} />
                                <Form.Text className="text-muted">Озаглавьте ваш todo-список как-нибудь</Form.Text>
                        </Form.Group>

                    </Card.Body>
                </Card>

                <hr />

                <Card className="bg-light" id="input-card-2">
                    <Card.Body>

                        <Form.Group id="input-group-2">
                            <Form.Label>Todo-список:</Form.Label>
                            {localArticle.list.map((item, index) => (
                                <div className={style['list-item']} key={`div-${index}`}>
                                    <Form.Check
                                        key={`list-check-${index}`}
                                        checked={item.done}
                                        onChange = {(e) => checkChanged(e, index)} />
                                    <Form.Control
                                        key={`list-input-${index}`}
                                        type="text"
                                        placeholder="Мероприятие"
                                        value={item.text}
                                        onChange = {(e) => inputChanged(e, index)} />
                                    <div className={style['icon-delete']} onClick={() => deleteListItem(index)}>
                                        <Icon name="cross" />
                                    </div>
                                </div>
                            ))}
                        </Form.Group>

                    </Card.Body>
                </Card>

                <hr />

                <Card className="bg-light" id="input-card-3">
                    <Card.Body>

                        <Form.Group id="input-group-3">
                            <Form.Label>Добавить мероприятие в список:</Form.Label>
                            <Form.Control type="text" placeholder="Новое мероприятие" value={newListItem}
                                          id="new-item-input"
                                          onKeyUp={(e) => (e.key === 'Enter') && addListItem()}
                                          onChange={(e) => setNewListItem(e.target.value)} />
                        </Form.Group>

                    </Card.Body>
                </Card>

                <hr />

                <Button variant="primary" className="mr-2" disabled={!changed} onClick={onSave}>
                    Сохранить
                </Button>
                <Button variant="secondary" className="mr-2" disabled={!changed} onClick={resetModal.show}>
                    {formModes[currentMode].buttonText}
                </Button>
                <Button variant="danger" className="mr-2" onClick={exitModal.show}>
                    Вернуться на главную
                </Button>

            </Form>

            {exitModal.render()}
            {resetModal.render()}
            {deleteModal.render()}

        </div>

    )
}

export default Article;