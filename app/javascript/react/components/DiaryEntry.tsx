import React from 'react';
import { Entry } from '../features/thanks/types';

interface DiaryEntryProps {
  entry: Entry; // カテゴリー、内容、日付を持っています。
  onEdit: (entry: Entry) => void;
  onDelete: (id: number) => void;
}

const DiaryEntry: React.FC<DiaryEntryProps> = ({ entry, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      <p className="font-bold text-lg mb-2">{entry.category}</p>
      <p className="mb-4">{entry.content}</p>
      <p className="text-sm text-gray-500">{entry.date}</p>
      <div className="absolute bottom-2 right-2 flex space-x-2 mt-4">
      <button
        onClick={() => onEdit(entry)}
        className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-sans text-blue-700 ring-1 ring-inset ring-blue-700/10"
      >
        編集
        </button>
        {/*削除ボタン*/}
        <button
          onClick={() => onDelete(entry.id)}
          className="text-red-500 hover:text-red-700"
        >
          削除
        </button>
      </div>
    </div>
  );
};

export default DiaryEntry;