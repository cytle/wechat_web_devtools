import createAsyncLocalStorage from './defaults/asyncLocalStorage';

export var asyncLocalStorage = createAsyncLocalStorage('local');
export var asyncSessionStorage = createAsyncLocalStorage('session');