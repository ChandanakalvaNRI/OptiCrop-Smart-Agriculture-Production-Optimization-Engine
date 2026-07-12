import { useState, useEffect } from 'react';
import {
  Sprout,
  Droplets,
  FlaskConical,
  Thermometer,
  Activity,
  Shield,
  CloudRain,
  Calculator,
  Sparkles,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  Info,
  BarChart3,
  TrendingUp,
  Loader2,
  RotateCcw,
  Download,
  Share2
} from 'lucide-react';
import { PredictionResult, PredictionInput } from '../types';
import { runPrediction, validateInput, generateDemoInput, formatNumber, getCropColor } from '../utils/helpers';
import { cropDatabase } from '../data/cropData';

interface PredictPageProps {
  onPredictionComplete: (result: PredictionResult) => void;
  initialResult?: PredictionResult | null;
}

export default function PredictPage({ onPredictionComplete, initialResult }: PredictPageProps) {
  const [input, setInput] = useState<PredictionInput>({
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    temperature: 0,
    humidity: 0,
    ph: 0,
    rainfall: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(initialResult || null);
  const [errors, setErrors] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(!!initialResult);
  const [activeField, setActiveField] = useState<string | null>(null);

  const parameters = [
    { key: 'nitrogen', label: 'Nitrogen (N)', unit: 'kg/ha', icon: Droplets, color: 'blue', min: 0, max: 200, step: 1, description: 'Essential for leaf growth and photosynthesis' },
    { key: 'phosphorus', label: 'Phosphorus (P)', unit: 'kg/ha', icon: FlaskConical, color: 'orange', min: 0, max: 150, step: 1, description: 'Vital for root development and energy transfer' },
    { key: 'potassium', label: 'Potassium (K)', unit: 'kg/ha', icon: Thermometer, color: 'red', min: 0, max: 350, step: 1, description: 'Critical for water regulation and disease resistance' },
    { key: 'temperature', label: 'Temperature', unit: '°C', icon: Thermometer, color: 'orange', min: 0, max: 50, step: 0.1, description: 'Affects seed germination and plant metabolism' },
    { key: 'humidity', label: 'Humidity', unit: '%', icon: Activity, color: 'cyan', min: 0, max: 100, step: 0.1, description: 'Influences transpiration and disease spread' },
    { key: 'ph', label: 'Soil pH', unit: '', icon: Shield, color: 'green', min: 0, max: 14, step: 0.1, description: 'Determines nutrient availability in soil' },
    { key: 'rainfall', label: 'Rainfall', unit: 'mm', icon: CloudRain, color: 'indigo', min: 0, max: 350, step: 1, description: 'Primary water source for crop growth' }
  ];

  const handleChange = (key: keyof PredictionInput, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInput(prev => ({ ...prev, [key]: numValue }));
    setErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    const validation = validateInput(input);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsLoading(false);
      return;
    }

    try {
      const prediction = await runPrediction(input);
      setResult(prediction);
      setShowResult(true);
      onPredictionComplete(prediction);
    } catch (error) {
      setErrors(['Prediction failed. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemo = () => {
    const demo = generateDemoInput();
    setInput(demo);
    setErrors([]);
  };

  const handleReset = () => {
    setInput({
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      temperature: 0,
      humidity: 0,
      ph: 0,
      rainfall: 0
    });
    setResult(null);
    setShowResult(false);
    setErrors([]);
  };

  const getCropDetails = (cropName: string) => {
    return cropDatabase.find(c => c.name === cropName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Crop Prediction Engine
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Analyze Your Soil Parameters
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your soil nutrient levels and environmental conditions to get AI-powered
            crop recommendations with confidence scores.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className={`${showResult ? 'lg:col-span-1' : 'lg:col-span-2 max-w-3xl mx-auto'}`}>
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Input Parameters</h2>
                <button
                  onClick={handleDemo}
                  className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                >
                  <Sparkles className="w-4 h-4" />
                  Fill Demo Data
                </button>
              </div>

              {errors.length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-red-800 mb-1">Validation Errors</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        {errors.map((error, idx) => (
                          <li key={idx}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {parameters.map((param) => {
                    const Icon = param.icon;
                    return (
                      <div key={param.key} className="relative">
                        <label className="input-label flex items-center gap-2">
                          <Icon className={`w-4 h-4 text-${param.color}-500`} />
                          {param.label}
                          <span className="text-gray-400 text-xs">({param.min}-{param.max}{param.unit})</span>
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={input[param.key as keyof PredictionInput]}
                            onChange={(e) => handleChange(param.key as keyof PredictionInput, e.target.value)}
                            onFocus={() => setActiveField(param.key)}
                            onBlur={() => setActiveField(null)}
                            min={param.min}
                            max={param.max}
                            step={param.step}
                            placeholder={`Enter ${param.label}`}
                            className="input-field pr-16"
                            required
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                            {param.unit}
                          </span>
                        </div>
                        <input
                          type="range"
                          value={input[param.key as keyof PredictionInput]}
                          onChange={(e) => handleChange(param.key as keyof PredictionInput, e.target.value)}
                          min={param.min}
                          max={param.max}
                          step={param.step}
                          className="w-full h-1 mt-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-5 h-5" />
                        Predict Best Crop
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Tips */}
            <div className="mt-6 card p-4 bg-green-50 border-green-200">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Quick Tips</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>Most crops prefer soil pH between 6.0-7.0</li>
                    <li>Optimal N-P-K ratios vary by crop type</li>
                    <li>Rainfall requirements depend on temperature and humidity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          {showResult && result && (
            <div className="lg:col-span-1 animate-slideInRight">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Prediction Result</h2>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Recommended Crop */}
                <div className="mb-6 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Sprout className="w-6 h-6 text-green-600" />
                    <span className="text-sm font-medium text-green-700">Recommended Crop</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{result.predictedCrop}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="text-lg font-semibold text-green-600">
                        {formatNumber(result.confidence, 1)}% Confidence
                      </span>
                    </div>
                    <div className="flex-1 h-3 bg-white rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                        style={{ width: `${result.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Confidence Bar with Label */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Model Confidence Level</p>
                  <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Crop Details */}
                {(() => {
                  const cropDetails = getCropDetails(result.predictedCrop);
                  if (cropDetails) {
                    return (
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Crop Information</h4>
                        <p className="text-sm text-gray-600 mb-3">{cropDetails.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Season:</span>
                            <span className="font-medium">{cropDetails.season.join(', ')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Duration:</span>
                            <span className="font-medium">{cropDetails.growthDuration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Water:</span>
                            <span className="font-medium">{cropDetails.waterRequirement}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Soil:</span>
                            <span className="font-medium">{cropDetails.soilType[0]}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* Soil Type */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">Soil Recommendation</h4>
                      <p className="text-sm text-gray-600 mt-1">{result.soilType}</p>
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Farming Suggestions
                  </h4>
                  <ul className="space-y-2">
                    {result.suggestions.slice(0, 6).map((suggestion, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Alternative Crops */}
                {result.alternatives.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Alternative Crops</h4>
                    <div className="space-y-2">
                      {result.alternatives.map((alt, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700">{alt.crop}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500 rounded-full"
                                style={{ width: `${alt.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500">{formatNumber(alt.confidence, 1)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Input Summary */}
              <div className="mt-4 card p-4">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Input Summary</h4>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {Object.entries(result.input).map(([key, value]) => (
                    <div key={key} className="p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500 capitalize">{key}</p>
                      <p className="text-sm font-semibold text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Parameter Reference Guide */}
        {!showResult && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Parameter Reference Guide</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {parameters.map((param) => {
                const Icon = param.icon;
                return (
                  <div key={param.key} className="card p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-${param.color}-100 flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 text-${param.color}-600`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{param.label}</h3>
                        <p className="text-xs text-gray-500">Range: {param.min}-{param.max} {param.unit}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{param.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-gray-500">Optimal Range:</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
                        <div
                          className="absolute h-full bg-green-400 rounded-full"
                          style={{ left: '20%', width: '60%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
