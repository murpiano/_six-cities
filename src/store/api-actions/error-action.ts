import { createAsyncThunk } from '@reduxjs/toolkit/react';
import { errorActions } from '../slices/error-slice';
import { TIMEOUT_SHOW_ERROR } from '../../const';

export const clearErrorAction = createAsyncThunk(
  'six-cities/clearError',
  () => {
    setTimeout(() => errorActions.setError(null), TIMEOUT_SHOW_ERROR);
  }
);
