export interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    score: Record<string, number>;
  }[];
}

export interface QuizResult {
  type: string;
  title: string;
  description: string;
  image: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  questions: Question[];
  results: QuizResult[];
  getResult: (scores: Record<string, number>) => QuizResult;
}

export const quizzes: Quiz[] = [
  {
    id: 'personality',
    title: '你是哪種性格類型？',
    description: '透過這個測驗發現你的真實性格',
    coverImage: 'https://images.unsplash.com/photo-1534664393936-5220914620f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    questions: [
      {
        id: 1,
        question: '在派對上，你通常會：',
        options: [
          { text: '主動和陌生人交談', score: { extrovert: 2 } },
          { text: '跟幾個熟悉的朋友聊天', score: { extrovert: 1, introvert: 1 } },
          { text: '安靜地待在角落觀察', score: { introvert: 2 } },
        ],
      },
      {
        id: 2,
        question: '做決定時，你更依賴：',
        options: [
          { text: '邏輯和數據分析', score: { thinking: 2 } },
          { text: '直覺和感覺', score: { feeling: 2 } },
          { text: '兩者都會考慮', score: { thinking: 1, feeling: 1 } },
        ],
      },
      {
        id: 3,
        question: '面對新任務時，你會：',
        options: [
          { text: '立即開始行動', score: { judging: 2 } },
          { text: '先制定詳細計劃', score: { judging: 1, perceiving: 1 } },
          { text: '邊做邊調整', score: { perceiving: 2 } },
        ],
      },
      {
        id: 4,
        question: '週末你更喜歡：',
        options: [
          { text: '參加社交活動', score: { extrovert: 2 } },
          { text: '在家放鬆休息', score: { introvert: 2 } },
          { text: '進行個人興趣愛好', score: { introvert: 1, extrovert: 1 } },
        ],
      },
      {
        id: 5,
        question: '在團隊中，你通常扮演：',
        options: [
          { text: '領導者角色', score: { extrovert: 2, judging: 1 } },
          { text: '支持者角色', score: { feeling: 2 } },
          { text: '分析者角色', score: { thinking: 2, introvert: 1 } },
        ],
      },
    ],
    results: [
      {
        type: 'extrovert-thinking',
        title: '外向思考型',
        description: '你是一個充滿活力的領導者，善於用邏輯分析問題，喜歡與人互動並推動團隊前進。你的決策果斷，目標明確。',
        image: 'https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      },
      {
        type: 'extrovert-feeling',
        title: '外向情感型',
        description: '你是天生的社交家，善於理解他人情感，能輕鬆建立人際關係。你的熱情和同理心讓你成為團隊中的黏著劑。',
        image: 'https://images.unsplash.com/photo-1694813646514-a22180621d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      },
      {
        type: 'introvert-thinking',
        title: '內向思考型',
        description: '你是一個深思熟慮的分析家，喜歡獨立工作和深入研究。你的洞察力強，能發現別人忽略的細節。',
        image: 'https://images.unsplash.com/photo-1758685848404-5b2bf607b38d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      },
      {
        type: 'introvert-feeling',
        title: '內向情感型',
        description: '你是一個敏感且富有創造力的人，內心世界豐富。你珍視深度的人際關係，善於藝術和創意表達。',
        image: 'https://images.unsplash.com/photo-1758513284523-4260824e24ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      },
    ],
    getResult: (scores) => {
      const isExtrovert = (scores.extrovert || 0) > (scores.introvert || 0);
      const isThinking = (scores.thinking || 0) > (scores.feeling || 0);
      
      let type = '';
      if (isExtrovert && isThinking) type = 'extrovert-thinking';
      else if (isExtrovert && !isThinking) type = 'extrovert-feeling';
      else if (!isExtrovert && isThinking) type = 'introvert-thinking';
      else type = 'introvert-feeling';
      
      return quizzes[0].results.find(r => r.type === type) || quizzes[0].results[0];
    },
  },
  {
    id: 'career',
    title: '你適合什麼職業？',
    description: '找出最適合你的職業方向',
    coverImage: 'https://images.unsplash.com/photo-1762341117487-dbc411bcf574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    questions: [
      {
        id: 1,
        question: '你最享受的工作環境是：',
        options: [
          { text: '充滿創意的自由空間', score: { creative: 2 } },
          { text: '結構化的辦公室', score: { analytical: 2 } },
          { text: '戶外或多變的環境', score: { practical: 2 } },
        ],
      },
      {
        id: 2,
        question: '你的優勢是：',
        options: [
          { text: '解決問題和分析', score: { analytical: 2 } },
          { text: '創新和藝術表達', score: { creative: 2 } },
          { text: '執行和實踐', score: { practical: 2 } },
        ],
      },
      {
        id: 3,
        question: '工作中你最重視：',
        options: [
          { text: '成就感和影響力', score: { analytical: 1, creative: 1 } },
          { text: '穩定性和安全感', score: { practical: 2 } },
          { text: '自由和彈性', score: { creative: 2 } },
        ],
      },
      {
        id: 4,
        question: '你喜歡的工作節奏是：',
        options: [
          { text: '快節奏且多變', score: { creative: 1, practical: 1 } },
          { text: '穩定且可預測', score: { analytical: 2 } },
          { text: '平衡且有彈性', score: { practical: 1, creative: 1 } },
        ],
      },
      {
        id: 5,
        question: '面對挑戰時，你傾向於：',
        options: [
          { text: '用創新方法解決', score: { creative: 2 } },
          { text: '用數據和邏輯分析', score: { analytical: 2 } },
          { text: '用經驗和實踐', score: { practical: 2 } },
        ],
      },
    ],
    results: [
      {
        type: 'creative',
        title: '創意工作者',
        description: '你適合設計師、藝術家、內容創作者等需要創造力的職業。你的想像力和獨特視角是你的最大資產。',
        image: 'https://images.unsplash.com/photo-1709803312782-0c3b175875ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      },
      {
        type: 'analytical',
        title: '分析專家',
        description: '你適合數據分析師、研究員、工程師等需要邏輯思維的職業。你的分析能力和細緻度讓你在技術領域表現出色。',
        image: 'https://images.unsplash.com/photo-1758876203326-016526a303a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      },
      {
        type: 'practical',
        title: '實踐執行者',
        description: '你適合項目經理、運營專員、教師等需要執行力的職業。你的組織能力和實踐經驗讓你能有效達成目標。',
        image: 'https://images.unsplash.com/photo-1627634771105-08a3a12ad228?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      },
    ],
    getResult: (scores) => {
      const maxScore = Math.max(
        scores.creative || 0,
        scores.analytical || 0,
        scores.practical || 0
      );
      
      let type = 'practical';
      if (maxScore === (scores.creative || 0)) type = 'creative';
      else if (maxScore === (scores.analytical || 0)) type = 'analytical';
      
      return quizzes[1].results.find(r => r.type === type) || quizzes[1].results[0];
    },
  },
  {
    id: 'love',
    title: '你的愛情性格是？',
    description: '了解你在感情中的角色和特質',
    coverImage: 'https://images.unsplash.com/photo-1514846528774-8de9d4a07023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    questions: [
      {
        id: 1,
        question: '在關係中，你最看重：',
        options: [
          { text: '深度的情感連結', score: { emotional: 2 } },
          { text: '共同的興趣愛好', score: { companion: 2 } },
          { text: '相互的信任和尊重', score: { rational: 2 } },
        ],
      },
      {
        id: 2,
        question: '表達愛意時，你更傾向：',
        options: [
          { text: '用言語表達情感', score: { emotional: 2 } },
          { text: '用行動證明愛', score: { companion: 2 } },
          { text: '給予對方空間和支持', score: { rational: 2 } },
        ],
      },
      {
        id: 3,
        question: '遇到衝突時，你會：',
        options: [
          { text: '立即溝通解決', score: { emotional: 2 } },
          { text: '冷靜思考後討論', score: { rational: 2 } },
          { text: '用幽默化解緊張', score: { companion: 2 } },
        ],
      },
      {
        id: 4,
        question: '理想的約會是：',
        options: [
          { text: '浪漫的燭光晚餐', score: { emotional: 2 } },
          { text: '一起探索新地方', score: { companion: 2 } },
          { text: '舒適的居家時光', score: { rational: 1, companion: 1 } },
        ],
      },
      {
        id: 5,
        question: '你認為愛情中最重要的是：',
        options: [
          { text: '激情和浪漫', score: { emotional: 2 } },
          { text: '友誼和陪伴', score: { companion: 2 } },
          { text: '理解和成長', score: { rational: 2 } },
        ],
      },
    ],
    results: [
      {
        type: 'emotional',
        title: '浪漫主義者',
        description: '你是一個充滿激情的戀人，重視情感的深度和浪漫。你相信真愛的力量，願意為愛付出一切。',
        image: 'https://images.unsplash.com/photo-1658851866325-49fb8b7fbcb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      },
      {
        type: 'companion',
        title: '最佳伴侶',
        description: '你把愛人當作最好的朋友，喜歡一起分享生活的點滴。你的愛情建立在友誼和共同經歷之上。',
        image: 'https://images.unsplash.com/photo-1763655396188-82015c2dab72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      },
      {
        type: 'rational',
        title: '理性戀愛者',
        description: '你用理智和成熟的方式經營感情，重視相互的尊重和個人成長。你的愛情穩定而持久。',
        image: 'https://images.unsplash.com/photo-1690574467268-e77dcaefb77c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      },
    ],
    getResult: (scores) => {
      const maxScore = Math.max(
        scores.emotional || 0,
        scores.companion || 0,
        scores.rational || 0
      );
      
      let type = 'rational';
      if (maxScore === (scores.emotional || 0)) type = 'emotional';
      else if (maxScore === (scores.companion || 0)) type = 'companion';
      
      return quizzes[2].results.find(r => r.type === type) || quizzes[2].results[0];
    },
  },
];
