import { APIRoute } from '../../const';
import { store } from '../store';
import { offersActions } from '../slices/offers-slice/offers-slice';
import { Comment } from '../../types/comment-type';
import { appCreateAsyncThunk } from '../utils';

export const fetchGetCommentsAction = appCreateAsyncThunk<void, string>(
  'data/fetchComments',
  async (offerId, { extra: api }) => {
    const { data: comments } = await api.get<Comment[]>(
      `${APIRoute.Comments}/${offerId}`
    );
    store.dispatch(offersActions.setComments(comments));
  }
);

export const fetchPostCommentsAction = appCreateAsyncThunk<
  void,
  { offerId: string; comment: string; rating: number }
>('data/fetchComment', async ({ offerId, comment, rating }, { extra: api }) => {
  await api.post<{ comment: string; rating: number }>(
    `${APIRoute.Comments}/${offerId}`,
    { comment, rating }
  );

  store.dispatch(fetchGetCommentsAction(offerId));
});
