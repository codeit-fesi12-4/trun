import { describe, it, expect } from "vitest";
import {
  dateToISO,
  formatDatePicker,
  formatDateWithDash,
  formatDate,
  formatTime,
} from "@/utils/date.util";

describe("date.util", () => {
  describe("dateToISO", () => {
    it("should convert Date to ISO string", () => {
      const date = new Date("2024-01-15T10:30:00.000Z");
      const iso = dateToISO(date);

      expect(iso).toBe("2024-01-15T10:30:00.000Z");
    });

    it("should handle different dates", () => {
      const dates = [
        new Date("2024-12-31T23:59:59.999Z"),
        new Date("2024-01-01T00:00:00.000Z"),
        new Date("2024-06-15T12:00:00.000Z"),
      ];

      dates.forEach(date => {
        const iso = dateToISO(date);
        expect(iso).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
        expect(new Date(iso).getTime()).toBe(date.getTime());
      });
    });
  });

  describe("formatDatePicker", () => {
    it("should format date for DatePicker with AM/PM", () => {
      const date = new Date("2024-01-15T14:30:00");
      const formatted = formatDatePicker(date);

      expect(formatted).toContain("2024-01-15");
      expect(formatted).toMatch(/\d{2}:\d{2} [AP]M/);
    });

    it("should return empty string for undefined date", () => {
      const formatted = formatDatePicker(undefined);

      expect(formatted).toBe("");
    });

    it("should format morning time with AM", () => {
      const date = new Date("2024-01-15T09:30:00");
      const formatted = formatDatePicker(date);

      expect(formatted).toContain("AM");
    });

    it("should format afternoon time with PM", () => {
      const date = new Date("2024-01-15T15:30:00");
      const formatted = formatDatePicker(date);

      expect(formatted).toContain("PM");
    });
  });

  describe("formatDateWithDash", () => {
    it("should format date with dashes", () => {
      const date = new Date("2024-01-15T10:30:00");
      const formatted = formatDateWithDash(date);

      expect(formatted).toBe("2024-01-15");
    });

    it("should return undefined for undefined date", () => {
      const formatted = formatDateWithDash(undefined);

      expect(formatted).toBeUndefined();
    });

    it("should format dates correctly regardless of time", () => {
      const dates = [
        { date: new Date("2024-01-01T00:00:00"), expected: "2024-01-01" },
        { date: new Date("2024-12-31T23:59:59"), expected: "2024-12-31" },
        { date: new Date("2024-06-15T12:30:45"), expected: "2024-06-15" },
      ];

      dates.forEach(({ date, expected }) => {
        expect(formatDateWithDash(date)).toBe(expected);
      });
    });
  });

  describe("formatDate", () => {
    it("should format ISO string to Korean date format", () => {
      const formatted = formatDate("2024-01-15T10:30:00.000Z");

      expect(formatted).toBe("1월 15일");
    });

    it("should handle different months", () => {
      const dates = [
        { iso: "2024-01-01T00:00:00.000Z", expected: "1월 1일" },
        { iso: "2024-12-31T00:00:00.000Z", expected: "12월 31일" },
        { iso: "2024-06-15T00:00:00.000Z", expected: "6월 15일" },
      ];

      dates.forEach(({ iso, expected }) => {
        expect(formatDate(iso)).toBe(expected);
      });
    });

    it("should return original string for invalid ISO string", () => {
      const invalid = "not-a-date";
      const formatted = formatDate(invalid);

      expect(formatted).toBe(invalid);
    });

    it("should handle malformed dates gracefully", () => {
      const malformed = ["", "2024-13-01", "invalid-date"];

      malformed.forEach(date => {
        const formatted = formatDate(date);
        expect(formatted).toBe(date);
      });
    });
  });

  describe("formatTime", () => {
    it("should format ISO string to HH:mm format", () => {
      const formatted = formatTime("2024-01-15T14:30:00.000Z");

      expect(formatted).toMatch(/^\d{2}:\d{2}$/);
    });

    it("should format different times correctly", () => {
      const times = [
        { iso: "2024-01-15T09:05:00.000Z", pattern: /^09:05$/ },
        { iso: "2024-01-15T17:30:00.000Z", pattern: /^17:30$/ },
        { iso: "2024-01-15T00:00:00.000Z", pattern: /^00:00$/ },
        { iso: "2024-01-15T23:59:00.000Z", pattern: /^23:59$/ },
      ];

      times.forEach(({ iso, pattern }) => {
        expect(formatTime(iso)).toMatch(pattern);
      });
    });

    it("should return original string for invalid ISO string", () => {
      const invalid = "not-a-time";
      const formatted = formatTime(invalid);

      expect(formatted).toBe(invalid);
    });
  });
});