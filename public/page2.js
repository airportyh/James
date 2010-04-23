layout('Page 2',
    h1('Welcome to Page 2!'),
    p('Hello! This is page 2!'),
    p('The time is now: ' + new Date()),
    p('Go back to ', a({href: '/'}, 'home page.'))
)