import { Profile, profileService } from "@/apps/store/services/profileService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
	reducerPath: "profileApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	tagTypes: ["Profile"],
	endpoints: (builder) => ({
		getProfile: builder.query<Profile | null, string>({
			queryFn: async (userId) => {
				try {
					const profile = await profileService.getProfile(userId);
					return { data: profile };
				} catch (error) {
					return { error: { status: 500, data: error } };
				}
			},
			providesTags: ["Profile"],
		}),
		updateProfile: builder.mutation<
			Profile,
			{ userId: string; updates: Partial<Profile> }
		>({
			queryFn: async ({ userId, updates }) => {
				try {
					const profile = await profileService.updateProfile(userId, updates);
					return { data: profile };
				} catch (error) {
					return { error: { status: 500, data: error } };
				}
			},
			invalidatesTags: ["Profile"],
		}),
		applyForDeveloper: builder.mutation<Profile, string>({
			queryFn: async (userId) => {
				try {
					const profile = await profileService.applyForDeveloper(userId);
					return { data: profile };
				} catch (error) {
					return { error: { status: 500, data: error } };
				}
			},
			invalidatesTags: ["Profile"],
		}),
		rejectDeveloper: builder.mutation<Profile, string>({
			queryFn: async (userId) => {
				try {
					const profile = await profileService.rejectDeveloper(userId);
					return { data: profile };
				} catch (error) {
					return { error: { status: 500, data: error } };
				}
			},
			invalidatesTags: ["Profile"],
		}),
	}),
});

export const {
	useGetProfileQuery,
	useUpdateProfileMutation,
	useApplyForDeveloperMutation,
	useRejectDeveloperMutation,
} = profileApi;
