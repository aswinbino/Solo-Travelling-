const axios = require('axios');

/**
 * Service to fetch real-time weather and forecast data from OpenWeather API
 */
class OpenWeatherService {
    constructor() {
        this.apiKey = process.env.OPENWEATHER_API_KEY || '';
    }

    /**
     * Get real-time weather for a destination by coordinates or query name
     * @param {string} destination - City / region name
     * @param {{lat?: number, lng?: number}} [coords] - Optional geocoded coordinates
     * @returns {Promise<{
     *   temp: number,
     *   feelsLike: number,
     *   condition: string,
     *   description: string,
     *   humidity: number,
     *   windSpeed: number,
     *   isAdverseWeather: boolean,
     *   adverseReason: string,
     *   summary: string
     * }>}
     */
    async getWeather(destination, coords) {
        if (!this.apiKey) {
            return this.getFallbackWeather(destination);
        }

        try {
            let response;
            if (coords?.lat && coords?.lng) {
                const url = `https://api.openweathermap.org/data/2.5/weather`;
                response = await axios.get(url, {
                    params: {
                        lat: coords.lat,
                        lon: coords.lng,
                        appid: this.apiKey,
                        units: 'metric'
                    },
                    timeout: 5000
                });
            } else {
                // Query by city name (extract city before commas)
                const cityName = (destination || 'Kaza').split(',')[0].trim();
                const url = `https://api.openweathermap.org/data/2.5/weather`;
                response = await axios.get(url, {
                    params: {
                        q: cityName,
                        appid: this.apiKey,
                        units: 'metric'
                    },
                    timeout: 5000
                });
            }

            if (response.data && response.data.weather && response.data.weather.length > 0) {
                const w = response.data.weather[0];
                const main = response.data.main;
                const wind = response.data.wind;
                const temp = Math.round(main.temp);
                const condition = w.main; // 'Rain', 'Snow', 'Clear', 'Clouds', 'Thunderstorm', etc.
                const description = w.description;

                const isRainy = condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle') || condition.toLowerCase().includes('thunderstorm');
                const isSnowy = condition.toLowerCase().includes('snow');
                const isExtremeHeat = temp > 38;
                const isAdverse = isRainy || isSnowy || isExtremeHeat;
                
                let adverseReason = '';
                if (isRainy) adverseReason = 'Rain / precipitation detected';
                else if (isSnowy) adverseReason = 'Snowfall / freezing conditions';
                else if (isExtremeHeat) adverseReason = 'Extreme heat conditions';

                const summary = `${temp}°C, ${description.charAt(0).toUpperCase() + description.slice(1)} (Humidity: ${main.humidity}%, Wind: ${wind?.speed || 0} m/s)`;

                return {
                    temp,
                    feelsLike: Math.round(main.feels_like),
                    condition,
                    description,
                    humidity: main.humidity,
                    windSpeed: wind?.speed || 0,
                    isAdverseWeather: isAdverse,
                    adverseReason,
                    summary
                };
            }

            return this.getFallbackWeather(destination);
        } catch (error) {
            console.warn(`[OpenWeatherService] Weather API call failed: ${error.message}`);
            return this.getFallbackWeather(destination);
        }
    }

    /**
     * Fallback weather generator if API is unreachable or destination is remote
     */
    getFallbackWeather(destination) {
        const dest = (destination || '').toLowerCase();
        let temp = 14;
        let condition = 'Clear';
        let description = 'clear sky';

        if (dest.includes('kaza') || dest.includes('spiti') || dest.includes('ladakh') || dest.includes('leh')) {
            temp = 4;
            condition = 'Clouds';
            description = 'scattered clouds, brisk Himalayan air';
        } else if (dest.includes('manali') || dest.includes('shimla') || dest.includes('dharamshala')) {
            temp = 16;
            condition = 'Clear';
            description = 'mild and sunny mountain climate';
        } else if (dest.includes('rishikesh')) {
            temp = 24;
            condition = 'Clear';
            description = 'pleasant riverside weather';
        }

        return {
            temp,
            feelsLike: temp - 2,
            condition,
            description,
            humidity: 45,
            windSpeed: 3.2,
            isAdverseWeather: false,
            adverseReason: '',
            summary: `${temp}°C, ${description} (Humidity: 45%, Wind: 3.2 m/s)`
        };
    }
}

module.exports = new OpenWeatherService();
