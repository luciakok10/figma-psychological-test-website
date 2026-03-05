import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizCard } from './components/QuizCard';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResult } from './components/QuizResult';
import { quizzes, Quiz, QuizResult as QuizResultType } from './data/quizzes';
import { Brain, Sparkles } from 'lucide-react';

type AppState = 
  | { stage: 'home' }
  | { stage: 'quiz'; quiz: Quiz; currentQuestion: number; scores: Record<string, number> }
  | { stage: 'result'; result: QuizResultType; quiz: Quiz };

export default function App() {
  const [state, setState] = useState<AppState>({ stage: 'home' });

  const startQuiz = (quiz: Quiz) => {
    setState({
      stage: 'quiz',
      quiz,
      currentQuestion: 0,
      scores: {},
    });
  };

  const handleAnswer = (score: Record<string, number>) => {
    if (state.stage !== 'quiz') return;

    const newScores = { ...state.scores };
    Object.entries(score).forEach(([key, value]) => {
      newScores[key] = (newScores[key] || 0) + value;
    });

    const nextQuestion = state.currentQuestion + 1;

    if (nextQuestion < state.quiz.questions.length) {
      setState({
        ...state,
        currentQuestion: nextQuestion,
        scores: newScores,
      });
    } else {
      const result = state.quiz.getResult(newScores);
      setState({
        stage: 'result',
        result,
        quiz: state.quiz,
      });
    }
  };

  const restartQuiz = () => {
    if (state.stage !== 'result') return;
    startQuiz(state.quiz);
  };

  const goHome = () => {
    setState({ stage: 'home' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {state.stage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Brain className="h-12 w-12 text-purple-600" />
                  <h1 className="text-4xl md:text-5xl text-gray-900">心理測驗站</h1>
                  <Sparkles className="h-12 w-12 text-pink-600" />
                </div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  探索你的內心世界，發現真實的自己
                </p>
              </motion.div>

              {/* Quiz Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {quizzes.map((quiz, index) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <QuizCard
                      title={quiz.title}
                      description={quiz.description}
                      coverImage={quiz.coverImage}
                      onStart={() => startQuiz(quiz)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-16 text-sm text-gray-500"
              >
                <p>所有測驗結果僅供娛樂參考</p>
              </motion.div>
            </motion.div>
          )}

          {state.stage === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Quiz Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl mb-2 text-gray-900">{state.quiz.title}</h2>
                <p className="text-gray-600">{state.quiz.description}</p>
              </motion.div>

              {/* Question */}
              <QuizQuestion
                question={state.quiz.questions[state.currentQuestion]}
                currentQuestion={state.currentQuestion}
                totalQuestions={state.quiz.questions.length}
                onAnswer={handleAnswer}
              />
            </motion.div>
          )}

          {state.stage === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Result Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="h-8 w-8 text-yellow-500" />
                  <h2 className="text-3xl text-gray-900">測驗完成！</h2>
                  <Sparkles className="h-8 w-8 text-yellow-500" />
                </div>
                <p className="text-gray-600">來看看你的測驗結果</p>
              </motion.div>

              {/* Result */}
              <QuizResult
                result={state.result}
                onRestart={restartQuiz}
                onHome={goHome}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
