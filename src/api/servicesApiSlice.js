import { apiSlice } from './apiSlice';
const SERVICES_URL = '/api/services';

export const servicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        url: SERVICES_URL,
      }),
      providesTags: ['Service'],
      keepUnusedDataFor: 5,
    }),
    getServiceDetails: builder.query({
      query: (serviceId) => ({
        url: `${SERVICES_URL}/${serviceId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    // --- MUTATION AJOUTÉE ---
    createService: builder.mutation({
      query: (data) => ({
        url: SERVICES_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Service'],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceDetailsQuery,
  useCreateServiceMutation,
} = servicesApiSlice;