import React from 'react';
import { createRoot, Root } from 'react-dom/client';

import Rating from '../components/rating/Rating';
import Salary from '../components/salary/Salary';
import MunkButton from '../components/munk-button/MunkButton';

import SalaryData from '../interfaces/SalaryData';
import RatingData from '../interfaces/RatingData';

const stopwords: string[] = ['a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'];

const domains: any = [
  {
    title: 'backend',
    keywords: [
      {
        title: 'c',
        score: 15
      },
      {
        title: 'c#',
        score: 15
      },
      {
        title: 'net',
        score: 15
      },
      {
        title: 'ruby',
        score: 15
      },
      {
        title: 'python',
        score: 15
      },
      {
        title: 'fullstack',
        score: 10
      }
    ]
  },
  {
    title: 'qa',
    keywords: [
      {
        title: 'quality',
        score: 15
      },
      {
        title: 'assurance',
        score: 15
      },
      {
        title: 'automation',
        score: 10
      },
      {
        title: 'analytics',
        score: 10
      }
    ]
  },
  {
    title: 'frontend',
    keywords: [
      {
        title: 'react',
        score: 15
      },
      {
        title: 'angular',
        score: 15
      },
      {
        title: 'vuejs',
        score: 15
      },
      {
        title: 'javascript',
        score: 15
      },
      {
        title: 'web',
        score: 10
      }
    ]
  },
];

const data: any[] = JSON.parse(`[
  {
    "company_name": "Micro Focus",
    "overall_rating": 3.78,
    "positions": [
      {
        "title": "Software Development Intern",
        "years_of_experience": 1,
        "salary": 3000
      },
      {
        "title": "QA Automation Engineer",
        "years_of_experience": 2,
        "salary": 5300
      },
      {
        "title": "Renewal Sales Representative",
        "years_of_experience": 3,
        "salary": 5300
      },
      {
        "title": "Senior Frontend Developer",
        "years_of_experience": 5,
        "salary": 7800
      },
      {
        "title": "Senior Software Developer",
        "years_of_experience": 7,
        "salary": 12500
      },
      {
        "title": "Front-End Developer",
        "years_of_experience": 2,
        "salary": 6000
      }
    ]
  },
  {
    "company_name": "Luxoft Romania",
    "overall_rating": 3.87,
    "positions": [
      {
        "title": "QA Automation Engineer",
        "years_of_experience": 2,
        "salary": 5500
      },
      {
        "title": "Senior Software Developer .NET",
        "years_of_experience": 2,
        "salary": 10000
      },
      {
        "title": "DevOps Software Engineer",
        "years_of_experience": 2,
        "salary": 8000
      },
      {
        "title": "Junior JavaScript Developer",
        "years_of_experience": 2,
        "salary": 4000
      },
      {
        "title": "Junior Front End Developer",
        "years_of_experience": 0,
        "salary": 3500
      },
      {
        "title": "Front-end Developer",
        "years_of_experience": 5,
        "salary": 7000
      },
      {
        "title": "Frontend React Deveoper",
        "years_of_experience": 0,
        "salary": 4800
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

  renderButton(element: Element, id: number): void {
    const root: HTMLDivElement = document.createElement('div');
    root.classList.add('flex', 'justify-center', 'mt-2');
    element.insertAdjacentElement('beforeend', root);
    const reactElement: Root = createRoot(root);
    reactElement.render(<MunkButton id={id} />);
  }

  levenshtein(s1: string, s2: string) {
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

  similarity(s1: string, s2: string): number {
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
    return (longerLength - this.levenshtein(longer, shorter)) / longerLength;
  }

  tokenizeString(s: string): string[] {
    const words: string[] = s.toLowerCase().replace('-', '').replace(/\W/g, ' ').replace(/\s+/g, ' ').trim().split(' ');
    const tokens: string[] = [];
    for (let i = 0; i < words.length; i++) {
      if (stopwords.indexOf(words[i]) === -1) {
        tokens.push(words[i]);
      }
    }

    return tokens;
  }

  matchCompanyName(companyName: string, data: any[]): object | undefined {
    for (const company of data) {
      if (company.company_name.includes(companyName)) {
        return company;
      }
    }

    return undefined;
  }

  matchPositions(positionTitle: string, positions: any[], sensitivity: number = 0.8): any[] {
    const positionTitleWords: string[] = this.tokenizeString(positionTitle);
    let relevantKeywords: any[] = [];
    for (const positionTitleWord of positionTitleWords) {
      const relevantKeyword: any = {
        title: '',
        score: 0
      };
      for (const domain of domains) {
        if (this.similarity(positionTitleWord, domain.title) > sensitivity) {
          relevantKeyword.title = domain.title;
          relevantKeyword.score += 20;
        }
        for (const keyword of domain.keywords) {
          if (this.similarity(positionTitleWord, keyword.title) > sensitivity) {
            relevantKeyword.title = keyword.title;
            relevantKeyword.score += keyword.score;
          }
        }

        if (relevantKeyword.score > 10) {
          relevantKeywords.push(relevantKeyword);
        }
      }
    }
    
    const matches: string[] = [];
    for (const position of positions) {
      let score: number = 0;
      const words: string[] = this.tokenizeString(position.title);  
      for (const word of words) {
        for (const relevantKeyword of relevantKeywords) {
          if (this.similarity(word, relevantKeyword.title) > sensitivity) {
            score += relevantKeyword.score;
          }
        }
      }

      if (score > 10) {
        matches.push(position);
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
              const buttonPlace: Element = element.querySelector('.job-card-container__action--visible-on-hover');
              if (buttonPlace) {
                this.renderButton(buttonPlace, parseInt(element.dataset.jobId));
              }

              let companyName: Element | string = element.querySelector('.job-card-container__company-name');
              let positionTitle: Element | string = element.querySelector('.job-card-list__title');
              if (companyName && positionTitle) {
                companyName = companyName.textContent.trim().replace(/\n/g, '');
                positionTitle = positionTitle.textContent.trim().replace(/\n/g, '');
                
                const companyNameMatch: any = this.matchCompanyName(companyName, data);
                if (companyNameMatch) {
                  const ratingPlace: Element = element.querySelector('.artdeco-entity-lockup__subtitle');
                  if (ratingPlace) {
                    this.renderRating(ratingPlace, {
                      rating: companyNameMatch.overall_rating,
                      displayLogo: false
                    });
                  }

                  const positionMatches: any = this.matchPositions(positionTitle, companyNameMatch.positions);
                  console.log(positionTitle, positionMatches);
                  
                  if (positionMatches.length) {
                    const salaryData: SalaryData = {
                      range: {
                        min: 0,
                        max: undefined
                      }
                    };

                    if (positionMatches.length > 1) {
                      const salaries: number[] = positionMatches.map((o: { salary: any; }) => o.salary).sort((a: number, b: number) => a - b);
                      salaryData.range = {
                        min: salaries[0],
                        max: salaries[salaries.length - 1]
                      };
                    } else {
                      salaryData.range.min = positionMatches[0].salary;
                    }

                    if (salaryData.range.min) {
                      const salaryPlace: Element = element.querySelector('.job-card-list__footer-wrapper');
                      if (salaryPlace) {
                        this.renderSalary(salaryPlace, salaryData);

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
  const contentScripts: ContentScripts = new ContentScripts();
  contentScripts.init();
} catch (error) {
  console.warn('[munk] Content Scripts Error:', error);
}