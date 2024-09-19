import React, { useState, useEffect } from "react"; // React と useState フックをインポート
import { v4 as uuidv4 } from 'uuid'; // UUIDを生成するためのライブラリをインポート
import { Entry, Category } from "./types"; // 型定義をインポート
import Modal from "../../components/Modal"; // モーダルコンポーネントをインポート
import useModal from "./useModal"; // カスタム useModal フックをインポート
import DiaryEntry from "./../../components/DiaryEntry";  // 新しく追加

// カテゴリごとの感謝をスライダー形式で表示するコンポーネントを追加
const CategorySlider: React.FC<{ entries: Entry[], category: string }> = ({ entries, category }) => {
  // 特定のカテゴリに属する感謝エントリーをフィルタリング
  const filteredEntries = entries.filter(entry => entry.category === category);

  return (
    <div className="category-section mb-8">
      <h2 className="text-xl font-bold mb-4">{category}</h2>
      <div className="slider-container flex overflow-x-auto space-x-4"> {/* 横方向にスクロール可能にする */}
        {filteredEntries.map((entry) => (
          <div key={entry.id} className="min-w-[200px]"> {/* 各エントリーを横並びに表示 */}
            <DiaryEntry entry={entry} />
          </div>
        ))}
      </div>
    </div>
  );
};

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
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const thanksData = JSON.parse(document.getElementById('thanks_app')?.getAttribute('data-thanks') || '[]');
    setEntries(thanksData);
  }, []);

  const [categories] = useState<Category[]>(initialCategories); // カテゴリーの状態を管理（更新しないので setter は省略）
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // 選択されたカテゴリーの状態を管理
  const [newEntryContent, setNewEntryContent] = useState<string>(""); // 新しいエントリーの内容の状態を管理
  const { modalRef, openModal, closeModal } = useModal(); // useModal フックを使用してモーダルの状態を管理
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

  const startEditing = (entry: Entry) => { // この関数は編集を開始するときに呼ばれます。
    setEditingEntry(entry); // 編集中のエントリーを設定します
    setSelectedCategory(entry.category); // 編集中のエントリーのカテゴリーを選択状態にします。
    setNewEntryContent(entry.content); // 編集中のエントリーの内容をテキストエリアにセットします。
    openModal(); // 編集用のモーダルを開きます。
  };

  const deleteEntry = (id: string) => { // この関数は指定されたIDのエントリーを削除します。
    setEntries(entries.filter(entry => entry.id !== id)); // 指定されたIDを持つエントリーを除外した新しい配列を作成します。
  }
  // 新しいエントリーを追加する関数
  const addEntry = () => {
    if (selectedCategory && newEntryContent) { // カテゴリーと内容が入力されている場合
      if (editingEntry) {
        const updatedEntries = entries.map(entry =>
          entry.id === editingEntry.id
            ? { ...entry, category: selectedCategory, content: newEntryContent }
            : entry
        );
        setEntries(updatedEntries);
      }else {
        const newEntry: Entry = { // 新しいエントリーオブジェクトを作成
          id: uuidv4(), // UUIDを使用して一意のIDを生成
          content: newEntryContent,
          date: new Date().toISOString().split('T')[0], // 現在の日付を YYYY-MM-DD 形式で取得
          category: selectedCategory
        };
        setEntries([newEntry, ...entries]); // 新しいエントリーを既存のリストの先頭に追加
      }
      setSelectedCategory(""); // 選択カテゴリーをリセット
      setNewEntryContent(""); // 入力内容をリセット
      setEditingEntry(null);
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

       {/* カテゴリごとの感謝エントリを表示 */}
       {categories.map((category) => (
          <CategorySlider key={category.id} entries={entries} category={category.name} />
        ))}
      </div>
    </div>
  );
}