import TrackedJob from '../interfaces/TrackedJob';
import TimelineLog from '../interfaces/TimelineLog';

const storage = {
  addTrackedJob: async (value: TrackedJob) => {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(['trackedJobs'], (result) => {
          if (result['trackedJobs'] && result['trackedJobs'].length > 0) {
            chrome.storage.sync.set({ ['trackedJobs']: [...result['trackedJobs'], value] }, () => {
              resolve(value);
            });
          } else {
            chrome.storage.sync.set({ ['trackedJobs']: [value] }, () => {
              resolve(value);
            });
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  getTrackedJobs: async () => {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(['trackedJobs'], (result) => {
          resolve(result['trackedJobs']);
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  getTrackedJob: async (id: number) => {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(['trackedJobs'], (result) => {
          resolve(result['trackedJobs']?.find((job: TrackedJob) => job.id === id));
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  updateTrackedJob: async (id: number, data: TrackedJob) => {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(['trackedJobs'], (result) => {
          if (result['trackedJobs'] && result['trackedJobs'].length > 0) {
            const filteredTrackedJobs: TrackedJob[] = result['trackedJobs'].filter((job: TrackedJob) => job.id !== id);
            filteredTrackedJobs.push(data);
            chrome.storage.sync.set({ ['trackedJobs']: [...filteredTrackedJobs] }, () => {
              resolve(filteredTrackedJobs);
            });
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  removeTrackedJob: async (id: number) => {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(['trackedJobs'], (result) => {
          if (result['trackedJobs'] && result['trackedJobs'].length > 0) {
            const filteredTrackedJobs: TrackedJob[] = result['trackedJobs'].filter((job: TrackedJob) => job.id !== id);
            chrome.storage.sync.set({ ['trackedJobs']: [...filteredTrackedJobs] }, () => {
              resolve(filteredTrackedJobs);
            });
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  addTimelineLog: async (value: TimelineLog) => {
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
            });
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  getTimelineLogs: async () => {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(['timelineLogs'], (result) => {
          resolve(result['timelineLogs']);
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
            });
          } else {
            chrome.storage.sync.set({ [key]: [value] }, () => {
              resolve(value);
            });
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

  remove: (key: string) => {
    chrome.storage.sync.remove([key]);
  },

  clear: () => {
    chrome.storage.sync.clear();
  }
}

export default storage;