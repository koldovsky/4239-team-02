# HTML Template Repository with HTML Proofer

This template repository includes preconfigured GitHub Action that will validate html files in a project with (HTMLProofer)[https://github.com/gjtorikian/html-proofer/].
And htmx to load partials

```html
<main data-hx-trigger="load" data-hx-swap="outerHTML" data-hx-get="index.main.partial.html"></main>
```


```js
function init() {
    import('...js');
}

const totalPartials = document.querySelectorAll('[hx-trigger="load"], [data-hx-trigger="load"]').length;
let loadedPartialsCount = 0;

document.body.addEventListener('htmx:afterOnLoad', () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) init();
});
```

Add the data-proofer-ignore attribute to any tag to ignore it from every check.

```html
<a href="https://notareallink" data-proofer-ignore>Not checked.</a>
```


# Team 2

## Members:
1. Maria Rossa
2. Taras Yaremko
3. Pavlo Pylypiuk
4. Iryna Zhmailo
5. Yurii Mochalnykov
6. Valentyn Tymofiiv
7. Oleksandr Ryzhkov
8. Andriy Rudavskiy
9. Anna Snitko
10. Andrii Rybak
11. Pankin Nikita
12. Vladyslav Savchuk
