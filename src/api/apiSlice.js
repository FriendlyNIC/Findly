import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL, // Utilise la variable d'environnement
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Service', 'Review', 'Message'],
  endpoints: (builder) => ({}),
});