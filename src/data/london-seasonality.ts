export const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

export type MonthLabel = (typeof monthLabels)[number];

export interface MonthlyClimatePoint {
  month: MonthLabel;
  sunshineHoursAvg: number;
  sunsetAvgMinutes: number;
  /** Long-term monthly mean air temperature (°C), Greater London–oriented baseline. */
  avgTempC: number;
  /** Composite 0–100 rhythm of airborne biological activity through the year (orientation for learning, not a health forecast). */
  seasonalActivityIndex: number;
}

/** Relative weight of a marker in the London phenology calendar (0–100). */
export interface FloraSalience {
  score: number;
}

export type FloraSalienceLabel = "Quiet" | "Moderate" | "Prominent" | "Signature";

export function getFloraSalienceLabel(score: number): FloraSalienceLabel {
  if (score >= 75) return "Signature";
  if (score >= 55) return "Prominent";
  if (score >= 30) return "Moderate";
  return "Quiet";
}

export interface SeasonalMarkerReferenceImage {
  /** HTTPS URL (e.g. Wikimedia Commons) shown as a small plate next to the timeline row */
  url: string;
  /** Short credit line for the plate (license / collection) */
  credit: string;
}

export interface SeasonalMarker {
  id: string;
  name: string;
  type: "tree" | "blossom" | "grass";
  activeMonths: MonthLabel[];
  peakMonths: MonthLabel[];
  floraSalience: FloraSalience;
  notes: string;
  referenceImage: SeasonalMarkerReferenceImage;
}

export const monthlyClimate: MonthlyClimatePoint[] = [
  { month: "Jan", sunshineHoursAvg: 62, sunsetAvgMinutes: 975, avgTempC: 5.2, seasonalActivityIndex: 10 },
  { month: "Feb", sunshineHoursAvg: 78, sunsetAvgMinutes: 1035, avgTempC: 5.4, seasonalActivityIndex: 20 },
  { month: "Mar", sunshineHoursAvg: 115, sunsetAvgMinutes: 1100, avgTempC: 7.4, seasonalActivityIndex: 42 },
  { month: "Apr", sunshineHoursAvg: 162, sunsetAvgMinutes: 1195, avgTempC: 9.7, seasonalActivityIndex: 68 },
  { month: "May", sunshineHoursAvg: 198, sunsetAvgMinutes: 1265, avgTempC: 13.2, seasonalActivityIndex: 84 },
  { month: "Jun", sunshineHoursAvg: 201, sunsetAvgMinutes: 1308, avgTempC: 16.4, seasonalActivityIndex: 72 },
  { month: "Jul", sunshineHoursAvg: 207, sunsetAvgMinutes: 1288, avgTempC: 18.5, seasonalActivityIndex: 62 },
  { month: "Aug", sunshineHoursAvg: 190, sunsetAvgMinutes: 1222, avgTempC: 18.2, seasonalActivityIndex: 54 },
  { month: "Sep", sunshineHoursAvg: 145, sunsetAvgMinutes: 1142, avgTempC: 15.3, seasonalActivityIndex: 38 },
  { month: "Oct", sunshineHoursAvg: 105, sunsetAvgMinutes: 1048, avgTempC: 11.6, seasonalActivityIndex: 24 },
  { month: "Nov", sunshineHoursAvg: 65, sunsetAvgMinutes: 959, avgTempC: 8.0, seasonalActivityIndex: 14 },
  { month: "Dec", sunshineHoursAvg: 52, sunsetAvgMinutes: 942, avgTempC: 5.6, seasonalActivityIndex: 9 },
];

