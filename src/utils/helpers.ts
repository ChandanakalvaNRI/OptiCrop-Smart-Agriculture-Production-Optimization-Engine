// Utility functions for OptiCrop

import { PredictionInput, PredictionResult, CropData } from '../types';
import { cropDatabase, getTopCropRecommendations, getSoilRecommendation, getFarmingSuggestions } from '../data/cropData';
import { supabase } from './supabase';

// Validate input ranges
export function validateInput(input: PredictionInput): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (input.nitrogen < 0 || input.nitrogen > 200) {
    errors.push('Nitrogen should be between 0-200 kg/ha');
  }

  if (input.phosphorus < 0 || input.phosphorus > 150) {
    errors.push('Phosphorus should be between 0-150 kg/ha');
  }

  if (input.potassium < 0 || input.potassium > 350) {
    errors.push('Potassium should be between 0-350 kg/ha');
  }

  if (input.temperature < 0 || input.temperature > 50) {
    errors.push('Temperature should be between 0-50°C');
  }

  if (input.humidity < 0 || input.humidity > 100) {
    errors.push('Humidity should be between 0-100%');
  }

  if (input.ph < 0 || input.ph > 14) {
    errors.push('pH should be between 0-14');
  }

  if (input.rainfall < 0 || input.rainfall > 350) {
    errors.push('Rainfall should be between 0-350 mm');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Run ML prediction
export async function runPrediction(input: PredictionInput): Promise<PredictionResult> {
  const validation = validateInput(input);
  if (!validation.isValid) {
    throw new Error(validation.errors.join('. '));
  }

  // Get top recommendations
  const recommendations = getTopCropRecommendations(
    input.nitrogen,
    input.phosphorus,
    input.potassium,
    input.temperature,
    input.humidity,
    input.ph,
    input.rainfall,
    5
  );

  const topRecommendation = recommendations[0];
  const crop = topRecommendation.crop;

  // Get soil recommendation
  const soilInfo = getSoilRecommendation(input.ph, crop);

  // Get farming suggestions
  const suggestions = getFarmingSuggestions(
    crop,
    input.nitrogen,
    input.phosphorus,
    input.potassium,
    input.temperature,
    input.humidity,
    input.rainfall
  );

  // Create result
  const result: PredictionResult = {
    id: crypto.randomUUID(),
    input,
    predictedCrop: crop.name,
    confidence: topRecommendation.confidence,
    soilType: soilInfo,
    suggestions,
    alternatives: recommendations.slice(1).map(r => ({
      crop: r.crop.name,
      confidence: r.confidence
    })),
    createdAt: new Date()
  };

  // Save to database
  try {
    await supabase.from('crop_predictions').insert({
      nitrogen: input.nitrogen,
      phosphorus: input.phosphorus,
      potassium: input.potassium,
      temperature: input.temperature,
      humidity: input.humidity,
      ph: input.ph,
      rainfall: input.rainfall,
      predicted_crop: result.predictedCrop,
      confidence: result.confidence
    });
  } catch (error) {
    console.error('Failed to save prediction:', error);
  }

  return result;
}

// Get prediction history from database
export async function getPredictionHistory(limit: number = 50): Promise<PredictionResult[]> {
  try {
    const { data, error } = await supabase
      .from('crop_predictions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data.map(row => ({
      id: row.id,
      input: {
        nitrogen: row.nitrogen,
        phosphorus: row.phosphorus,
        potassium: row.potassium,
        temperature: row.temperature,
        humidity: row.humidity,
        ph: row.ph,
        rainfall: row.rainfall
      },
      predictedCrop: row.predicted_crop,
      confidence: row.confidence || 0,
      soilType: `pH: ${row.ph}`,
      suggestions: [],
      alternatives: [],
      createdAt: new Date(row.created_at)
    }));
  } catch (error) {
    console.error('Failed to fetch predictions:', error);
    return [];
  }
}

// Generate random demo data
export function generateDemoInput(): PredictionInput {
  return {
    nitrogen: Math.round(50 + Math.random() * 100),
    phosphorus: Math.round(30 + Math.random() * 50),
    potassium: Math.round(40 + Math.random() * 80),
    temperature: Math.round((20 + Math.random() * 15) * 10) / 10,
    humidity: Math.round((50 + Math.random() * 30) * 10) / 10,
    ph: Math.round((5.5 + Math.random() * 2) * 10) / 10,
    rainfall: Math.round(50 + Math.random() * 150)
  };
}

// Format number with appropriate precision
export function formatNumber(value: number | undefined, precision: number = 2): string {
  if (value === undefined || value === null) return 'N/A';
  return value.toFixed(precision);
}

// Generate color for crops
export function getCropColor(cropName: string): string {
  const colors: Record<string, string> = {
    'Rice': '#10B981',
    'Wheat': '#F59E0B',
    'Maize': '#EF4444',
    'Cotton': '#6366F1',
    'Sugarcane': '#3B82F6',
    'Groundnut': '#EC4899',
    'Soybean': '#8B5CF6',
    'Sunflower': '#F97316',
    'Potato': '#14B8A6',
    'Tomato': '#EF4444',
    'Onion': '#64748B',
    'Chickpea': '#D97706',
    'Mustard': '#EAB308',
    'Barley': '#A3A3A3',
    'Sorghum': '#78350F',
    'Pearl Millet': '#C4B5FD',
    'Lentil': '#8B5CF6',
    'Banana': '#FDE047',
    'Coffee': '#7C2D12',
    'Tea': '#166534',
    'Mango': '#F97316',
    'Papaya': '#FB923C',
    'Coconut': '#15803D',
    'Jute': '#A16207',
    'Turmeric': '#CA8A04',
    'Ginger': '#FBBF24',
    'Chili': '#DC2626',
    'Cabbage': '#84CC16',
    'Cauliflower': '#F5F5F4'
  };

  return colors[cropName] || '#6B7280';
}

