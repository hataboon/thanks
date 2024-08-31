import React, { useState, useEffect } from "react"; // React と useState フックをインポート
import { Entry, Category } from "./types"; // 型定義をインポート
import Modal from "../../components/Modal"; // モーダルコンポーネントをインポート
import useModal from "./useModal"; // カスタム useModal フックをインポート
import DiaryEntry from "./../../components/DiaryEntry";  // 新しく追加


// 初期エントリーデータ
const initialEntries: Entry[] = [];

// 初期カテゴリーデータ
const initialCategories: Category[] = [
  { id: 1, name: '家族' },
  { id: 2, name: '仕事' },
  { id: 3, name: '友人' },
  { id: 4, name: '自然' },
  { id: 5, name: '食事' },
];

export default function Thanks() { // Thanks コンポーネントの定義、以下フックを使用
  const [entries, setEntries] = useState<Entry[]>(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  }); // エントリーの状態を管理
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);
  const [categories] = useState<Category[]>(initialCategories); // カテゴリーの状態を管理（更新しないので setter は省略）
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // 選択されたカテゴリーの状態を管理
  const [newEntryContent, setNewEntryContent] = useState<string>(""); // 新しいエントリーの内容の状態を管理
  const { modalRef, openModal, closeModal } = useModal(); // useModal フックを使用してモーダルの状態を管理

  // 新しいエントリーを追加する関数
  const addEntry = () => {
    if (selectedCategory && newEntryContent) { // カテゴリーと内容が入力されている場合
      const newEntry: Entry = { // 新しいエントリーオブジェクトを作成
        id: entries.length + 1, // 仮のID生成方法
        content: newEntryContent,
        date: new Date().toISOString().split('T')[0], // 現在の日付を YYYY-MM-DD 形式で取得
        category: selectedCategory
      };
      setEntries([newEntry, ...entries]); // 新しいエントリーを既存のリストの先頭に追加
      setSelectedCategory(""); // 選択カテゴリーをリセット
      setNewEntryContent(""); // 入力内容をリセット
      closeModal(); // モーダルを閉じる
    }
  };

  return (
    <div className="bg-pink-100 min-h-screen p-4 md:p-8 text-center" > {/* 背景色とパディングを調整 */}
      <div className="max-w-2xl mx-auto"> {/* 最大幅を設定し、中央寄せ */}
        <h1 className="text-3xl font-bold mb-6">感謝日記</h1>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg mb-8 hover:bg-blue-600 transition-colors"
        >
          新しい感謝を追加
        </button>

      <Modal modalRef={modalRef}> {/* モーダルコンポーネント */}
        <h2 className="text-xl font-bold mb-4">新しい感謝を追加</h2> {/* モーダルのタイトル */}
        <div className="mb-4">
          <label htmlFor="category" className="block mb-2">何に：</label> {/* カテゴリー選択のラベル */}
          <select
            id="category"
            className="w-full p-2 border rounded bg-white text-center"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)} // カテゴリーが選択されたときの処理
          >
            <option value="">選択してください</option> {/* デフォルトのオプション */}
            {categories.map((category) => ( // カテゴリーのリストをマップしてオプションを生成
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <textarea
          className="w-full p-2 border rounded mb-4 bg-white text-center"
          rows={4}
          placeholder="感謝の内容を入力してください"
          value={newEntryContent}
          onChange={(e) => setNewEntryContent(e.target.value)} // テキストエリアの内容が変更されたときの処理
        ></textarea>
        <button onClick={addEntry} className="bg-blue-500 text-white px-4 py-2 rounded">保存</button> {/* エントリーを追加するボタン */}
      </Modal>

      <h2 className="text-2xl font-bold mb-6">過去の感謝</h2>
        <div className="space-y-4"> {/* グリッドレイアウトを適用 */}
          {entries.map((entry) => (
            <DiaryEntry key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}