import { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PredictPage from './pages/PredictPage';
import AnalysisPage from './pages/AnalysisPage';
import { PredictionResult } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
  };

  const handlePredictionComplete = (result: PredictionResult) => {
    setPredictionResult(result);
    setCurrentPage('results');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'about':
        return <AboutPage />;
      case 'predict':
        return <PredictPage onPredictionComplete={handlePredictionComplete} />;
      case 'results':
        return predictionResult ? (
          <PredictPage
            onPredictionComplete={handlePredictionComplete}
            initialResult={predictionResult}
          />
        ) : (
          <PredictPage onPredictionComplete={handlePredictionComplete} />
        );
      case 'analysis':
        return <AnalysisPage />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />
      <main className="pt-16">
        <Suspense fallback={<LoadingFallback />}>{renderPage()}</Suspense>
      </main>
      <Footer />
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="spinner w-12 h-12 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default App;
