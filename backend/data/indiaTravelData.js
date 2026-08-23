/**
 * Comprehensive Indian Solo Travel, Homestay & Food Data across India (with rich South India / Tamil Nadu focus)
 */

const INDIA_DATA = {
    "Tamil Nadu": {
        stays: [
            { id: 'tn-1', name: 'Triveni Sangam Ocean View Stay', rating: '4.9', location: 'Kanyakumari, Tamil Nadu', price: '₹950', image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1000&auto=format&fit=crop', state: 'Tamil Nadu', type: 'Lands End Coast Stay' },
            { id: 'tn-2', name: 'Dhanushkodi Ghost Town Eco Bivouac', rating: '4.8', location: 'Rameshwaram, Tamil Nadu', price: '₹1,100', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000&auto=format&fit=crop', state: 'Tamil Nadu', type: 'Beachfront Camp' },
            { id: 'tn-3', name: 'Vattakanal Pine Forest Wooden Shack', rating: '4.9', location: 'Kodaikanal, Tamil Nadu', price: '₹1,050', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop', state: 'Tamil Nadu', type: 'Mountain Mist Hut' },
            { id: 'tn-4', name: 'Nilgiri Shola Estate Homestay', rating: '4.8', location: 'Kotagiri, Ooty, Tamil Nadu', price: '₹1,300', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop', state: 'Tamil Nadu', type: 'Tea Canopy Cottage' },
            { id: 'tn-5', name: 'Chettinad 100-Pillar Heritage Mansion', rating: '4.9', location: 'Karaikudi, Tamil Nadu', price: '₹1,450', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000&auto=format&fit=crop', state: 'Tamil Nadu', type: 'Heritage Palace Stay' },
            { id: 'tn-6', name: 'Mahabalipuram Shore Temple Surf Haven', rating: '4.7', location: 'Mahabalipuram, Tamil Nadu', price: '₹1,150', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1000&auto=format&fit=crop', state: 'Tamil Nadu', type: 'Coastal Surf Stay' }
        ],
        food: [
            { id: 'tnf-1', name: 'Madurai Kari Dosa & Jigarthanda', type: 'Iconic Street Feast', origin: 'Madurai, TN', price: '₹140', state: 'Tamil Nadu' },
            { id: 'tnf-2', name: 'Chettinad Vazhaillai Virundhu (Spiced Banana Leaf Feast)', type: 'Pepper Spiced Traditional Feast', origin: 'Chettinad, TN', price: '₹190', state: 'Tamil Nadu' },
            { id: 'tnf-3', name: 'Kumbakonam Degree Filter Kaapi & Medu Vada', type: 'Aromatic Chicory Brew', origin: 'Kumbakonam & Tanjore', price: '₹50', state: 'Tamil Nadu' },
            { id: 'tnf-4', name: 'Kanyakumari Pazha Bajji with Sukku Malli Kaapi', type: 'Coastal Plantain Snack & Herbal Coffee', origin: 'Kanyakumari, TN', price: '₹60', state: 'Tamil Nadu' },
            { id: 'tnf-5', name: 'Thanjavur Traditional Sambar Sadham with Ghee Appalam', type: 'Temple Heritage Rice', origin: 'Thanjavur, TN', price: '₹120', state: 'Tamil Nadu' }
        ],
        activities: [
            { id: 'tna-1', title: 'Triveni Sangam Dawn Yatra & Vivekananda Rock', category: 'Spiritual Paths', difficulty: 'Easy', location: 'Kanyakumari, Tamil Nadu', image_url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2070&auto=format&fit=crop', description: 'Witness the simultaneous sunrise over the sacred confluence of the Indian Ocean, Arabian Sea, and Bay of Bengal.', state: 'Tamil Nadu' },
            { id: 'tna-2', title: 'Dhanushkodi Land’s End & Ram Setu Traverse', category: 'Coastal Expedition', difficulty: 'Moderate', location: 'Rameshwaram, Tamil Nadu', image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop', description: 'Walk along the ghostly sandbars where the Indian subcontinent ends and the ancient limestone bridge reaches toward Sri Lanka.', state: 'Tamil Nadu' },
            { id: 'tna-3', title: 'Vattakanal Dolphin’s Nose Cliff Trail', category: 'Rainforest & Hills', difficulty: 'Moderate', location: 'Kodaikanal, Tamil Nadu', image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop', description: 'Trek along mist-covered pine forest cliffs with breathtaking vertical drops into the Vaigai valley.', state: 'Tamil Nadu' },
            { id: 'tna-4', title: 'Kolli Hills 70 Hairpin Bends Motorcycle Ride', category: 'Mountain Passes', difficulty: 'Challenging', location: 'Namakkal, Tamil Nadu', image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop', description: 'Conquer the legendary 70 consecutive hairpin mountain turns leading to the sacred Agaya Gangai cascades.', state: 'Tamil Nadu' },
            { id: 'tna-5', title: 'Mahabalipuram UNESCO Monolithic Shore Sanctuary', category: 'Heritage & Stone Arts', difficulty: 'Easy', location: 'Mahabalipuram, Tamil Nadu', image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop', description: 'Explore 7th-century Dravidian rock-cut monolithic rathas and boulder carvings sculpted on ocean cliffs.', state: 'Tamil Nadu' }
        ],
        places: [
            { id: 'tnp-1', name: 'Vivekananda Rock Memorial & Thiruvalluvar Statue', state: 'Tamil Nadu', instagram_hashtag: 'kanyakumari', image_url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2070&auto=format&fit=crop', description: 'Monolithic granite memorial island where Swami Vivekananda attained enlightenment.', is_hidden_spot: false },
            { id: 'tnp-2', name: 'Dhanushkodi Submerged City & Arichal Munai', state: 'Tamil Nadu', instagram_hashtag: 'dhanushkodi', image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop', description: 'The haunting and sublime ghost town at the southeastern tip of Pamban Island.', is_hidden_spot: true },
            { id: 'tnp-3', name: 'Madurai Meenakshi Amman Sundareswarar Temple', state: 'Tamil Nadu', instagram_hashtag: 'meenakshitemple', image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop', description: 'Historic 2,500-year-old temple complex with 14 towering gopurams adorned with thousands of stone deities.', is_hidden_spot: false },
            { id: 'tnp-4', name: 'Thanjavur Brihadisvara Great Living Chola Temple', state: 'Tamil Nadu', instagram_hashtag: 'thanjavurtemple', image_url: 'https://images.unsplash.com/photo-1600100397608-f010f443b711?q=80&w=2070&auto=format&fit=crop', description: '1000-year-old architectural marvel built entirely of granite without binding cement by King Raja Raja Chola I.', is_hidden_spot: false }
        ]
    },
    "Kerala": {
        stays: [
            { id: 'kl-1', name: 'Munnar Cloud Canopy Tea Cottage', rating: '4.9', location: 'Munnar, Kerala', price: '₹1,250', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop', state: 'Kerala', type: 'Tea Estate Homestay' },
            { id: 'kl-2', name: 'Varkala Cliff Edge Solo Haven', rating: '4.8', location: 'North Cliff, Varkala, KL', price: '₹900', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1000&auto=format&fit=crop', state: 'Kerala', type: 'Oceanview Bamboo Shack' },
            { id: 'kl-3', name: 'Alleppey Backwater Island Homestay', rating: '4.8', location: 'Kuttanad, Alleppey, KL', price: '₹1,100', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1000&auto=format&fit=crop', state: 'Kerala', type: 'Canoe & Heritage Stay' }
        ],
        food: [
            { id: 'klf-1', name: 'Authentic Kerala Sadhya on Banana Leaf', type: '24-Dish Traditional Feast', origin: 'God’s Own Country', price: '₹200', state: 'Kerala' },
            { id: 'klf-2', name: 'Appam with Creamy Vegetable Stew', type: 'Fermented Rice & Coconut Milk', origin: 'Central Travancore', price: '₹120', state: 'Kerala' },
            { id: 'klf-3', name: 'Kerala Spiced Cardamom Chai & Pazham Pori', type: 'Plantain Fritters & Spiced Brew', origin: 'Malabar & High Ranges', price: '₹60', state: 'Kerala' }
        ],
        activities: [
            { id: 'kla-1', title: 'Meesapulimala Peak Cloud Traverse', category: 'Rainforest & Hills', difficulty: 'Challenging', location: 'Munnar, Kerala', image_url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop', description: 'Trek to the second highest peak in Western Ghats (2,640m) walking over rolling blankets of clouds.', state: 'Kerala' },
            { id: 'kla-2', title: 'Alleppey Silent Backwater Kayaking', category: 'Coastal Trails', difficulty: 'Easy', location: 'Alleppey, Kerala', image_url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=2070&auto=format&fit=crop', description: 'Paddle solo through narrow lotus-fringed village canals inaccessible to large houseboats.', state: 'Kerala' }
        ],
        places: [
            { id: 'klp-1', name: 'Varkala Red Laterite Cliffs', state: 'Kerala', instagram_hashtag: 'varkalacliff', image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2070&auto=format&fit=crop', description: 'Dramatic red sandstone cliffs plunging into the Arabian Sea with natural mineral springs.', is_hidden_spot: false }
        ]
    },
    "Karnataka": {
        stays: [
            { id: 'ka-1', name: 'Hampi Boulder Sanctuary & Shanti Stay', rating: '4.8', location: 'Sanapur, Hippie Island, Hampi', price: '₹850', image: 'https://images.unsplash.com/photo-1600100397608-f010f443b711?q=80&w=1000&auto=format&fit=crop', state: 'Karnataka', type: 'Riverview Boulder Hut' },
            { id: 'ka-2', name: 'Gokarna Kudle Beach Nomad Camp', rating: '4.7', location: 'Kudle Beach, Gokarna, KA', price: '₹950', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1000&auto=format&fit=crop', state: 'Karnataka', type: 'Coastal Shack' },
            { id: 'ka-3', name: 'Coorg Coffee Mist Heritage Stay', rating: '4.9', location: 'Madikeri, Coorg, KA', price: '₹1,300', image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=1000&auto=format&fit=crop', state: 'Karnataka', type: 'Plantation Estate' }
        ],
        food: [
            { id: 'kaf-1', name: 'Crispy Benne Dosa & Filter Kaapi', type: 'Davangere Butter Dosa', origin: 'Karnataka', price: '₹110', state: 'Karnataka' },
            { id: 'kaf-2', name: 'Coorg Akki Roti with Mushroom Curry', type: 'Rice Flour Flatbread & Herbs', origin: 'Kodagu (Coorg)', price: '₹160', state: 'Karnataka' },
            { id: 'kaf-3', name: 'Bisi Bele Bath with Ghee & Boondi', type: 'Spiced Lentil Rice', origin: 'Mysuru Royals', price: '₹120', state: 'Karnataka' }
        ],
        activities: [
            { id: 'kaa-1', title: 'Vijayanagara Empire Ruins & Boulder Climb', category: 'Heritage & Stone Arts', difficulty: 'Moderate', location: 'Hampi, KA', image_url: 'https://images.unsplash.com/photo-1600100397608-f010f443b711?q=80&w=2070&auto=format&fit=crop', description: 'Explore ancient UNESCO stone temples, royal pavilions, and world-class granite bouldering.', state: 'Karnataka' },
            { id: 'kaa-2', title: 'Gokarna 5-Beach Cliffside Traverse', category: 'Coastal Trails', difficulty: 'Easy', location: 'Gokarna, KA', image_url: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=2070&auto=format&fit=crop', description: 'Trek along rugged cliff edges connecting Om Beach, Half Moon Beach, Paradise Beach, and Kudle.', state: 'Karnataka' },
            { id: 'kaa-3', title: 'Kudremukh Peak Green Ridge Hike', category: 'Rainforest & Hills', difficulty: 'Challenging', location: 'Chikkamagaluru, KA', image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop', description: 'Ascend the iconic horse-face peak through dense Shola forests and rolling emerald grasslands.', state: 'Karnataka' }
        ],
        places: [
            { id: 'kap-1', name: 'Hampi Virupaksha & Stone Chariot', state: 'Karnataka', instagram_hashtag: 'hampiruins', image_url: 'https://images.unsplash.com/photo-1600100397608-f010f443b711?q=80&w=2070&auto=format&fit=crop', description: 'Mythological Kishkindha realm adorned with monolithic Dravidian stone carvings.', is_hidden_spot: false }
        ]
    },
    "Puducherry": {
        stays: [
            { id: 'py-1', name: 'Auroville Earth & Bamboo Forest Hut', rating: '4.9', location: 'Auroville, Puducherry', price: '₹950', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop', state: 'Puducherry', type: 'Eco Ashram' },
            { id: 'py-2', name: 'White Town French Colonial Villa', rating: '4.8', location: 'French Quarter, Puducherry', price: '₹1,400', image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=1000&auto=format&fit=crop', state: 'Puducherry', type: 'Heritage Villa' }
        ],
        food: [
            { id: 'pyf-1', name: 'Franco-Tamil Fusion Crepes & Croissant', type: 'French Heritage Bakery', origin: 'White Town, Pondy', price: '₹150', state: 'Puducherry' },
            { id: 'pyf-2', name: 'South Indian Filter Coffee & Idli Vada', type: 'Traditional Breakfast', origin: 'Puducherry', price: '₹70', state: 'Puducherry' }
        ],
        activities: [
            { id: 'pya-1', title: 'Auroville Matrimandir Silent Meditation', category: 'Spiritual Paths', difficulty: 'Easy', location: 'Auroville, Puducherry', image_url: 'https://images.unsplash.com/photo-1545105511-923ca0623696?q=80&w=2070&auto=format&fit=crop', description: 'Experience profound inner stillness inside the golden geodesic sphere of human unity.', state: 'Puducherry' }
        ],
        places: [
            { id: 'pyp-1', name: 'Promenade Beach & French Quarter', state: 'Puducherry', instagram_hashtag: 'pondicherry', image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2070&auto=format&fit=crop', description: 'Pastel yellow colonial avenues meeting the rocky Bay of Bengal coastline.', is_hidden_spot: false }
        ]
    },
    "Himachal Pradesh": {
        stays: [
            { id: 'hp-1', name: 'Tara Mud Homestay & Stargazing Camp', rating: '4.9', location: 'Kaza, Spiti Valley, HP', price: '₹1,100', image: 'https://images.unsplash.com/photo-1518005020251-58296d8fca11?q=80&w=1000&auto=format&fit=crop', state: 'Himachal Pradesh', type: 'Mud Cottage / Nomad Hub' },
            { id: 'hp-2', name: 'Old Manali Apple Orchard Stay', rating: '4.8', location: 'Old Manali, HP', price: '₹1,200', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop', state: 'Himachal Pradesh', type: 'Wooden Cottage' }
        ],
        food: [
            { id: 'hpf-1', name: 'Himachali Siddu with Pure Ghee', type: 'Steamed Stuffed Bread', origin: 'Kullu & Spiti', price: '₹120', state: 'Himachal Pradesh' },
            { id: 'hpf-2', name: 'Traditional Dham Feast', type: 'Festive Sattvic Thali', origin: 'Kangra Valley', price: '₹180', state: 'Himachal Pradesh' }
        ],
        activities: [
            { id: 'hpa-1', title: 'Key Monastery Dawn Meditation', category: 'Himalayan Treks', difficulty: 'Easy', location: 'Spiti Valley, HP', image_url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop', description: 'Experience the 1000-year-old Buddhist sanctuary perched at 4,166m amidst chanting lamas.', state: 'Himachal Pradesh' },
            { id: 'hpa-2', title: 'Hampta Pass High-Altitude Traverse', category: 'Himalayan Treks', difficulty: 'Challenging', location: 'Manali to Spiti, HP', image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop', description: 'Cross from the lush pine forests of Kullu into the stark lunar beauty of Spiti Valley.', state: 'Himachal Pradesh' }
        ],
        places: [
            { id: 'hpp-1', name: 'Key Gompa Monastery', state: 'Himachal Pradesh', instagram_hashtag: 'keymonastery', image_url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop', description: 'Iconic Tibetan Buddhist monastery overlooking the winding Spiti River.', is_hidden_spot: false }
        ]
    },
    "Uttarakhand": {
        stays: [
            { id: 'uk-1', name: 'Ganges River Edge Ashram & Stay', rating: '4.8', location: 'Tapovan, Rishikesh, UK', price: '₹900', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop', state: 'Uttarakhand', type: 'Riverside Ashram' }
        ],
        food: [
            { id: 'ukf-1', name: 'Ganga Maha Sattvic Thali', type: 'Ayurvedic Pure Veg Feast', origin: 'Rishikesh', price: '₹190', state: 'Uttarakhand' }
        ],
        activities: [
            { id: 'uka-1', title: 'Beatles Ashram & Ganga Yatra', category: 'Spiritual Paths', difficulty: 'Easy', location: 'Rishikesh, UK', image_url: 'https://images.unsplash.com/photo-1545105511-923ca0623696?q=80&w=1974&auto=format&fit=crop', description: 'Explore the legendary graffiti-covered Maharishi Mahesh Yogi ashram where transcendental meditation met music.', state: 'Uttarakhand' }
        ],
        places: [
            { id: 'ukp-1', name: 'Triveni Ghat Evening Aarti', state: 'Uttarakhand', instagram_hashtag: 'trivenighat', image_url: 'https://images.unsplash.com/photo-1563811566336-f36d460391d8?q=80&w=1935&auto=format&fit=crop', description: 'The grand evening prayer ceremony with floating diyas on the sacred Ganges.', is_hidden_spot: false }
        ]
    },
    "Rajasthan": {
        stays: [
            { id: 'rj-1', name: 'Jaisalmer Golden Fort Living Stay', rating: '4.8', location: 'Inside Jaisalmer Fort, RJ', price: '₹950', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop', state: 'Rajasthan', type: 'Fort Haveli' }
        ],
        food: [
            { id: 'rjf-1', name: 'Dal Baati Churma with Ghee', type: 'Royal Heritage Meal', origin: 'Mewar, Rajasthan', price: '₹220', state: 'Rajasthan' }
        ],
        activities: [
            { id: 'rja-1', title: 'Thar Desert Solo Dune Bivouac', category: 'Desert Expeditions', difficulty: 'Moderate', location: 'Sam Dunes, Jaisalmer, RJ', image_url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2070&auto=format&fit=crop', description: 'Sleep under open desert skies on golden shifting sands with camel navigators.', state: 'Rajasthan' }
        ],
        places: [
            { id: 'rjp-1', name: 'Mehrangarh Citadel & Blue City', state: 'Rajasthan', instagram_hashtag: 'mehrangarh', image_url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2070&auto=format&fit=crop', description: 'Imposing 15th-century cliff fort towering over the indigo rooftops of Jodhpur.', is_hidden_spot: false }
        ]
    }
};

/**
 * Universal Indian Fallback prioritizing vibrant South & Pan-India spots
 */
const DEFAULT_INDIAN_DATA = {
    stays: [
        { id: 'in-1', name: 'Triveni Sangam Ocean Sanctuary', rating: '4.9', location: 'Kanyakumari, Tamil Nadu', price: '₹950', image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1000&auto=format&fit=crop', state: 'Tamil Nadu', type: 'Coastal Haven' },
        { id: 'in-2', name: 'Western Ghats Cloudline Cottage', rating: '4.9', location: 'Kodaikanal / Munnar', price: '₹1,250', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop', state: 'South India', type: 'Plantation Haven' },
        { id: 'in-3', name: 'Himalayan Nomad Basecamp', rating: '4.8', location: 'Spiti Valley, HP', price: '₹1,100', image: 'https://images.unsplash.com/photo-1518005020251-58296d8fca11?q=80&w=1000&auto=format&fit=crop', state: 'North India', type: 'Mountain Homestay' }
    ],
    food: [
        { id: 'inf-1', name: 'Traditional Banana Leaf Virundhu (வாழை இலை விருந்து)', type: 'Pure South Indian Feast', origin: 'Tamil Nadu & Kerala', price: '₹180', state: 'South India' },
        { id: 'inf-2', name: 'Madurai Kari Dosa & Jigarthanda', type: 'Iconic Street Food', origin: 'Tamil Nadu', price: '₹140', state: 'Tamil Nadu' },
        { id: 'inf-3', name: 'Degree Filter Kaapi & Crispy Medu Vada', type: 'Authentic Traditional Brew', origin: 'Tamil Nadu', price: '₹50', state: 'Tamil Nadu' }
    ],
    activities: [
        { id: 'ina-1', title: 'Kanyakumari 3-Ocean Confluence Sunrise Yatra', category: 'Spiritual Paths', difficulty: 'Easy', location: 'Kanyakumari, Tamil Nadu', image_url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2070&auto=format&fit=crop', description: 'Witness the sunrise over the sacred sangamam of three oceans at the southernmost tip of India.', state: 'Tamil Nadu' },
        { id: 'ina-2', title: 'Dhanushkodi Land’s End & Ram Setu Walk', category: 'Coastal Trails', difficulty: 'Moderate', location: 'Rameshwaram, Tamil Nadu', image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop', description: 'Walk along the legendary shoreline where the Indian subcontinent meets Sri Lanka.', state: 'Tamil Nadu' },
        { id: 'ina-3', title: 'Western Ghats Cloudline Traverse', category: 'Rainforest & Hills', difficulty: 'Moderate', location: 'Ooty & Munnar Slopes', image_url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop', description: 'Walk through misty Shola forests and centuries-old mountain tea plantations.', state: 'South India' }
    ],
    places: [
        { id: 'inp-1', name: 'Vivekananda Rock Memorial & Thiruvalluvar Statue', state: 'Tamil Nadu', instagram_hashtag: 'kanyakumari', image_url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2070&auto=format&fit=crop', description: 'Iconic granite monument island on the Indian Ocean.', is_hidden_spot: false },
        { id: 'inp-2', name: 'Dhanushkodi Ghost City & Arichal Munai', state: 'Tamil Nadu', instagram_hashtag: 'dhanushkodi', image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop', description: 'Sublime ghost town at the edge of the Indian continent.', is_hidden_spot: true }
    ]
};

function getIndiaTravelData(stateName) {
    if (!stateName) {
        let allStays = [];
        let allFood = [];
        let allActivities = [];

        Object.values(INDIA_DATA).forEach(st => {
            allStays = allStays.concat(st.stays || []);
            allFood = allFood.concat(st.food || []);
            allActivities = allActivities.concat(st.activities || []);
        });

        return {
            stays: allStays.length > 0 ? allStays : DEFAULT_INDIAN_DATA.stays,
            food: allFood.length > 0 ? allFood : DEFAULT_INDIAN_DATA.food,
            activities: allActivities.length > 0 ? allActivities : DEFAULT_INDIAN_DATA.activities
        };
    }

    const cleanState = stateName.trim();
    if (INDIA_DATA[cleanState]) {
        return INDIA_DATA[cleanState];
    }

    const matchKey = Object.keys(INDIA_DATA).find(k => 
        k.toLowerCase().includes(cleanState.toLowerCase()) || 
        cleanState.toLowerCase().includes(k.toLowerCase())
    );

    if (matchKey && INDIA_DATA[matchKey]) {
        return INDIA_DATA[matchKey];
    }

    // Dynamic generation for other states
    return {
        stays: [
            {
                id: `st-${cleanState}-1`,
                name: `${cleanState} Heritage Basecamp`,
                rating: '4.8',
                location: `${cleanState}, India`,
                price: '₹1,050',
                image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1000&auto=format&fit=crop',
                state: cleanState,
                type: 'Authentic Local Stay'
            },
            ...DEFAULT_INDIAN_DATA.stays.slice(0, 2)
        ],
        food: [
            {
                id: `fd-${cleanState}-1`,
                name: `${cleanState} Traditional Feast & Local Spices`,
                type: 'Regional Speciality',
                origin: cleanState,
                price: '₹150',
                state: cleanState
            },
            ...DEFAULT_INDIAN_DATA.food.slice(0, 2)
        ],
        activities: [
            {
                id: `act-${cleanState}-1`,
                title: `${cleanState} Solo Trail & Heritage Walk`,
                category: 'Expedition',
                difficulty: 'Moderate',
                location: `${cleanState}, India`,
                image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop',
                description: `Experience the untouched routes, rich folklore, and warm cultural hospitality of ${cleanState}.`,
                state: cleanState
            },
            ...DEFAULT_INDIAN_DATA.activities.slice(0, 2)
        ],
        places: [
            {
                id: `pl-${cleanState}-1`,
                name: `${cleanState} Sacred Monument & Trails`,
                state: cleanState,
                instagram_hashtag: cleanState.toLowerCase().replace(/[^a-z0-9]/g, ''),
                image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop',
                description: `Spectacular landmark embodying the heritage and architectural majesty of ${cleanState}.`,
                is_hidden_spot: false
            },
            ...DEFAULT_INDIAN_DATA.places.slice(0, 2)
        ]
    };
}

function getIndiaPlaces(stateName) {
    if (!stateName) {
        let allPlaces = [];
        Object.values(INDIA_DATA).forEach(st => {
            allPlaces = allPlaces.concat(st.places || []);
        });
        return allPlaces.length > 0 ? allPlaces : DEFAULT_INDIAN_DATA.places;
    }

    const data = getIndiaTravelData(stateName);
    return data.places || DEFAULT_INDIAN_DATA.places;
}

module.exports = {
    INDIA_DATA,
    DEFAULT_INDIAN_DATA,
    getIndiaTravelData,
    getIndiaPlaces
};
