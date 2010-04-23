layout('Hello World!',
    h1('Hello World!'),
    p('This. Oh this. This is James, my friend!'),
    p('The time is now: ' + new Date()),
    p('Go to my ', a({href: '/page2'}, 'other page.')),
    p('PATH_INFO: ' + PATH_INFO),
    p('SERVER_NAME: ' + SERVER_NAME),
    button({onclick: 'onClick()'}, 'Click me!')
)
