import React from 'react';
import { createRoot, Root } from 'react-dom/client';

import { Rating, RatingData } from '../components/rating/Rating';
import { Salary, SalaryData } from '../components/salary/Salary';

const data: any = JSON.parse(`[
  {
    "company_name": "Micro Focus",
    "overall_rating": 3.78,
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
    "company_name": "Luxoft Romania",
    "overall_rating": 3.87,
    "salaries": [
      {
        "position": "Senior .NET C# Developer",
        "years_of_experience": 2,
        "salary": 4500
      },
      {
        "position": "Junior Frontend Engineer",
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

  renderRating(element: Element, data: RatingData): void {
    const root: HTMLDivElement = document.createElement('div');
    root.classList.add('inline-block');
    element.insertAdjacentElement('beforeend', root);
    const reactElement: Root = createRoot(root);
    reactElement.render(<Rating {...data} />);
  }

  renderSalary(element: Element, data: SalaryData): void {
    const root: HTMLLIElement = document.createElement('li');
    root.classList.add('grow', 'text-right');
    element.insertAdjacentElement('beforeend', root);
    const reactElement: Root = createRoot(root);
    reactElement.render(<Salary {...data} />);
  }

  _levenshtein(s1: string, s2: string) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const costs: number[] = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue: number = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i == 0) {
          costs[j] = j;
        } else {
          if (j > 0) {
            let newValue: number = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1)) {
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            }
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) {
        costs[s2.length] = lastValue;
      }
    }
    return costs[s2.length];
  }

  _similarity(s1: string, s2: string): number {
    let longer: string = s1;
    let shorter: string = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    const longerLength: number = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - this._levenshtein(longer, shorter)) / longerLength;
  }

  matchCompanyName(companyName: string, data: any): object | undefined {
    for (const company of data) {
      if (this._similarity(company.company_name, companyName) >= 0.5) {
        return company;
      }
    }

    return undefined;
  }

  matchPositionNames(positionName: string, salaries: any[]): any[] {
    const matches: any[] = [];
    const positionNameWords: string[] = positionName.split(' ');
    
    let wordsMatchScore: number;
    for (const salary of salaries) {
      const salaryPositionNameWords: string[] = salary.position.split(' ');
      wordsMatchScore = 0;

      for (const sWord of salaryPositionNameWords) {
        for (const pWord of positionNameWords) {
          if (this._similarity(sWord, pWord) >= 0.75) {
            wordsMatchScore += 1;
          }
        }
      }

      if (wordsMatchScore >= 1) {
        salary.wordsMatchScore = wordsMatchScore;
        matches.push(salary);
      }
    }

    return matches;
  }

  init(): void {
    const jobsList = document.querySelector('.scaffold-layout__list-container');
    if (jobsList) {
      new MutationObserver((mutations: MutationRecord[]) => {
        for (const mutation of mutations) {
          for (const element of mutation.addedNodes) {
            if (!(element instanceof HTMLElement)) continue;

            if (element.matches('.job-card-container')) {
              const companyName: Element = element.querySelector('.job-card-container__company-name');
              const positionName: Element = element.querySelector('.job-card-list__title');
              if (companyName && positionName) {
                const companyNameMatch: any = this.matchCompanyName(companyName.textContent.trim().replace(/\n/g, ''), data);
                if (companyNameMatch) {
                  const ratingPlace: Element = element.querySelector('.artdeco-entity-lockup__subtitle');
                  if (ratingPlace) {
                    this.renderRating(ratingPlace, {
                      rating: companyNameMatch.overall_rating,
                      displayLogo: false
                    });
                  }

                  const positionsNameMatch: any[] = this.matchPositionNames(positionName.textContent.trim().replace(/\n/g, ''), companyNameMatch.salaries);
                  if (positionsNameMatch.length) {
                    const salaryData: SalaryData = {
                      range: {
                        min: 0,
                        max: undefined
                      }
                    };

                    if (positionsNameMatch.length > 1) {
                      const salaries = positionsNameMatch.map(o => o.salary).sort((a, b) => a - b);
                      salaryData.range = {
                        min: salaries[0],
                        max: salaries[salaries.length - 1]
                      };
                    } else {
                      salaryData.range.min = positionsNameMatch[0].salary;
                    }

                    if (salaryData.range.min) {
                      const salaryPlace: Element = element.querySelector('.job-card-list__footer-wrapper');
                      if (salaryPlace) {
                        this.renderSalary(salaryPlace, salaryData);

                        break;
                      }
                    }
                  }

                  break;
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
  const contentScripts: ContentScripts = new ContentScripts();
  contentScripts.init();
} catch (error) {
  console.warn('[munk] Content Scripts Error:', error);
}