import React, { useState } from 'react';
import { Home, Activity, BookOpen, User, ChevronRight, Plus, Timer, Weight, RotateCcw, CheckCircle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import WorkoutTracking from './components/WorkoutTracking';
import ExerciseLibrary from './components/ExerciseLibrary';
import Profile from './components/Profile';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', name: 'Inicio', icon: Home },
    { id: 'tracking', name: 'Entrenar', icon: Activity },
    { id: 'exercises', name: 'Ejercicios', icon: BookOpen },
    { id: 'profile', name: 'Perfil', icon: User },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onStartWorkout={() => setActiveTab('tracking')} />;
      case 'tracking':
        return <WorkoutTracking />;
      case 'exercises':
        return <ExerciseLibrary />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard onStartWorkout={() => setActiveTab('tracking')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">FitTracker</h1>
              <p className="text-sm text-gray-600">Tu entrenamiento personalizado</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 pb-20">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs mt-1">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;