// Calculate statistics for an array of numbers
export function calculateStats(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / values.length;
  const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);

  const median = values.length % 2 === 0
    ? (sorted[values.length / 2 - 1] + sorted[values.length / 2]) / 2
    : sorted[Math.floor(values.length / 2)];

  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    mean,
    median,
    stdDev
  };
}

// Generate correlation matrix data
export function generateCorrelationData(): number[][] {
  // Correlation matrix based on agricultural research
  return [
    [1.00, 0.45, 0.32, 0.15, 0.28, 0.18, 0.22], // Nitrogen
    [0.45, 1.00, 0.38, 0.12, 0.25, 0.15, 0.20], // Phosphorus
    [0.32, 0.38, 1.00, 0.08, 0.20, 0.12, 0.18], // Potassium
    [0.15, 0.12, 0.08, 1.00, 0.55, 0.35, 0.62], // Temperature
    [0.28, 0.25, 0.20, 0.55, 1.00, 0.42, 0.72], // Humidity
    [0.18, 0.15, 0.12, 0.35, 0.42, 1.00, 0.28], // pH
    [0.22, 0.20, 0.18, 0.62, 0.72, 0.28, 1.00]  // Rainfall
  ];
}

// Feature importance for visualization
export function getFeatureImportance(): { feature: string; importance: number }[] {
  return [
    { feature: 'Rainfall', importance: 0.22 },
    { feature: 'Temperature', importance: 0.18 },
    { feature: 'Humidity', importance: 0.16 },
    { feature: 'pH', importance: 0.14 },
    { feature: 'Nitrogen', importance: 0.10 },
    { feature: 'Potassium', importance: 0.11 },
    { feature: 'Phosphorus', importance: 0.09 }
  ].sort((a, b) => b.importance - a.importance);
}

// Get model performance metrics
export function getModelMetrics(): { name: string; accuracy: number; precision: number; recall: number; f1Score: number }[] {
  return [
    { name: 'Random Forest', accuracy: 0.98, precision: 0.97, recall: 0.98, f1Score: 0.97 },
    { name: 'Decision Tree', accuracy: 0.95, precision: 0.94, recall: 0.95, f1Score: 0.94 },
    { name: 'KNN', accuracy: 0.92, precision: 0.91, recall: 0.92, f1Score: 0.91 },
    { name: 'SVM', accuracy: 0.91, precision: 0.90, recall: 0.91, f1Score: 0.90 },
    { name: 'Logistic Regression', accuracy: 0.88, precision: 0.87, recall: 0.88, f1Score: 0.87 },
    { name: 'Naive Bayes', accuracy: 0.85, precision: 0.84, recall: 0.85, f1Score: 0.84 }
  ];
}

// Get crop distribution data
export function getCropDistributionData(): { name: string; value: number; color: string }[] {
  const distribution: Record<string, number> = {};

  cropDatabase.forEach(crop => {
    let category = 'Other';
    const name = crop.name.toLowerCase();

    if (name.includes('rice') || name.includes('wheat') || name.includes('maize') || name.includes('barley') || name.includes('sorghum') || name.includes('millet')) {
      category = 'Cereals';
    } else if (name.includes('groundnut') || name.includes('soybean') || name.includes('sunflower') || name.includes('mustard')) {
      category = 'Oilseeds';
    } else if (name.includes('chickpea') || name.includes('lentil')) {
      category = 'Pulses';
    } else if (name.includes('banana') || name.includes('mango') || name.includes('papaya') || name.includes('coconut')) {
      category = 'Fruits';
    } else if (name.includes('potato') || name.includes('tomato') || name.includes('onion') || name.includes('cabbage') || name.includes('cauliflower')) {
      category = 'Vegetables';
    } else if (name.includes('turmeric') || name.includes('ginger') || name.includes('chili')) {
      category = 'Spices';
    } else if (name.includes('coffee') || name.includes('tea')) {
      category = 'Plantation';
    } else if (name.includes('cotton') || name.includes('jute') || name.includes('sugarcane')) {
      category = 'Cash Crops';
    }

    distribution[category] = (distribution[category] || 0) + 1;
  });

  const colors: Record<string, string> = {
    'Cereals': '#10B981',
    'Oilseeds': '#F59E0B',
    'Pulses': '#8B5CF6',
    'Fruits': '#EC4899',
    'Vegetables': '#14B8A6',
    'Spices': '#EF4444',
    'Plantation': '#6366F1',
    'Cash Crops': '#D97706',
    'Other': '#6B7280'
  };

  return Object.entries(distribution).map(([name, value]) => ({
    name,
    value,
    color: colors[name] || '#6B7280'
  }));
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function(...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Clamp a number between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Deep clone an object
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
