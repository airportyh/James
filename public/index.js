layout('Hello World!',
    h1('Hello World!'),
    p('This. Oh this. This is James, my friend!'),
    p('The time is now: ' + new Date()),
    p('Go to my ', a({href: '/page2'}, 'other page.')),
    ul(
        keys(params).map(function(param){
            return li(param, ' : ', params[param])
        })
    ),
    button({onclick: 'onClick()'}, 'Click me!')
)