export const seasonalMarkers: SeasonalMarker[] = [
  {
    id: "hazel-alder-catkins",
    name: "Hazel & Alder Catkins",
    type: "tree",
    activeMonths: ["Jan", "Feb", "Mar"],
    peakMonths: ["Feb"],
    floraSalience: { score: 48 },
    notes:
      "One of the first woody signs of the year: long catkins on alder and hazel along wet ditches, hedges, and park edges before leaves fully shade the branches.",
    referenceImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Alnus_glutinosa_kz01.jpg",
      credit: "Wikimedia Commons — Alnus glutinosa (Köhler-style plate, CC BY-SA 3.0)",
    },
  },
  {
    id: "cherry-plum-blossom",
    name: "Cherry & Plum Blossom",
    type: "blossom",
    activeMonths: ["Mar", "Apr"],
    peakMonths: ["Apr"],
    floraSalience: { score: 32 },
    notes:
      "Street and garden Prunus break into pale pink and white drifts—an easy visual anchor for “true spring” in squares, cemeteries, and railway verges.",
    referenceImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/3/30/Prunus_avium_kz01.jpg",
      credit: "Wikimedia Commons — Prunus avium (Köhler-style plate, CC BY-SA 3.0)",
    },
  },
  {
    id: "birch-pollen",
    name: "Birch",
    type: "tree",
    activeMonths: ["Mar", "Apr", "May"],
    peakMonths: ["Apr"],
    floraSalience: { score: 86 },
    notes:
      "Light, drooping silver-birch catkins are unmistakable; learn the papery bark and fine twigs that make birch one of the skyline trees of cooler London pockets.",
    referenceImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/7/76/Betula_pendula_kz01.jpg",
      credit: "Wikimedia Commons — Betula pendula (Köhler-style plate, CC BY-SA 3.0)",
    },
  },
  {
    id: "oak-pollen",
    name: "Oak",
    type: "tree",
    activeMonths: ["Apr", "May", "Jun"],
    peakMonths: ["May"],
    floraSalience: { score: 64 },
    notes:
      "English oak moves after birch: look for knobbly young leaves and dangling male flowers, then the long summer presence of deep-lobed foliage in older parks.",
    referenceImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/4/43/Quercus_robur_kz01.jpg",
      credit: "Wikimedia Commons — Quercus robur (Köhler-style plate, CC BY-SA 3.0)",
    },
  },
  {
    id: "london-plane",
    name: "London Plane",
    type: "tree",
    activeMonths: ["Apr", "May"],
    peakMonths: ["May"],
    floraSalience: { score: 58 },
    notes:
      "The capital’s signature street tree: mottled bark, maple-like leaves, and spiky “bobble” fruits—learn it and you can read the geometry of boulevards and river paths.",
    referenceImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Platanus_%C3%97_hispanica_%28Platane_commun%29_-_20150430_10h12_%2810124%29.jpg",
      credit: "Wikimedia Commons — Platanus × hispanica (CC BY-SA 4.0)",
    },
  },
  {
    id: "horse-chestnut-blossom",
    name: "Horse Chestnut Blossom",
    type: "blossom",
    activeMonths: ["May", "Jun"],
    peakMonths: ["May"],
    floraSalience: { score: 28 },
    notes:
      "Upright “candles” of flower above palmate leaves—classic in commons and old avenues; the glossy conkers later are the giveaway for beginners.",
    referenceImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Aesculus_hippocastanum_kz01.jpg",
      credit: "Wikimedia Commons — Aesculus hippocastanum (Köhler-style plate, CC BY-SA 3.0)",
    },
  },
  {
    id: "lime-tree-blossom",
    name: "Lime Tree Blossom",
    type: "blossom",
    activeMonths: ["Jun", "Jul"],
    peakMonths: ["Jul"],
    floraSalience: { score: 36 },
    notes:
      "Small-leaved lime perfumes early summer evenings; sticky leaf undersides and heart-shaped blades help separate it from other street trees in leaf.",
    referenceImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/4/40/Tilia_cordata_kz01.jpg",
      credit: "Wikimedia Commons — Tilia cordata (Köhler-style plate, CC BY-SA 3.0)",
    },
  },
  {
    id: "ivy-late-bloom",
    name: "Ivy (Late Bloom)",
    type: "blossom",
    activeMonths: ["Sep", "Oct"],
    peakMonths: ["Sep"],
    floraSalience: { score: 18 },
    notes:
      "Globular green-yellow umbels on climbing stems—a late nectar pulse for insects and a clear shift in the year’s botanical mood before leaf fall.",
    referenceImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Hedera_helix_kz01.jpg",
      credit: "Wikimedia Commons — Hedera helix (Köhler-style plate, CC BY-SA 3.0)",
    },
  },
  {
    id: "meadow-grasses-poa",
    name: "Meadow Grasses (Poa)",
    type: "grass",
    activeMonths: ["May", "Jun", "Jul", "Aug"],
    peakMonths: ["Jun"],
    floraSalience: { score: 78 },
    notes:
      "Bluegrass relatives dominate many lawns and roughs; fine inflorescences and boat-shaped leaf tips are good field characters once you kneel to look.",
    referenceImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/b/be/Poa_pratensis_kz01.jpg",
      credit: "Wikimedia Commons — Poa pratensis (Köhler-style plate, CC BY-SA 3.0)",
    },
  },
  {
    id: "timothy-grass",
    name: "Timothy Grass",
    type: "grass",
    activeMonths: ["May", "Jun", "Jul"],
    peakMonths: ["Jun"],
    floraSalience: { score: 82 },
    notes:
      "Cylindrical flower heads on smooth stems—classic hayfield grass; compare with other meadow grasses by spike shape and leaf sheath texture.",
    referenceImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/8/86/Phleum_pratense_kz01.jpg",
      credit: "Wikimedia Commons — Phleum pratense (Köhler-style plate, CC BY-SA 3.0)",
    },
  },
  {
    id: "ryegrass-lawns",
    name: "Perennial Ryegrass (Lawns)",
    type: "grass",
    activeMonths: ["May", "Jun", "Jul", "Aug"],
    peakMonths: ["Jul"],
    floraSalience: { score: 74 },
    notes:
      "Dark, glossy blades and tidy tufts on sports turf and verges—one of the commonest grasses to practice spikelet structure on a hand lens walk.",
    referenceImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Lolium_perenne_kz01.jpg",
      credit: "Wikimedia Commons — Lolium perenne (Köhler-style plate, CC BY-SA 3.0)",
    },
  },
  {
    id: "red-fescue-fine-lawns",
    name: "Red Fescue (Fine Lawns)",
    type: "grass",
    activeMonths: ["Jun", "Jul", "Aug"],
    peakMonths: ["Jul"],
    floraSalience: { score: 52 },
    notes:
      "Fine, wiry blades in shade lawns and rough ground; bluish cast and wiry feel distinguish it from coarser amenity mixes.",
    referenceImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Festuca_rubra_kz01.jpg",
      credit: "Wikimedia Commons — Festuca rubra (Köhler-style plate, CC BY-SA 3.0)",
    },
  },
];

