const axios = require('axios');

/**
 * Service to orchestrate LLM Prompt generation and structured JSON itinerary mapping with INR (Rupees) pricing
 */
class LlmEngineService {
    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY || '';
    }

    /**
     * Generate structured itinerary using OpenAI Chat Completions API with enriched context
     * 
     * @param {Object} params
     * @param {string} params.destination
     * @param {number} params.maxDailyBudget - INR (₹)
     * @param {string} params.travelStyle
     * @param {number} params.days
     * @param {Object} [params.weatherContext]
     * @param {Object} [params.geoContext]
     * @param {Array}  [params.placesContext]
     * @returns {Promise<{
     *   destination: string,
     *   recommendedHomestay: { name: string, estNightlyCostInr: number, estNightlyCostUsd: number, address: string },
     *   totalEstCostInr: number,
     *   totalEstCostUsd: number,
     *   weatherSummary: string,
     *   itinerary: Array<{ day: number, activities: Array<{ timeOfDay: string, title: string, description: string, estimatedCostInr: number, estimatedCostUsd: number, indoorAlternative: boolean }> }>
     * }>}
     */
    async generateItinerary({
        destination,
        maxDailyBudget,
        travelStyle,
        days,
        weatherContext,
        geoContext,
        placesContext = []
    }) {
        // Default to ₹2,500 INR if not specified
        const rawBudget = Number(maxDailyBudget) || 2500;
        // If user entered a small number like 40, treat as USD and convert to INR (~₹3,300) or use direct INR
        const budgetInr = rawBudget < 200 ? Math.round(rawBudget * 85) : rawBudget;
        const totalDays = Math.min(Math.max(Number(days) || 3, 1), 7);
        const style = travelStyle || 'Solo Adventure & Culture';
        const formattedDest = geoContext?.formattedAddress || destination || 'Tamil Nadu & Bharat';
        const weatherSummary = weatherContext?.summary || '24°C, Pleasant travel weather';
        const isAdverse = weatherContext?.isAdverseWeather || false;

        const systemPrompt = `You are an expert AI Travel Architect and Solo Traversal specialist for India (Bharat).
You generate precise, cost-aware, and weather-adapted travel itineraries in Indian Rupees (₹ INR) mapped strictly to a structured JSON schema.

RULES & CONSTRAINTS:
1. The output MUST be a valid, parseable JSON object adhering EXACTLY to the specified schema.
2. The user has a STRICT daily budget cap of ₹${budgetInr} INR per day.
   - Recommended homestay nightly cost + all daily activities must stay within this budget.
3. Incorporate live real-time conditions:
   - Verified location: ${formattedDest}
   - Real-time weather: ${weatherSummary}
   - Adverse weather active: ${isAdverse ? `YES (${weatherContext?.adverseReason || 'Precipitation/Heat'}). You MUST include indoor alternatives where appropriate and set "indoorAlternative": true for those activities.` : 'NO (Clear conditions).'}
   ${placesContext.length > 0 ? `- Verified Nearby Places from Google Maps: ${placesContext.map(p => p.name).join(', ')}` : ''}
4. Travel Style requested: "${style}".
5. Structure the days from Day 1 to Day ${totalDays}.
6. Each day must contain 2 to 3 activities with "timeOfDay" strictly set to "Morning", "Afternoon", or "Evening".
7. "indoorAlternative" MUST be a boolean (true if chosen due to rain, heat, or adverse weather, false otherwise).
8. All amounts (estimated costs and total) must be in Indian Rupees (INR / ₹).

JSON OUTPUT SCHEMA (DTO SPECIFICATION):
{
  "destination": "string (verified location)",
  "recommendedHomestay": {
    "name": "string",
    "estNightlyCostInr": number,
    "estNightlyCostUsd": number,
    "address": "string"
  },
  "totalEstCostInr": number,
  "totalEstCostUsd": number,
  "weatherSummary": "string",
  "itinerary": [
    {
      "day": number,
      "activities": [
        {
          "timeOfDay": "Morning | Afternoon | Evening",
          "title": "string",
          "description": "string",
          "estimatedCostInr": number,
          "estimatedCostUsd": number,
          "indoorAlternative": boolean
        }
      ]
    }
  ]
}`;

        const userPrompt = `Generate a ${totalDays}-day itinerary for a solo traveler visiting ${formattedDest}.
- Max Daily Budget: ₹${budgetInr} INR
- Travel Style: ${style}
- Total Days: ${totalDays}
- Real-time weather: ${weatherSummary}
Return ONLY the raw JSON matching the schema.`;

        // If OpenAI key is available, attempt API call
        if (this.apiKey) {
            try {
                const response = await axios.post(
                    'https://api.openai.com/v1/chat/completions',
                    {
                        model: 'gpt-4o-mini',
                        messages: [
                            { role: 'system', content: systemPrompt },
                            { role: 'user', content: userPrompt }
                        ],
                        response_format: { type: 'json_object' },
                        temperature: 0.7
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.apiKey}`
                        },
                        timeout: 20000
                    }
                );

                const rawContent = response.data.choices?.[0]?.message?.content;
                if (rawContent) {
                    const parsed = JSON.parse(rawContent);
                    return this.validateAndNormalize(parsed, {
                        destination: formattedDest,
                        weatherSummary,
                        budgetInr,
                        totalDays,
                        isAdverse
                    });
                }
            } catch (error) {
                console.warn(`[LlmEngineService] OpenAI API error (${error.response?.status || error.message}). Activating deterministic fallback generator.`);
            }
        }

        // Fallback intelligent itinerary synthesizer matching exact DTO schema
        return this.generateFallbackItinerary({
            destination: formattedDest,
            budgetInr,
            style,
            totalDays,
            weatherSummary,
            isAdverse,
            placesContext
        });
    }

    /**
     * Validate and normalize the parsed LLM JSON output to guarantee DTO compliance
     */
    validateAndNormalize(data, context) {
        const dest = data.destination || context.destination;
        const nightlyInr = Number(data.recommendedHomestay?.estNightlyCostInr) || Math.round(context.budgetInr * 0.4);
        const homestay = {
            name: data.recommendedHomestay?.name || 'Local Heritage Sanctuary & Homestay',
            estNightlyCostInr: nightlyInr,
            estNightlyCostUsd: Math.round(nightlyInr / 85),
            address: data.recommendedHomestay?.address || `${dest}, Local Quarter`
        };

        const weatherSummary = data.weatherSummary || context.weatherSummary;
        let totalCostInr = homestay.estNightlyCostInr * context.totalDays;

        const itinerary = (data.itinerary || []).map((dayObj, index) => {
            const dayNum = Number(dayObj.day) || (index + 1);
            const activities = (dayObj.activities || []).map(act => {
                const costInr = Number(act.estimatedCostInr) || Number(act.estimatedCostUsd ? act.estimatedCostUsd * 85 : 350);
                totalCostInr += costInr;
                return {
                    timeOfDay: ['Morning', 'Afternoon', 'Evening'].includes(act.timeOfDay) ? act.timeOfDay : 'Morning',
                    title: String(act.title || 'Local Exploration'),
                    description: String(act.description || 'Experience local heritage and landscape.'),
                    estimatedCostInr: costInr,
                    estimatedCostUsd: Math.round(costInr / 85),
                    indoorAlternative: Boolean(act.indoorAlternative)
                };
            });

            return {
                day: dayNum,
                activities
            };
        });

        const finalTotalInr = Math.round(Number(data.totalEstCostInr) || totalCostInr);

        return {
            destination: dest,
            recommendedHomestay: homestay,
            totalEstCostInr: finalTotalInr,
            totalEstCostUsd: Math.round(finalTotalInr / 85),
            weatherSummary,
            itinerary
        };
    }

    /**
     * Deterministic schema-compliant generator for offline/fallback resilience with INR pricing
     */
    generateFallbackItinerary({ destination, budgetInr, style, totalDays, weatherSummary, isAdverse, placesContext = [] }) {
        const homestayCostInr = Math.round(budgetInr * 0.38);
        const homestayName = placesContext[0]?.name || (destination.includes('Tamil') || destination.includes('Kanya') ? 'Triveni Oceanview Heritage Homestay' : 'Himalayan Solo Basecamp & Stay');
        
        const curatedActivities = [
            {
                morning: { title: 'Dawn Oceanfront / Heritage Walk & Traditional Kaapi', desc: 'Walk along century-old pathways, historic temples, and savor fresh local filter brew.', cost: 350, indoor: false },
                afternoon: { title: 'Local Cultural Sanctuary & Ancient Monument Exploration', desc: 'Explore historical stone carvings, murals, and peaceful meditation halls.', cost: 250, indoor: isAdverse },
                evening: { title: 'Sunset Coastal Point & Traditional Sattvic Feast', desc: 'Witness the golden hour reflection over the waves and enjoy an authentic local dinner.', cost: 450, indoor: true }
            },
            {
                morning: { title: 'Scenic Ridge & Viewpoint Trail', desc: 'A refreshing morning trek along coastal promontories and misty hillside paths.', cost: 400, indoor: false },
                afternoon: { title: 'Traditional Artisan Craft & Clay Workshop', desc: 'Handcraft local pottery and cultural artifacts with indigenous artisans.', cost: 300, indoor: isAdverse },
                evening: { title: 'Fireside Folk Music & Acoustic Session', desc: 'Savor traditional hot steamed delicacies and aromatic herbal brews.', cost: 500, indoor: true }
            },
            {
                morning: { title: 'Heritage Shoreline & Temple Yatra', desc: 'Explore historic shoreline architecture and tranquil morning prayer bells.', cost: 300, indoor: false },
                afternoon: { title: 'Local Heritage Library & Spice Cafe', desc: 'Read travel journals, enjoy roasted coffee, and discover regional lore.', cost: 350, indoor: isAdverse },
                evening: { title: 'Starlit Meditation Point', desc: 'Relax under tranquil night skies with refreshing ocean or mountain breezes.', cost: 200, indoor: false }
            }
        ];

        let totalEstCostInr = homestayCostInr * totalDays;
        const itinerary = [];

        for (let i = 1; i <= totalDays; i++) {
            const template = curatedActivities[(i - 1) % curatedActivities.length];
            const dayActs = [
                {
                    timeOfDay: 'Morning',
                    title: template.morning.title,
                    description: template.morning.desc,
                    estimatedCostInr: template.morning.cost,
                    estimatedCostUsd: Math.round(template.morning.cost / 85),
                    indoorAlternative: isAdverse ? true : template.morning.indoor
                },
                {
                    timeOfDay: 'Afternoon',
                    title: template.afternoon.title,
                    description: template.afternoon.desc,
                    estimatedCostInr: template.afternoon.cost,
                    estimatedCostUsd: Math.round(template.afternoon.cost / 85),
                    indoorAlternative: template.afternoon.indoor
                },
                {
                    timeOfDay: 'Evening',
                    title: template.evening.title,
                    description: template.evening.desc,
                    estimatedCostInr: template.evening.cost,
                    estimatedCostUsd: Math.round(template.evening.cost / 85),
                    indoorAlternative: template.evening.indoor
                }
            ];

            dayActs.forEach(a => { totalEstCostInr += a.estimatedCostInr; });
            itinerary.push({ day: i, activities: dayActs });
        }

        return {
            destination,
            recommendedHomestay: {
                name: homestayName,
                estNightlyCostInr: homestayCostInr,
                estNightlyCostUsd: Math.round(homestayCostInr / 85),
                address: placesContext[0]?.address || `${destination}, India`
            },
            totalEstCostInr: totalEstCostInr,
            totalEstCostUsd: Math.round(totalEstCostInr / 85),
            weatherSummary,
            itinerary
        };
    }
}

module.exports = new LlmEngineService();
