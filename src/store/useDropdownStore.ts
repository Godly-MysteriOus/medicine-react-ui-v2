import { create } from 'zustand';

// Define the shape of your cache
interface DropdownCache {
  [datatypeId: string]: {
    [key: string]: any;
  };
}

interface DropdownStore {
  cache: DropdownCache;
  inFlight: { [requestId: string]: Promise<any> | undefined };
  fetchData: <T>(
    datatypeId: string, 
    key: string, 
    apiCallerFunction: () => Promise<T>
  ) => Promise<T>;
}

const useDropdownStore = create<DropdownStore>((set, get) => ({
  cache: {},
  inFlight: {},

  fetchData: async (datatypeId, key, apiCallerFunction) => {
    const state = get();
    const requestId = `${datatypeId}:${key}`;

    // 1. Return cached data
    if (state.cache[datatypeId]?.[key]) {
      return state.cache[datatypeId][key];
    }

    // 2. Deduplicate requests
    if (state.inFlight[requestId]) {
      return state.inFlight[requestId] as Promise<any>;
    }

    // 3. Fetch and store
    const requestPromise = apiCallerFunction()
      .then((data) => {
        set((s) => ({
          cache: {
            ...s.cache,
            [datatypeId]: {
              ...(s.cache[datatypeId] || {}),
              [key]: data,
            },
          },
          inFlight: { ...s.inFlight, [requestId]: undefined },
        }));
        return data;
      })
      .catch((error) => {
        set((s) => ({
          inFlight: { ...s.inFlight, [requestId]: undefined },
        }));
        throw error;
      });

    // 4. Track the promise
    set((s) => ({
      inFlight: { ...s.inFlight, [requestId]: requestPromise },
    }));

    return requestPromise;
  },
}));

export default useDropdownStore;