/**
 * @description Custom Redux hooks for accessing dispatch and state
 */
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
