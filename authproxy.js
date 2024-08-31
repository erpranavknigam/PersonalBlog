import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import basicAuth from 'basic-auth';

const app = express();

const auth = (req, res, next) => {
    const user = basicAuth(req);
    const userName = "admin";
    const pwd = "admin";

    if (user && user.name === userName && user.pass === pwd) {
        return next();
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
        return res.status(401).send('Unauthorized');
    }
};

app.use(['/admin', '/admin/Add', '/admin/Edit'], auth);


app.use(
    '/',
    createProxyMiddleware({
        target: 'http://localhost:5173',
        changeOrigin: true,
        ws: true,
        logLevel: 'debug',
        pathRewrite: (path, req) => path.replace(/^\/admin/, '') 
    })
);

// Start the server
app.listen(3000, () => {
    console.log('Proxy server running on http://localhost:3000');
});
