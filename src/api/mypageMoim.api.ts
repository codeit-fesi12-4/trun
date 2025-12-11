import { API_BASE_URL, TEAM_NAME } from "@/constants";
import {
  CreateMoimsResponse,
  GetJoinedMoimsParams,
  GetJoinedMoimsResponse,
} from "@/types/mypage.type";
import { getMoimList } from "./moim.api";

const buildMoimPath = (path: string, teamName: string) =>
  `${API_BASE_URL}${teamName}/gatherings${path}`;

// 나의 모임
export const getMoimJoined = async (
  params?: GetJoinedMoimsParams,
  teamName: string = TEAM_NAME,
): Promise<GetJoinedMoimsResponse> => {
  try {
    const url = new URL(buildMoimPath(`/joined`, teamName));
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const token = typeof window !== "undefined" ? (localStorage.getItem("token") ?? "") : "";

    const res = await fetch(url.toString(), {
      method: "GET",
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || `API Error: ${res.status}`);
    }
    return result;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("참석한 모임 목록 조회 중 오류가 발생했습니다.");
  }
};

// 나의 리뷰

// 내가 만든 모임
export const getCreatedMoims = (userId: number): Promise<CreateMoimsResponse> =>
  getMoimList({ createdBy: userId }, TEAM_NAME).then(data =>
    data.map(item => ({
      ...item,
      joinedAt: item.dateTime, // 본인이 만든 날짜로 처리
      isCompleted: false,
      isReviewed: false,
    })),
  );
