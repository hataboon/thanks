import React from 'react';
import { Entry } from '../features/thanks/types';

interface DiaryEntryProps {
  entry: Entry; // カテゴリー、内容、日付を持っています。
  onEdit: (entry: Entry) => void;
  onDelete: (id: number) => void;
}

const DiaryEntry: React.FC<DiaryEntryProps> = ({ entry, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <p className="font-bold text-lg mb-2">{entry.category}</p>
      <p className="mb-4">{entry.content}</p>
      <p className="text-sm text-gray-500">{entry.date}</p>
      <div className="absolute bottom-2 right-2 flex space-x-2">
      <button
        onClick={() => onEdit(entry)}
        className="text-blue-500 hover:text-blue-700"
      >
        編集
        </button>
      </div>
    </div>
     
        
  );
};

export default DiaryEntry;