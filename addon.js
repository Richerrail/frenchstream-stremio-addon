const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');
const axios = require('axios');
const cheerio = require('cheerio');

// Configuration
const TMDB_API_KEY = '39333468108d2b0cdff4d712b77f274a';
const VIDSRC_URL = 'https://vidsrc.xyz/embed';

// Manifest de l'addon
const manifest = {
    id: 'com.leostream.frenchstream',
    version: '1.0.0',
    name: 'FrenchStream by LeoStream',
    description: 'Regardez des films et séries en français via VidSrc et autres sources',
    icon: 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg',
    resources: ['stream'],
    types: ['movie', 'series'],
    catalogs: [
        {
            type: 'movie',
            id: 'frenchstream-movies',
            name: 'Films Populaires FR',
            extra: [{ name: 'skip', isRequired: false }]
        },
        {
            type: 'series',
            id: 'frenchstream-series',
            name: 'Séries Populaires FR',
            extra: [{ name: 'skip', isRequired: false }]
        }
    ],
    idPrefixes: ['tt'],
    background: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920',
};

const builder = new addonBuilder(manifest);

// Fonction pour obtenir TMDB ID depuis IMDB ID
async function getTMDBFromIMDB(imdbId, type) {
    try {
        const endpoint = type === 'movie' ? 'movie' : 'tv';
        const url = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`;
        const response = await axios.get(url);
        
        if (type === 'movie' && response.data.movie_results.length > 0) {
            return response.data.movie_results[0].id;
        } else if (type === 'series' && response.data.tv_results.length > 0) {
            return response.data.tv_results[0].id;
        }
        return null;
    } catch (error) {
        console.error('Erreur TMDB:', error.message);
        return null;
    }
}

// Handler pour les streams
builder.defineStreamHandler(async ({ type, id }) => {
    console.log(`📺 Recherche de streams pour: ${type} - ${id}`);
    
    try {
        // Extraire IMDB ID et infos
        const imdbId = id.split(':')[0];
        const season = id.split(':')[1];
        const episode = id.split(':')[2];
        
        // Obtenir TMDB ID
        const tmdbId = await getTMDBFromIMDB(imdbId, type);
        
        if (!tmdbId) {
            console.log('❌ TMDB ID non trouvé');
            return { streams: [] };
        }
        
        console.log(`✅ TMDB ID trouvé: ${tmdbId}`);
        
        const streams = [];
        
        // Stream VidSrc (Principal)
        if (type === 'movie') {
            streams.push({
                name: '🇫🇷 VidSrc FR',
                title: 'VidSrc - Qualité HD',
                url: `${VIDSRC_URL}/movie?tmdb=${tmdbId}`,
                behaviorHints: {
                    notWebReady: true
                }
            });
        } else if (type === 'series' && season && episode) {
            streams.push({
                name: '🇫🇷 VidSrc FR',
                title: `VidSrc S${season}E${episode} - HD`,
                url: `${VIDSRC_URL}/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}`,
                behaviorHints: {
                    notWebReady: true
                }
            });
        }
        
        // Stream VidSrc.to (Alternative)
        if (type === 'movie') {
            streams.push({
                name: '🎬 VidSrc.to',
                title: 'VidSrc.to - Backup',
                url: `https://vidsrc.to/embed/movie/${tmdbId}`,
                behaviorHints: {
                    notWebReady: true
                }
            });
        } else if (type === 'series' && season && episode) {
            streams.push({
                name: '📺 VidSrc.to',
                title: `VidSrc.to S${season}E${episode}`,
                url: `https://vidsrc.to/embed/tv/${tmdbId}/${season}/${episode}`,
                behaviorHints: {
                    notWebReady: true
                }
            });
        }
        
        // Stream VidSrc.me (Alternative 2)
        if (type === 'movie') {
            streams.push({
                name: '🎥 VidSrc.me',
                title: 'VidSrc.me - Backup 2',
                url: `https://vidsrc.me/embed/movie?tmdb=${tmdbId}`,
                behaviorHints: {
                    notWebReady: true
                }
            });
        } else if (type === 'series' && season && episode) {
            streams.push({
                name: '📡 VidSrc.me',
                title: `VidSrc.me S${season}E${episode}`,
                url: `https://vidsrc.me/embed/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}`,
                behaviorHints: {
                    notWebReady: true
                }
            });
        }
        
        console.log(`✅ ${streams.length} streams trouvés`);
        return { streams };
        
    } catch (error) {
        console.error('❌ Erreur:', error.message);
        return { streams: [] };
    }
});

// Handler pour les catalogues (Films populaires français)
builder.defineCatalogHandler(async ({ type, id, extra }) => {
    console.log(`📚 Catalogue demandé: ${type} - ${id}`);
    
    try {
        const page = (extra.skip || 0) / 20 + 1;
        const endpoint = type === 'movie' ? 'movie' : 'tv';
        
        const url = `https://api.themoviedb.org/3/discover/${endpoint}?api_key=${TMDB_API_KEY}&language=fr-FR&sort_by=popularity.desc&page=${page}&vote_average.gte=6.0&vote_count.gte=50`;
        
        const response = await axios.get(url);
        const results = response.data.results || [];
        
        const metas = results.map(item => {
            const meta = {
                id: item.imdb_id || `tmdb:${item.id}`,
                type: type,
                name: item.title || item.name,
                poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : undefined,
                background: item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}` : undefined,
                description: item.overview,
                releaseInfo: (item.release_date || item.first_air_date || '').substring(0, 4),
                imdbRating: item.vote_average,
            };
            
            return meta;
        });
        
        console.log(`✅ ${metas.length} items retournés`);
        return { metas };
        
    } catch (error) {
        console.error('❌ Erreur catalogue:', error.message);
        return { metas: [] };
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 7000;

serveHTTP(builder.getInterface(), { port: PORT });

console.log(`
╔════════════════════════════════════════════╗
║  🇫🇷 FrenchStream Addon by LeoStream 🇫🇷   ║
╠════════════════════════════════════════════╣
║  ✅ Serveur démarré sur le port ${PORT}      ║
║  🌐 URL locale: http://localhost:${PORT}    ║
║                                            ║
║  📺 Pour installer dans Stremio:           ║
║  http://localhost:${PORT}/manifest.json     ║
╚════════════════════════════════════════════╝
`);
