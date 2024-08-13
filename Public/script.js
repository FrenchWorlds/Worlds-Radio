document.addEventListener('DOMContentLoaded', function () {
    const image = document.querySelector('.connected-Logo');
    const menu = document.querySelector('.connected-menu');

    image.addEventListener('click', function () {
        menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
    });
});

document.getElementById('user-input').addEventListener('input', function () {
    let sendButton = document.getElementById('send-button');
    if (this.value.trim() !== '') {
        sendButton.style.display = 'block';
    } else {
        sendButton.style.display = 'none';
    }
});

document.getElementById('send-button').addEventListener('click', sendMessage);

document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    let message = document.getElementById('user-input').value;

    //const fetch = require('node-fetch');
    fetch(
        'https://discord.com/api/webhooks/1191401519631839295/JpsFotJCY_lfDrnEgeL0hBRP0Nth2N-xlkujD7Us8Rtc2r1-xKTkVx9GYHLLVeyOy8R8',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // the username to be displayed
                username: 'Message Bot !',
                // the avatar to be displayed
                avatar_url:
                    'https://cdn.discordapp.com/avatars/901432396942020640/a_3be8329a6ad400a6b3e6321548681b6d.gif?size=1024',
                // contents of the message to be sent
                content: message
            })
        })
        .then(response => {
            if (response.ok) {
                document.getElementById('confirmation-message').innerText = 'Message envoyé avec succès !';
                document.getElementById('confirmation-message').style.display = 'block';
                setTimeout(function () {
                    document.getElementById('confirmation-message').style.display = 'none';
                }, 3000); // Masquer le message de confirmation après 3 secondes
            } else {
                document.getElementById('confirmation-message').innerText = 'Erreur lors de l\'envoi du message';
                document.getElementById('confirmation-message').style.display = 'block';
                document.getElementById('confirmation-message').style.color = 'red';
                setTimeout(function () {
                    document.getElementById('confirmation-message').style.display = 'none';
                }, 3000); // Masquer le message de confirmation après 3 secondes

                console.error('Erreur lors de l\'envoi du message au webhook');
            }
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi du message au webhook :', error);
        });

    // Effacer le contenu de l'input après l'envoi
    document.getElementById('user-input').value = '';
}

// Fonction pour initier l'autorisation OAuth2
function authorize() {
    window.location.href = 'https://discord.com/oauth2/authorize?client_id=901432396942020640&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fcallback&scope=identify+guilds';
}

// Fonction pour extraire le jeton d'accès de l'URL après redirectionfunction extractAccessToken() {
function extractAccessToken() {
    const params = new URLSearchParams(window.location.hash.substr(1));
    const accessToken = params.get('access_token');

    // Stocker le jeton d'accès dans localStorage
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
    }

    return accessToken;
}

function loadProfile() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.error('Erreur : aucun jeton d\'accès trouvé.');
        return;
    }

    fetch('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération du profil.');
            }
            return response.json();
        })
        .then(user => {
            const globalNameElement = document.querySelector('.global-name');
            const usernameElement = document.querySelector('.user-name');
            const profilePictureElement = document.querySelector('.connected-menu-pdp');
            const bannerElement = document.querySelector('.connected-menu-banner');
            const connectedLogo = document.querySelector('.connected-Logo');

            if (globalNameElement) {
                globalNameElement.textContent = user.global_name;
            }
            if (usernameElement) {
                usernameElement.textContent = `@${user.username}`;
            }
            if (profilePictureElement) {
                profilePictureElement.src = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}` : './Public/Assets/TheRadiosAvatar.gif';
                profilePictureElement.alt = 'Photo de profil';
                connectedLogo.src = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}` : './Public/Assets/TheRadiosAvatar.gif';
                connectedLogo.alt = 'Photo de profil';
            }
            if (bannerElement) {
                if (user.banner) {
                    bannerElement.src = `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${user.banner.startsWith('a_') ? 'gif' : 'png'}`;
                } else {
                    bannerElement.src = './Public/Assets/bureau.jpg';
                }
                bannerElement.alt = 'Bannière';
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération du profil :', error);
        });
}

// Fonction pour charger les guildes de l'utilisateur
async function loadGuilds() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.error('Erreur : aucun jeton d\'accès trouvé.');
        return null;
    }

    try {
        const response = await fetch('https://discord.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            if (response.status === 429) {
                console.error('Rate limit exceeded, please try again later.');
                return null;
            }
            throw new Error('Erreur lors de la récupération des guildes.');
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des guildes :', error);
        return null;
    }
}

// Fonction pour charger les données supplémentaires des guildes
function loadGuildsText() {

    const apiUrl = 'http://panel.frenchworlds.fr:1101/api/view/';
    const apiKey = 'i0VA88zkjRr9PA8M6N9mtvfIb28p92JJ'; // Remplacez par votre clé API

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': apiKey, // Ajoutez la clé API dans les en-têtes
            'Content-Type': 'application/json' // Optionnel, mais bon pour l'organisation
        }
    })
    .then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        return data; // Retourne les données récupérées
    })
    .catch(error => {
        console.error('Erreur lors du chargement des données de guilde:', error);
        return null; // En cas d'erreur, retourne null
    });
}


