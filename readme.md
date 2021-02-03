# Учебный шаблон проекта Portfolio

Deploy: https://vovaborisenko.github.io/borisenko_vue_loftschool/

Дизайн макет: [Autumn](https://www.figma.com/file/k0z3kxC6O9gwzDjQVeox0o/Autumn?node-id=0%3A1)
[Админка](https://www.figma.com/file/dL2zmKuChdJPddkFKmLJ0E/Admin?node-id=1%3A593)

Исполнитель: [Владимир Борисенко](https://github.com/vovaborisenko)

## Неделя №4
- Добавлен VueRouter.

## Неделя №3
- Добавлен Vue для слайдера проектов.
- Созданы компонеты для страницы [админки](https://www.figma.com/file/dL2zmKuChdJPddkFKmLJ0E/Admin?node-id=1%3A593) "Обо мне".

## Неделя №2
- Выполена верстка дизайн макета [Autumn](https://www.figma.com/file/k0z3kxC6O9gwzDjQVeox0o/Autumn?node-id=0%3A1) для всех устройств.
- Добавлены CI & CD. [Ссылка на проект](https://vovaborisenko.github.io/borisenko_vue_loftschool/)
- Добавлен Vue для скилов и отзывов.

## Неделя №1
- Выполена верстка дизайн макета [Autumn](https://www.figma.com/file/k0z3kxC6O9gwzDjQVeox0o/Autumn?node-id=0%3A1) для мобил (MobileFirst).

---

> Перед установкой зависимостей и запуском проекта убедитесь, что у вас установлена [последняя версия Node.js & NPM](https://nodejs.org/en/download/current/), а так же 
[последняя версия Yarn](https://yarnpkg.com/ru/docs/install)

##  Чтобы развернуть проект необходимо:
```sh
$ git clone git@github.com:loftschool/vue-boilerplate.git
$ cd vue-boilerplate
$ yarn
```

## Скрипты package.json:

| Скрипт | Назначение |
| ------ | ------ |
| dev | Запустит webpack-dev-server с _горячей_ заменой модулей |
| build | Соберет проект для **production** (проект готов к загрузке на сервер) |
| reg | Консольная утилита для регистрации. Использовать перед началом работы над **админ-панелью**. |
| storybook | Запустит сторибук для разработки компонентов |

#### Чтобы запустить скрипт:
```sh
$ npm run имя_скрипта
```

##### Либо:
```sh
$ yarn имя_скрипта
```
