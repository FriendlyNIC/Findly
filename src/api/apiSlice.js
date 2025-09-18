import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://findly-backend.onrender.com', // L'URL de ton backend déployé
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Service', 'Review', 'Message'],
  endpoints: (builder) => ({}),
});