// Fonction principale pour charger les guildes et les afficher
async function displayGuilds() {
    const guilds = await loadGuilds();
    const data = await loadGuildsText();

    // Vérifie si 'data' est défini
    if (!data) {
        console.error('The data object is undefined.');
        return;
    }

    const guildsContainer = document.querySelector('.guilds');

    if (!guildsContainer) {
        console.error('Element with class "guilds" not found.');
        return;
    }

    guildsContainer.innerHTML = ''; // Efface le contenu existant

    for (const guild of guilds) {
        // Récupérer les informations supplémentaires de `data`
        const guildData = data[guild.id];

        if (!guildData) {
            //console.warn(`No additional data found for guild with ID ${guild.id}`);
            continue;
        }

        // Ajout de la propriété 247 à guildData si elle est disponible
        guildData['247'] = guildData['247'] || false;

        // Création de la carte (div)
        const card = document.createElement('div');
        card.classList.add('guild-card'); // Ajout de la classe pour le style CSS

        // Création de l'élément img pour afficher l'icône du serveur (format GIF ou PNG)
        const guildLogo = document.createElement('img');
        guildLogo.alt = 'Server Icon'; // Texte alternatif pour l'icône du serveur
        guildLogo.classList.add('guild-logo'); // Ajout de la classe pour le style CSS

        // Déterminer l'URL de l'image en fonction de la disponibilité du format
        const iconBaseUrl = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`;
        const gifUrl = `${iconBaseUrl}.gif`;
        const pngUrl = `${iconBaseUrl}.png`;

        try {
            const gifResponse = await fetch(gifUrl);
            if (gifResponse.ok) {
                guildLogo.src = gifUrl; // Utiliser l'URL GIF si elle est disponible
            } else {
                throw new Error('GIF not available');
            }
        } catch (gifError) {
            console.error('Error fetching GIF:', gifError);
            try {
                const pngResponse = await fetch(pngUrl);
                if (pngResponse.ok) {
                    guildLogo.src = pngUrl; // Utiliser l'URL PNG si elle est disponible
                } else {
                    throw new Error('PNG not available');
                }
            } catch (pngError) {
                console.error('Error fetching PNG:', pngError);
                guildLogo.src = "../Public/Assets/noLogo.png"; // Utiliser l'image par défaut
            }
        } finally {

            // Contenu de la carte (informations sur le serveur)
            card.innerHTML = `
                <div class="guild-header">
                    ${guildLogo.outerHTML} <!-- Ajout de l'élément img dans le HTML -->
                    <h1>${guildData.guildname}</h1>
                </div>
                <div class="separator"></div>
                <p>ID Server: ${guildData.guildid}</p>
                <p>Premium: ${guildData.premium ? 'Oui' : 'Non'}</p>
                <p>Temps de premium: ${guildData.premiumDaysRemaining} jours</p>
                <p>24/7: ${guildData['247'] ? 'Oui' : 'Non'}</p>
            `;

            // Ajouter la carte au conteneur des guildes
            guildsContainer.appendChild(card);
        }
    }
}


// Charge les guildes si l'utilisateur est connecté
window.addEventListener('DOMContentLoaded', () => {
    const accessToken = extractAccessToken();
    if (accessToken) {
        // Masque le bouton de connexion
        document.querySelector('.connectbtn').style.display = 'none';

        // Affiche les éléments connectés
        document.querySelector('.connected').style.display = 'block';

        // Charge les guildes de l'utilisateur
        loadGuilds();
        loadProfile();
        // Appel de la fonction principale
        displayGuilds();
    }
});

// Fonction pour gérer le défilement de la page
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    const guildsContainer = document.querySelector('.guilds');

    // Vérifier la position verticale du conteneur des guildes par rapport à la fenêtre
    const guildsContainerRect = guildsContainer.getBoundingClientRect();
    const isGuildsBelowNavbar = guildsContainerRect.top <= navbar.offsetHeight;

    // Changer la classe de la navbar en fonction de la position des guildes
    if (isGuildsBelowNavbar) {
        navbar.classList.add('guilds-below');
    } else {
        navbar.classList.remove('guilds-below');
    }
}

// Fonction pour déconnecter l'utilisateur complète
function logout() {
    // Supprimer le jeton d'accès côté client
    localStorage.removeItem('accessToken');

    // Nettoyer les informations de session côté client (exemple : suppression des cookies)
    document.cookie = ""; // Efface tous les cookies du site

    // Rediriger l'utilisateur vers une page de déconnexion ou une autre page
    window.location.href = '/'; // Redirection vers la page de déconnexion
}

// Écouteur d'événement pour le bouton de déconnexion
const logoutButton = document.querySelector('.logout-button'); // Remplacez '.logout-button' par le sélecteur de votre bouton de déconnexion
if (logoutButton) {
    logoutButton.addEventListener('click', logout);
}


// Ajouter un écouteur d'événement pour détecter le défilement de la page
window.addEventListener('scroll', handleScroll);