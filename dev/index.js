import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {Route, Switch} from 'react-router';
import {HashRouter as Router} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

import App from './components/App';
import Title from './components/Title';
import Article from './components/Article';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Title />
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/articles/:id" component={Article} />
                <Route path="*" render={() => (
                    <Alert show variant="danger">
                        Запрашиваемая Вами страница не найдена!
                    </Alert> )
                } />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('app')
);
