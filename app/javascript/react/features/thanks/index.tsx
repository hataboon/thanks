import React, { useState } from "react"; // React と useState フックをインポート
import { Entry, Category } from "./types"; // 型定義をインポート
import Modal from "../../components/Modal"; // モーダルコンポーネントをインポート
import useModal from "./useModal"; // カスタム useModal フックをインポート
import DiaryEntry from "./../../components/DiaryEntry";  // 新しく追加


// 初期エントリーデータ
const initialEntries: Entry[] = [
  { id: 1, content: '家族の健康に感謝', date: '2024-03-01', category: '家族' },
  { id: 2, content: '仕事で新しいスキルを学べたことに感謝', date: '2024-03-02', category: '仕事' },
  { id: 3, content: '友人との楽しい時間に感謝', date: '2024-03-03', category: '友人' },
  { id: 4, content: '今日の晴れた天気に感謝', date: '2024-03-04', category: '自然' },
  { id: 5, content: '美味しい食事に感謝', date: '2024-03-05', category: '食事' },
];

// 初期カテゴリーデータ
const initialCategories: Category[] = [
  { id: 1, name: '家族' },
  { id: 2, name: '仕事' },
  { id: 3, name: '友人' },
  { id: 4, name: '自然' },
  { id: 5, name: '食事' },
];

export default function Thanks() { // Thanks コンポーネントの定義
  const [entries, setEntries] = useState<Entry[]>(initialEntries); // エントリーの状態を管理
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
    <div className="p-4 max-w-md mx-auto bg-pink-100 min-h-screen"> {/* メインのコンテナ */}
      <h1 className="text-2xl font-bold mb-4">感謝日記</h1> {/* タイトル */}
      <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded mb-4"> {/* モーダルを開くボタン */}
        新しい感謝を追加
      </button>

      <Modal modalRef={modalRef}> {/* モーダルコンポーネント */}
        <h2 className="text-xl font-bold mb-4">新しい感謝を追加</h2> {/* モーダルのタイトル */}
        <div className="mb-4">
          <label htmlFor="category" className="block mb-2">なにに：</label> {/* カテゴリー選択のラベル */}
          <select
            id="category"
            className="w-full p-2 border rounded bg-white"
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
          className="w-full p-2 border rounded mb-4 bg-white"
          rows={4}
          placeholder="感謝の内容を入力してください"
          value={newEntryContent}
          onChange={(e) => setNewEntryContent(e.target.value)} // テキストエリアの内容が変更されたときの処理
        ></textarea>
        <button onClick={addEntry} className="bg-blue-500 text-white px-4 py-2 rounded">保存</button> {/* エントリーを追加するボタン */}
      </Modal>

      <h2 className="text-xl font-bold mb-4">過去の感謝</h2> {/* 過去のエントリーセクションのタイトル */}
      {entries.map((entry) => ( // エントリーのリストをマップして表示
        <DiaryEntry key={entry.id} entry={entry} />  // ここを変更
      ))}
    </div>
  );
}