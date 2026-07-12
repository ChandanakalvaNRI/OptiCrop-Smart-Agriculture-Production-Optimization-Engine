// Crop dataset with optimal growing conditions
// Data based on agricultural research and FAO guidelines

export interface CropData {
  name: string;
  nitrogen: [number, number]; // [min, max] kg/ha
  phosphorus: [number, number];
  potassium: [number, number];
  temperature: [number, number]; // Celsius
  humidity: [number, number]; // Percentage
  ph: [number, number];
  rainfall: [number, number]; // mm
  soilType: string[];
  season: string[];
  waterRequirement: string;
  growthDuration: string;
  description: string;
}

export const cropDatabase: CropData[] = [
  {
    name: "Rice",
    nitrogen: [60, 120],
    phosphorus: [30, 60],
    potassium: [40, 80],
    temperature: [20, 35],
    humidity: [70, 95],
    ph: [5.0, 6.5],
    rainfall: [150, 300],
    soilType: ["Clay", "Loam", "Silt"],
    season: ["Kharif", "Monsoon"],
    waterRequirement: "High",
    growthDuration: "100-150 days",
    description: "Staple food crop requiring flooded conditions during growth."
  },
  {
    name: "Wheat",
    nitrogen: [80, 140],
    phosphorus: [40, 70],
    potassium: [50, 90],
    temperature: [10, 25],
    humidity: [35, 60],
    ph: [6.0, 7.5],
    rainfall: [50, 100],
    soilType: ["Loam", "Clay Loam", "Silt Loam"],
    season: ["Rabi", "Winter"],
    waterRequirement: "Medium",
    growthDuration: "110-130 days",
    description: "Important cereal crop grown in cool, dry conditions."
  },
  {
    name: "Maize",
    nitrogen: [70, 150],
    phosphorus: [35, 65],
    potassium: [45, 85],
    temperature: [18, 32],
    humidity: [40, 70],
    ph: [5.5, 7.0],
    rainfall: [60, 150],
    soilType: ["Loam", "Sandy Loam", "Clay Loam"],
    season: ["Kharif", "Spring"],
    waterRequirement: "Medium",
    growthDuration: "80-120 days",
    description: "Versatile cereal used for food, feed, and industrial purposes."
  },
  {
    name: "Cotton",
    nitrogen: [40, 100],
    phosphorus: [20, 50],
    potassium: [50, 100],
    temperature: [25, 35],
    humidity: [40, 65],
    ph: [6.0, 7.5],
    rainfall: [50, 100],
    soilType: ["Sandy Loam", "Black Cotton Soil", "Clay Loam"],
    season: ["Kharif"],
    waterRequirement: "Low to Medium",
    growthDuration: "150-180 days",
    description: "Important fiber crop requiring warm climate."
  },
  {
    name: "Sugarcane",
    nitrogen: [100, 200],
    phosphorus: [50, 100],
    potassium: [100, 180],
    temperature: [20, 35],
    humidity: [60, 80],
    ph: [6.0, 7.5],
    rainfall: [100, 200],
    soilType: ["Loam", "Clay Loam", "Black Soil"],
    season: ["Year-round"],
    waterRequirement: "High",
    growthDuration: "12-18 months",
    description: "Major sugar-producing crop requiring tropical conditions."
  },
  {
    name: "Groundnut",
    nitrogen: [20, 60],
    phosphorus: [30, 60],
    potassium: [30, 60],
    temperature: [22, 32],
    humidity: [40, 65],
    ph: [6.0, 7.5],
    rainfall: [40, 90],
    soilType: ["Sandy Loam", "Loamy Sand", "Red Soil"],
    season: ["Kharif", "Rabi"],
    waterRequirement: "Low",
    growthDuration: "90-130 days",
    description: "Important oilseed crop, fixes atmospheric nitrogen."
  },
  {
    name: "Soybean",
    nitrogen: [20, 50],
    phosphorus: [30, 60],
    potassium: [40, 80],
    temperature: [20, 30],
    humidity: [50, 75],
    ph: [6.0, 7.0],
    rainfall: [60, 120],
    soilType: ["Loam", "Clay Loam", "Sandy Loam"],
    season: ["Kharif"],
    waterRequirement: "Medium",
    growthDuration: "90-120 days",
    description: "Important protein and oil source crop."
  },
  {
    name: "Sunflower",
    nitrogen: [30, 70],
    phosphorus: [25, 55],
    potassium: [50, 90],
    temperature: [18, 30],
    humidity: [35, 60],
    ph: [6.0, 7.5],
    rainfall: [40, 100],
    soilType: ["Loam", "Sandy Loam", "Black Soil"],
    season: ["Spring", "Summer"],
    waterRequirement: "Low to Medium",
    growthDuration: "85-100 days",
    description: "Major oilseed crop with bright yellow flowers."
  },
  {
    name: "Potato",
    nitrogen: [100, 180],
    phosphorus: [60, 120],
    potassium: [150, 250],
    temperature: [15, 25],
    humidity: [60, 80],
    ph: [5.0, 6.5],
    rainfall: [80, 150],
    soilType: ["Sandy Loam", "Loam", "Peat"],
    season: ["Rabi", "Winter"],
    waterRequirement: "Medium to High",
    growthDuration: "90-120 days",
    description: "Important tuber crop, rich in carbohydrates."
  },
  {
    name: "Tomato",
    nitrogen: [80, 150],
    phosphorus: [40, 80],
    potassium: [100, 200],
    temperature: [18, 30],
    humidity: [50, 75],
    ph: [6.0, 7.0],
    rainfall: [60, 120],
    soilType: ["Loam", "Sandy Loam", "Clay Loam"],
    season: ["Year-round"],
    waterRequirement: "Medium",
    growthDuration: "90-140 days",
    description: "Popular vegetable crop rich in vitamins."
  },
  {
    name: "Onion",
    nitrogen: [60, 120],
    phosphorus: [30, 60],
    potassium: [60, 120],
    temperature: [13, 28],
    humidity: [40, 70],
    ph: [6.0, 7.0],
    rainfall: [50, 100],
    soilType: ["Sandy Loam", "Loam", "Silt Loam"],
    season: ["Rabi", "Winter"],
    waterRequirement: "Low to Medium",
    growthDuration: "90-150 days",
    description: "Essential vegetable crop used worldwide."
  },
  {
    name: "Chickpea",
    nitrogen: [10, 40],
    phosphorus: [30, 60],
    potassium: [30, 60],
    temperature: [15, 28],
    humidity: [35, 60],
    ph: [6.0, 8.0],
    rainfall: [30, 70],
    soilType: ["Sandy Loam", "Loam", "Clay Loam"],
    season: ["Rabi"],
    waterRequirement: "Low",
    growthDuration: "90-110 days",
    description: "Important pulse crop, protein-rich legume."
  },
  {
    name: "Mustard",
    nitrogen: [30, 70],
    phosphorus: [25, 55],
    potassium: [30, 60],
    temperature: [12, 25],
    humidity: [40, 70],
    ph: [6.0, 7.5],
    rainfall: [35, 80],
    soilType: ["Loam", "Sandy Loam", "Clay Loam"],
    season: ["Rabi"],
    waterRequirement: "Low to Medium",
    growthDuration: "100-140 days",
    description: "Major oilseed crop, cold-tolerant."
  },
  {
    name: "Barley",
    nitrogen: [40, 80],
    phosphorus: [25, 50],
    potassium: [35, 70],
    temperature: [10, 22],
    humidity: [35, 55],
    ph: [6.0, 8.0],
    rainfall: [40, 90],
    soilType: ["Loam", "Sandy Loam", "Silt Loam"],
    season: ["Rabi", "Winter"],
    waterRequirement: "Low",
    growthDuration: "100-130 days",
    description: "Drought-tolerant cereal crop."
  },
  {
    name: "Sorghum",
    nitrogen: [40, 90],
    phosphorus: [25, 50],
    potassium: [40, 80],
    temperature: [25, 35],
    humidity: [40, 70],
    ph: [5.5, 7.5],
    rainfall: [35, 85],
    soilType: ["Sandy Loam", "Clay Loam", "Loam"],
    season: ["Kharif"],
    waterRequirement: "Low",
    growthDuration: "100-140 days",
    description: "Drought-resistant cereal, versatile uses."
  },
  {
    name: "Pearl Millet",
    nitrogen: [30, 70],
    phosphorus: [20, 45],
    potassium: [30, 60],
    temperature: [28, 38],
    humidity: [35, 60],
    ph: [6.0, 7.5],
    rainfall: [25, 70],
    soilType: ["Sandy", "Sandy Loam", "Loamy Sand"],
    season: ["Kharif"],
    waterRequirement: "Very Low",
    growthDuration: "80-100 days",
    description: "Highly drought-tolerant cereal crop."
  },
  {
    name: "Cotton",
    nitrogen: [40, 100],
    phosphorus: [20, 50],
    potassium: [50, 100],
    temperature: [25, 35],
    humidity: [40, 65],
    ph: [6.0, 7.5],
    rainfall: [50, 100],
    soilType: ["Sandy Loam", "Black Cotton Soil", "Clay Loam"],
    season: ["Kharif"],
    waterRequirement: "Low to Medium",
    growthDuration: "150-180 days",
    description: "Important fiber crop requiring warm climate."
  },
  {
    name: "Lentil",
    nitrogen: [15, 45],
    phosphorus: [25, 50],
    potassium: [25, 50],
    temperature: [15, 25],
    humidity: [40, 65],
    ph: [6.0, 7.5],
    rainfall: [40, 80],
    soilType: ["Loam", "Sandy Loam", "Clay Loam"],
    season: ["Rabi"],
    waterRequirement: "Low",
    growthDuration: "90-120 days",
    description: "Protein-rich pulse crop, cold-tolerant."
  },
  {
    name: "Banana",
    nitrogen: [100, 200],
    phosphorus: [60, 120],
    potassium: [200, 350],
    temperature: [22, 32],
    humidity: [65, 85],
    ph: [5.5, 7.0],
    rainfall: [150, 300],
    soilType: ["Loam", "Clay Loam", "Sandy Loam"],
    season: ["Year-round"],
    waterRequirement: "High",
    growthDuration: "11-14 months",
    description: "Tropical fruit crop, potassium-rich."
  },
  {
    name: "Coffee",
    nitrogen: [80, 150],
    phosphorus: [40, 80],
    potassium: [100, 180],
    temperature: [15, 28],
    humidity: [70, 90],
    ph: [5.5, 6.5],
    rainfall: [150, 250],
    soilType: ["Loam", "Sandy Loam", "Volcanic Soil"],
    season: ["Year-round"],
    waterRequirement: "High",
    growthDuration: "Perennial",
    description: "Major plantation crop, requires shade."
  },
  {
    name: "Tea",
    nitrogen: [60, 120],
    phosphorus: [30, 60],
    potassium: [50, 100],
    temperature: [15, 25],
    humidity: [75, 95],
    ph: [4.5, 5.5],
    rainfall: [150, 300],
    soilType: ["Sandy Loam", "Loam", "Acidic Soil"],
    season: ["Year-round"],
    waterRequirement: "High",
    growthDuration: "Perennial",
    description: "Important plantation crop, requires acidic soil."
  },
  {
    name: "Mango",
    nitrogen: [80, 150],
    phosphorus: [40, 80],
    potassium: [100, 180],
    temperature: [25, 38],
    humidity: [40, 70],
    ph: [6.0, 7.5],
    rainfall: [60, 150],
    soilType: ["Loam", "Sandy Loam", "Alluvial"],
    season: ["Summer"],
    waterRequirement: "Medium",
    growthDuration: "Perennial",
    description: "Popular tropical fruit crop."
  },
  {
    name: "Papaya",
    nitrogen: [60, 120],
    phosphorus: [30, 60],
    potassium: [80, 160],
    temperature: [22, 32],
    humidity: [60, 80],
    ph: [6.0, 7.0],
    rainfall: [100, 200],
    soilType: ["Loam", "Sandy Loam", "Clay Loam"],
    season: ["Year-round"],
    waterRequirement: "Medium to High",
    growthDuration: "9-18 months",
    description: "Fast-growing tropical fruit."
  },
  {
    name: "Coconut",
    nitrogen: [50, 100],
    phosphorus: [30, 60],
    potassium: [150, 300],
    temperature: [25, 35],
    humidity: [70, 90],
    ph: [5.5, 7.5],
    rainfall: [150, 300],
    soilType: ["Sandy Loam", "Coastall Alluvium", "Clay"],
    season: ["Year-round"],
    waterRequirement: "High",
    growthDuration: "Perennial",
    description: "Tropical plantation crop, versatile uses."
  },
  {
    name: "Jute",
    nitrogen: [40, 80],
    phosphorus: [20, 45],
    potassium: [40, 80],
    temperature: [25, 35],
    humidity: [70, 90],
    ph: [6.0, 7.5],
    rainfall: [150, 250],
    soilType: ["Loam", "Clay Loam", "Alluvial"],
    season: ["Kharif"],
    waterRequirement: "High",
    growthDuration: "100-120 days",
    description: "Natural fiber crop, eco-friendly."
  },
  {
    name: "Turmeric",
    nitrogen: [60, 120],
    phosphorus: [40, 80],
    potassium: [80, 160],
    temperature: [20, 32],
    humidity: [60, 80],
    ph: [5.0, 6.5],
    rainfall: [100, 200],
    soilType: ["Sandy Loam", "Loam", "Clay Loam"],
    season: ["Kharif"],
    waterRequirement: "Medium to High",
    growthDuration: "240-280 days",
    description: "Important spice crop with medicinal properties."
  },
  {
    name: "Ginger",
    nitrogen: [80, 150],
    phosphorus: [40, 80],
    potassium: [100, 180],
    temperature: [22, 32],
    humidity: [60, 80],
    ph: [5.5, 6.5],
    rainfall: [100, 200],
    soilType: ["Sandy Loam", "Loam", "Clay Loam"],
    season: ["Kharif"],
    waterRequirement: "Medium to High",
    growthDuration: "210-240 days",
    description: "Popular spice crop, medicinal value."
  },
  {
    name: "Chili",
    nitrogen: [70, 130],
    phosphorus: [35, 70],
    potassium: [80, 150],
    temperature: [18, 32],
    humidity: [50, 70],
    ph: [6.0, 7.5],
    rainfall: [60, 120],
    soilType: ["Sandy Loam", "Loam", "Clay Loam"],
    season: ["Kharif", "Rabi"],
    waterRequirement: "Low to Medium",
    growthDuration: "120-150 days",
    description: "Important spice crop."
  },
  {
    name: "Cabbage",
    nitrogen: [100, 180],
    phosphorus: [50, 100],
    potassium: [100, 180],
    temperature: [12, 23],
    humidity: [60, 80],
    ph: [6.0, 7.0],
    rainfall: [70, 140],
    soilType: ["Loam", "Silty Loam", "Clay Loam"],
    season: ["Rabi", "Winter"],
    waterRequirement: "Medium to High",
    growthDuration: "80-120 days",
    description: "Cool-season leafy vegetable."
  },
  {
    name: "Cauliflower",
    nitrogen: [120, 200],
    phosphorus: [60, 120],
    potassium: [100, 180],
    temperature: [10, 22],
    humidity: [60, 80],
    ph: [6.0, 7.0],
    rainfall: [70, 140],
    soilType: ["Loam", "Sandy Loam", "Clay Loam"],
    season: ["Rabi", "Winter"],
    waterRequirement: "Medium to High",
    growthDuration: "90-120 days",
    description: "Cool-season vegetable, requires curd formation."
  }
];

