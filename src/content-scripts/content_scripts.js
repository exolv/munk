import { createRoot } from 'react-dom/client';

import Rating from '../components/rating/Rating';


class ContentScripts {
  constructor() {
    //
  }

  renderRating(element, data) {
    const root = document.createElement('div');
    root.style.display = 'inline-block';
    element.insertAdjacentElement('beforeend', root);
    const reactElement = createRoot(root);
    reactElement.render(<Rating data={data} />);
  }

  init() {
    const jobsList = document.querySelector('.scaffold-layout__list-container');
    if (jobsList) {
      new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const element of mutation.addedNodes) {
            if (!(element instanceof HTMLElement)) continue;

            if (element.matches('.artdeco-entity-lockup__subtitle')) {
              element.classList.add('flex', 'justify-between', 'items-center');
              this.renderRating(element, { rating: 4.56, displayLogo: true });
            }
          }
        }
      }).observe(jobsList, {
        childList: true,
        subtree: true
      });
    }
  }
}

try {
  const contentScripts = new ContentScripts();
  contentScripts.init();
} catch (error) {
  console.warn('[munk] Content Scripts Error:', error);
}