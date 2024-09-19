import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Entry, Category } from "./types";
import Modal from "../../components/Modal";
import useModal from "./useModal";
import DiaryEntry from "./../../components/DiaryEntry";

// 初期カテゴリーデータ
const initialCategories: Category[] = [
  { id: 1, name: '家族' },
  { id: 2, name: '友人' },
];

export default function Thanks() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [categories, setCategories] = useState<Category[]>(initialCategories); // 初期カテゴリを設定
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // 選択されたカテゴリーの状態を管理
  const [newEntryContent, setNewEntryContent] = useState<string>(""); // 新しいエントリーの内容を管理
  const [newCategoryName, setNewCategoryName] = useState<string>(""); // 新しいカテゴリの名前を管理
  const { modalRef, openModal, closeModal } = useModal();
  const { modalRef: addCategoryModalRef, openModal: openAddCategoryModal,closeModal: closeAddCategoryModal } = useModal();

  const deleteCategory = (categoryName: string) => {
    setCategories(categories.filter(category => category.name !== categoryName));
    setSelectedCategory("");
  };

  const addCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: Category = {
        id: categories.length + 1,
        name: newCategoryName,
      };
      setCategories([...categories, newCategory]); // カテゴリリストに新しいカテゴリを追加
      setNewCategoryName(""); // 新しいカテゴリ名をリセット
      closeAddCategoryModal(); // モーダルを閉じる
    }
  }
  const addEntry = () => {
    if (selectedCategory && newEntryContent) {
      const newEntry: Entry = {
        id: uuidv4(),
        content: newEntryContent,
        date: new Date().toISOString().split('T')[0],
        category: selectedCategory
      };
      setEntries([newEntry, ...entries]);
      setSelectedCategory(""); // 選択カテゴリをリセット
      setNewEntryContent(""); // 新規エントリ内容をリセット
      closeModal();
    }
  };

  return (
    <div className="bg-pink-100 min-h-screen p-4 md:p-8 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">感謝日記</h1>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg mb-8 hover:bg-blue-600 transition-colors"
        >
          新しい感謝を追加
        </button>

        {/* 新しいカテゴリを追加するボタン */}
        <button
          onClick={openAddCategoryModal}
          className="bg-green-500 text-white px-4 py-2 rounded-lg mb-8"
        >
          新しいカテゴリを追加
        </button>

        <Modal modalRef={modalRef}>
          <h2 className="text-xl font-bold mb-4">新しい感謝を追加</h2>
          <div className="mb-4">
            <label htmlFor="category" className="block mb-2">何に：</label>
            <div className="flex items-center">
              <select
                id="category"
                className="w-full p-2 border rounded bg-white text-center"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)} // カテゴリ選択
              >
                <option value="">選択してください</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
              {/* カテゴリ削除の×ボタン */}
              {selectedCategory && categories.some(category => category.name === selectedCategory) && (
                <button
                  onClick={() => deleteCategory(selectedCategory)} // カテゴリ削除
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                  ×
                </button>
              )}
            </div>
          </div>
          <textarea
            className="w-full p-2 border rounded mb-4 bg-white text-center"
            rows={4}
            placeholder="感謝の内容を入力してください"
            value={newEntryContent}
            onChange={(e) => setNewEntryContent(e.target.value)}
          ></textarea>
          <button onClick={addEntry} className="bg-blue-500 text-white px-4 py-2 rounded">保存</button>
        </Modal>

        {/* 新しいカテゴリを追加するモーダル */}
        <Modal modalRef={addCategoryModalRef}>
          <h2 className="text-xl font-bold mb-4">新しいカテゴリを追加</h2>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="カテゴリ名を入力"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)} // 新しいカテゴリの名前を管理
          />
          <button
            onClick={addCategory}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            カテゴリを追加
          </button>
        </Modal>

        <div className="space-y-4">
          {entries.map((entry) => (
            <DiaryEntry key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}
