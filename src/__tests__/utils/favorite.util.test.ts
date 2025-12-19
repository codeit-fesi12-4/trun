import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getFavoriteMoims,
  addFavoriteMoim,
  removeFavoriteMoim,
  isFavoriteMoim,
  toggleFavoriteMoim,
  FAVORITE_MOIMS_KEY,
} from "@/utils/favorite.util";

describe("favorite.util", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe("getFavoriteMoims", () => {
    it("should return empty array when no favorites exist", () => {
      const favorites = getFavoriteMoims();

      expect(favorites).toEqual([]);
    });

    it("should return stored favorite moim IDs", () => {
      localStorage.setItem(FAVORITE_MOIMS_KEY, JSON.stringify([1, 2, 3]));

      const favorites = getFavoriteMoims();

      expect(favorites).toEqual([1, 2, 3]);
    });

    it("should return user-specific favorites when userId provided", () => {
      localStorage.setItem(`${FAVORITE_MOIMS_KEY}_user123`, JSON.stringify([4, 5, 6]));

      const favorites = getFavoriteMoims("user123");

      expect(favorites).toEqual([4, 5, 6]);
    });

    it("should return empty array for invalid JSON", () => {
      localStorage.setItem(FAVORITE_MOIMS_KEY, "invalid-json");

      const favorites = getFavoriteMoims();

      expect(favorites).toEqual([]);
    });

    it("should return empty array for non-array data", () => {
      localStorage.setItem(FAVORITE_MOIMS_KEY, JSON.stringify({ not: "array" }));

      const favorites = getFavoriteMoims();

      expect(favorites).toEqual([]);
    });

    it("should return empty array if array contains non-numbers", () => {
      localStorage.setItem(FAVORITE_MOIMS_KEY, JSON.stringify([1, "2", 3]));

      const favorites = getFavoriteMoims();

      expect(favorites).toEqual([]);
    });

    it("should handle null userId", () => {
      localStorage.setItem(FAVORITE_MOIMS_KEY, JSON.stringify([1, 2]));

      const favorites = getFavoriteMoims(null);

      expect(favorites).toEqual([1, 2]);
    });
  });

  describe("addFavoriteMoim", () => {
    it("should add moim ID to empty favorites", () => {
      addFavoriteMoim(123);

      const stored = JSON.parse(localStorage.getItem(FAVORITE_MOIMS_KEY)!);
      expect(stored).toEqual([123]);
    });

    it("should add moim ID to existing favorites", () => {
      localStorage.setItem(FAVORITE_MOIMS_KEY, JSON.stringify([1, 2]));

      addFavoriteMoim(3);

      const stored = JSON.parse(localStorage.getItem(FAVORITE_MOIMS_KEY)!);
      expect(stored).toEqual([1, 2, 3]);
    });

    it("should not add duplicate moim ID", () => {
      localStorage.setItem(FAVORITE_MOIMS_KEY, JSON.stringify([1, 2, 3]));

      addFavoriteMoim(2);

      const stored = JSON.parse(localStorage.getItem(FAVORITE_MOIMS_KEY)!);
      expect(stored).toEqual([1, 2, 3]);
    });

    it("should dispatch custom event when adding favorite", () => {
      const dispatchEventSpy = vi.spyOn(window, "dispatchEvent");

      addFavoriteMoim(123);

      expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
      expect(dispatchEventSpy.mock.calls[0][0].type).toBe("favoriteMoimsChanged");
    });

    it("should add to user-specific favorites", () => {
      addFavoriteMoim(456, "user123");

      const stored = JSON.parse(localStorage.getItem(`${FAVORITE_MOIMS_KEY}_user123`)!);
      expect(stored).toEqual([456]);
    });

    it("should handle errors gracefully", () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("Storage error");
      });

      expect(() => addFavoriteMoim(123)).not.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe("removeFavoriteMoim", () => {
    it("should remove moim ID from favorites", () => {
      localStorage.setItem(FAVORITE_MOIMS_KEY, JSON.stringify([1, 2, 3]));

      removeFavoriteMoim(2);

      const stored = JSON.parse(localStorage.getItem(FAVORITE_MOIMS_KEY)!);
      expect(stored).toEqual([1, 3]);
    });

    it("should handle removing non-existent ID", () => {
      localStorage.setItem(FAVORITE_MOIMS_KEY, JSON.stringify([1, 2, 3]));

      removeFavoriteMoim(999);

      const stored = JSON.parse(localStorage.getItem(FAVORITE_MOIMS_KEY)!);
      expect(stored).toEqual([1, 2, 3]);
    });

    it("should dispatch custom event when removing favorite", () => {
      localStorage.setItem(FAVORITE_MOIMS_KEY, JSON.stringify([1, 2, 3]));
      const dispatchEventSpy = vi.spyOn(window, "dispatchEvent");

      removeFavoriteMoim(2);

      expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
      expect(dispatchEventSpy.mock.calls[0][0].type).toBe("favoriteMoimsChanged");
    });

    it("should remove from user-specific favorites", () => {
      localStorage.setItem(`${FAVORITE_MOIMS_KEY}_user123`, JSON.stringify([1, 2, 3]));

      removeFavoriteMoim(2, "user123");

      const stored = JSON.parse(localStorage.getItem(`${FAVORITE_MOIMS_KEY}_user123`)!);
      expect(stored).toEqual([1, 3]);
    });

    it("should handle errors gracefully", () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("Storage error");
      });

      expect(() => removeFavoriteMoim(123)).not.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe("isFavoriteMoim", () => {
    it("should return true if moim is in favorites", () => {
      localStorage.setItem(FAVORITE_MOIMS_KEY, JSON.stringify([1, 2, 3]));

      expect(isFavoriteMoim(2)).toBe(true);
    });

    it("should return false if moim is not in favorites", () => {
      localStorage.setItem(FAVORITE_MOIMS_KEY, JSON.stringify([1, 2, 3]));

      expect(isFavoriteMoim(999)).toBe(false);
    });

    it("should return false if no favorites exist", () => {
      expect(isFavoriteMoim(1)).toBe(false);
    });

    it("should check user-specific favorites", () => {
      localStorage.setItem(`${FAVORITE_MOIMS_KEY}_user123`, JSON.stringify([4, 5, 6]));

      expect(isFavoriteMoim(5, "user123")).toBe(true);
      expect(isFavoriteMoim(1, "user123")).toBe(false);
    });
  });

  describe("toggleFavoriteMoim", () => {
    it("should add moim if not in favorites", () => {
      const result = toggleFavoriteMoim(123);

      expect(result).toBe(true);
      const stored = JSON.parse(localStorage.getItem(FAVORITE_MOIMS_KEY)!);
      expect(stored).toEqual([123]);
    });

    it("should remove moim if already in favorites", () => {
      localStorage.setItem(FAVORITE_MOIMS_KEY, JSON.stringify([1, 2, 3]));

      const result = toggleFavoriteMoim(2);

      expect(result).toBe(false);
      const stored = JSON.parse(localStorage.getItem(FAVORITE_MOIMS_KEY)!);
      expect(stored).toEqual([1, 3]);
    });

    it("should toggle multiple times correctly", () => {
      let result = toggleFavoriteMoim(123);
      expect(result).toBe(true);

      result = toggleFavoriteMoim(123);
      expect(result).toBe(false);

      result = toggleFavoriteMoim(123);
      expect(result).toBe(true);
    });

    it("should toggle user-specific favorites", () => {
      const result = toggleFavoriteMoim(456, "user123");

      expect(result).toBe(true);
      const stored = JSON.parse(localStorage.getItem(`${FAVORITE_MOIMS_KEY}_user123`)!);
      expect(stored).toEqual([456]);
    });
  });
});