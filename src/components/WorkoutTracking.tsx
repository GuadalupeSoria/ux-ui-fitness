import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Timer, Weight, RotateCcw, Check, Plus, Minus, RefreshCw } from 'lucide-react';

const WorkoutTracking: React.FC = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [rest, setRest] = useState(90);
  const [notes, setNotes] = useState('');
  const [isResting, setIsResting] = useState(false);
  const [restTimer, setRestTimer] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const exercises = [
    {
      name: "Press de Banca",
      sets: 4,
      targetReps: "8-12",
      targetWeight: "80kg",
      notes: "Mantén los omóplatos retraídos",
      alternatives: [
        { name: "Press con Mancuernas", reason: "Si no hay barra disponible" },
        { name: "Flexiones", reason: "Ejercicio con peso corporal" }
      ],
      history: [
        { weight: 75, reps: 10 },
        { weight: 77.5, reps: 9 },
        { weight: 80, reps: 8 }
      ]
    },
    {
      name: "Sentadillas",
      sets: 4,
      targetReps: "10-15",
      targetWeight: "100kg",
      notes: "Profundidad completa, rodillas alineadas",
      alternatives: [
        { name: "Sentadillas Goblet", reason: "Con mancuerna" },
        { name: "Prensa de Piernas", reason: "Si rack ocupado" }
      ],
      history: [
        { weight: 95, reps: 12 },
        { weight: 97.5, reps: 11 },
        { weight: 100, reps: 10 }
      ]
    },
    {
      name: "Remo con Barra",
      sets: 3,
      targetReps: "8-10",
      targetWeight: "70kg",
      notes: "Mantén el torso estable",
      alternatives: [
        { name: "Remo con Mancuernas", reason: "Trabajo unilateral" },
        { name: "Remo en Polea", reason: "Máquina disponible" }
      ],
      history: [
        { weight: 65, reps: 10 },
        { weight: 67.5, reps: 9 },
        { weight: 70, reps: 8 }
      ]
    }
  ];

  const currentExercise = exercises[currentExerciseIndex];

  // Timer para descanso
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => prev - 1);
      }, 1000);
    } else if (restTimer === 0 && isResting) {
      setIsResting(false);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRest = () => {
    setIsResting(true);
    setRestTimer(rest);
  };

  const completeSet = () => {
    // Lógica para completar serie
    if (currentSet < currentExercise.sets - 1) {
      setCurrentSet(prev => prev + 1);
      startRest();
    } else {
      // Siguiente ejercicio
      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
        setCurrentSet(0);
      }
    }
    setWeight('');
    setReps('');
  };

  const scrollToAlternative = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="py-6 space-y-6">
      {/* Progress Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Entrenamiento en Progreso</h2>
          <span className="text-sm text-gray-500">
            {currentExerciseIndex + 1}/{exercises.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentExerciseIndex + 1) / exercises.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Current Exercise */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900">{currentExercise.name}</h3>
          <div className="text-right">
            <p className="text-sm text-gray-600">Serie actual</p>
            <p className="text-lg font-bold text-blue-600">{currentSet + 1}/{currentExercise.sets}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-600 mb-1">Repeticiones objetivo</p>
            <p className="text-lg font-bold text-blue-900">{currentExercise.targetReps}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-green-600 mb-1">Peso objetivo</p>
            <p className="text-lg font-bold text-green-900">{currentExercise.targetWeight}</p>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-800">{currentExercise.notes}</p>
        </div>
      </div>

      {/* Tracking Inputs */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Registrar Serie</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Weight size={16} className="inline mr-2" />
              Peso (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium text-center"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <RotateCcw size={16} className="inline mr-2" />
              Repeticiones
            </label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium text-center"
              placeholder="0"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Timer size={16} className="inline mr-2" />
            Descanso (segundos)
          </label>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setRest(Math.max(30, rest - 15))}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Minus size={16} />
            </button>
            <span className="text-lg font-bold text-gray-900 min-w-[80px] text-center">{rest}s</span>
            <button
              onClick={() => setRest(rest + 15)}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Notas</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="RPE, sensaciones, ajustes..."
          />
        </div>

        {/* Rest Timer */}
        {isResting && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Timer className="text-orange-600" size={20} />
              <span className="text-orange-800 font-medium">Descansando</span>
            </div>
            <div className="text-3xl font-bold text-orange-900">{formatTime(restTimer)}</div>
            <button
              onClick={() => setIsResting(false)}
              className="mt-2 text-sm text-orange-600 hover:text-orange-800"
            >
              Saltar descanso
            </button>
          </div>
        )}

        <button
          onClick={completeSet}
          disabled={!weight || !reps || isResting}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
        >
          <Check size={20} />
          <span>Completar Serie</span>
        </button>
      </div>

      {/* Exercise Alternatives */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900">Ejercicios Alternativos</h4>
          <div className="flex space-x-2">
            <button
              onClick={() => scrollToAlternative('left')}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollToAlternative('right')}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        
        <div ref={scrollRef} className="flex space-x-4 overflow-x-auto pb-2">
          {currentExercise.alternatives.map((alt, index) => (
            <div key={index} className="flex-shrink-0 w-64 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h5 className="font-semibold text-gray-900 mb-2">{alt.name}</h5>
              <p className="text-sm text-gray-600 mb-3">{alt.reason}</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <RefreshCw size={16} />
                <span>Cambiar</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Previous Sets History */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Historial Reciente</h4>
        <div className="space-y-3">
          {currentExercise.history.map((record, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Serie {index + 1}</span>
              <div className="flex items-center space-x-4">
                <span className="font-medium">{record.weight}kg</span>
                <span className="text-gray-500">×</span>
                <span className="font-medium">{record.reps} reps</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutTracking;