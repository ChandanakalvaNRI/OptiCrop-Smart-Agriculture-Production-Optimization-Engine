import { useState, useEffect } from 'react';
import {
  Sprout,
  Brain,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Droplets,
  Thermometer,
  FlaskConical,
  CloudRain,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Target,
  ChevronRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, LineChart as RechartsLineChart, Line, Legend } from 'recharts';
import { getModelMetrics, getCropDistributionData, getPredictionHistory } from '../utils/helpers';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [stats, setStats] = useState({ totalPredictions: 0, avgConfidence: 0 });
  const modelMetrics = getModelMetrics();
  const cropDistribution = getCropDistributionData();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const predictions = await getPredictionHistory(100);
    if (predictions.length > 0) {
      const avgConf = predictions.reduce((acc, p) => acc + (p.confidence || 0), 0) / predictions.length;
      setStats({
        totalPredictions: predictions.length,
        avgConfidence: Math.round(avgConf)
      });
    }
  };

  const features = [
    {
      icon: Brain,
      title: 'Machine Learning',
      description: 'Advanced ML algorithms including Random Forest, SVM, and Decision Trees for accurate crop prediction.'
    },
    {
      icon: BarChart3,
      title: 'Data Analytics',
      description: 'Comprehensive analysis of soil nutrients, weather patterns, and environmental conditions.'
    },
    {
      icon: Activity,
      title: 'Real-time Prediction',
      description: 'Instant crop recommendations based on 7 key agricultural parameters.'
    },
    {
      icon: LineChart,
      title: 'Visualization',
      description: 'Interactive charts and graphs for data distribution and model performance.'
    }
  ];

  const parameters = [
    { icon: Droplets, name: 'Nitrogen (N)', color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: FlaskConical, name: 'Phosphorus (P)', color: 'text-orange-600', bg: 'bg-orange-100' },
    { icon: Thermometer, name: 'Temperature', color: 'text-red-600', bg: 'bg-red-100' },
    { icon: Activity, name: 'Humidity', color: 'text-cyan-600', bg: 'bg-cyan-100' },
    { icon: Shield, name: 'Soil pH', color: 'text-green-600', bg: 'bg-green-100' },
    { icon: CloudRain, name: 'Rainfall', color: 'text-indigo-600', bg: 'bg-indigo-100' }
  ];

  const benefits = [
    { icon: Target, title: 'High Accuracy', value: '98%', desc: 'Model accuracy' },
    { icon: TrendingUp, title: 'Better Yields', value: '30%', desc: 'Average increase' },
    { icon: Users, title: 'Farmers Helped', value: '10K+', desc: 'Active users' },
    { icon: Zap, title: 'Lightning Fast', value: '< 1s', desc: 'Prediction time' }
  ];

  const COLORS = ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0', '#d1fae5'];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center hero-gradient">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 -left-20 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
                <Sprout className="w-4 h-4" />
                AI-Powered Agriculture
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Smart Crop{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
                  Recommendations
                </span>{' '}
                with AI
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                OptiCrop uses advanced machine learning algorithms to analyze soil nutrients,
                weather conditions, and environmental factors to recommend the best crop
                for maximum yield and sustainability.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('predict')}
                  className="btn-primary flex items-center justify-center gap-2 text-lg"
                >
                  Start Prediction
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className="btn-secondary flex items-center justify-center gap-2 text-lg"
                >
                  Learn More
                </button>
              </div>

              <div className="mt-10 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Free to Use</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>No Sign-up Required</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>30+ Crop Types</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block animate-slideInRight">
              <div className="relative">
                <div className="w-full h-[500px] rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center animate-float">
                        <Sprout className="w-16 h-16 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">30+ Crop Varieties</h3>
                      <p className="text-green-100">Analysis powered by 7 parameters</p>

                      <div className="grid grid-cols-3 gap-4 mt-8">
                        {parameters.slice(0, 6).map((param, idx) => (
                          <div key={idx} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                            <param.icon className={`w-6 h-6 mx-auto text-white`} />
                            <p className="text-xs text-white/80 mt-1">{param.name.split(' ')[0]}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-xl p-4 animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">AI Model</p>
                      <p className="text-xs text-gray-500">98% Accuracy</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Yield Boost</p>
                      <p className="text-xs text-gray-500">Up to 30%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="stat-card text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{benefit.value}</p>
                <p className="text-sm font-medium text-gray-800">{benefit.title}</p>
                <p className="text-xs text-gray-500">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-gray-50">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle mx-auto">
            OptiCrop combines cutting-edge technology with agricultural expertise
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card group cursor-pointer" onClick={() => onNavigate('about')}>
              <div className="feature-icon group-hover:bg-green-500 transition-colors">
                <feature.icon className="w-7 h-7 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle mx-auto">
            Three simple steps to get your crop recommendation
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Enter Parameters', desc: 'Input soil nutrient levels (N, P, K), temperature, humidity, pH, and rainfall.' },
              { step: '02', title: 'AI Analysis', desc: 'Our ML model processes your data using trained algorithms including Random Forest and SVM.' },
              { step: '03', title: 'Get Recommendation', desc: 'Receive instant crop suggestions with confidence scores and farming tips.' }
            ].map((item, idx) => (
              <div key={idx} className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>

                {idx < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-green-300 to-green-200"></div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('predict')}
              className="btn-accent inline-flex items-center gap-2"
            >
              Try It Now <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Model Performance */}
      <section className="section bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Model Performance Comparison</h2>
            <p className="section-subtitle mx-auto">
              Our algorithms are trained on extensive agricultural data for optimal accuracy
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Accuracy Chart */}
            <div className="chart-container">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Model Accuracy Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={modelMetrics} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: '#4b5563' }} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#4b5563' }} width={120} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Accuracy']}
                    />
                    <Bar dataKey="accuracy" fill="#16a34a" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Crop Distribution */}
            <div className="chart-container">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Crop Category Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={cropDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
        </div>
      </section>

      {/* Parameters Section */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Analyzed Parameters</h2>
            <p className="section-subtitle mx-auto">
              Seven crucial factors determine the optimal crop for your field
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Droplets, name: 'Nitrogen', unit: 'kg/ha', range: '0-200', color: 'blue' },
              { icon: FlaskConical, name: 'Phosphorus', unit: 'kg/ha', range: '0-150', color: 'orange' },
              { icon: Thermometer, name: 'Potassium', unit: 'kg/ha', range: '0-350', color: 'red' },
              { icon: Activity, name: 'Temperature', unit: '°C', range: '0-50', color: 'cyan' },
              { icon: Shield, name: 'Humidity', unit: '%', range: '0-100', color: 'green' },
              { icon: CloudRain, name: 'Rainfall', unit: 'mm', range: '0-350', color: 'indigo' }
            ].map((param, idx) => (
              <div key={idx} className={`card p-5 text-center hover:shadow-lg`}>
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-${param.color}-100 flex items-center justify-center`}>
                  <param.icon className={`w-6 h-6 text-${param.color}-600`} />
                </div>
                <h4 className="font-semibold text-gray-900">{param.name}</h4>
                <p className="text-xs text-gray-500 mt-1">Range: {param.range} {param.unit}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">Additionally, soil pH (0-14) plays a crucial role in nutrient availability</p>
            <button
              onClick={() => onNavigate('predict')}
              className="btn-primary inline-flex items-center gap-2"
            >
              Analyze Your Soil <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Optimize Your Crop Selection?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Join farmers worldwide who are making smarter agricultural decisions with OptiCrop
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('predict')}
              className="bg-white text-green-600 font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get Started Free
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="bg-green-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-800 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
