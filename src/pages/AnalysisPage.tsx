import { useState, useEffect } from 'react';
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Activity,
  Database,
  RefreshCw,
  Download,
  Filter,
  Calendar,
  BarChart as BarChartIcon
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  Legend,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { getPredictionHistory, getModelMetrics, getCropDistributionData, getFeatureImportance, generateCorrelationData } from '../utils/helpers';
import { PredictionResult } from '../types';

const COLORS = ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0', '#d1fae5', '#10b981', '#34d399'];

export default function AnalysisPage() {
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('all');

  const modelMetrics = getModelMetrics();
  const cropDistribution = getCropDistributionData();
  const featureImportance = getFeatureImportance();

  useEffect(() => {
    loadData();
  }, [timeRange]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getPredictionHistory(100);
      setPredictions(data);
    } catch (error) {
      console.error('Failed to load predictions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Process data for charts
  const cropFrequency = predictions.reduce((acc, p) => {
    acc[p.predictedCrop] = (acc[p.predictedCrop] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCrops = Object.entries(cropFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  const avgConfidenceByCrop = predictions.reduce((acc, p) => {
    if (!acc[p.predictedCrop]) {
      acc[p.predictedCrop] = { total: 0, count: 0 };
    }
    acc[p.predictedCrop].total += p.confidence;
    acc[p.predictedCrop].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const confidenceData = Object.entries(avgConfidenceByCrop)
    .map(([name, data]) => ({
      name,
      confidence: data.total / data.count
    }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 10);

  // Parameter averages
  const paramAverages = predictions.length > 0 ? {
    nitrogen: predictions.reduce((a, p) => a + p.input.nitrogen, 0) / predictions.length,
    phosphorus: predictions.reduce((a, p) => a + p.input.phosphorus, 0) / predictions.length,
    potassium: predictions.reduce((a, p) => a + p.input.potassium, 0) / predictions.length,
    temperature: predictions.reduce((a, p) => a + p.input.temperature, 0) / predictions.length,
    humidity: predictions.reduce((a, p) => a + p.input.humidity, 0) / predictions.length,
    ph: predictions.reduce((a, p) => a + p.input.ph, 0) / predictions.length,
    rainfall: predictions.reduce((a, p) => a + p.input.rainfall, 0) / predictions.length
  } : { nitrogen: 0, phosphorus: 0, potassium: 0, temperature: 0, humidity: 0, ph: 0, rainfall: 0 };

  const paramDistribution = [
    { name: 'N', value: paramAverages.nitrogen, full: 200 },
    { name: 'P', value: paramAverages.phosphorus, full: 150 },
    { name: 'K', value: paramAverages.potassium, full: 350 },
    { name: 'Temp', value: paramAverages.temperature, full: 50 },
    { name: 'Humid', value: paramAverages.humidity, full: 100 },
    { name: 'pH', value: paramAverages.ph, full: 14 },
    { name: 'Rain', value: paramAverages.rainfall, full: 350 }
  ];

  // Correlation matrix
  const correlationMatrix = generateCorrelationData();
  const correlationLabels = ['N', 'P', 'K', 'Temp', 'Humid', 'pH', 'Rain'];

  // Trends over time (simulated for demo)
  const trendData = [
    { day: 'Mon', predictions: Math.floor(Math.random() * 20 + 10), confidence: 85 + Math.random() * 10 },
    { day: 'Tue', predictions: Math.floor(Math.random() * 20 + 10), confidence: 85 + Math.random() * 10 },
    { day: 'Wed', predictions: Math.floor(Math.random() * 20 + 10), confidence: 85 + Math.random() * 10 },
    { day: 'Thu', predictions: Math.floor(Math.random() * 20 + 10), confidence: 85 + Math.random() * 10 },
    { day: 'Fri', predictions: Math.floor(Math.random() * 20 + 10), confidence: 85 + Math.random() * 10 },
    { day: 'Sat', predictions: Math.floor(Math.random() * 20 + 10), confidence: 85 + Math.random() * 10 },
    { day: 'Sun', predictions: Math.floor(Math.random() * 20 + 10), confidence: 85 + Math.random() * 10 }
  ];

  // Scatter plot data for N vs K
  const scatterData = predictions.slice(0, 50).map(p => ({
    n: p.input.nitrogen,
    k: p.input.potassium,
    crop: p.predictedCrop
  }));

  // Calculate statistics
  const stats = {
    totalPredictions: predictions.length,
    uniqueCrops: Object.keys(cropFrequency).length,
    avgConfidence: predictions.length > 0
      ? predictions.reduce((a, p) => a + p.confidence, 0) / predictions.length
      : 0,
    topCrop: topCrops[0]?.name || 'N/A'
  };

  const radarData = featureImportance.map(item => ({
    feature: item.feature,
    importance: item.importance * 100,
    fullMark: 25
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-2">
              <BarChart3 className="w-4 h-4" />
              Data Analysis Dashboard
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Visualization</h1>
            <p className="text-gray-600 mt-1">Explore prediction patterns and model performance</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
              {['7d', '30d', 'all'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range as '7d' | '30d' | 'all')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {range === 'all' ? 'All Time' : range}
                </button>
              ))}
            </div>

            <button
              onClick={loadData}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Predictions</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalPredictions}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Database className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Unique Crops</p>
                <p className="text-3xl font-bold text-gray-900">{stats.uniqueCrops}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Confidence</p>
                <p className="text-3xl font-bold text-green-600">{stats.avgConfidence.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Top Crop</p>
                <p className="text-2xl font-bold text-gray-900">{stats.topCrop}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <BarChartIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="spinner w-12 h-12"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Charts Row 1 */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Top Crops Bar Chart */}
              <div className="chart-container p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Recommended Crops</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topCrops} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" tick={{ fill: '#4b5563' }} />
                      <YAxis type="category" dataKey="name" tick={{ fill: '#4b5563' }} width={80} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      />
                      <Bar dataKey="count" fill="#16a34a" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Crop Distribution Pie */}
              <div className="chart-container p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Prediction Distribution by Category</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={cropDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {cropDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      />
                      <Legend />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Confidence by Crop */}
              <div className="chart-container p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Confidence by Crop</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={confidenceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fill: '#4b5563', fontSize: 11 }} angle={-45} textAnchor="end" height={60} />
                      <YAxis domain={[0, 100]} tick={{ fill: '#4b5563' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                        formatter={(value: number) => [`${value.toFixed(1)}%`, 'Confidence']}
                      />
                      <Bar dataKey="confidence" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Feature Importance Radar */}
              <div className="chart-container p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Importance Analysis</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="feature" tick={{ fill: '#4b5563' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 25]} />
                      <Radar
                        name="Importance"
                        dataKey="importance"
                        stroke="#16a34a"
                        fill="#16a34a"
                        fillOpacity={0.5}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Charts Row 3 - Full Width */}
            <div className="chart-container p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Prediction Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" tick={{ fill: '#4b5563' }} />
                    <YAxis yAxisId="left" tick={{ fill: '#4b5563' }} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{ fill: '#4b5563' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="predictions"
                      stroke="#16a34a"
                      fill="#16a34a"
                      fillOpacity={0.3}
                      name="Predictions"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="confidence"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="Confidence %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts Row 4 */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Model Comparison */}
              <div className="chart-container p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Performance Comparison</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={modelMetrics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fill: '#4b5563', fontSize: 10 }} />
                      <YAxis domain={[0.8, 1]} tick={{ fill: '#4b5563' }} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                        formatter={(value: number) => [`${(value * 100).toFixed(1)}%`]}
                      />
                      <Legend />
                      <Bar dataKey="accuracy" fill="#16a34a" name="Accuracy" />
                      <Bar dataKey="precision" fill="#22c55e" name="Precision" />
                      <Bar dataKey="recall" fill="#4ade80" name="Recall" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Parameter Distribution */}
              <div className="chart-container p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Parameter Values</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={paramDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fill: '#4b5563' }} />
                      <YAxis tick={{ fill: '#4b5563' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      />
                      <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Avg Value" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Correlation Heatmap */}
            <div className="chart-container p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Correlation Matrix</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700"></th>
                      {correlationLabels.map((label) => (
                        <th key={label} className="px-4 py-2 text-center text-sm font-medium text-gray-700">{label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {correlationMatrix.map((row, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2 text-sm font-medium text-gray-700">{correlationLabels[i]}</td>
                        {row.map((value, j) => (
                          <td
                            key={j}
                            className="px-4 py-2 text-center text-sm"
                            style={{
                              backgroundColor: `rgba(22, 163, 74, ${Math.abs(value)})`,
                              color: Math.abs(value) > 0.5 ? 'white' : '#1f2937'
                            }}
                          >
                            {value.toFixed(2)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-4">Values range from -1 (negative correlation) to 1 (positive correlation)</p>
            </div>

            {/* Recent Predictions Table */}
            <div className="chart-container p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Predictions</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nitrogen</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phosphorus</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Potassium</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">pH</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Predicted Crop</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {predictions.slice(0, 10).map((pred, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {pred.createdAt.toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{pred.input.nitrogen}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{pred.input.phosphorus}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{pred.input.potassium}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{pred.input.ph}</td>
                        <td className="px-4 py-3">
                          <span className="badge badge-green">{pred.predictedCrop}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500 rounded-full"
                                style={{ width: `${pred.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{pred.confidence.toFixed(1)}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
