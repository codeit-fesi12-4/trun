import { API_BASE_URL, TEAM_NAME } from "@/constants";
import { logout } from "@/utils/logout.util";
import { toast } from "sonner";

const buildMoimPath = (path: string, teamName: string) =>
  `${API_BASE_URL}${teamName}/gatherings${path}`;

// 모임 상세 조회
export const getMoim = async (moimId: number, teamName: string = TEAM_NAME) => {
  try {
    const response = await fetch(buildMoimPath(`/${moimId}`, teamName), {
      method: "GET",
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(`${result.message}`);
    }

    return result;
  } catch (error) {
    console.error("데이터 가져오기 오류:", error);
    return null;
  }
};

// 특정 모임의 참가자 목록 조회
export const getParticipants = async (moimId: number, teamName: string = TEAM_NAME) => {
  try {
    const response = await fetch(buildMoimPath(`/${moimId}/participants`, teamName), {
      method: "GET",
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(`${result.message}`);
    }

    return result;
  } catch (error) {
    console.error("데이터 가져오기 오류:", error);
    return null;
  }
};

// 모임 참여
export const postJoin = async (
  moimId: number,
  teamName: string = TEAM_NAME,
  token?: string | null,
) => {
  try {
    const response = await fetch(buildMoimPath(`/${moimId}/join`, teamName), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          token ?? (typeof window !== "undefined" ? (localStorage.getItem("token") ?? "") : "")
        }`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        await logout();
        return null;
      }
      toast.error(`${result.message}`);
    } else {
      toast.success(`${result.message}`);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 모임 취소
export const putMoim = async (
  moimId: number,
  teamName: string = TEAM_NAME,
  token?: string | null,
) => {
  try {
    const response = await fetch(buildMoimPath(`/${moimId}/cancel`, teamName), {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${
          token ?? (typeof window !== "undefined" ? (localStorage.getItem("token") ?? "") : "")
        }`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        await logout();
        return null;
      }
      toast.error(`${result.message}`);
      return null;
    }
    toast.success("모임이 취소되었습니다.");
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 모임 참여 취소
export const deleteJoin = async (
  moimId: number,
  teamName: string = TEAM_NAME,
  token?: string | null,
) => {
  try {
    const response = await fetch(buildMoimPath(`/${moimId}/leave`, teamName), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${
          token ?? (typeof window !== "undefined" ? (localStorage.getItem("token") ?? "") : "")
        }`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        await logout();
        return null;
      }
      toast.error(`${result.message}`);
      return null;
    }
    toast.success(`${result.message}`);
  } catch (error) {
    console.error(error);
    return null;
  }
};
