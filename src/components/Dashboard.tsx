import React from 'react';
import { Play, Calendar, Trophy, TrendingUp, Clock, Target } from 'lucide-react';

interface DashboardProps {
  onStartWorkout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartWorkout }) => {
  const todaysWorkout = {
    name: "Entrenamiento de Fuerza - Día A",
    duration: "45-60 min",
    exercises: 6,
    focus: "Tren Superior"
  };

  const weeklyStats = [
    { label: "Entrenamientos", value: "3/4", icon: Target },
    { label: "Tiempo total", value: "2h 45m", icon: Clock },
    { label: "PR esta semana", value: "2", icon: Trophy },
    { label: "Progreso", value: "+5%", icon: TrendingUp }
  ];

  return (
    <div className="py-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">¡Hola, Alex!</h2>
        <p className="text-blue-100 mb-4">Es hora de entrenar. Tu profesor ha actualizado tu plan.</p>
        <div className="flex items-center text-sm text-blue-100">
          <Calendar size={16} className="mr-2" />
          <span>Última actualización: Hace 2 días</span>
        </div>
      </div>

      {/* Today's Workout */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Entrenamiento de Hoy</h3>
          <span className="text-sm text-gray-500">Lun, 20 Ene</span>
        </div>
        
        <div className="space-y-3 mb-6">
          <h4 className="text-xl font-bold text-gray-900">{todaysWorkout.name}</h4>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{todaysWorkout.duration}</span>
            </div>
            <div className="flex items-center">
              <Target size={16} className="mr-1" />
              <span>{todaysWorkout.exercises} ejercicios</span>
            </div>
          </div>
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {todaysWorkout.focus}
          </div>
        </div>

        <button
          onClick={onStartWorkout}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
        >
          <Play size={20} />
          <span>Comenzar Entrenamiento</span>
        </button>
      </div>

      {/* Weekly Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen Semanal</h3>
        <div className="grid grid-cols-2 gap-4">
          {weeklyStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Progreso Reciente</h3>
          <button className="text-blue-600 text-sm font-medium">Ver todo</button>
        </div>
        
        <div className="space-y-3">
          {[
            { exercise: "Press de banca", improvement: "+5kg", date: "Hace 2 días" },
            { exercise: "Sentadillas", improvement: "+2.5kg", date: "Hace 4 días" },
            { exercise: "Peso muerto", improvement: "+10kg", date: "Hace 1 semana" }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900">{item.exercise}</p>
                <p className="text-sm text-gray-600">{item.date}</p>
              </div>
              <div className="text-green-600 font-bold">{item.improvement}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;