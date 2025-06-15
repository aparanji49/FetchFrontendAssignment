# FetchFrontendAssignment
This is my submission for the Fetch Rewards Frontend Take-Home Exercise.

## Live Demo
[https://fetch-frontend-assignment-jade.vercel.app](https://fetch-frontend-assignment-jade.vercel.app)

## Features

- User login using name & email (`POST /auth/login`)
- Dog search functionality with:
  - Filter by breed
  - Sort alphabetically (asc/desc)
  - Paginated results (25 per page)
- Add/remove dogs from favorites
- "Find My Match" feature:
  - Calls `POST /dogs/match`
  - Displays a matched dog with confetti
  - Shows city/state and Google Maps location
- Secure logout (`POST /auth/logout`)
- Responsive design with clean UI


## Technologies/Libraries Used
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [MUI (Material UI)](https://mui.com/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [Framer Motion](https://www.framer.com/motion/) (for animation)
- [React Confetti](https://www.npmjs.com/package/react-confetti)
- [@react-hook/window-size](https://www.npmjs.com/package/@react-hook/window-size)



## Project Structure
```
src/
    |-- components/ # UI components like DogCard, Header, etc.
    |-- context/ # Global state using React Context API
    |--  pages/ # Route-level components
    |--  services/ # Axios API wrappers
    |-- styles/ # Reusable style definitions
    |--  types/ # Shared TypeScript interfaces and types
```

## How to Run Locally
```bash
git clone https://github.com/aparanji49/FetchFrontendAssignment.git
cd FetchFrontendAssignment/fetch-assignment/
npm install
npm run dev
```
## Attributions

Icon From Flaticon
<a href="https://www.flaticon.com/free-icons/cute" title="cute icons">Cute icons created by IconBaandar - Flaticon</a>