export const sourceNotes = [
  "Guide-grade monthly baseline for Greater London compiled from UK long-term climate summaries and daylight records.",
  "Sunshine, sunset, and mean temperature values are monthly long-term averages intended for orientation, not day-specific planning.",
  "The seasonal activity index (0–100) is a normalized composite for reading the outdoor year alongside phenology; it is not medical advice.",
  "Recommended references: UK Met Office climate averages, Royal Parks and urban tree phenology, UK daylight tables, and local wildflower/grass keys.",
  "Timeline reference plates are documentary botanical photographs or Köhler-style plates from Wikimedia Commons; species align with each marker (London plane: Platanus × hispanica hybrid; grasses: representative Poaceae species).",
  "Grass rows track typical UK Poaceae flowering and seeding (late spring through summer); timing shifts with weather and mowing.",
] as const;

export function formatSunsetMinutes(minutes: number) {
  const normalized = ((Math.round(minutes) % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const mins = normalized % 60;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

export function formatAvgTempC(celsius: number) {
  const rounded = Math.round(celsius * 10) / 10;
  return `${rounded.toFixed(1)}°C`;
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
    if (point.seasonalActivityIndex < 0 || point.seasonalActivityIndex > 100) {
      errors.push(`Seasonal activity index out of range for ${point.month}: ${point.seasonalActivityIndex}.`);
    }
    if (point.avgTempC < -15 || point.avgTempC > 40) {
      errors.push(`Mean temperature out of plausible range for ${point.month}: ${point.avgTempC}°C.`);
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
    if (marker.floraSalience.score < 0 || marker.floraSalience.score > 100) {
      errors.push(`Marker ${marker.id} flora salience score out of range: ${marker.floraSalience.score}.`);
    }
    if (!marker.referenceImage?.url?.startsWith("https://")) {
      errors.push(`Marker ${marker.id} is missing a valid HTTPS reference image URL.`);
    }
    if (!marker.referenceImage?.credit?.trim()) {
      errors.push(`Marker ${marker.id} is missing reference image credit text.`);
    }
  });

  return errors;
}
