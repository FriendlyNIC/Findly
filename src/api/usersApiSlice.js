import { apiSlice } from './apiSlice';
const USERS_URL = '/api/auth';
const PROFILES_URL = '/api/users'; // URL pour le profil

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    // --- NOUVELLES FONCTIONS AJOUTÉES ---
    getProfile: builder.query({
      query: () => ({
        url: `${PROFILES_URL}/profile`,
      }),
      providesTags: ['User'],
    }),
    switchRole: builder.mutation({
      query: () => ({
        url: `${PROFILES_URL}/switch-role`,
        method: 'PUT',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useSwitchRoleMutation,
} = usersApiSlice;