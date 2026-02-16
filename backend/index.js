const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/soloweb';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Mock Data
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

// API Endpoints
app.get('/api/data', (req, res) => {
    const { state } = req.query;
    let filteredStays = stays;
    let filteredFood = food;
    let filteredActivities = activities;

    if (state) {
        filteredStays = stays.filter(s => s.state === state);
        filteredFood = food.filter(f => f.state === state);
        filteredActivities = activities.filter(a => a.state === state);
    }

    res.json({
        stays: filteredStays,
        food: filteredFood,
        activities: filteredActivities
    });
});

app.get('/api/places', (req, res) => {
    const { state } = req.query;
    let filteredPlaces = places;

    if (state) {
        filteredPlaces = places.filter(p => p.state === state);
    }

    res.json(filteredPlaces);
});

app.get('/', (req, res) => {
    res.send('Solo Web Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
