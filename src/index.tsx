import $ from "jquery";
import React from "react";
import { createRoot } from "react-dom/client";

import './i18n';
import App from "./component/app";
import packageInfo from '../package.json';

console.log(`Gold content (${packageInfo.version})`);

let $body = $(document.body);
let $div = $('<div id="gold_root"></div>');
$body.append($div);
const container = document.getElementById("gold_root") as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);