const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {
  requireAuth
} = require('./middleware/authMiddleware');
// express app
const app = express();
app.use(express.json());

// connect to mongodb & listen for requests
const dbURI = 'mongodb+srv://mattias:DkWSQSEaTUpiF5L@node-test.okcq1.mongodb.net/node-test?retryWrites=true&w=majority'
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/blogs/create', requireAuth, (req, res) => {
  res.render('create', {
    title: 'New Blog Entry'
  })
});


app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About'
  });
});

app.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Signup'
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login'
  });
});

//blog routes
app.use('/blogs', blogRoutes)
app.use(authRoutes);

// 404 page
/* app.use((req, res) => {
  res.status(404).render('404', {
    title: '404'
  });
}); */