import React from 'react';
import { Entry } from '../features/thanks/types';

interface DiaryEntryProps {
  entry: Entry; // カテゴリー、内容、日付を持っています。
}

const DiaryEntry: React.FC<DiaryEntryProps> = ({ entry }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <p className="font-bold text-lg mb-2">{entry.category}</p>
      <p className="mb-4">{entry.content}</p>
      <p className="text-sm text-gray-500">{entry.date}</p>
    </div>
  );
};

export default DiaryEntry;