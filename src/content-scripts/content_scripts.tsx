import React from 'react';
import { createRoot } from 'react-dom/client';

import Rating from '../components/rating/Rating';
import RatingData from '../components/rating/RatingData';
import Salary from '../components/salary/Salary';
import SalaryData from '../components/salary/SalaryData';


class ContentScripts {
  constructor() {
    //
  }

  renderRating(element: HTMLElement, data: RatingData) {
    const root = document.createElement('div');
    root.classList.add('inline-block');
    element.insertAdjacentElement('beforeend', root);
    const reactElement = createRoot(root);
    reactElement.render(<Rating data={data} />);
  }

  renderSalary(element: HTMLElement, data: SalaryData) {
    const root = document.createElement('li');
    root.classList.add('grow', 'text-right');
    element.insertAdjacentElement('beforeend', root);
    const reactElement = createRoot(root);
    reactElement.render(<Salary data={data} />);
  }

  init() {    
    const jobsList = document.querySelector('.scaffold-layout__list-container');
    if (jobsList) {
      new MutationObserver((mutations: MutationRecord[]) => {
        for (const mutation of mutations) {
          for (const element of mutation.addedNodes) {
            if (!(element instanceof HTMLElement)) continue;

            if (element.matches('.artdeco-entity-lockup__subtitle')) {
              this.renderRating(element, { rating: 4.56, displayLogo: false });
            }

            if (element.matches('.job-card-list__footer-wrapper')) {
              this.renderSalary(element, { salary: 3500 });
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