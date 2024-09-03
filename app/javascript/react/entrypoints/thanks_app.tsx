import React from "react";
import { createRoot } from "react-dom/client"; //createRoot: React 18から導入された新しいAPIで、Reactアプリケーションのルートを作成します。
import Thanks from "../features/thanks";

const container = document.getElementById("thanks_app");
if (container) { // containerが存在する場合のみ、以下のコードを実行します。
  const root = createRoot(container); // 取得した要素にReactアプリケーションのルートを作成します。
  root.render(
      <Thanks />
  );
}

