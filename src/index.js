import express from 'express';
import authMiddleware from './auth.js';
import { createProxyMiddleware } from 'http-proxy-middleware';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/api/update', (req, res) => {
    try {
        const articleData = req.body;
        // Get the current filename and directory
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        // Adjust the __dirname to point to the root of the project
        const rootDir = path.resolve(__dirname, '../');

        // Construct the file path to the articles.json file in the public folder
        const filePath = path.join(rootDir, 'dist', 'articles.json');
        const distFilePath = path.join(rootDir, 'public', 'articles.json');

        // Load existing articles
        const articles = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Find and update the article
        const articleIndex = articles.findIndex(a => a.id === articleData.id);
        if (articleIndex !== -1) {
            articles[articleIndex] = articleData;
            fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));
            fs.writeFileSync(distFilePath, JSON.stringify(articles, null, 2))
            res.status(200).send({ message: 'Article updated successfully.' });
        } else {
            res.status(404).send({ message: 'Article not found.' });
        }
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).send({ message: 'An error occurred while updating the article.' });
    }
});

app.post('/api/add', (req, res) => {
    const article = req.body

    // Get the current filename and directory
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Adjust the __dirname to point to the root of the project
    const rootDir = path.resolve(__dirname, '../');

    // Construct the file path to the articles.json file in the public folder
    const filePath = path.join(rootDir, 'dist', 'articles.json');
    const distFilePath = path.join(rootDir, 'public', 'articles.json');

    const articles = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const latestId = articles.length
    const newId = latestId + 1
    article["id"] = newId
    articles.push(article)
    try {
        fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), 'utf-8');
        fs.writeFileSync(distFilePath, JSON.stringify(articles, null, 2), 'utf-8');

        // Respond with success message
        res.status(200).send({ message: "Article Added Successfully" });
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        res.status(500).send({ message: "Operation Failed" });
    }
})

app.post('/api/delete', (req, res) => {
    const {id} = req.body
    console.log(id)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Adjust the __dirname to point to the root of the project
    const rootDir = path.resolve(__dirname, '../');

    // Construct the file path to the articles.json file in the public folder
    const filePath = path.join(rootDir, 'dist', 'articles.json');
    const distFilePath = path.join(rootDir, 'public', 'articles.json');
debugger
    const articles = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const filtered = Array.from(articles).filter(x => x.id !== Number(id))

    try {
        fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), 'utf-8')
        fs.writeFileSync(distFilePath, JSON.stringify(filtered, null, 2), 'utf-8')
        // Respond with success message
        res.status(200).send({ message: "Article Added Successfully" });
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        res.status(500).send({ message: "Operation Failed" });
    }
})

// Apply the authentication middleware to admin routes
app.use(['/admin', '/admin/Add', '/admin/Edit'], authMiddleware);

// Serve static files from the dist directory (after build)
app.use(express.static('dist'));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

app.use(
    '/',
    createProxyMiddleware({
        target: 'http://localhost:5173',
        changeOrigin: true,
        ws: true,
        logLevel: 'debug',
        pathRewrite: (path, req) => {
            if (!path.startsWith('/api/')) { // Only rewrite non-API routes
                return path.replace(/^\/admin/, '');
            }
            return path; // Do not rewrite API routes
        }
    })
);




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
