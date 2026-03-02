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
  var mutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (domm) {
      const $anchor = content.getAnchor(domm);
      if ($anchor) {
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
    // Guard: skip mutations caused by our own injection
    const isGoldInjection = $(domm.addedNodes).hasClass("gold_injection");
    if (isGoldInjection) return null;

    // Look for the new transaction panel footer inside added nodes or their subtree
    let $footer: JQuery<HTMLElement> = $(domm.addedNodes)
      .find("compte-transaction-layer-v2-level-1 > div.footer")
      .first();

    // Also check if the added node itself is the level-1 container
    if ($footer.length === 0) {
      $footer = $(domm.addedNodes)
        .filter("compte-transaction-layer-v2-level-1")
        .find("> div.footer")
        .first();
    }

    if ($footer.length === 0) return null;

    // Skip if we already injected
    if ($footer.prev(".gold_injection").length > 0) return null;

    return $footer;
  }

  inject = ($anchor: any) => {
    let $div = $(`
<div class="gold_injection" style="padding: 8px 16px; border-top: solid 1px #cccccc;">
  <div id="gold_root"></div>
</div>`);
    $anchor.before($div);
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