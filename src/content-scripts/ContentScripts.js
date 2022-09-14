import { createRoot } from 'react-dom/client';

// Components
import Rating from '../components/rating/Rating';

class Content {
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
              this.renderRating(element, { rating: 4.56, displayLogo: false });
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
  const content = new Content();
  content.init();
} catch (error) {
  console.warn('[munk] Content Error:', error);
}