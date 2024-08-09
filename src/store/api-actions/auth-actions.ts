import { APIRoute, AuthStatus } from '../../const';
import { dropToken, saveToken } from '../../services/token';
import { AuthData, User } from '../../types/user-type';
import { userActions } from '../slices/user-slice';
import { dispatch } from '../store';
import { appCreateAsyncThunk } from '../utils';

const checkAuthAction = appCreateAsyncThunk<void, undefined>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    try {
      const resp = await api.get<User>(APIRoute.Login);
      dispatch(userActions.setStatus(AuthStatus.Auth));
      dispatch(userActions.setUserEmail(resp.data.email));
    } catch {
      dispatch(userActions.setStatus(AuthStatus.NoAuth));
    }
  }
);

const loginAction = appCreateAsyncThunk<void, AuthData>(
  'user/login',
  async ({ login: email, password }, { extra: api }) => {
    const {
      data: { token },
    } = await api.post<User>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(userActions.setStatus(AuthStatus.Auth));
    dispatch(userActions.setUserEmail(email));
  }
);

const logoutAction = appCreateAsyncThunk<void, undefined>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(userActions.setStatus(AuthStatus.NoAuth));
  }
);

export { checkAuthAction, logoutAction, loginAction };
