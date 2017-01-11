import React from 'react';
import Express from 'express';
import {renderToString} from 'react-dom/server';
import cheerio from 'cheerio';
import App from '../shared/app';
import fs from 'fs';
import path from 'path';


const Server = new Express();
const port = 9999;
const distPath = '/dist';

const homeHtml = new Promise((ok, fail) => {
    fs.readFile('./shared/index.html', 'utf8', (err, data) => {
        if (null === err) {
            const page = cheerio.load(data);
            page('head').append(`<link href="${distPath}/styles.css" rel="stylesheet">`);
            page('body').append(`<script type="text/javascript" src="${distPath}/vendor.bundle.js" />`);
            page('body').append(`<script type="text/javascript" src="${distPath}/app.js" />`);
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

Server.use(distPath, Express.static(path.join(__dirname, '../dist')));

Server.listen(port, () => {
    console.log('Server listening on port: ' + port);
});

