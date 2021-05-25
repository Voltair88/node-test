const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

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
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About'
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

// Labb

app.get("/api/random", (req, res) => {
  let number = Math.floor(Math.random() * 1023);

  res.send({
    number
  });
});

app.get("/api/custom_random/:num", (req, res) => {
  const {
    num
  } = req.params;
  let number = Math.floor(Math.random() * num);
  res.send({
    number
  });
});

app.get("/api/vowels/:word", (req, res) => {
  //1. we take in the word use has given
  const {
    word
  } = req.params;
  //2. we assign the words wovels to a let count
  //3. we send the amount of wovels the word had to the user.
  //need to make sure word has wovels before assigning to count otherwise error
  let count;
  if (word.match(/[aeiouyåäö]/gi)) {
    count = word.match(/[aeiouyåäö]/gi).length;
    res.send({
      count
    });
  } else {
    let count = 0;
    res.send({
      count
    });
  }
})

app.get("/api/add/:num", (req, res) => {
  const {
    num
  } = req.params;
  console.log(typeof num);
  counter += Number(num);
  res.send("{success: true}");
});

app.get("/api/show", (req, res) => {
  res.send({
    counter
  });
});

app.get("/api/reset", (req, res) => {
  counter = 0;
  res.send("{success: true}");
});