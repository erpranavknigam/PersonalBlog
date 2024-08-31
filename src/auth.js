export default function authMiddleware(req, res, next) {
    console.log('Auth Middleware triggered');
    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader);

    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
        return res.status(401).send('Authentication required.');
    }

    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const [username, password] = credentials;

    // Replace these with your actual credentials
    const adminUsername = 'admin';
    const adminPassword = 'password';

    if (username === adminUsername && password === adminPassword) {
        console.log('Authentication successful');
        return next();
    } else {
        console.log('Invalid credentials');
        res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
        return res.status(401).send('Invalid credentials.');
    }
}
