import { describe, it, expect } from "vitest";
import { buildReviewsPath, buildReviewScoresPath } from "@/utils/path.util";

describe("path.util", () => {
  describe("buildReviewsPath", () => {
    it("should build path with all parameters", () => {
      const params = {
        gatheringId: 123,
        userId: 456,
        type: "DALLAEMFIT" as const,
        location: "서울",
        date: "2024-01-01",
        registrationEnd: "2024-01-02",
        sortBy: "createdAt" as const,
        limit: 10,
        offset: 0,
      };

      const path = buildReviewsPath(params);

      expect(path).toContain("/reviews?");
      expect(path).toContain("gatheringId=123");
      expect(path).toContain("userId=456");
      expect(path).toContain("type=DALLAEMFIT");
      expect(path).toContain("location=%EC%84%9C%EC%9A%B8");
      expect(path).toContain("date=2024-01-01");
      expect(path).toContain("registrationEnd=2024-01-02");
      expect(path).toContain("sortBy=createdAt");
      expect(path).toContain("sortOrder=desc");
      expect(path).toContain("limit=10");
      expect(path).toContain("offset=0");
    });

    it("should build path with only required parameters", () => {
      const params = {};

      const path = buildReviewsPath(params);

      expect(path).toBe("/reviews?");
    });

    it("should build path with gatheringId only", () => {
      const params = {
        gatheringId: 999,
      };

      const path = buildReviewsPath(params);

      expect(path).toContain("gatheringId=999");
      expect(path).not.toContain("userId");
      expect(path).not.toContain("type");
    });

    it("should exclude location when it is 지역 전체", () => {
      const params = {
        location: "지역 전체",
        gatheringId: 1,
      };

      const path = buildReviewsPath(params);

      expect(path).not.toContain("location");
      expect(path).toContain("gatheringId=1");
    });

    it("should include location when it is not 지역 전체", () => {
      const params = {
        location: "부산",
      };

      const path = buildReviewsPath(params);

      expect(path).toContain("location");
    });

    it("should add sortOrder=desc when sortBy is provided", () => {
      const params = {
        sortBy: "score" as const,
      };

      const path = buildReviewsPath(params);

      expect(path).toContain("sortBy=score");
      expect(path).toContain("sortOrder=desc");
    });

    it("should handle limit and offset of 0", () => {
      const params = {
        limit: 0,
        offset: 0,
      };

      const path = buildReviewsPath(params);

      expect(path).toContain("limit=0");
      expect(path).toContain("offset=0");
    });

    it("should handle different sortBy values", () => {
      const sortByValues = ["createdAt", "score", "participantCount"] as const;

      sortByValues.forEach(sortBy => {
        const params = { sortBy };
        const path = buildReviewsPath(params);
        expect(path).toContain(`sortBy=${sortBy}`);
      });
    });

    it("should handle different type values", () => {
      const types = ["DALLAEMFIT", "WORKATION"] as const;

      types.forEach(type => {
        const params = { type };
        const path = buildReviewsPath(params);
        expect(path).toContain(`type=${type}`);
      });
    });

    it("should properly encode special characters in location", () => {
      const params = {
        location: "서울/강남",
      };

      const path = buildReviewsPath(params);

      expect(path).toContain("location=");
      // URLSearchParams encodes the location
      expect(decodeURIComponent(path)).toContain("서울/강남");
    });
  });

  describe("buildReviewScoresPath", () => {
    it("should build path with gatheringId and type", () => {
      const params = {
        gatheringId: 123,
        type: "DALLAEMFIT" as const,
      };

      const path = buildReviewScoresPath(params);

      expect(path).toContain("/reviews/scores?");
      expect(path).toContain("gatheringId=123");
      expect(path).toContain("type=DALLAEMFIT");
    });

    it("should build path with only gatheringId", () => {
      const params = {
        gatheringId: 456,
      };

      const path = buildReviewScoresPath(params);

      expect(path).toContain("gatheringId=456");
      expect(path).not.toContain("type");
    });

    it("should build path with only type", () => {
      const params = {
        type: "WORKATION" as const,
      };

      const path = buildReviewScoresPath(params);

      expect(path).toContain("type=WORKATION");
      expect(path).not.toContain("gatheringId");
    });

    it("should build path with no parameters", () => {
      const params = {};

      const path = buildReviewScoresPath(params);

      expect(path).toBe("/reviews/scores?");
    });

    it("should handle gatheringId of 0", () => {
      const params = {
        gatheringId: 0,
      };

      const path = buildReviewScoresPath(params);

      expect(path).toContain("gatheringId=0");
    });

    it("should handle different type values", () => {
      const types = ["DALLAEMFIT", "WORKATION"] as const;

      types.forEach(type => {
        const params = { type };
        const path = buildReviewScoresPath(params);
        expect(path).toContain(`type=${type}`);
      });
    });
  });
});