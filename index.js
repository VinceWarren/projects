const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const morgan = require('morgan');
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://vince:vince123@cluster0.vycwj80.mongodb.net/BlogData?retryWrites=true&w=majority&appName=Cluster0';
const BLOG = require('./models/blog');
const bodyParser = require('body-parser');


mongoose.connect(dbURI)
.then((result)=>{
    console.log('Connected to DB')
    app.listen(PORT, ()=>{
        console.log(`Server live at PORT ${PORT}`);
    })
})
.catch((err)=>{console.log(err)});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(express.static('public'));
app.use(morgan('dev'));

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

app.get('/', async (req, res)=>{
    try{
        const data = await BLOG.find();
        const blogs = data.map(blog => ({
            title: blog.title,
            author: blog.author,
            description: blog.description,
            time: blog.createdAt
        }));
        const time = blogs.createdAt;
        res.render('index', {title: 'Home', blogs});
    }
    catch(err){
        console.log(err)
    }
})

app.get('/about', (req, res)=>{
    res.render('about', {title: 'About'});
})
app.get('/create', (req,res) =>{
    res.render('create', {title: 'New Blog'})
})
app.use((req,res)=>{
    res.render('404', {title: '404'});
})

