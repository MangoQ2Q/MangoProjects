# vueact

Материалы у укроам по модулю 4

В данном проекте собран весь исходный код использованный в видеоматериалах
1) работа со счетчиком
2) работа с корзиной товаров
3) работа сторы с роутером

Ознакомиться с:
1) всеми сторами в src/stores
2) как работают компоненты в src/views и App.vue
3) интеграция с роутером в src/router/index.ts

Дополнительно были изменены:
- base.css
- main.css

Вы можете забрать данные файлы в свой проект, если хотите поработать со схожими стилями самостоятельно.
Там только небольшие косметические правки и стилизация для кнопки

# vueact

Материалы у укроам по модулю 4

## Инициализация проекта
```sh
npm install
```

### Запуск проекта

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
```js
const list = new Set(data.permissions)
const permissionsList = Object
  .entries(Permissions)
  .map(([name, permission]) => [
    name,
    computed(() => list.has(permission))
  ])

return {
  // ...
  can: Object.fromEntries()permissionsList as Record<keyof typeof Permissions, ComputedRef<boolean>>
}
```