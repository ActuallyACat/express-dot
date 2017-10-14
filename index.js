const express = require('express');
const fs = require('fs');
const app = express();
const doT = require('dot');

app.engine('jst', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) { 
            return callback(err); 
        }

        var templateFn = doT.template(content.toString());

        return callback(null, templateFn(options));
    });
});

app.set('views', './templates');
app.set('view engine', 'jst');

app.get('/', (request, response) => {
    response.render('index', { 
        text: 'Good afternoon!' 
    });
});

app.get('/api', (request, response) => {
    response
        .status(200)
        .send({hello: "world"});
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