// Function to calculate similarity score for a crop based on input parameters
export function calculateCropScore(
  crop: CropData,
  nitrogen: number,
  phosphorus: number,
  potassium: number,
  temperature: number,
  humidity: number,
  ph: number,
  rainfall: number
): number {
  let score = 0;
  const weights = {
    nitrogen: 1.0,
    phosphorus: 1.0,
    potassium: 1.0,
    temperature: 1.5,
    humidity: 1.3,
    ph: 1.4,
    rainfall: 1.2
  };

  // Calculate normalized distance for each parameter
  const calcScore = (value: number, range: [number, number], weight: number): number => {
    const [min, max] = range;
    const optimal = (min + max) / 2;
    const tolerance = (max - min) / 2;

    if (value >= min && value <= max) {
      // Within optimal range - calculate how close to optimal
      const distance = Math.abs(value - optimal) / tolerance;
      return weight * (1 - distance * 0.3);
    } else {
      // Outside optimal range - calculate penalty
      const distance = value < min ? (min - value) / tolerance : (value - max) / tolerance;
      return weight * Math.max(0, 1 - distance * 0.5);
    }
  };

  score += calcScore(nitrogen, crop.nitrogen, weights.nitrogen);
  score += calcScore(phosphorus, crop.phosphorus, weights.phosphorus);
  score += calcScore(potassium, crop.potassium, weights.potassium);
  score += calcScore(temperature, crop.temperature, weights.temperature);
  score += calcScore(humidity, crop.humidity, weights.humidity);
  score += calcScore(ph, crop.ph, weights.ph);
  score += calcScore(rainfall, crop.rainfall, weights.rainfall);

  // Normalize score to 0-1 range
  const maxPossibleScore = Object.values(weights).reduce((a, b) => a + b, 0);
  return score / maxPossibleScore;
}

