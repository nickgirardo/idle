import { Middleware } from 'redux';

// This middleware stores changes in localStorage
// Individual reducers can check localStorage for existing data on boot
// this allows state to be easily synchronized across sessions locally
export const serializeStore: Middleware = store => next => action => {
    next(action);

    // NOTE putting the serialization after the next call ensures that
    // all changes are committed to the store before serialization
    const state = store.getState();
    Object.entries(state).forEach(([key, value]) =>
        localStorage.setItem(key, JSON.stringify(value)))
};

