// app/javascript/application.js

import "@hotwired/turbo-rails"
import "./controllers"
import "./react/entrypoints/thanks_app";
import Rails from "@rails/ujs";  // RailsのJSヘルパーを読み込む
Rails.start();  // RailsのJSを開始する
