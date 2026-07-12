// Types for the OptiCrop application

export interface PredictionInput {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export interface PredictionResult {
  id: string;
  input: PredictionInput;
  predictedCrop: string;
  confidence: number;
  soilType: string;
  suggestions: string[];
  alternatives: Array<{
    crop: string;
    confidence: number;
  }>;
  createdAt: Date;
}

export interface ModelMetrics {
  modelName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainingTime: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
}

export interface CorrelationData {
  feature1: string;
  feature2: string;
  correlation: number;
}

export interface CropDistribution {
  crop: string;
  count: number;
  percentage: number;
}

export interface ParameterStats {
  min: number;
  max: number;
  mean: number;
  median: number;
  stdDev: number;
}

export interface DashboardStats {
  totalPredictions: number;
  averageConfidence: number;
  topCrops: Array<{ crop: string; count: number }>;
  recentPredictions: PredictionResult[];
}

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export type Page = 'home' | 'about' | 'predict' | 'results' | 'dashboard' | 'analysis';

export interface AppState {
  currentPage: Page;
  isLoading: boolean;
  error: string | null;
  predictionResult: PredictionResult | null;
  predictions: PredictionResult[];
}
