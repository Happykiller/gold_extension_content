import $ from "jquery";
import React from "react";
import { createRoot } from "react-dom/client";

import './i18n';
import Import from "./component/import";
import packageInfo from '../package.json';

console.log(`Gold content (${packageInfo.version})`);

function bootstrap() {
  const content = new GoldContent();

  // Create your observer
  var mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(domm) {
      const $anchor = content.getAnchor(domm);
      if($anchor) {
        content.inject($anchor);
      }
    })
  })

  // Call the observe function by passing the node you want to watch with configuration options
  mutationObserver.observe(document.documentElement, { 
    childList: true,
    subtree: true,
  });
}

class GoldContent {
  getAnchor = (domm) => {
    let $anchor: JQuery<HTMLElement>;
    let icontinue = true;
    const $elt = $(domm.addedNodes).find("h3");
    const isGoldInjection = $(domm.addedNodes).hasClass("gold_injection");

    if(!isGoldInjection) {
      const isGoldView = $elt.hasClass("gold_view");
      if (!isGoldView) {
        $elt.addClass("gold_view");
        $elt.parent().each(function( index ) {
          if ($( this ).text().trim().toLowerCase() === 'actions' && icontinue) {
            icontinue = false;
            $anchor = $( this );
          }
        });
      }
    }

    return $anchor;
  }

  inject = ($anchor: any) => {
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
    $anchor.after($div);
    const container = document.getElementById("gold_root") as HTMLElement;
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <Import />
      </React.StrictMode>
    );
  }
}

bootstrap();