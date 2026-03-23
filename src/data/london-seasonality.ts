export const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

export type MonthLabel = (typeof monthLabels)[number];

export interface MonthlyClimatePoint {
  month: MonthLabel;
  sunshineHoursAvg: number;
  sunsetAvgMinutes: number;
  pollenRiskScore: number;
}

export interface PollenContribution {
  score: number;
  label: "Low" | "Moderate" | "High" | "Very High";
}

export interface SeasonalMarker {
  id: string;
  name: string;
  type: "tree" | "blossom";
  activeMonths: MonthLabel[];
  peakMonths: MonthLabel[];
  pollenContribution: PollenContribution;
  notes: string;
}

export const monthlyClimate: MonthlyClimatePoint[] = [
  { month: "Jan", sunshineHoursAvg: 62, sunsetAvgMinutes: 975, pollenRiskScore: 10 },
  { month: "Feb", sunshineHoursAvg: 78, sunsetAvgMinutes: 1035, pollenRiskScore: 20 },
  { month: "Mar", sunshineHoursAvg: 115, sunsetAvgMinutes: 1100, pollenRiskScore: 42 },
  { month: "Apr", sunshineHoursAvg: 162, sunsetAvgMinutes: 1195, pollenRiskScore: 68 },
  { month: "May", sunshineHoursAvg: 198, sunsetAvgMinutes: 1265, pollenRiskScore: 84 },
  { month: "Jun", sunshineHoursAvg: 201, sunsetAvgMinutes: 1308, pollenRiskScore: 72 },
  { month: "Jul", sunshineHoursAvg: 207, sunsetAvgMinutes: 1288, pollenRiskScore: 62 },
  { month: "Aug", sunshineHoursAvg: 190, sunsetAvgMinutes: 1222, pollenRiskScore: 54 },
  { month: "Sep", sunshineHoursAvg: 145, sunsetAvgMinutes: 1142, pollenRiskScore: 38 },
  { month: "Oct", sunshineHoursAvg: 105, sunsetAvgMinutes: 1048, pollenRiskScore: 24 },
  { month: "Nov", sunshineHoursAvg: 65, sunsetAvgMinutes: 959, pollenRiskScore: 14 },
  { month: "Dec", sunshineHoursAvg: 52, sunsetAvgMinutes: 942, pollenRiskScore: 9 },
];

export const seasonalMarkers: SeasonalMarker[] = [
  {
    id: "hazel-alder-catkins",
    name: "Hazel & Alder Catkins",
    type: "tree",
    activeMonths: ["Jan", "Feb", "Mar"],
    peakMonths: ["Feb"],
    pollenContribution: { score: 48, label: "Moderate" },
    notes: "Early tree pollen signal across parks, hedges, and rail corridors before leaf-out.",
  },
  {
    id: "cherry-plum-blossom",
    name: "Cherry & Plum Blossom",
    type: "blossom",
    activeMonths: ["Mar", "Apr"],
    peakMonths: ["Apr"],
    pollenContribution: { score: 32, label: "Moderate" },
    notes: "Strong visual spring marker in streets and squares; contributes to rising spring pollen burden.",
  },
  {
    id: "birch-pollen",
    name: "Birch",
    type: "tree",
    activeMonths: ["Mar", "Apr", "May"],
    peakMonths: ["Apr"],
    pollenContribution: { score: 86, label: "Very High" },
    notes: "One of London’s major spring pollen contributors; often drives sharp symptom spikes.",
  },
  {
    id: "oak-pollen",
    name: "Oak",
    type: "tree",
    activeMonths: ["Apr", "May", "Jun"],
    peakMonths: ["May"],
    pollenContribution: { score: 64, label: "High" },
    notes: "Follows birch in many boroughs and sustains elevated late-spring pollen exposure.",
  },
  {
    id: "london-plane",
    name: "London Plane",
    type: "tree",
    activeMonths: ["Apr", "May"],
    peakMonths: ["May"],
    pollenContribution: { score: 58, label: "High" },
    notes: "Signature urban tree; spring pollen overlaps with high-traffic central corridors.",
  },
  {
    id: "horse-chestnut-blossom",
    name: "Horse Chestnut Blossom",
    type: "blossom",
    activeMonths: ["May", "Jun"],
    peakMonths: ["May"],
    pollenContribution: { score: 28, label: "Moderate" },
    notes: "Visible candle-like bloom marker in many commons and residential streets.",
  },
  {
    id: "lime-tree-blossom",
    name: "Lime Tree Blossom",
    type: "blossom",
    activeMonths: ["Jun", "Jul"],
    peakMonths: ["Jul"],
    pollenContribution: { score: 36, label: "Moderate" },
    notes: "Early-summer fragrance marker that overlaps with still-elevated background pollen.",
  },
  {
    id: "ivy-late-bloom",
    name: "Ivy (Late Bloom)",
    type: "blossom",
    activeMonths: ["Sep", "Oct"],
    peakMonths: ["Sep"],
    pollenContribution: { score: 18, label: "Low" },
    notes: "Late-season ecological marker; lower pollen contribution but useful autumn transition cue.",
  },
];

export const sourceNotes = [
  "Guide-grade monthly baseline for Greater London compiled from UK long-term climate summaries and daylight records.",
  "Sunshine and sunset values are monthly averages intended for orientation, not day-specific planning.",
  "Pollen risk scores are normalized (0-100) from seasonal tree/blossom timing patterns in London and are not medical forecasts.",
  "Recommended references: UK Met Office climate averages, Royal Parks/urban tree phenology observations, and UK daylight tables.",
] as const;

export function formatSunsetMinutes(minutes: number) {
  const normalized = ((Math.round(minutes) % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const mins = normalized % 60;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

export function getPollenBand(score: number): PollenContribution["label"] {
  if (score >= 75) return "Very High";
  if (score >= 55) return "High";
  if (score >= 30) return "Moderate";
  return "Low";
}

export function validateLondonSeasonalityData() {
  const errors: string[] = [];

  if (monthlyClimate.length !== 12) {
    errors.push(`Expected 12 monthly climate points, received ${monthlyClimate.length}.`);
  }

  const expectedMonths = [...monthLabels];
  monthlyClimate.forEach((point, index) => {
    if (point.month !== expectedMonths[index]) {
      errors.push(`Month alignment mismatch at index ${index}: expected ${expectedMonths[index]}, received ${point.month}.`);
    }
    if (point.pollenRiskScore < 0 || point.pollenRiskScore > 100) {
      errors.push(`Pollen score out of range for ${point.month}: ${point.pollenRiskScore}.`);
    }
  });

  seasonalMarkers.forEach((marker) => {
    const activeSet = new Set(marker.activeMonths);
    if (marker.activeMonths.length === 0) {
      errors.push(`Marker ${marker.id} has no active months.`);
    }
    marker.peakMonths.forEach((peakMonth) => {
      if (!activeSet.has(peakMonth)) {
        errors.push(`Marker ${marker.id} has peak month ${peakMonth} outside active months.`);
      }
    });
    if (marker.pollenContribution.score < 0 || marker.pollenContribution.score > 100) {
      errors.push(`Marker ${marker.id} pollen contribution out of range: ${marker.pollenContribution.score}.`);
    }
  });

  return errors;
}
