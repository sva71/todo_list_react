##### Заметки и мероприятия. React.JS

Frontend-приложение для управления несколькими заметками, каждая из которых содержит в себе 
полноценный todo-список мероприятий.

Изначально приложение разрабатывалось на Vue.js в качестве тестового задания для некой 
IT-компании, которая впоследствии так и не отозвалась. Ссылка на Vue-вариант:

https://github.com/sva71/todo_list_vue

Чтобы сделать свое портфолио более разносторонним, было решено реализовать все то же
самое на React.

Для наиболее полного понимания функционала приложения, далее привожу текст ТЗ, 
полученного мной.


Средствами Vue.js реализуйте небольшое SPA приложение для заметок.

Каждая заметка имеет название и список задач (todo list), далее - Todo.
Каждый пункт Todo состоит из чекбокса и относящейся к нему текстовой подписи.

Приложение состоит всего из 2х страниц.

На главной странице отображается список всех заметок.
Для каждой заметки отображается заголовок и Todo, сокращенный до нескольких пунктов, без возможности отмечать.
Действия на главной:
- перейти к созданию новой заметки
- перейти к изменению
- удалить (необходимо подтверждение)

Страница изменения заметки позволяет определенную заметку отредактировать, отметить пункты Todo, а после сохранить изменения.
Действия с заметкой:
- сохранить изменения
- отменить редактирование (необходимо подтверждение)
- удалить (необходимо подтверждение)
- отменить внесенное изменение
- повторить отмененное изменение
Действия с пунктами Todo:
- добавить
- удалить
- отредактировать текст
- отметить как выполненный

Требования к функционалу:
- Все действия на сайте должны происходить без перезагрузки страницы.
- Подтверждение действий (удалить заметку) выполняется с помощью диалогового окна.
- Интерфейс должен отвечать требованиям usability.
- После перезагрузки страницы состояние списка заметок должно сохраняться.
- Можно пренебречь несоответствием редактирования текста с помощью кнопок отменить/повторить и аналогичным действиям с помощью комбинаций клавиш (Ctrl+Z, Command+Z, etc.).

Технические требования:
- Диалоговые окна должны быть реализованы без использования "alert", "prompt" и "confirm".
- В качестве языка разработки допускается использовать JavaScript или TypeScript.
- В качестве сборщика, если это необходимо, используйте Webpack.