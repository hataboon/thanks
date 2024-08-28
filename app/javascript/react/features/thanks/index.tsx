import React, { useState } from "react";
import { Entry, Category } from "./types";

const initialEntries: Entry[] = [
  { id: 1, content: '家族の健康に感謝', date: '2024-03-01', category: '家族' },
  { id: 2, content: '仕事で新しいスキルを学べたことに感謝', date: '2024-03-02', category: '仕事' },
  { id: 3, content: '友人との楽しい時間に感謝', date: '2024-03-03', category: '友人' },
  { id: 4, content: '今日の晴れた天気に感謝', date: '2024-03-04', category: '自然' },
  { id: 5, content: '美味しい食事に感謝', date: '2024-03-05', category: '食事' },
];

const initialCategories: Category[] = [
  { id: 1, name: '家族' },
  { id: 2, name: '仕事' },
  { id: 3, name: '友人' },
  { id: 4, name: '自然' },
  { id: 5, name: '食事' },
];

export default function Thanks() {
  const [entries] = useState<Entry[]>(initialEntries);
  const [categories] = useState<Category[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <div className="p-4 max-w-md mx-auto bg-pink-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">感謝日記</h1>
      <p className="mb-4">今日、あなたは何に感謝していますか？</p>
      <div className="mb-4">
        <label htmlFor="category" className="block mb-2">なにに：</label>
        <select 
          id="category" 
          className="w-full p-2 border rounded bg-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">選択してください</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>
      <textarea 
        className="w-full p-2 border rounded mb-4 bg-white" 
        rows={4} 
        placeholder="感謝の内容を入力してください"
      ></textarea>
      <div className="flex justify-between items-center mb-8">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">保存</button>
        <div>
          <button className="mr-2 text-gray-600 hover:text-gray-800">
            ✏️
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            🗑️
          </button>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4">過去の感謝</h2>
      {entries.map((entry) => (
        <div key={entry.id} className="mb-4">
          <p className="font-bold">{entry.category}</p>
          <p>{entry.content}</p>
          <p className="text-sm text-gray-500">{entry.date}</p>
        </div>
      ))}
    </div>
  );
}