import { describe, it, expect } from "vitest";
import { buildDistribution } from "@/utils/review.util";

describe("review.util", () => {
  describe("buildDistribution", () => {
    it("should build distribution from scores object", () => {
      const scores = {
        fiveStars: 10,
        fourStars: 8,
        threeStars: 6,
        twoStars: 4,
        oneStar: 2,
      };

      const distribution = buildDistribution(scores);

      expect(distribution).toEqual([
        { score: 5, count: 10 },
        { score: 4, count: 8 },
        { score: 3, count: 6 },
        { score: 2, count: 4 },
        { score: 1, count: 2 },
      ]);
    });

    it("should handle null scores", () => {
      const distribution = buildDistribution(null);

      expect(distribution).toEqual([
        { score: 5, count: 0 },
        { score: 4, count: 0 },
        { score: 3, count: 0 },
        { score: 2, count: 0 },
        { score: 1, count: 0 },
      ]);
    });

    it("should handle undefined scores", () => {
      const distribution = buildDistribution(undefined);

      expect(distribution).toEqual([
        { score: 5, count: 0 },
        { score: 4, count: 0 },
        { score: 3, count: 0 },
        { score: 2, count: 0 },
        { score: 1, count: 0 },
      ]);
    });

    it("should handle zero counts", () => {
      const scores = {
        fiveStars: 0,
        fourStars: 0,
        threeStars: 0,
        twoStars: 0,
        oneStar: 0,
      };

      const distribution = buildDistribution(scores);

      expect(distribution).toEqual([
        { score: 5, count: 0 },
        { score: 4, count: 0 },
        { score: 3, count: 0 },
        { score: 2, count: 0 },
        { score: 1, count: 0 },
      ]);
    });

    it("should handle large numbers", () => {
      const scores = {
        fiveStars: 1000,
        fourStars: 2000,
        threeStars: 3000,
        twoStars: 4000,
        oneStar: 5000,
      };

      const distribution = buildDistribution(scores);

      expect(distribution[0].count).toBe(1000);
      expect(distribution[4].count).toBe(5000);
    });

    it("should maintain correct order from 5 to 1", () => {
      const scores = {
        fiveStars: 1,
        fourStars: 2,
        threeStars: 3,
        twoStars: 4,
        oneStar: 5,
      };

      const distribution = buildDistribution(scores);

      expect(distribution.map(d => d.score)).toEqual([5, 4, 3, 2, 1]);
    });
  });
});