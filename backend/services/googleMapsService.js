const axios = require('axios');

/**
 * Service to interact with Google Maps Geocoding & Places APIs
 */
class GoogleMapsService {
    constructor() {
        this.apiKey = process.env.GOOGLE_MAPS_API_KEY || '';
    }

    /**
     * Geocode a destination string to obtain coordinates & verified location info
     * @param {string} destination - Name or address of the destination
     * @returns {Promise<{lat: number, lng: number, formattedAddress: string, placeId: string}|null>}
     */
    async geocodeDestination(destination) {
        if (!this.apiKey || !destination) {
            return this.getFallbackCoordinates(destination);
        }

        try {
            const url = `https://maps.googleapis.com/maps/api/geocode/json`;
            const response = await axios.get(url, {
                params: {
                    address: destination,
                    key: this.apiKey
                },
                timeout: 5000
            });

            if (response.data && response.data.status === 'OK' && response.data.results?.length > 0) {
                const result = response.data.results[0];
                return {
                    lat: result.geometry.location.lat,
                    lng: result.geometry.location.lng,
                    formattedAddress: result.formatted_address,
                    placeId: result.place_id
                };
            } else {
                console.warn(`[GoogleMapsService] Geocoding notice: ${response.data?.status || 'No results'}`);
                return this.getFallbackCoordinates(destination);
            }
        } catch (error) {
            console.warn(`[GoogleMapsService] Geocoding API request failed: ${error.message}`);
            return this.getFallbackCoordinates(destination);
        }
    }

    /**
     * Search for local places, attractions or homestays in the destination area
     * @param {string} destination 
     * @param {string} queryType - 'attractions' | 'homestays' | 'food'
     * @returns {Promise<Array<{name: string, rating: number, address: string}>>}
     */
    async searchPlaces(destination, queryType = 'attractions') {
        if (!this.apiKey || !destination) {
            return [];
        }

        try {
            const query = `${queryType} in ${destination}`;
            const url = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
            const response = await axios.get(url, {
                params: {
                    query,
                    key: this.apiKey
                },
                timeout: 5000
            });

            if (response.data && response.data.status === 'OK' && response.data.results) {
                return response.data.results.slice(0, 5).map(place => ({
                    name: place.name,
                    rating: place.rating || 4.5,
                    address: place.formatted_address || place.vicinity || destination
                }));
            }
            return [];
        } catch (error) {
            console.warn(`[GoogleMapsService] Places search failed: ${error.message}`);
            return [];
        }
    }

    /**
     * Known coordinate mapping for popular destinations (fallback if API key is invalid/unreachable)
     */
    getFallbackCoordinates(destination) {
        const dest = (destination || '').toLowerCase();
        if (dest.includes('kaza') || dest.includes('spiti')) {
            return { lat: 32.2276, lng: 78.0710, formattedAddress: 'Kaza, Spiti Valley, Himachal Pradesh, India', placeId: 'kaza_spiti' };
        }
        if (dest.includes('manali')) {
            return { lat: 32.2396, lng: 77.1887, formattedAddress: 'Manali, Himachal Pradesh, India', placeId: 'manali_hp' };
        }
        if (dest.includes('rishikesh')) {
            return { lat: 30.0869, lng: 78.2676, formattedAddress: 'Rishikesh, Uttarakhand, India', placeId: 'rishikesh_uk' };
        }
        if (dest.includes('leh') || dest.includes('ladakh')) {
            return { lat: 34.1526, lng: 77.5771, formattedAddress: 'Leh, Ladakh, India', placeId: 'leh_ladakh' };
        }
        if (dest.includes('shimla')) {
            return { lat: 31.1048, lng: 77.1734, formattedAddress: 'Shimla, Himachal Pradesh, India', placeId: 'shimla_hp' };
        }
        if (dest.includes('dharamshala') || dest.includes('mcleod')) {
            return { lat: 32.2190, lng: 76.3234, formattedAddress: 'Dharamshala, Himachal Pradesh, India', placeId: 'dharamshala_hp' };
        }
        return {
            lat: 32.2276,
            lng: 78.0710,
            formattedAddress: destination ? `${destination}, India` : 'Spiti Valley, Himachal Pradesh, India',
            placeId: 'custom_loc'
        };
    }
}

module.exports = new GoogleMapsService();
