import express from "express";
import bodyParser from "body-parser";
import path, {dirname} from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

let posts = [];

app.get('/', (req, res) => {
    console.log(posts);
    res.render('index', {posts: posts});
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    const newPost = {
        id: Date.now(),
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.redirect('/');
});

app.get('/post/:id', (req, res) => {
    const post = posts.find (p => p.id == req.params.id);
    res.render('post', {post: post});
});

app.get('/edit/:id', (req, res) => {
    const post = posts.find (p => p.id == req.params.id);
    res.render('edit', {post: post});
});

app.post('/edit/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id == req.params.id);
    posts[postIndex].title = req.body.title;
    posts[postIndex].content = req.body.content;
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

app.listen(port,()=> {
    console.log(`Listning on port ${port}`);
});
