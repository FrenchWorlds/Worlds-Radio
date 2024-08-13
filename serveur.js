const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'home.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'dashboard.html'));
});

// Route pour l'authentification Discord
app.get('/auth/discord', (req, res) => {
    const clientId = process.env.CLIENT_ID;
    const redirectUri = encodeURIComponent(process.env.REDIRECT_URI);
    const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=identify%20guilds`;
    
    res.redirect(discordAuthUrl);
});

// Route pour gérer le callback OAuth2 de Discord
app.get('/auth/discord/callback', async (req, res) => {
    const code = req.query.code;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = process.env.REDIRECT_URI;

    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri
        })
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Rediriger vers le tableau de bord avec le token dans l'URL
    res.redirect(`/dashboard.html#access_token=${accessToken}`);
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'Public', '404.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
