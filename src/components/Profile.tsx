import React from 'react';
import { User, Settings, Target, Trophy, Calendar, TrendingUp, Award, Clock } from 'lucide-react';

const Profile: React.FC = () => {
  const userStats = [
    { label: "Entrenamientos completados", value: "47", icon: Trophy, color: "text-yellow-600 bg-yellow-100" },
    { label: "Días consecutivos", value: "12", icon: Calendar, color: "text-green-600 bg-green-100" },
    { label: "Tiempo total", value: "38h", icon: Clock, color: "text-blue-600 bg-blue-100" },
    { label: "PRs este mes", value: "8", icon: Award, color: "text-purple-600 bg-purple-100" }
  ];

  const recentAchievements = [
    { title: "Primera semana completa", description: "Completaste 4 entrenamientos en una semana", date: "Hace 2 días", icon: "🎯" },
    { title: "Nuevo PR en Press de Banca", description: "Alcanzaste 85kg por primera vez", date: "Hace 5 días", icon: "💪" },
    { title: "Constancia", description: "10 días consecutivos entrenando", date: "Hace 1 semana", icon: "🔥" }
  ];

  const progressData = [
    { exercise: "Press de Banca", initial: "60kg", current: "85kg", improvement: "+25kg", percentage: 42 },
    { exercise: "Sentadillas", initial: "80kg", current: "110kg", improvement: "+30kg", percentage: 38 },
    { exercise: "Peso Muerto", initial: "100kg", current: "140kg", improvement: "+40kg", percentage: 40 },
    { exercise: "Press Militar", initial: "40kg", current: "55kg", improvement: "+15kg", percentage: 38 }
  ];

  return (
    <div className="py-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <User size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Alex Rodriguez</h2>
            <p className="text-blue-100">Alumno • Plan: Fuerza Intermedio</p>
            <p className="text-blue-100 text-sm">Profesor: Carlos Mendez</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Progreso del plan actual</p>
            <p className="text-xl font-bold">68% completado</p>
          </div>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Settings size={16} />
            <span>Configuración</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {userStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Tracking */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Tu Progreso</h3>
          <div className="flex items-center text-green-600">
            <TrendingUp size={16} className="mr-1" />
            <span className="text-sm font-medium">Mejorando</span>
          </div>
        </div>

        <div className="space-y-4">
          {progressData.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{item.exercise}</h4>
                <span className="text-green-600 font-bold">{item.improvement}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Inicial: {item.initial}</span>
                <span>Actual: {item.current}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Logros Recientes</h3>
        <div className="space-y-4">
          {recentAchievements.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                <p className="text-sm text-gray-600 mb-1">{achievement.description}</p>
                <p className="text-xs text-gray-500">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Objetivos del Mes</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <Target className="text-blue-600" size={20} />
              <span className="font-medium text-gray-900">Completar 16 entrenamientos</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-600">12/16</p>
              <p className="text-xs text-gray-600">75% completado</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <Trophy className="text-green-600" size={20} />
              <span className="font-medium text-gray-900">Nuevo PR en Peso Muerto</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">150kg</p>
              <p className="text-xs text-gray-600">Objetivo: 145kg</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Details */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles del Plan</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Plan actual</p>
            <p className="font-medium text-gray-900">Fuerza Intermedio</p>
          </div>
          <div>
            <p className="text-gray-600">Duración</p>
            <p className="font-medium text-gray-900">12 semanas</p>
          </div>
          <div>
            <p className="text-gray-600">Frecuencia</p>
            <p className="font-medium text-gray-900">4 días/semana</p>
          </div>
          <div>
            <p className="text-gray-600">Próxima evaluación</p>
            <p className="font-medium text-gray-900">15 Feb 2025</p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Contactar profesor</span>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Enviar mensaje
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;