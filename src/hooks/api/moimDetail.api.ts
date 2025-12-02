import { useQuery } from "@tanstack/react-query";

import { TEAM_NAME } from "@/constants";
import { apiFetch } from "@/lib/apiClient";
import { GetMoimResponse, GetParticipantsResponse } from "@/types/moimDetail.type";

const buildMoimPath = (path: string, teamName: string) => `/${teamName}/gatherings${path}`;

export const getMoim = (moimId: number, teamName: string = TEAM_NAME) =>
  apiFetch<GetMoimResponse>({
    path: buildMoimPath(`/${moimId}`, teamName),
    method: "GET",
  });

export const getParticipants = (moimId: number, teamName: string = TEAM_NAME) =>
  apiFetch<GetParticipantsResponse>({
    path: buildMoimPath(`/${moimId}/participants`, teamName),
    method: "GET",
  });

export const useMoim = ({
  teamName = TEAM_NAME,
  moimId,
  enabled = true,
}: {
  teamName?: string;
  moimId: number;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["moim", teamName, moimId],
    queryFn: () => getMoim(moimId, teamName),
    staleTime: 1000 * 60,
    enabled,
  });

export const useParticipants = ({
  teamName = TEAM_NAME,
  moimId,
  enabled = true,
}: {
  teamName?: string;
  moimId: number;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["participants", teamName, moimId],
    queryFn: () => getParticipants(moimId, teamName),
    staleTime: 1000 * 60,
    enabled,
  });
