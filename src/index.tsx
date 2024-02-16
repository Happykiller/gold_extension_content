import $ from "jquery";
import React from "react";
import { createRoot } from "react-dom/client";

import './i18n';
import App from "./component/app";
import packageInfo from '../package.json';

console.log(`Gold content (${packageInfo.version})`);

// Create your observer
var mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    const isTransactionDetail = $(mutation.addedNodes).hasClass("transaction-container");
    const isGoldInjection = $(mutation.addedNodes).hasClass("gold_injection");
    if (isTransactionDetail && !isGoldInjection) {
      let $actions = $('.template-section-title');
      if ($actions.length) {
        let $div = $(`
  <compte-flag-transaction-cell class="gold_injection ng-star-inserted">
    <ui-cell class="cell-info clickable flag-transaction-cell">
      <div class="bpce-cell bpce-cell-with-ellipsis">
        <div class="bpce-cell-content bpce-cell-real-content bpce-cell-real-content-show">
          <span class="cell-content-title">Importer dans Gold</span>
        </div>
        <div class="bpce-cell-right ng-star-inserted" style="border-bottom: solid 1px #cccccc;">
          <div id="gold_root"></div>
        </div>
      </div>
    </ui-cell>
  </compte-flag-transaction-cell>`);
        $actions.after($div);
        const container = document.getElementById("gold_root") as HTMLElement;
        const root = createRoot(container);
        root.render(
          <React.StrictMode>
              <App />
          </React.StrictMode>
        );
        console.log('Injection');
      }
    }
  });
});

// Call the observe function by passing the node you want to watch with configuration options
mutationObserver.observe(document.documentElement, { 
  childList: true,
  subtree: true,
});