const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    fs.readdir(`./files`,function(err,files){
        res.render('index', {files: files});
        // console.log("files", files);
        // console.log(files.length);
    })
})

app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf8', function (err, data) {
        res.render('show',{
            filename: req.params.filename,
            filedata: data
        });
    })
})
app.post('/create', function (req, res) {
    fs.writeFile(`./files/${req.body.title.split(" ").join("_")}.txt`, req.body.content, function (err) {
        res.redirect('/');
    })
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})