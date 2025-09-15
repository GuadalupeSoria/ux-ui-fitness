import React, { useState } from 'react';
import { Search, Filter, Play, Target, Clock, FileMusic as Muscle } from 'lucide-react';

const ExerciseLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todos', color: 'gray' },
    { id: 'chest', name: 'Pecho', color: 'blue' },
    { id: 'back', name: 'Espalda', color: 'green' },
    { id: 'legs', name: 'Piernas', color: 'purple' },
    { id: 'shoulders', name: 'Hombros', color: 'orange' },
    { id: 'arms', name: 'Brazos', color: 'red' },
    { id: 'core', name: 'Core', color: 'yellow' }
  ];

  const exercises = [
    {
      id: 1,
      name: "Press de Banca",
      category: "chest",
      difficulty: "Intermedio",
      equipment: "Barra, banco",
      primaryMuscles: ["Pectorales", "Tríceps", "Deltoides anterior"],
      description: "Ejercicio fundamental para el desarrollo del pecho y fuerza del tren superior.",
      instructions: [
        "Acuéstate en el banco con los ojos bajo la barra",
        "Agarra la barra con las manos más anchas que los hombros",
        "Retrae los omóplatos y mantén los pies firmes en el suelo",
        "Baja la barra controladamente hasta el pecho",
        "Empuja la barra hacia arriba hasta extensión completa"
      ],
      tips: "Mantén los omóplatos retraídos durante todo el movimiento",
      image: "https://images.pexels.com/photos/703012/pexels-photo-703012.jpeg"
    },
    {
      id: 2,
      name: "Sentadillas",
      category: "legs",
      difficulty: "Básico",
      equipment: "Barra, rack",
      primaryMuscles: ["Cuádriceps", "Glúteos", "Isquiotibiales"],
      description: "Rey de los ejercicios para piernas. Desarrolla fuerza y masa muscular en todo el tren inferior.",
      instructions: [
        "Coloca la barra en la espalda alta (trapecio)",
        "Separa los pies al ancho de hombros",
        "Mantén el pecho arriba y la espalda neutra",
        "Desciende como si te sentaras en una silla",
        "Sube empujando a través de los talones"
      ],
      tips: "Mantén las rodillas alineadas con las puntas de los pies",
      image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg"
    },
    {
      id: 3,
      name: "Peso Muerto",
      category: "back",
      difficulty: "Avanzado",
      equipment: "Barra, discos",
      primaryMuscles: ["Erector espinal", "Glúteos", "Isquiotibiales"],
      description: "Ejercicio compuesto que trabaja toda la cadena posterior del cuerpo.",
      instructions: [
        "Coloca la barra sobre el suelo",
        "Párate con los pies al ancho de caderas",
        "Agáchate y agarra la barra con agarre mixto",
        "Mantén la espalda neutra y el pecho arriba",
        "Levanta empujando el suelo con los pies"
      ],
      tips: "La barra debe mantenerse cerca del cuerpo durante todo el movimiento",
      image: "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg"
    },
    {
      id: 4,
      name: "Press Militar",
      category: "shoulders",
      difficulty: "Intermedio",
      equipment: "Barra",
      primaryMuscles: ["Deltoides", "Tríceps", "Core"],
      description: "Ejercicio vertical que desarrolla fuerza y estabilidad en hombros y core.",
      instructions: [
        "Párate con los pies al ancho de hombros",
        "Agarra la barra al ancho de hombros",
        "Coloca la barra a la altura del pecho",
        "Empuja la barra directamente hacia arriba",
        "Baja controladamente a la posición inicial"
      ],
      tips: "Mantén el core activado para proteger la espalda baja",
      image: "https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg"
    },
    {
      id: 5,
      name: "Remo con Barra",
      category: "back",
      difficulty: "Intermedio",
      equipment: "Barra",
      primaryMuscles: ["Dorsal ancho", "Romboides", "Bíceps"],
      description: "Ejercicio de tracción horizontal esencial para el desarrollo de la espalda.",
      instructions: [
        "Inclínate hacia adelante con las rodillas ligeramente flexionadas",
        "Agarra la barra con agarre pronado",
        "Mantén la espalda neutra y el core activado",
        "Tira de la barra hacia el abdomen bajo",
        "Baja controladamente a la posición inicial"
      ],
      tips: "Enfócate en apretar los omóplatos al final del movimiento",
      image: "https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg"
    },
    {
      id: 6,
      name: "Curl de Bíceps",
      category: "arms",
      difficulty: "Básico",
      equipment: "Mancuernas",
      primaryMuscles: ["Bíceps", "Braquial"],
      description: "Ejercicio de aislamiento para el desarrollo específico de los bíceps.",
      instructions: [
        "Párate con una mancuerna en cada mano",
        "Mantén los codos pegados al torso",
        "Flexiona los brazos llevando el peso hacia los hombros",
        "Aprieta los bíceps en la parte superior",
        "Baja controladamente a la posición inicial"
      ],
      tips: "Evita balancear el cuerpo para usar momentum",
      image: "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg"
    }
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.primaryMuscles.some(muscle => 
                           muscle.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return 'text-green-600 bg-green-100';
      case 'Intermedio': return 'text-yellow-600 bg-yellow-100';
      case 'Avanzado': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    const color = category?.color || 'gray';
    return {
      'blue': 'text-blue-600 bg-blue-100',
      'green': 'text-green-600 bg-green-100',
      'purple': 'text-purple-600 bg-purple-100',
      'orange': 'text-orange-600 bg-orange-100',
      'red': 'text-red-600 bg-red-100',
      'yellow': 'text-yellow-600 bg-yellow-100',
      'gray': 'text-gray-600 bg-gray-100'
    }[color];
  };

  return (
    <div className="py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Biblioteca de Ejercicios</h2>
        <p className="text-gray-600">Explora y aprende la técnica correcta de cada ejercicio</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar ejercicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? `${getCategoryColor(category.id)} border-2 border-current`
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="space-y-4">
        {filteredExercises.map((exercise) => (
          <div key={exercise.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="md:flex">
              {/* Image */}
              <div className="md:w-1/3 h-48 md:h-auto">
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="md:w-2/3 p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{exercise.name}</h3>
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(exercise.category)}`}>
                      {categories.find(cat => cat.id === exercise.category)?.name}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{exercise.description}</p>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start space-x-2">
                    <Target className="text-blue-600 mt-1" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Músculos principales</p>
                      <p className="text-sm text-gray-600">{exercise.primaryMuscles.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Muscle className="text-green-600 mt-1" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Equipamiento</p>
                      <p className="text-sm text-gray-600">{exercise.equipment}</p>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Consejo:</span> {exercise.tips}
                  </p>
                </div>

                {/* Action Button */}
                <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2">
                  <Play size={16} />
                  <span>Ver Técnica Completa</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredExercises.length === 0 && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron ejercicios</h3>
          <p className="text-gray-600">Intenta con otros términos de búsqueda o categorías</p>
        </div>
      )}
    </div>
  );
};

export default ExerciseLibrary;