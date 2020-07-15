const defaultArticles = JSON.parse(localStorage.getItem('sv_todo')) || {
    articles: [
                {
                    id: 1,
                    title: 'Утренний моцион',
                    list: [
                        {
                            text: 'Проснуться',
                            done: true,
                        },
                        {
                            text: 'Умыться',
                            done: false,
                        },
                        {
                            text: 'Приготовить завтрак',
                            done: false,
                        },
                        {
                            text: 'Позавтракать',
                            done: false,
                        },
                        {
                            text: 'Переодеться',
                            done: false,
                        },
                        {
                            text: 'Уехать на работу',
                            done: false,
                        }
                    ]
                },
                {
                id: 2,
                title: 'На работе',
                list: [
                {
                    text: 'Проверить почту',
                    done: false,
                },
                {
                    text: 'Почитать новости',
                    done: false,
                },
                {
                    text: 'Выпить кофе',
                    done: false,
                },
                {
                    text: 'Написать компонент',
                    done: false,
                },
                {
                    text: 'Почитать новости',
                    done: false,
                },
                {
                    text: 'Выпить кофе',
                    done: false,
                },
                {
                    text: 'Почитать новости',
                    done: false,
                },
                {
                    text: 'Протестировать компонент',
                    done: false,
                },
                {
                    text: 'Выпить кофе',
                    done: false,
                },
                {
                    text: 'Уехать домой',
                    done: false,
                },
                ]
                }
            ]
}

const reducer = (store = defaultArticles, action) => {
    const {articles} = store;
    const {payload} = action;
    switch (action.type) {
        case 'ADD_ARTICLE': {
            const newStore = {
                ...store,
                articles: [...articles, payload]
            }
            localStorage.setItem('sv_todo', JSON.stringify(newStore));
            return newStore;
        }
        case 'UPDATE_ARTICLE': {
            const newStore = {
                ...store,
                articles: articles.map((item) => item.id === payload.id ? payload : item)
            }
            localStorage.setItem('sv_todo', JSON.stringify(newStore));
            return newStore;
        }
        case 'DELETE_ARTICLE': {
            const newStore = {
                ...store,
                articles: articles.filter(({id}) => id !== payload)
            }
            localStorage.setItem('sv_todo', JSON.stringify(newStore));
            return newStore
        }
        default: return store;
    }
}

export default reducer;