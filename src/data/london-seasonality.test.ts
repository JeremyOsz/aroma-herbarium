import { describe, expect, it } from "vitest";

import {
  formatSunsetMinutes,
  monthLabels,
  monthlyClimate,
  seasonalMarkers,
  validateLondonSeasonalityData,
} from "@/data/london-seasonality";

describe("london seasonality data", () => {
  it("has 12 aligned monthly points", () => {
    expect(monthlyClimate).toHaveLength(12);
    monthlyClimate.forEach((point, index) => {
      expect(point.month).toBe(monthLabels[index]);
    });
  });

  it("keeps pollen scores within 0-100", () => {
    monthlyClimate.forEach((point) => {
      expect(point.pollenRiskScore).toBeGreaterThanOrEqual(0);
      expect(point.pollenRiskScore).toBeLessThanOrEqual(100);
    });

    seasonalMarkers.forEach((marker) => {
      expect(marker.pollenContribution.score).toBeGreaterThanOrEqual(0);
      expect(marker.pollenContribution.score).toBeLessThanOrEqual(100);
    });
  });

  it("keeps marker peaks inside active windows", () => {
    seasonalMarkers.forEach((marker) => {
      marker.peakMonths.forEach((month) => {
        expect(marker.activeMonths.includes(month)).toBe(true);
      });
    });
  });

  it("formats sunset minutes as HH:MM", () => {
    expect(formatSunsetMinutes(942)).toBe("15:42");
    expect(formatSunsetMinutes(1308)).toBe("21:48");
  });

  it("passes built-in validation", () => {
    expect(validateLondonSeasonalityData()).toEqual([]);
  });
});
