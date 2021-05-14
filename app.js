const express = require('express');


// express app
const app = express();


// register view engine
app.set('view engine', 'ejs');


// listen for requests

app.listen(3000);

app.get('/', (req, res) => {
    const blogs = [
        {title:'mattias finds eggs', snippet: 'lorem ipsum dolor'},
        {title: 'second blog find', snippet: 'lorem ipsum dolor'},
        {title: 'third blog find', snippet: 'lorem ipsum dolor'},
    ];
    res.render('index', { title: 'Home', blogs});
    //res.sendFile('./views/index.html', { root: __dirname});
    //res.send('<p> home page </p>');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});

    //res.sendFile('./views/about.html', { root: __dirname});
    //res.send('<p> about page </p>');
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog'});
})

// redirect

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});


// 404 page

app.use((req, res) => {

    res.status(404).render('404', { title: '404'});
    //res.status(404).res.sendFile('./views/404.html', { root: __dirname});
});