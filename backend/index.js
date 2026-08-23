const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const googleMapsService = require('./services/googleMapsService');
const openWeatherService = require('./services/openWeatherService');
const llmEngineService = require('./services/llmEngineService');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/soloweb';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection note (running with in-memory / live services):', err.message));

// Mock Data for backward compatibility
const stays = [
    { id: '1', name: 'Nomad Haven', rating: '4.8', location: 'Manali, HP', price: '₹1,200', image: 'https://images.unsplash.com/photo-1518005020251-58296d8fca11?q=80&w=1000&auto=format&fit=crop', state: 'Himachal Pradesh' },
    { id: '2', name: 'River Edge', rating: '4.6', location: 'Rishikesh, UK', price: '₹1,500', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop', state: 'Uttarakhand' }
];

const food = [
    { id: '1', name: 'Siddu Point', type: 'Local Delicacy', origin: 'Himachal Pradesh', price: '₹150', state: 'Himachal Pradesh' },
    { id: '2', name: 'Ganga Thali', type: 'Sattvic Meal', origin: 'Uttarakhand', price: '₹200', state: 'Uttarakhand' }
];

const activities = [
    { id: '1', title: 'Solang Traverse', category: 'Trekking', difficulty: 'Moderate', location: 'Solang Valley, HP', image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop', description: 'A scenic trek through apple orchards and snow-capped peaks.', state: 'Himachal Pradesh' },
    { id: '2', title: 'Beatles Trail', category: 'Spirituality', difficulty: 'Easy', location: 'Rishikesh, UK', image_url: 'https://images.unsplash.com/photo-1545105511-923ca0623696?q=80&w=1974&auto=format&fit=crop', description: 'Explore the abandoned Ashram where the Beatles stayed in 1968.', state: 'Uttarakhand' }
];

const places = [
    { id: '1', name: 'Rohtang Pass', state: 'Himachal Pradesh', instagram_hashtag: 'rohtangpass', image_url: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?q=80&w=2070&auto=format&fit=crop', description: 'A high mountain pass on the eastern Pir Panjal Range of the Himalayas.', is_hidden_spot: false },
    { id: '2', name: 'Laxman Jhula', state: 'Uttarakhand', instagram_hashtag: 'laxmanjhula', image_url: 'https://images.unsplash.com/photo-1563811566336-f36d460391d8?q=80&w=1935&auto=format&fit=crop', description: 'An iron suspension bridge across the river Ganges.', is_hidden_spot: false }
];

// ==========================================
// AI / ML TRAVEL ENGINE & REAL-TIME API ROUTES
// ==========================================

/**
 * POST /api/itinerary
 * Intercept user search parameters -> Fetch Google Maps & OpenWeather -> Synthesize LLM Itinerary -> Return Typed JSON Schema
 */
app.post(['/api/itinerary', '/api/ai/generate-itinerary'], async (req, res) => {
    try {
        const { destination, maxDailyBudget, travelStyle, days } = req.body;

        if (!destination) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Destination parameter is required.'
            });
        }

        const budgetNum = Number(maxDailyBudget) || 50;
        const daysNum = Math.min(Math.max(Number(days) || 3, 1), 7);
        const styleStr = travelStyle || 'Solo Adventure';

        console.log(`[Itinerary Engine] Processing request: destination="${destination}", budget=$${budgetNum}, days=${daysNum}, style="${styleStr}"`);

        // 1. Geocode Destination via Google Maps
        const geoContext = await googleMapsService.geocodeDestination(destination);
        console.log(`[Itinerary Engine] Geocoded location:`, geoContext?.formattedAddress || destination);

        // 2. Fetch Live Weather via OpenWeather API (using coordinates or name)
        const weatherContext = await openWeatherService.getWeather(destination, geoContext);
        console.log(`[Itinerary Engine] Live weather:`, weatherContext.summary, `Adverse: ${weatherContext.isAdverseWeather}`);

        // 3. Query Google Places for nearby attractions/homestays
        const placesContext = await googleMapsService.searchPlaces(destination, 'attractions');

        // 4. Synthesize AI Itinerary mapped to DTO Schema
        const itineraryResponse = await llmEngineService.generateItinerary({
            destination,
            maxDailyBudget: budgetNum,
            travelStyle: styleStr,
            days: daysNum,
            weatherContext,
            geoContext,
            placesContext
        });

        // 5. Return typed JSON schema response
        return res.status(200).json(itineraryResponse);
    } catch (error) {
        console.error('[Itinerary Engine] Error generating itinerary:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to synthesize real-time travel itinerary.',
            details: error.message
        });
    }
});

/**
 * GET /api/weather
 * Direct real-time weather lookup
 */
app.get('/api/weather', async (req, res) => {
    try {
        const { destination, lat, lng } = req.query;
        if (!destination && (!lat || !lng)) {
            return res.status(400).json({ error: 'Provide destination or lat/lng coordinates.' });
        }
        const coords = (lat && lng) ? { lat: parseFloat(lat), lng: parseFloat(lng) } : undefined;
        const weather = await openWeatherService.getWeather(destination || 'Spiti Valley', coords);
        res.json(weather);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * GET /api/places/search
 * Direct Google Maps Places & Geocoding search
 */
app.get('/api/places/search', async (req, res) => {
    try {
        const { query, type } = req.query;
        if (!query) return res.status(400).json({ error: 'Query parameter is required' });
        const geo = await googleMapsService.geocodeDestination(query);
        const placesList = await googleMapsService.searchPlaces(query, type || 'attractions');
        res.json({ geocoding: geo, places: placesList });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const { getIndiaTravelData, getIndiaPlaces } = require('./data/indiaTravelData');

// ==========================================
// INDIAN TRAVEL & DISCOVERY DATA ROUTES
// ==========================================

app.get('/api/data', (req, res) => {
    const { state } = req.query;
    const travelData = getIndiaTravelData(state);
    res.json(travelData);
});

app.get('/api/places', (req, res) => {
    const { state } = req.query;
    const placesData = getIndiaPlaces(state);
    res.json(placesData);
});

app.get('/', (req, res) => {
    res.json({
        status: 'Online',
        service: 'Spiti Traverse Travel Engine API',
        endpoints: [
            'POST /api/itinerary',
            'GET /api/weather',
            'GET /api/places/search',
            'GET /api/data',
            'GET /api/places'
        ]
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Spiti Traverse Travel Engine running on port ${PORT}`);
    });
}

module.exports = app;
