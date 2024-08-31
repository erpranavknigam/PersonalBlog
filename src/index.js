// index.js
import express from 'express';
import authMiddleware from './auth.js';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = 3000;

// Apply the authentication middleware to admin routes
app.use(['/admin', '/admin/Add', '/admin/Edit'], authMiddleware);

// Serve static files from the dist directory (after build)
app.use(express.static('dist'));

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



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
