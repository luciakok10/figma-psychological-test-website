import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Question } from '../data/quizzes';

interface QuizQuestionProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (score: Record<string, number>) => void;
}

export function QuizQuestion({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
}: QuizQuestionProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            問題 {currentQuestion + 1} / {totalQuestions}
          </span>
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-4 px-6 hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => onAnswer(option.score)}
              >
                <span className="mr-3 flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option.text}</span>
              </Button>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
