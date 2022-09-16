import React from 'react';
import { createRoot } from 'react-dom/client';

import Fuse from 'fuse.js';

import Rating from '../components/rating/Rating';
import RatingData from '../components/rating/RatingData';
import Salary from '../components/salary/Salary';
import SalaryData from '../components/salary/SalaryData';

const data = JSON.parse(`[
  {
    "company_name": "Micro Focus",
    "salaries": [
      {
        "position": "Software Development Intern",
        "years_of_experience": 1,
        "salary": 3000
      },
      {
        "position": "Renewal Sales Representative",
        "years_of_experience": 3,
        "salary": 5300
      },
      {
        "position": "Senior Frontend Developer",
        "years_of_experience": 5,
        "salary": 7800
      },
      {
        "position": "Senior Software Developer",
        "years_of_experience": 7,
        "salary": 12500
      },
      {
        "position": "Front End Developer",
        "years_of_experience": 2,
        "salary": 6000
      }
    ]
  },
  {
    "company_name": "Luxoft",
    "salaries": [
      {
        "position": "Frontend Engineer",
        "years_of_experience": 2,
        "salary": 4500
      },
      {
        "position": "QA Automation Engineer",
        "years_of_experience": 3,
        "salary": 5500
      }
    ]
  }
]`);


class ContentScripts {
  constructor() {
    //
  }

  renderRating(element: Element, data: RatingData) {
    const root = document.createElement('div');
    root.classList.add('inline-block');
    element.insertAdjacentElement('beforeend', root);
    const reactElement = createRoot(root);
    reactElement.render(<Rating data={data} />);
  }

  renderSalary(element: Element, data: SalaryData) {
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

            if (element.matches('.job-card-container')) {
              // Rating
              const ratingPlace = element.querySelector('.artdeco-entity-lockup__subtitle');
              if (ratingPlace) {
                this.renderRating(ratingPlace, { rating: 4.56, displayLogo: false });
              }

              // Salary
              const _companyName = element.querySelector('.job-card-container__company-name');
              const _positionName = element.querySelector('.job-card-list__title');
              if (_companyName && _positionName) {
                const companyNameMatch = new Fuse(data, { keys: ['company_name'], includeScore: true }).search(
                  _companyName.textContent.trim().replace(/\n/g, '')
                );
                if (companyNameMatch.length && companyNameMatch[0].score <= 0.001) {
                  // @ts-ignore
                  const positionNameMatch = new Fuse(companyNameMatch[0].item.salaries, { keys: [['position']], includeScore: true, threshold: 0.45 }).search(
                    _positionName.textContent.trim().replace(/\n/g, '')
                  );
                  if (positionNameMatch.length) {
                    const _salaryData: SalaryData = {
                      range: {
                        min: 0,
                        max: undefined
                      }
                    };
                    
                    if (positionNameMatch.length > 1) {
                      // @ts-ignore
                      const _salaries = positionNameMatch.map(o => o.item.salary).sort((a, b) => a - b);
                      _salaryData.range = {
                        min: _salaries[0],
                        max: _salaries[_salaries.length - 1]
                      };
                    } else {
                      // @ts-ignore
                      _salaryData.range.min = positionNameMatch[0].item.salary;
                    }
                    
                    if (_salaryData.range.min) {
                      const salaryPlace = element.querySelector('.job-card-list__footer-wrapper');
                      if (salaryPlace) {
                        this.renderSalary(salaryPlace, _salaryData);
                        break;
                      }
                    }
                  }
                }
              }
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