// Get top crop recommendations
export function getTopCropRecommendations(
  nitrogen: number,
  phosphorus: number,
  potassium: number,
  temperature: number,
  humidity: number,
  ph: number,
  rainfall: number,
  topN: number = 5
): Array<{ crop: CropData; score: number; confidence: number }> {
  const scores = cropDatabase.map(crop => ({
    crop,
    score: calculateCropScore(crop, nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall),
    confidence: 0
  }));

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);

  // Calculate confidence based on score distribution
  const topScores = scores.slice(0, topN);
  const maxScore = topScores[0].score;
  topScores.forEach(item => {
    item.confidence = (item.score / maxScore) * 100;
  });

  return topScores.slice(0, topN);
}

// Get soil type recommendation based on crop
export function getSoilRecommendation(ph: number, crop: CropData): string {
  if (ph < 5.5) {
    return `Acidic soil (${ph.toFixed(1)} pH). Suitable for ${crop.soilType.join(', ')}. Consider liming for alkaline-loving crops.`;
  } else if (ph > 7.5) {
    return `Alkaline soil (${ph.toFixed(1)} pH). Suitable for ${crop.soilType.join(', ')}. Consider adding sulfur for acid-loving crops.`;
  } else {
    return `Neutral soil (${ph.toFixed(1)} pH). Excellent for ${crop.soilType.join(', ')}. Ideal for ${crop.name}.`;
  }
}

