// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import { TEAM_NAME } from "@/constants";
// import { apiFetch } from "@/lib/apiClient";

// const builReviewPath = (path: string, teamName: string) => `/${teamName}/reviews${path}`;

// // 리뷰 목록 조회
// export const getMoim = (moimId: number, teamName: string = TEAM_NAME) =>
//   apiFetch<GetReviewsResponse>({
//     path: builReviewPath(`/${moimId}`, teamName),
//     method: "GET",
//   });

// export const useMoim = ({
//   teamName = TEAM_NAME,
//   moimId,
//   enabled = true,
// }: {
//   teamName?: string;
//   moimId: number;
//   enabled?: boolean;
// }) =>
//   useQuery({
//     queryKey: ["moim", teamName, moimId],
//     queryFn: () => getMoim(moimId, teamName),
//     staleTime: 1000 * 60,
//     enabled,
//   });

// // 특정 모임의 참가자 목록 조회
// export const getParticipants = (moimId: number, teamName: string = TEAM_NAME) =>
//   apiFetch<GetParticipantsResponse>({
//     path: buildMoimPath(`/${moimId}/participants`, teamName),
//     method: "GET",
//   });

// export const useParticipants = ({
//   teamName = TEAM_NAME,
//   moimId,
//   enabled = true,
// }: {
//   teamName?: string;
//   moimId: number;
//   enabled?: boolean;
// }) =>
//   useQuery({
//     queryKey: ["participants", teamName, moimId],
//     queryFn: () => getParticipants(moimId, teamName),
//     staleTime: 1000 * 60,
//     enabled,
//   });

// // 모임 취소
// export const putMoim = (moimId: number, teamName: string = TEAM_NAME, token?: string | null) =>
//   apiFetch<Moim>({
//     path: buildMoimPath(`/${moimId}/cancel`, teamName),
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${
//         token ?? (typeof window !== "undefined" ? (localStorage.getItem("token") ?? "") : "")
//       }`,
//     },
//   });

// export const useCancelMoim = (teamName: string = TEAM_NAME) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (moimId: number) => {
//       const token = localStorage.getItem("token");
//       return putMoim(moimId, teamName, token);
//     },
//     onSuccess: (_, moimId) => {
//       void queryClient.invalidateQueries({ queryKey: ["moim", teamName, moimId] });
//       void queryClient.invalidateQueries({ queryKey: ["participants", teamName, moimId] });
//     },

//     onError: err => {
//       console.error("모임 취소 실패:", err);
//     },
//   });
// };

// // 모임 참여
// export const postJoin = (moimId: number, teamName: string = TEAM_NAME, token?: string | null) =>
//   apiFetch<PostJoinResponse>({
//     path: buildMoimPath(`/${moimId}/join`, teamName),
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${
//         token ?? (typeof window !== "undefined" ? (localStorage.getItem("token") ?? "") : "")
//       }`,
//     },
//   });
// export const useCreateJoin = (teamName: string = TEAM_NAME) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (moimId: number) => {
//       const token = localStorage.getItem("token");
//       return postJoin(moimId, teamName, token);
//     },
//     onSuccess: (_, moimId) => {
//       void queryClient.invalidateQueries({ queryKey: ["moim", teamName, moimId] });
//       void queryClient.invalidateQueries({ queryKey: ["participants", teamName, moimId] });
//     },

//     onError: err => {
//       console.error("모임 참여 실패:", err);
//     },
//   });
// };

// // 모임 참여 취소
// export const deleteJoin = (moimId: number, teamName: string = TEAM_NAME, token?: string | null) =>
//   apiFetch<DeleteJoinResponse>({
//     path: buildMoimPath(`/${moimId}/leave`, teamName),
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${
//         token ?? (typeof window !== "undefined" ? (localStorage.getItem("token") ?? "") : "")
//       }`,
//     },
//   });
// export const useCancelJoin = (teamName: string = TEAM_NAME) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (moimId: number) => {
//       const token = localStorage.getItem("token");
//       return deleteJoin(moimId, teamName, token);
//     },
//     onSuccess: (_, moimId) => {
//       void queryClient.invalidateQueries({ queryKey: ["moim", teamName, moimId] });
//       void queryClient.invalidateQueries({ queryKey: ["participants", teamName, moimId] });
//     },

//     onError: err => {
//       console.error("모임 참여 취소 실패:", err);
//     },
//   });
// };
