import { useState } from 'react';
import {
  Target,
  Brain,
  Database,
  Cpu,
  Globe,
  Leaf,
  BarChart3,
  LineChart,
  Network,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  PieChart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, AreaChart, Area } from 'recharts';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'ml', label: 'Machine Learning', icon: Brain },
    { id: 'dataset', label: 'Dataset', icon: Database },
    { id: 'workflow', label: 'Workflow', icon: ArrowRight }
  ];

  const objectives = [
    'Develop a predictive model for crop recommendation',
    'Analyze soil nutrients and environmental parameters',
    'Compare multiple ML algorithms for best performance',
    'Create an intuitive user interface',
    'Provide actionable farming recommendations'
  ];

  const mlModels = [
    { name: 'Random Forest', accuracy: 98, type: 'Ensemble', status: 'Best' },
    { name: 'Decision Tree', accuracy: 95, type: 'Tree-based', status: 'Good' },
    { name: 'K-Nearest Neighbors', accuracy: 92, type: 'Instance-based', status: 'Good' },
    { name: 'Support Vector Machine', accuracy: 91, type: 'Kernel-based', status: 'Good' },
    { name: 'Logistic Regression', accuracy: 88, type: 'Linear', status: 'Moderate' },
    { name: 'Naive Bayes', accuracy: 85, type: 'Probabilistic', status: 'Moderate' }
  ];

  const featureImportance = [
    { feature: 'Rainfall', value: 22, fullMark: 25 },
    { feature: 'Temperature', value: 18, fullMark: 25 },
    { feature: 'Humidity', value: 16, fullMark: 25 },
    { feature: 'pH', value: 14, fullMark: 25 },
    { feature: 'Nitrogen', value: 10, fullMark: 25 },
    { feature: 'Potassium', value: 11, fullMark: 25 },
    { feature: 'Phosphorus', value: 9, fullMark: 25 }
  ];

  const dataFlow = [
    { stage: 'Input', desc: 'Soil parameters' },
    { stage: 'Preprocessing', desc: 'Normalization' },
    { stage: 'Feature Scaling', desc: 'Standardization' },
    { stage: 'ML Model', desc: 'Prediction' },
    { stage: 'Output', desc: 'Crop recommendation' }
  ];

  const workflowSteps = [
    { step: 1, title: 'Data Collection', desc: 'Gathering soil, weather, and crop data from agricultural sources', icon: Database },
    { step: 2, title: 'Data Preprocessing', desc: 'Cleaning, handling missing values, and feature engineering', icon: Cpu },
    { step: 3, title: 'Model Training', desc: 'Training multiple ML models with cross-validation', icon: Brain },
    { step: 4, title: 'Evaluation', desc: 'Comparing models using accuracy, precision, recall, F1-score', icon: BarChart3 },
    { step: 5, title: 'Deployment', desc: 'Integrating the best model into the web application', icon: Globe }
  ];

  const applications = [
    { icon: Leaf, title: 'Precision Farming', desc: 'Data-driven agricultural decisions' },
    { icon: BarChart3, title: 'Yield Optimization', desc: 'Maximize crop production' },
    { icon: Network, title: 'Crop Rotation Planning', desc: 'Sustainable farming practices' },
    { icon: LineChart, title: 'Resource Management', desc: 'Optimize fertilizer and water usage' }
  ];

  const futureScope = [
    'Integration with IoT sensors for real-time data',
    'Satellite imagery analysis for large-scale insights',
    'Mobile application for field use',
    'Multi-language support for global reach',
    'Integration with weather APIs',
    'Historical yield analysis'
  ];

  const radarData = featureImportance.map(item => ({
    feature: item.feature,
    value: item.value,
    fullMark: 25
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Hero */}
      <section className="py-16 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />
            About OptiCrop
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Understanding Agricultural AI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive machine learning system for intelligent crop recommendation
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-fadeIn">
            {/* Problem Statement */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                Problem Statement
              </h2>
              <div className="card p-6">
                <p className="text-gray-700 leading-relaxed">
                  Traditional farming relies heavily on experience and intuition, often leading to suboptimal
                  crop selection. Farmers face challenges in understanding the complex relationships between
                  soil nutrients, weather conditions, and crop suitability. This results in:
                </p>
                <ul className="mt-4 space-y-2">
                  {['Poor crop yields due to inappropriate crop selection', 'Wastage of resources (fertilizers, water)', 'Soil degradation from continuous wrong crop cultivation', 'Economic losses for farmers'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Objectives */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-green-500" />
                Project Objectives
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {objectives.map((obj, idx) => (
                  <div key={idx} className="card p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-green-600">{idx + 1}</span>
                    </div>
                    <p className="text-gray-700">{obj}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Applications */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6 text-blue-500" />
                Applications
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {applications.map((app, idx) => (
                  <div key={idx} className="feature-card">
                    <app.icon className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="font-semibold text-gray-900">{app.title}</h3>
                    <p className="text-sm text-gray-600">{app.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Future Scope */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <ArrowRight className="w-6 h-6 text-purple-500" />
                Future Scope
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {futureScope.map((item, idx) => (
                  <div key={idx} className="card p-4 border-l-4 border-green-500">
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'ml' && (
          <div className="space-y-12 animate-fadeIn">
            {/* ML Overview */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Machine Learning Pipeline</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Machine Learning?</h3>
                  <p className="text-gray-600 mb-4">
                    Machine Learning enables us to discover complex patterns in agricultural data that
                    traditional methods cannot identify. By training on historical crop data and
                    environmental parameters, our system learns to predict the most suitable crop
                    for given conditions.
                  </p>
                  <ul className="space-y-2">
                    {['Handles multiple input parameters simultaneously', 'Learns from large datasets', 'Adapts to new patterns', 'Provides confidence scores'].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="chart-container p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Importance</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="feature" tick={{ fill: '#4b5563', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 25]} />
                      <Radar
                        name="Importance"
                        dataKey="value"
                        stroke="#16a34a"
                        fill="#16a34a"
                        fillOpacity={0.5}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* Model Comparison */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Model Comparison</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="chart-container p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Accuracy Metrics</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mlModels}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis domain={[80, 100]} tick={{ fill: '#4b5563' }} />
                      <Tooltip
                        formatter={(value: number) => [`${value}%`, 'Accuracy']}
                      />
                      <Bar dataKey="accuracy" fill="#16a34a" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  {mlModels.map((model, idx) => (
                    <div key={idx} className="card p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{model.name}</h4>
                        <p className="text-sm text-gray-500">{model.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{model.accuracy}%</p>
                        <span className={`badge ${
                          model.status === 'Best' ? 'badge-green' :
                          model.status === 'Good' ? 'badge-blue' : 'badge-orange'
                        }`}>
                          {model.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Selected Model Details */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Selected Model: Random Forest</h2>
              <div className="card p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Algorithm</h4>
                    <p className="text-gray-600">
                      Random Forest is an ensemble learning method that constructs multiple
                      decision trees and outputs the mode of classes for classification.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Advantages</h4>
                    <ul className="space-y-1 text-gray-600">
                      {['High accuracy', 'Handles non-linear data', 'Reduces overfitting', 'Feature importance ranking'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Performance Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Accuracy</span>
                        <span className="font-semibold text-green-600">98%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Precision</span>
                        <span className="font-semibold text-green-600">97%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Recall</span>
                        <span className="font-semibold text-green-600">98%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">F1 Score</span>
                        <span className="font-semibold text-green-600">97%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'dataset' && (
          <div className="space-y-12 animate-fadeIn">
            {/* Dataset Overview */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dataset Overview</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Samples', value: '2,200+' },
                  { label: 'Features', value: '7' },
                  { label: 'Target Classes', value: '30+' },
                  { label: 'Data Quality', value: '99.5%' }
                ].map((stat, idx) => (
                  <div key={idx} className="stat-card text-center">
                    <p className="text-3xl font-bold text-green-600">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Input Features</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Nitrogen (N)', range: '0-200 kg/ha', type: 'Numerical', icon: '🌱' },
                  { name: 'Phosphorus (P)', range: '0-150 kg/ha', type: 'Numerical', icon: '⚗️' },
                  { name: 'Potassium (K)', range: '0-350 kg/ha', type: 'Numerical', icon: '🔥' },
                  { name: 'Temperature', range: '0-50°C', type: 'Numerical', icon: '🌡️' },
                  { name: 'Humidity', range: '0-100%', type: 'Numerical', icon: '💧' },
                  { name: 'Soil pH', range: '0-14', type: 'Numerical', icon: '🔬' },
                  { name: 'Rainfall', range: '0-350 mm', type: 'Numerical', icon: '🌧️' }
                ].map((feature, idx) => (
                  <div key={idx} className="card p-4">
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <h4 className="font-semibold text-gray-900">{feature.name}</h4>
                    <p className="text-sm text-gray-600">{feature.range}</p>
                    <span className="badge badge-green mt-2">{feature.type}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Preprocessing */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Preprocessing</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Steps Performed</h3>
                  <ol className="space-y-3">
                    {[
                      'Missing Value Imputation',
                      'Duplicate Removal',
                      'Feature Scaling (StandardScaler)',
                      'Train-Test Split (80-20)',
                      'Cross-Validation (5-fold)'
                    ].map((step, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="chart-container p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Data Distribution</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { name: 'N', min: 20, avg: 80, max: 180 },
                        { name: 'P', min: 10, avg: 45, max: 120 },
                        { name: 'K', min: 15, avg: 65, max: 280 },
                        { name: 'Temp', min: 10, avg: 25, max: 42 },
                        { name: 'Humid', min: 30, avg: 65, max: 95 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="max" stackId="1" stroke="#86efac" fill="#86efac" fillOpacity={0.2} />
                        <Area type="monotone" dataKey="avg" stackId="2" stroke="#22c55e" fill="#22c55e" fillOpacity={0.5} />
                        <Area type="monotone" dataKey="min" stackId="3" stroke="#16a34a" fill="#16a34a" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'workflow' && (
          <div className="space-y-12 animate-fadeIn">
            {/* Workflow Steps */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Workflow</h2>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-200"></div>
                <div className="space-y-8">
                  {workflowSteps.map((step, idx) => (
                    <div key={idx} className="relative flex gap-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg z-10">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="card p-6 flex-1 ml-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-green-600">Step {step.step}</span>
                          <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                        </div>
                        <p className="text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Architecture */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">System Architecture</h2>
              <div className="card p-6">
                <div className="grid grid-cols-5 gap-4">
                  {dataFlow.map((stage, idx) => (
                    <div key={idx} className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-xl bg-green-100 flex items-center justify-center mb-3">
                        <span className="text-2xl font-bold text-green-600">{idx + 1}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                      <p className="text-sm text-gray-500">{stage.desc}</p>
                      {idx < dataFlow.length - 1 && (
                        <ArrowRight className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 text-green-300" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Technology Stack */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Technology Stack</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'] },
                  { category: 'Backend', items: ['Node.js', 'Supabase', 'PostgreSQL', 'Edge Functions'] },
                  { category: 'ML', items: ['Custom ML Algorithm', 'Feature Engineering', 'Model Evaluation'] },
                  { category: 'Deployment', items: ['Vite', 'CI/CD', 'Cloud Hosting'] }
                ].map((tech, idx) => (
                  <div key={idx} className="card p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">{tech.category}</h4>
                    <ul className="space-y-1">
                      {tech.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
