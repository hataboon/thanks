import React from 'react';
import { Entry } from '../features/thanks/types';

interface DiaryEntryProps {
  entry: Entry;
}

const DiaryEntry: React.FC<DiaryEntryProps> = ({ entry }) => {
  return (
    <div className="mb-4 p-4 bg-white rounded shadow">
      <p className="font-bold">{entry.category}</p>
      <p>{entry.content}</p>
      <p className="text-sm text-gray-500">{entry.date}</p>
    </div>
  );
};

export default DiaryEntry;