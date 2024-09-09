import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = () => {
      setIsLoggedIn(window.currentUser === true);
    };

    checkStatus();
  },[]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;

      // fetchを使ってDELETEリクエストを送信
      const response = await fetch('/users/sign_out', {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': csrfToken || '', // RailsのCSRFトークンをヘッダーに追加
          'Content-Type': 'application/json',
        }
      });

      // リクエストが成功した場合
      if (response.ok) {
        setIsLoggedIn(false); // ログイン状態をfalseに設定
        setIsMenuOpen(false); // メニューを閉じる
        navigate('/'); // トップページにリダイレクト
        window.currentUser = false;
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">感謝日記</Link>
          </div>
          <div className="flex items-center">
            <div className="relative" ref={menuRef}>
              <button
                onClick={toggleMenu}
                className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                  U
                </div>
              </button>
              {isMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  {isLoggedIn ? (
                    <>
                      <a href="/users/edit" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">プロフィール</a>
                      <a href="/users/sign_out" data-method="delete" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">ログアウト</a>
                    </>
                  ) : (
                    <>
                      <a href="/users/sign_in" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">ログイン</a>
                      <a href="/users/sign_up" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">新規登録</a>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;