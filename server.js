/* eslint-disable camelcase */
const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');
const { parse } = require('url');
const path = require('path');
const dev = process.env.NODE_ENV === 'development';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 4300;

app.prepare()
    .then(() => {
        const server = express();

        if (dev) {
            server.use(
                '/api/v1',
                proxy({
                    target: 'http://localhost:3000',
                    changeOrigin: true,
                    logLevel: 'debug',
                }),
            );
        }

        server.get('/cart', (req, res) => {
            const queryParams = { id: req.params.id };
            app.render(req, res, '/cart', queryParams);
        });

        server.listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`, `NODE_ENV is: '${process.env.NODE_ENV}'`);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
