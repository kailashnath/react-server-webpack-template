import React from 'react';
import Express from 'express';
import {renderToString} from 'react-dom/server';
import cheerio from 'cheerio';
import App from './app/app';
import fs from 'fs';


const Server = new Express();
const port = 9999;
const homeHtml = new Promise((ok, fail) => {
    fs.readFile('./app/index.html', 'utf8', (err, data) => {
        if (null === err) {
            const page = cheerio.load(data);
            page('head').append(`<link href="./dist/styles.css" rel="stylesheet">`);
            page('body').append(`<script type="text/javascript" src="./dist/vendor.bundle.js" />`);
            page('body').append(`<script type="text/javascript" src="./dist/app.js" />`);
            ok(page);
        } else {
            fail(err);
        }
    });
});


Server.get('/', (req, res) => {
    const html = renderToString(<App />);

    homeHtml.then((page) => {
        page('#app').html(html);
        res.send(page.html());
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    });
});

Server.use('/dist', Express.static('dist'));

Server.listen(port, () => {
    console.log('Server listening on port: ' + port);
});