// Get farming suggestions based on input and prediction
export function getFarmingSuggestions(
  crop: CropData,
  nitrogen: number,
  phosphorus: number,
  potassium: number,
  temperature: number,
  humidity: number,
  rainfall: number
): string[] {
  const suggestions: string[] = [];

  // Nitrogen suggestions
  if (nitrogen < crop.nitrogen[0]) {
    suggestions.push(`Nitrogen is low. Apply ${crop.nitrogen[0] - nitrogen} kg/ha additional nitrogen fertilizer.`);
  } else if (nitrogen > crop.nitrogen[1]) {
    suggestions.push(`Nitrogen is high. Reduce fertilizer application to prevent excessive vegetative growth.`);
  }

  // Phosphorus suggestions
  if (phosphorus < crop.phosphorus[0]) {
    suggestions.push(`Phosphorus is low. Apply phosphatic fertilizers like DAP or SSP.`);
  } else if (phosphorus > crop.phosphorus[1]) {
    suggestions.push(`Phosphorus is adequate. Maintain current fertilization schedule.`);
  }

  // Potassium suggestions
  if (potassium < crop.potassium[0]) {
    suggestions.push(`Potassium is low. Apply potash fertilizers like MOP for better yield.`);
  } else if (potassium > crop.potassium[1]) {
    suggestions.push(`Potassium is high. Monitor for lodging in cereal crops.`);
  }

  // Temperature suggestions
  if (temperature < crop.temperature[0]) {
    suggestions.push(`Temperature is below optimal range. Consider mulching or protective covers.`);
  } else if (temperature > crop.temperature[1]) {
    suggestions.push(`Temperature is high. Implement irrigation cooling and shade protection.`);
  }

  // Humidity suggestions
  if (humidity < crop.humidity[0]) {
    suggestions.push(`Humidity is low. Consider irrigation to maintain soil moisture.`);
  } else if (humidity > crop.humidity[1]) {
    suggestions.push(`Humidity is high. Watch for fungal diseases. Ensure proper drainage and air circulation.`);
  }

  // Rainfall suggestions
  if (rainfall < crop.rainfall[0]) {
    suggestions.push(`Rainfall is insufficient. Plan for supplemental irrigation of ${crop.rainfall[0] - rainfall}mm equivalent.`);
  } else if (rainfall > crop.rainfall[1]) {
    suggestions.push(`Rainfall exceeds optimal range. Ensure proper drainage to prevent waterlogging.`);
  }

  // Crop-specific suggestions
  suggestions.push(`Best planting season: ${crop.season.join(', ')}`);
  suggestions.push(`Expected growth duration: ${crop.growthDuration}`);
  suggestions.push(`Water requirement: ${crop.waterRequirement}`);

  return suggestions;
}

