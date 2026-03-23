import { describe, expect, it } from "vitest";

import {
  formatAvgTempC,
  formatSunsetMinutes,
  getFloraSalienceLabel,
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

  it("keeps seasonal indices, mean temperatures, and flora salience scores in range", () => {
    monthlyClimate.forEach((point) => {
      expect(point.seasonalActivityIndex).toBeGreaterThanOrEqual(0);
      expect(point.seasonalActivityIndex).toBeLessThanOrEqual(100);
      expect(point.avgTempC).toBeGreaterThan(-15);
      expect(point.avgTempC).toBeLessThan(40);
    });

    seasonalMarkers.forEach((marker) => {
      expect(marker.floraSalience.score).toBeGreaterThanOrEqual(0);
      expect(marker.floraSalience.score).toBeLessThanOrEqual(100);
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

  it("formats mean temperatures with one decimal", () => {
    expect(formatAvgTempC(5.234)).toBe("5.2°C");
    expect(formatAvgTempC(18)).toBe("18.0°C");
  });

  it("maps flora salience scores to learning-friendly bands", () => {
    expect(getFloraSalienceLabel(10)).toBe("Quiet");
    expect(getFloraSalienceLabel(40)).toBe("Moderate");
    expect(getFloraSalienceLabel(60)).toBe("Prominent");
    expect(getFloraSalienceLabel(86)).toBe("Signature");
  });

  it("passes built-in validation", () => {
    expect(validateLondonSeasonalityData()).toEqual([]);
  });

  it("includes HTTPS reference plates with credits for every marker", () => {
    seasonalMarkers.forEach((marker) => {
      expect(marker.referenceImage.url).toMatch(/^https:\/\//);
      expect(marker.referenceImage.credit.length).toBeGreaterThan(8);
    });
  });

  it("includes grass markers for the Poaceae season", () => {
    const grasses = seasonalMarkers.filter((m) => m.type === "grass");
    expect(grasses.length).toBeGreaterThanOrEqual(3);
    grasses.forEach((m) => {
      expect(m.activeMonths.some((mo) => ["May", "Jun", "Jul", "Aug"].includes(mo))).toBe(true);
    });
  });
});
