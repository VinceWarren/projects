const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BLOG = require('./models/blog'); // Adjust the path as needed

const app = express();
const PORT = process.env.PORT || 8080;
const dbURI = 'mongodb+srv://vince:vince123@cluster0.vycwj80.mongodb.net/BlogData?retryWrites=true&w=majority&appName=Cluster0';

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database connection
mongoose.connect(dbURI)
.then(() => console.log('Connected to DB'))
.catch(err => console.log(err));

// Routes
app.post('/add-blog', async (req, res) => {
    try {
        const { title, author, description } = req.body;
        const save = new BLOG({
            title: title,
            author: author,
            description: description,
        });
        console.log('Data received:', req.body);
        await save.save();
        res.status(201).send('Blog post created successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});

app.get('/', async (req, res) => {
    try {
        const data = await BLOG.find();
        const blogs = data.map(blog => ({
            title: blog.title,
            author: blog.author,
            description: blog.description,
            time: blog.createdAt
        }));
        res.render('index', {title: 'Home', blogs});
    } catch (err) {
        console.log(err);
    }
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/create', (req, res) => {
    res.render('create', {title: 'New Blog'});
});

app.use((req, res) => {
    res.render('404', {title: '404'});
});

// Export the app
module.exports.handler = serverless(app);
