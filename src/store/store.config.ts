import {configureStore} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './store.reducer';
import {IState} from './store';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['soundEnabled', 'unlockedSkills'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export const useStore = <K extends keyof IState>(key: K): IState[K] => {
    return useSelector((state: IState) => state[key]);
};
