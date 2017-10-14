"use strict";

const express = require('express');
const fs = require('fs');
const doT = require('dot');
const app = express();

app.engine('jst', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) { 
            return callback(err); 
        }

        let defs = {};

        defs.loadfile = (path) => {
            return fs.readFileSync(process.argv[1].replace(/\/[^\/]*$/, path));
        };

        var template = doT.template(content.toString(), undefined, defs);

        return callback(null, template(options));
    });
});

app.set('views', './templates');
app.set('view engine', 'jst');

app.get('/', (request, response) => {
    response.render('index', {
        header: 'Hello, World!' 
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});