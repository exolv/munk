import TimelineLog from '../interfaces/TimelineLog';

const storage = {
  addTrackedJob: async (value: TimelineLog) => {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(['timelineLogs'], (result) => {
          if (result['timelineLogs'] && result['timelineLogs'].length > 0) {
            chrome.storage.sync.set({ ['timelineLogs']: [...result['timelineLogs'], value] }, () => {
              resolve(value);
            })
          } else {
            chrome.storage.sync.set({ ['timelineLogs']: [value] }, () => {
              resolve(value);
            })
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  getTrackedJob: async (id: number) => {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(['timelineLogs'], (result) => {
          resolve(result['timelineLogs'].find((log: TimelineLog) => log.id === id));
        });
      } catch (error) {
        reject(error);
      }
    });
  },
 
  add: async (key: string, value: any) => {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get([key], (result) => {
          if (result[key] && result[key].length > 0) {
            chrome.storage.sync.set({ [key]: [...result[key], value] }, () => {
              resolve(value);
            })
          } else {
            chrome.storage.sync.set({ [key]: [value] }, () => {
              resolve(value);
            })
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  get: async (key: string) => {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get([key], (result) => {
          resolve(result[key]);
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  clear: () => {
    chrome.storage.sync.clear();
  }
}

export default storage;