// Statistics for visualization
export function getCropStatistics() {
  return {
    totalCrops: cropDatabase.length,
    nRange: { min: Math.min(...cropDatabase.map(c => c.nitrogen[0])), max: Math.max(...cropDatabase.map(c => c.nitrogen[1])) },
    pRange: { min: Math.min(...cropDatabase.map(c => c.phosphorus[0])), max: Math.max(...cropDatabase.map(c => c.phosphorus[1])) },
    kRange: { min: Math.min(...cropDatabase.map(c => c.potassium[0])), max: Math.max(...cropDatabase.map(c => crop.potassium[1])) },
    tempRange: { min: Math.min(...cropDatabase.map(c => c.temperature[0])), max: Math.max(...cropDatabase.map(c => c.temperature[1])) },
    humidityRange: { min: Math.min(...cropDatabase.map(c => c.humidity[0])), max: Math.max(...cropDatabase.map(c => c.humidity[1])) },
    phRange: { min: Math.min(...cropDatabase.map(c => c.ph[0])), max: Math.max(...cropDatabase.map(c => c.ph[1])) },
    rainfallRange: { min: Math.min(...cropDatabase.map(c => c.rainfall[0])), max: Math.max(...cropDatabase.map(c => c.rainfall[1])) }
  };
}

// Get crop distribution for charts
export function getCropDistribution() {
  const categories: Record<string, number> = {
    'Cereals': 0,
    'Oilseeds': 0,
    'Pulses': 0,
    'Fruits': 0,
    'Vegetables': 0,
    'Cash Crops': 0,
    'Spices': 0,
    'Plantation': 0
  };

  return categories;
}
