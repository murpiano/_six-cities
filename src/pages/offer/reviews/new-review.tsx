import { Fragment, useRef, useState } from 'react';
import { RATING } from '../../../const';
import { getStarsText } from '../utils';
import { store } from '../../../store/store';
import {
  fetchGetCommentsAction,
  fetchPostCommentsAction,
} from '../../../store/api-actions/comments-actions';
import { activeSelectors } from '../../../store/slices/active-slice';
import { useAppDispatch } from '../../../hooks/store';

type NewReviewProps = HTMLFormElement & {
  rating: HTMLInputElement;
  review: HTMLFormElement;
};

export function NewReview() {
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    review: '',
  });

  const ratingRef = useRef<HTMLInputElement | null>(null);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useAppDispatch();

  const handleFormInput = (evt: React.ChangeEvent<NewReviewProps>) => {
    const name = evt.target.name;
    let value: string | number = evt.target.value as string;

    if (name === 'rating') {
      value = Number(value);
    }
    setReviewForm({ ...reviewForm, [name]: value });
  };

  const handleFormSubmit = (evt: React.FormEvent<NewReviewProps>) => {
    evt.preventDefault();
    const id = activeSelectors.activeOfferId(store.getState());

    dispatch(
      fetchPostCommentsAction({
        offerId: id,
        comment: reviewForm.review,
        rating: reviewForm.rating,
      })
    );
    fetchGetCommentsAction(id);
    setReviewForm({ rating: 0, review: '' });
  };

  const isButtonDisabled =
    !reviewForm.rating ||
    reviewForm.review.length < 50 ||
    reviewForm.review.length > 300;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onInput={handleFormInput}
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING.map((star) => (
          <Fragment key={star.value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={star.value}
              id={getStarsText(star.value)}
              type="radio"
              ref={ratingRef}
            />
            <label
              htmlFor={getStarsText(star.value)}
              className="reviews__rating-label form__rating-label"
              title={star.text}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        ref={commentRef}
        value={reviewForm.review}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isButtonDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
