import { store } from '../../store/store';

type State = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type GetState = () => State;

export type { State, AppDispatch, GetState };
