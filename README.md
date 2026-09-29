![Six Cities](docs/screenshot.jpg)

# Six Cities

A rental search for six European cities with a map, offer pages, reviews and favourites. React
18 with Redux Toolkit and React Router, written in TypeScript and built with Vite.

This is a training project, the third of three I built at HTML Academy in 2024. I wrote it from
July to September 2024 on the course
[React. Complex client application development](https://htmlacademy.ru/intensive/react), and
mentor [Arthur Litovko](https://htmlacademy.ru/profile/id6927) reviewed the pull requests. The
markup and styles came with the task. The reviewed original lives in
[htmlacademy-react/2483435-six-cities-16](https://github.com/htmlacademy-react/2483435-six-cities-16).

[How it works](#how-it-works) · [Run locally](#run-locally)

## What you can do

Pick one of six cities (Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf) and browse its
offers next to a map. Sort them by popularity, by price in either direction or by rating. Hover a
card to highlight its pin. Open an offer to see up to six photos, the host, the ten newest
reviews and three places nearby on a map. Sign in with an email and a password of at least one
letter and one digit to bookmark offers,
see them grouped by city on the favourites page, and leave a review of 50 to 300 characters with
a star rating.

## How it works

### State

The store in `src/store/store.ts` has five slices: offers, the active city and sort, the user,
favourites and errors. Every request is a thunk in `src/store/api-actions/`, and the axios
instance comes in as the thunk's extra argument, so components never import axios. Sorting is a
memoized selector in `offers-selectors.ts`: it filters by city first and sorts a copy, which
leaves the stored list in server order.

### Auth

On login the server returns a token. `src/services/token.ts` stores it in `localStorage` under
`six-cities-token`, and a request interceptor adds it to every call as `x-token`. Routes in
`src/services/router/private-route.tsx` come from one factory: the favourites page needs a signed
in user, the login page needs a signed out one, and while the status is still unknown both show a
loader instead of redirecting too early.

### Map

`src/components/map/use-map.tsx` creates the Leaflet map once per container and keeps it in
state. Changing the city only calls `setView`. Markers live in a separate layer group that is
removed and rebuilt when the offers or the hovered card change, so the tile layer is never
recreated.

## Run locally

```bash
git clone https://github.com/murpiano/_six-cities.git
cd _six-cities
npm install

npm start         # Vite dev server
npm run lint      # ESLint with the academy config
npm run format    # Biome formatter over src/
npm run build     # type check and production build into dist/
npm test          # Vitest, finds no tests
```

The project was written on Node 20 (see `volta` in `package.json`) and also builds on Node 24.

There are no tests yet, `npm test` passes because of `--passWithNoTests`. In the academy
repository `.github/workflows/check.yml` ran `npm test` and the linter on every pull request.
Data comes from `https://16.design.htmlacademy.pro/six-cities`.

## Where things live

```text
src/
├── index.tsx     checks the saved token and mounts the app
├── components/   header, offer card, favourite button, rating, map
├── pages/        cities, offer, favourites, sign-in
├── services/     axios instance, token storage, router
├── store/        slices, selectors and thunks
├── hooks/        typed Redux hooks, page title
├── types/        shared types
└── utils/        sorting and string helpers
```

Pages are routes, components are what more than one page uses. Anything that talks to the
server goes through `store/`.

## Rough edges

- The map tiles come from CARTO, which now answers without an API key with a watermark tile.
  The map shows "API key required" instead of streets. The screenshot above was taken with
  OpenStreetMap tiles swapped in.
- The response interceptor in `src/services/api.ts` shows a toast and returns nothing, so a
  failed request resolves with `undefined`. The thunks then fail on destructuring the response,
  which is why the error states still work, but the real status code is lost.
- The academy GitHub Pages build opens as a blank page, so there is no live demo.
- The whole app depends on the academy server.

---

<sub>[Bogdan Trotsenko](https://github.com/murpiano) · [murpiano](https://github.com/murpiano) · [Telegram](https://t.me/murpiano)</sub>
