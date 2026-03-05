import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Share2, RotateCcw, Home } from 'lucide-react';
import { QuizResult as QuizResultType } from '../data/quizzes';

interface QuizResultProps {
  result: QuizResultType;
  onRestart: () => void;
  onHome: () => void;
}

export function QuizResult({ result, onRestart, onHome }: QuizResultProps) {
  const handleShare = () => {
    const text = `我在心理測驗中得到的結果是「${result.title}」！${result.description}`;
    if (navigator.share) {
      navigator.share({
        title: '我的測驗結果',
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('結果已複製到剪貼簿！');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="shadow-xl">
        <div className="aspect-video overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
          <ImageWithFallback
            src={result.image}
            alt={result.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <CardHeader className="text-center pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
                你的結果
              </span>
            </div>
            <CardTitle className="text-3xl mb-3">{result.title}</CardTitle>
            <CardDescription className="text-lg leading-relaxed">
              {result.description}
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-3 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            <Button onClick={handleShare} variant="outline" className="w-full">
              <Share2 className="mr-2 h-4 w-4" />
              分享結果
            </Button>
            <Button onClick={onRestart} variant="outline" className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              重新測驗
            </Button>
            <Button onClick={onHome} className="w-full">
              <Home className="mr-2 h-4 w-4" />
              返回首頁
            </Button>
          </motion.div>
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center text-sm text-gray-500"
      >
        <p>這個結果僅供娛樂參考，不代表專業心理評估</p>
      </motion.div>
    </motion.div>
  );
}
