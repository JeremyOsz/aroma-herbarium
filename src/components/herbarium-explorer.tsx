"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  blendRecipes,
  categoryLabels,
  ingredients,
  regionNotes,
  teaIngredients,
  teaTherapeuticEffectFilters,
  worldScentLanes,
  type AromaCategory,
  type AromaRegion,
  type Ingredient,
  type TeaIngredient,
  type TeaTherapeuticEffect,
  usageGuide,
} from "@/data/aromatherapy";
import {
  formatSunsetMinutes,
  monthLabels,
  monthlyClimate,
  seasonalMarkers,
  sourceNotes,
  validateLondonSeasonalityData,
} from "@/data/london-seasonality";
import { cn } from "@/lib/utils";

const categories = Object.keys(categoryLabels) as AromaCategory[];
const regions = Object.keys(regionNotes) as AromaRegion[];
const teaEffects = [...teaTherapeuticEffectFilters];
const tabs = ["ingredients", "tea-therapy", "regions", "layering", "seasonality"] as const;
type ExplorerTab = (typeof tabs)[number];
const amazonAffiliateTag = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG?.trim();
const laneCardAccents = [
  "from-[#f9ecd4] via-[#f7e4bf] to-[#ecd3a1]",
  "from-[#f6eedf] via-[#e8d8b7] to-[#ddc395]",
  "from-[#f3eadf] via-[#e0d5c8] to-[#cfbeab]",
  "from-[#e8efe4] via-[#d8e5d1] to-[#c4d7b8]",
  "from-[#f6f0dd] via-[#ebdfb8] to-[#dccb96]",
  "from-[#efe3d4] via-[#dfcdb4] to-[#ccb090]",
];
const chartColors = {
  sunshine: "#c58a2f",
  sunset: "#466a4b",
};

function buildPolyline(points: { x: number; y: number }[]) {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

function getPollenRiskClass(score: number) {
  if (score >= 75) return "bg-[#8c2f39] text-amber-50";
  if (score >= 55) return "bg-[#b55d2e] text-amber-50";
  if (score >= 30) return "bg-[#d2a34f] text-amber-950";
  return "bg-[#dfe7d5] text-[#32462e]";
}

function getContributionClass(score: number) {
  if (score >= 75) return "bg-[#8c2f39]/95 text-amber-50";
  if (score >= 55) return "bg-[#b55d2e]/90 text-amber-50";
  if (score >= 30) return "bg-[#e3bc68] text-amber-950";
  return "bg-[#d9e4cd] text-[#32462e]";
}

function isExplorerTab(value: string | null): value is ExplorerTab {
  return value !== null && (tabs as readonly string[]).includes(value);
}

function isAromaCategory(value: string | null): value is AromaCategory {
  return value !== null && (categories as readonly string[]).includes(value);
}

function isAromaRegion(value: string | null): value is AromaRegion {
  return value !== null && (regions as readonly string[]).includes(value);
}

function isTeaEffect(value: string | null): value is TeaTherapeuticEffect {
  return value !== null && teaEffects.includes(value as TeaTherapeuticEffect);
}

function buildAmazonAffiliateSearchUrl(name: string) {
  const normalizedName = name.replace(/\([^)]*\)/g, "").replace(/[\/]/g, " ").trim();
  const url = new URL("https://www.amazon.com/s");
  url.searchParams.set("k", `${normalizedName} essential oil`);
  if (amazonAffiliateTag) {
    url.searchParams.set("tag", amazonAffiliateTag);
  }
  return url.toString();
}

function buildArchiveFallbackUrl(imageUrl: string) {
  const match = imageUrl.match(/^https:\/\/archive\.org\/download\/([^/]+)\//);
  if (!match) {
    return imageUrl;
  }
  return `https://archive.org/download/${match[1]}/__ia_thumb.jpg`;
}

function buildArchiveServicesImgUrl(imageUrl: string) {
  const match = imageUrl.match(/^https:\/\/archive\.org\/download\/([^/]+)\//);
  if (!match) {
    return imageUrl;
  }
  return `https://archive.org/services/img/${match[1]}`;
}

function buildInlineFallbackSvg(label: string) {
  const text = encodeURIComponent(label);
  return `data:image/svg+xml;charset=utf-8,${`<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='900' viewBox='0 0 1200 900'><defs><linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='#efe3c7'/><stop offset='100%' stop-color='#e2d1b2'/></linearGradient></defs><rect width='1200' height='900' fill='url(#bg)'/><g fill='#b18657' opacity='0.35'><circle cx='250' cy='220' r='140'/><circle cx='980' cy='170' r='120'/><circle cx='900' cy='650' r='160'/></g><text x='600' y='435' text-anchor='middle' fill='#6e4a2a' font-family='Georgia, serif' font-size='46'>Archival image unavailable</text><text x='600' y='500' text-anchor='middle' fill='#8f6742' font-family='Georgia, serif' font-size='30'>${text}</text></svg>`}`;
}

function resolveImageSrc(imageUrl: string, label: string, stage: number) {
  if (stage <= 0) {
    return imageUrl;
  }
  if (stage === 1) {
    return buildArchiveFallbackUrl(imageUrl);
  }
  if (stage === 2) {
    return buildArchiveServicesImgUrl(imageUrl);
  }
  return buildInlineFallbackSvg(label);
}

function normalizeScentToken(value: string) {
  return value
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const materialAliases: Record<string, string> = {
  "orange blossom": "neroli",
  aloeswood: "oud accord",
  "vetiver khus": "vetiver",
};

function findAtlasIngredientForMaterial(material: string) {
  const normalizedMaterial = normalizeScentToken(material);
  const alias = materialAliases[normalizedMaterial];
  const lookup = alias ? normalizeScentToken(alias) : normalizedMaterial;

  return ingredients.find((item) => {
    const name = normalizeScentToken(item.name);
    return name.includes(lookup) || lookup.includes(name);
  });
}

function getAtlasCoverageForMaterials(materials: string[]) {
  return materials.reduce<{ available: string[]; missing: string[] }>((acc, material) => {
    const match = findAtlasIngredientForMaterial(material);
    if (match) {
      if (!acc.available.includes(match.name)) {
        acc.available.push(match.name);
      }
      return acc;
    }

    acc.missing.push(material);
    return acc;
  }, { available: [], missing: [] });
}

export function HerbariumExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ingredientById = useMemo(() => new Map(ingredients.map((item) => [item.id, item])), []);
  const teaById = useMemo(() => new Map(teaIngredients.map((item) => [item.id, item])), []);

  const activeTab = (() => {
    const tabValue = searchParams.get("tab");
    return isExplorerTab(tabValue) ? tabValue : "ingredients";
  })();
  const activeCategory: AromaCategory | "all" = (() => {
    const categoryValue = searchParams.get("category");
    return isAromaCategory(categoryValue) ? categoryValue : "all";
  })();
  const activeRegion: AromaRegion | "all" = (() => {
    const regionValue = searchParams.get("region");
    return isAromaRegion(regionValue) ? regionValue : "all";
  })();
  const query = searchParams.get("query") ?? "";
  const selectedIngredient = (() => {
    const ingredientId = searchParams.get("ingredient");
    return ingredientId ? ingredientById.get(ingredientId) ?? null : null;
  })();
  const teaQuery = searchParams.get("teaQuery") ?? "";
  const activeTeaEffect: TeaTherapeuticEffect | "all" = (() => {
    const effectValue = searchParams.get("teaEffect");
    return isTeaEffect(effectValue) ? effectValue : "all";
  })();
  const selectedTea = (() => {
    const teaId = searchParams.get("tea");
    return teaId ? teaById.get(teaId) ?? null : null;
  })();
  const [imageFallbackStage, setImageFallbackStage] = useState<Record<string, number>>({});

  const updateUrlParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
        return;
      }
      params.set(key, value);
    });

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const handleTabChange = (value: ExplorerTab) => {
    updateUrlParams({ tab: value === "ingredients" ? null : value });
  };

  const handleCategoryChange = (value: AromaCategory | "all") => {
    updateUrlParams({ category: value === "all" ? null : value });
  };

  const handleRegionChange = (value: AromaRegion | "all") => {
    updateUrlParams({ region: value === "all" ? null : value });
  };

  const handleQueryChange = (value: string) => {
    updateUrlParams({ query: value.trim().length ? value : null });
  };

  const handleTeaQueryChange = (value: string) => {
    updateUrlParams({ teaQuery: value.trim().length ? value : null });
  };

  const handleTeaEffectChange = (value: TeaTherapeuticEffect | "all") => {
    updateUrlParams({ teaEffect: value === "all" ? null : value });
  };

  const handleSelectIngredient = useCallback((item: Ingredient | null) => {
    updateUrlParams({ ingredient: item?.id ?? null, tea: null });
  }, [updateUrlParams]);

  const handleSelectTea = useCallback((item: TeaIngredient | null) => {
    updateUrlParams({ tea: item?.id ?? null, ingredient: null });
  }, [updateUrlParams]);

  useEffect(() => {
    if (!selectedIngredient && !selectedTea) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedTea) {
          handleSelectTea(null);
          return;
        }
        handleSelectIngredient(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleSelectIngredient, handleSelectTea, selectedIngredient, selectedTea]);

  const filtered = useMemo(() => {
    return ingredients.filter((item) => {
      const categoryMatch = activeCategory === "all" || item.category === activeCategory;
      const regionMatch = activeRegion === "all" || item.regions.includes(activeRegion);
      const normalizedQuery = query.toLowerCase();
      const queryMatch =
        query.trim().length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.scentProfile.join(" ").toLowerCase().includes(normalizedQuery) ||
        item.accords.join(" ").toLowerCase().includes(normalizedQuery) ||
        item.symbolism?.join(" ").toLowerCase().includes(normalizedQuery);

      return categoryMatch && regionMatch && queryMatch;
    });
  }, [activeCategory, activeRegion, query]);

  const laneIngredientCoverage = useMemo(() => {
    return worldScentLanes.reduce<Record<string, { available: string[]; missing: string[] }>>((acc, lane) => {
      acc[lane.id] = getAtlasCoverageForMaterials(lane.signatureMaterials);
      return acc;
    }, {});
  }, []);

  const filteredTeas = useMemo(() => {
    return teaIngredients.filter((item) => {
      const normalizedTeaQuery = teaQuery.toLowerCase();
      const queryMatch =
        teaQuery.trim().length === 0 ||
        item.name.toLowerCase().includes(normalizedTeaQuery) ||
        (item.latin?.toLowerCase().includes(normalizedTeaQuery) ?? false) ||
        item.flavorProfile.join(" ").toLowerCase().includes(normalizedTeaQuery) ||
        item.traditionallyUsedFor.join(" ").toLowerCase().includes(normalizedTeaQuery) ||
        item.therapeuticEffects.join(" ").toLowerCase().includes(normalizedTeaQuery);
      const effectMatch = activeTeaEffect === "all" || item.therapeuticEffects.includes(activeTeaEffect);
      return queryMatch && effectMatch;
    });
  }, [activeTeaEffect, teaQuery]);

  const seasonalityValidationErrors = useMemo(() => validateLondonSeasonalityData(), []);

  const climateChart = useMemo(() => {
    const width = 920;
    const height = 330;
    const padding = { top: 22, right: 54, bottom: 44, left: 56 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;
    const pointCount = monthlyClimate.length;

    const sunshineValues = monthlyClimate.map((point) => point.sunshineHoursAvg);
    const sunsetValues = monthlyClimate.map((point) => point.sunsetAvgMinutes);
    const sunshineMin = Math.min(...sunshineValues);
    const sunshineMax = Math.max(...sunshineValues);
    const sunsetMin = Math.min(...sunsetValues);
    const sunsetMax = Math.max(...sunsetValues);

    const xForIndex = (index: number) => padding.left + (index / (pointCount - 1)) * plotWidth;
    const yForSunshine = (value: number) =>
      padding.top + ((sunshineMax - value) / Math.max(1, sunshineMax - sunshineMin)) * plotHeight;
    const yForSunset = (value: number) =>
      padding.top + ((sunsetMax - value) / Math.max(1, sunsetMax - sunsetMin)) * plotHeight;

    const sunshinePoints = monthlyClimate.map((point, index) => ({
      month: point.month,
      x: xForIndex(index),
      y: yForSunshine(point.sunshineHoursAvg),
      value: point.sunshineHoursAvg,
    }));

    const sunsetPoints = monthlyClimate.map((point, index) => ({
      month: point.month,
      x: xForIndex(index),
      y: yForSunset(point.sunsetAvgMinutes),
      value: point.sunsetAvgMinutes,
    }));

    const tickCount = 5;
    const sunshineTicks = Array.from({ length: tickCount }, (_, index) => {
      const ratio = index / (tickCount - 1);
      const value = Math.round(sunshineMax - ratio * (sunshineMax - sunshineMin));
      return { value, y: yForSunshine(value) };
    });
    const sunsetTicks = Array.from({ length: tickCount }, (_, index) => {
      const ratio = index / (tickCount - 1);
      const value = Math.round(sunsetMax - ratio * (sunsetMax - sunsetMin));
      return { value, y: yForSunset(value) };
    });

    return {
      width,
      height,
      padding,
      sunshinePoints,
      sunsetPoints,
      sunshineTicks,
      sunsetTicks,
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="relative isolate overflow-hidden rounded-[2rem] border border-amber-900/20 bg-[radial-gradient(circle_at_5%_4%,rgba(164,112,61,0.28),transparent_35%),radial-gradient(circle_at_84%_16%,rgba(77,109,74,0.3),transparent_38%),linear-gradient(160deg,#f8f1e0_0%,#efe1c6_50%,#e4d0ae_100%)] p-7 shadow-[0_24px_55px_-30px_rgba(47,29,8,0.6)] sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(86,57,25,0.07)_0,rgba(86,57,25,0.07)_1px,transparent_1px,transparent_12px)] opacity-45" />
        <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(102,66,32,0.22),transparent_72%)] blur-2xl" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-amber-900/75">
              <span className="h-px w-8 bg-amber-900/35" />
              Aromatherapy Herbarium
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-tight text-amber-950 sm:text-5xl lg:text-6xl">
              Vintage Pressed-Plant Lookup for Scent, Mood, and Layering
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-amber-950/82 sm:text-xl">
              A field-notebook style explorer inspired by archival botanical plates: filter by scent family,
              browse regional scent lanes, and build balanced top-heart-base blends.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-amber-950 text-amber-100">Archive-first references</Badge>
              <Badge variant="secondary" className="bg-amber-900/15 text-amber-900">
                Blend-ready layering notes
              </Badge>
              <Badge variant="secondary" className="bg-[#667a52]/20 text-[#344526]">
                Regional scent lanes
              </Badge>
            </div>
            <p className="text-xs text-amber-900/75">
              Visual reference collections:{" "}
              <a
                className="underline decoration-amber-900/45 underline-offset-2 transition-colors hover:text-amber-950"
                href="https://archive.org/details/flora-berolinensis"
                target="_blank"
                rel="noreferrer"
              >
                Flora Berolinensis
              </a>
              {" · "}
              <a
                className="underline decoration-amber-900/45 underline-offset-2 transition-colors hover:text-amber-950"
                href="https://archive.org/details/piante-del-regio-orto-di-padova"
                target="_blank"
                rel="noreferrer"
              >
                Piante del Regio Orto di Padova
              </a>
            </p>
          </div>

          <aside className="relative overflow-hidden rounded-2xl border border-amber-950/15 bg-[#f9f2e3]/80 p-4 shadow-[0_18px_32px_-22px_rgba(56,37,15,0.55)] backdrop-blur-[1px]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.25),transparent_40%,rgba(84,56,24,0.06))]" />
            <div className="relative space-y-3">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-amber-900/75">Field Atlas</p>
              <div className="grid grid-cols-3 gap-2 text-center text-amber-950">
                <div className="rounded-xl border border-amber-900/15 bg-amber-50/70 px-2 py-2">
                  <p className="text-lg font-semibold">{ingredients.length}</p>
                  <p className="text-[0.65rem] uppercase tracking-[0.12em] text-amber-900/70">Plants</p>
                </div>
                <div className="rounded-xl border border-amber-900/15 bg-amber-50/70 px-2 py-2">
                  <p className="text-lg font-semibold">{categories.length}</p>
                  <p className="text-[0.65rem] uppercase tracking-[0.12em] text-amber-900/70">Families</p>
                </div>
                <div className="rounded-xl border border-amber-900/15 bg-amber-50/70 px-2 py-2">
                  <p className="text-lg font-semibold">{regions.length}</p>
                  <p className="text-[0.65rem] uppercase tracking-[0.12em] text-amber-900/70">Regions</p>
                </div>
              </div>
              <div className="rounded-xl border border-amber-900/15 bg-[#efe0c0]/55 p-3 text-xs leading-relaxed text-amber-950/80">
                <p className="font-medium text-amber-950">Notebook cue</p>
                <p className="mt-1">
                  Start with one bright top note, one floral or herbal heart, and one resinous base to keep blends
                  balanced and long-lasting.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </header>

      <section className="mt-8 grid gap-4 rounded-2xl border border-amber-900/15 bg-[#f7f0df]/90 p-4 shadow-[0_12px_35px_-25px_rgba(58,38,12,0.45)] sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative lg:col-span-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-amber-900/45" />
          <Input
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            placeholder="Search ingredient, accord, or symbolism"
            className="border-amber-900/20 bg-amber-50/60 pl-9 text-amber-950 placeholder:text-amber-900/45"
          />
        </div>

        <div className="flex flex-wrap gap-2 lg:col-span-2">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => handleCategoryChange("all")}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className="rounded-full"
              onClick={() => handleCategoryChange(category)}
            >
              {categoryLabels[category]}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 lg:col-span-3">
          <Button
            variant={activeRegion === "all" ? "secondary" : "outline"}
            className="rounded-full"
            onClick={() => handleRegionChange("all")}
          >
            All Regions
          </Button>
          {regions.map((region) => (
            <Button
              key={region}
              variant={activeRegion === region ? "secondary" : "outline"}
              className="rounded-full"
              onClick={() => handleRegionChange(region)}
            >
              {region}
            </Button>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-xl border border-amber-900/20 bg-amber-50/70 p-3 text-xs text-amber-950/80">
        <p>
          Affiliate disclosure: Some links are Amazon affiliate links. As an Amazon Associate, you can earn from
          qualifying purchases.
        </p>
        {!amazonAffiliateTag ? (
          <p className="mt-1 text-amber-900/80">
            Monetization is currently inactive. Set <code>NEXT_PUBLIC_AMAZON_AFFILIATE_TAG</code> to enable your tag.
          </p>
        ) : null}
      </section>

      <Tabs value={activeTab} onValueChange={(value) => handleTabChange(value as ExplorerTab)} className="mt-8 w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 bg-[#efe1c5] sm:grid-cols-3 lg:grid-cols-5">
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="tea-therapy">Tea Therapy</TabsTrigger>
          <TabsTrigger value="regions">World Scent Lanes</TabsTrigger>
          <TabsTrigger value="layering">Layering Lab</TabsTrigger>
          <TabsTrigger value="seasonality">London Seasonality</TabsTrigger>
        </TabsList>

        <TabsContent value="ingredients" className="mt-6">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item) => {
              const fallbackStage = imageFallbackStage[item.id] ?? 0;
              const imageSrc = resolveImageSrc(item.imageUrl, item.name, fallbackStage);

              return (
              <Card
                key={item.id}
                className={cn(
                  "group relative cursor-pointer overflow-hidden border border-amber-900/20 bg-[#fcf7ec] transition-shadow duration-200 hover:shadow-[0_16px_28px_-22px_rgba(70,46,22,0.55)]",
                )}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectIngredient(item)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleSelectIngredient(item);
                  }
                }}
                aria-label={`View details for ${item.name}`}
              >
                <div className="relative border-b border-amber-900/10 bg-[#e8d7b4]/60 p-2">
                  <div className="relative h-64 overflow-hidden rounded-[0.32rem] border border-amber-900/15 bg-[#efe4c9]">
                    <Image
                      src={imageSrc}
                      alt={`${item.name} archival herbarium scan`}
                      fill
                      quality={92}
                      className="object-cover sepia-[0.56] saturate-[0.82]"
                      style={{ objectPosition: item.imageObjectPosition ?? "center 30%" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      onError={() => {
                        if (fallbackStage < 3) {
                          setImageFallbackStage((prev) => ({ ...prev, [item.id]: fallbackStage + 1 }));
                        }
                      }}
                    />
                  </div>
                </div>
                <CardHeader className="space-y-3 pb-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-amber-900 text-amber-50">{categoryLabels[item.category]}</Badge>
                    {item.regions.map((region) => (
                      <Badge key={`${item.id}-${region}`} variant="outline" className="border-amber-900/25 text-amber-900">
                        {region}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-2xl text-amber-950">{item.name}</CardTitle>
                  {item.latin ? (
                    <CardDescription className="italic text-amber-900/70">{item.latin}</CardDescription>
                  ) : null}
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-amber-950/85">
                  <p>{item.vibe}</p>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">Scent profile</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.scentProfile.map((note) => (
                        <Badge key={`${item.id}-profile-${note}`} variant="secondary" className="bg-amber-900/10 text-amber-900">
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">Accords</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.accords.map((accord) => (
                        <Badge key={`${item.id}-accord-${accord}`} variant="secondary" className="bg-[#d7b474]/20 text-amber-900">
                          {accord}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {item.symbolism?.length ? (
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">Symbolism</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.symbolism.map((symbol) => (
                          <Badge
                            key={`${item.id}-symbol-${symbol}`}
                            variant="outline"
                            className="border-amber-900/30 bg-amber-50 text-amber-900"
                          >
                            {symbol}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full border border-amber-900/20 bg-amber-900/10 text-amber-950 hover:bg-amber-900/15"
                    onClick={() => handleSelectIngredient(item)}
                  >
                    View details
                  </Button>

                  <p className="text-xs text-amber-900/60">Image source: {item.imageSource}</p>
                </CardContent>
              </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="tea-therapy" className="mt-6 space-y-4">
          <Card className="border-amber-900/15 bg-[#f7efdd]">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl text-amber-950">Herbal Tea Therapy Notebook</CardTitle>
              <CardDescription className="text-sm leading-relaxed text-amber-900/80">
                Traditional wellness language only: these notes describe how herbs are traditionally used in tea
                culture and are not medical treatment guidance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="rounded-lg border border-amber-900/20 bg-amber-100/60 px-3 py-2 text-xs text-amber-950">
                Traditional uses only; not medical advice; not intended to diagnose, treat, or cure.
              </p>
            </CardContent>
          </Card>

          <section className="grid gap-4 rounded-2xl border border-amber-900/15 bg-[#f7f0df]/90 p-4 shadow-[0_12px_35px_-25px_rgba(58,38,12,0.45)]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-amber-900/45" />
              <Input
                value={teaQuery}
                onChange={(event) => handleTeaQueryChange(event.target.value)}
                placeholder="Search tea, flavor profile, or traditional use"
                className="border-amber-900/20 bg-amber-50/60 pl-9 text-amber-950 placeholder:text-amber-900/45"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={activeTeaEffect === "all" ? "default" : "secondary"}
                className={cn(
                  "rounded-full px-4",
                  activeTeaEffect === "all" ? "bg-amber-900 text-amber-50" : "bg-amber-900/10 text-amber-900",
                )}
                onClick={() => handleTeaEffectChange("all")}
              >
                All effects
              </Button>
              {teaEffects.map((effect) => (
                <Button
                  key={`tea-effect-${effect}`}
                  type="button"
                  variant={activeTeaEffect === effect ? "default" : "secondary"}
                  className={cn(
                    "rounded-full px-4 capitalize",
                    activeTeaEffect === effect ? "bg-amber-900 text-amber-50" : "bg-amber-900/10 text-amber-900",
                  )}
                  onClick={() => handleTeaEffectChange(effect)}
                >
                  {effect}
                </Button>
              ))}
            </div>
          </section>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredTeas.map((item) => {
              const teaImageKey = `tea-${item.id}`;
              const fallbackStage = imageFallbackStage[teaImageKey] ?? 0;
              const imageSrc = resolveImageSrc(item.imageUrl, item.name, fallbackStage);
              return (
                <Card
                  key={item.id}
                  className="group relative cursor-pointer overflow-hidden border border-amber-900/20 bg-[#fcf7ec] transition-shadow duration-200 hover:shadow-[0_16px_28px_-22px_rgba(70,46,22,0.55)]"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectTea(item)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleSelectTea(item);
                    }
                  }}
                  aria-label={`View tea details for ${item.name}`}
                >
                  <div className="relative border-b border-amber-900/10 bg-[#e8d7b4]/60 p-2">
                    <div className="relative h-52 overflow-hidden rounded-[0.32rem] border border-amber-900/15 bg-[#efe4c9]">
                      <Image
                        src={imageSrc}
                        alt={`${item.name} tea herb reference image`}
                        fill
                        quality={90}
                        className="object-cover sepia-[0.56] saturate-[0.82]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        onError={() => {
                          if (fallbackStage < 3) {
                            setImageFallbackStage((prev) => ({ ...prev, [teaImageKey]: fallbackStage + 1 }));
                          }
                        }}
                      />
                    </div>
                  </div>
                  <CardHeader className="space-y-3 pb-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-[#50623f] text-[#edf2e6]">Herbal Tea</Badge>
                      {item.id === "purple-sage" ? (
                        <Badge className="bg-[#5f456f] text-[#f4ecfa]">Featured</Badge>
                      ) : null}
                      {item.therapeuticEffects.map((effect) => (
                        <Badge key={`${item.id}-effect-${effect}`} variant="outline" className="border-amber-900/25 text-amber-900">
                          {effect}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-2xl text-amber-950">{item.name}</CardTitle>
                    {item.latin ? <CardDescription className="italic text-amber-900/70">{item.latin}</CardDescription> : null}
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-amber-950/85">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">Flavor profile</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.flavorProfile.map((note) => (
                          <Badge key={`${item.id}-flavor-${note}`} variant="secondary" className="bg-amber-900/10 text-amber-900">
                            {note}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">Traditionally used for</p>
                      <p className="text-sm leading-relaxed">{item.traditionallyUsedFor[0]}</p>
                    </div>
                    <div className="rounded-md border border-amber-900/15 bg-amber-50/70 p-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-amber-900/70">Brew guide</p>
                      <p className="mt-1">
                        {item.brewGuide.amount} · {item.brewGuide.waterTemp} · {item.brewGuide.steepTime}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full border border-amber-900/20 bg-amber-900/10 text-amber-950 hover:bg-amber-900/15"
                      onClick={() => handleSelectTea(item)}
                    >
                      View tea details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="regions" className="mt-6">
          <div className="space-y-5">
            <Card className="border-amber-900/15 bg-[linear-gradient(145deg,#f7ead1_0%,#efe0bf_46%,#e8d7b2_100%)]">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl text-amber-950">World Scent Lanes Atlas</CardTitle>
                <CardDescription className="max-w-4xl text-sm leading-relaxed text-amber-900/80">
                  Six scent routes that map cultural perfume practice, signature materials, and everyday fragrance
                  rituals. Use these lanes as inspiration while building blends in the Ingredients and Layering tabs.
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {worldScentLanes.map((lane, index) => {
                const accent = laneCardAccents[index % laneCardAccents.length];
                const coverage = laneIngredientCoverage[lane.id] ?? { available: [], missing: [] };

                return (
                  <Card
                    key={lane.id}
                    className="overflow-hidden border-amber-900/20 bg-[#fbf6ea] shadow-[0_18px_35px_-28px_rgba(71,45,18,0.55)]"
                  >
                    <div className={cn("h-2 w-full bg-gradient-to-r", accent)} />
                    <CardHeader className="space-y-3">
                      <p className="text-[0.68rem] uppercase tracking-[0.2em] text-amber-900/70">{lane.routeName}</p>
                      <CardTitle className="text-2xl text-amber-950">{lane.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-amber-950/85">
                      <p className="leading-relaxed">{lane.culturalContext}</p>

                      <div className="space-y-2">
                        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-amber-900/65">Signature materials</p>
                        <div className="flex flex-wrap gap-1.5">
                          {lane.signatureMaterials.map((material) => (
                            <Badge
                              key={`${lane.id}-${material}`}
                              variant="secondary"
                              className="bg-amber-900/10 text-amber-900"
                            >
                              {material}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-lg border border-amber-900/20 bg-amber-50/70 p-3">
                        <p className="text-[0.7rem] uppercase tracking-[0.16em] text-amber-900/65">How scent is used</p>
                        <p className="mt-1 leading-relaxed">{lane.usage}</p>
                      </div>

                      {coverage.available.length ? (
                        <div className="space-y-2">
                          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-amber-900/65">
                            Available in this atlas
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {coverage.available.map((itemName) => (
                              <Badge
                                key={`${lane.id}-match-${itemName}`}
                                variant="outline"
                                className="border-amber-900/25 text-amber-900"
                              >
                                {itemName}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {coverage.missing.length ? (
                        <div className="space-y-2">
                          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-amber-900/65">
                            Missing from this atlas
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {coverage.missing.map((itemName) => (
                              <Badge
                                key={`${lane.id}-missing-${itemName}`}
                                variant="secondary"
                                className="bg-amber-900/12 text-amber-900/75"
                              >
                                {itemName}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="layering" className="mt-6 space-y-4">
          <Card className="border-amber-900/15 bg-[#f6efde]">
            <CardHeader>
              <CardTitle className="text-amber-950">Layering Blueprint</CardTitle>
              <CardDescription className="text-amber-900/75">
                {usageGuide.layeringRule} · {usageGuide.cycle}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-amber-950/85 md:grid-cols-2">
              {usageGuide.dropGuide.map((item) => (
                <p key={item} className="rounded-md border border-amber-900/15 bg-amber-50/70 px-3 py-2">
                  {item}
                </p>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-3">
            {blendRecipes.map((blend) => (
              <Card key={blend.name} className="border-amber-900/15 bg-[#fbf6ea]">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit bg-amber-900/10 text-amber-900">
                    {blend.family}
                  </Badge>
                  <CardTitle className="text-xl text-amber-950">{blend.name}</CardTitle>
                  <CardDescription className="text-amber-900/75">{blend.vibe}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-amber-950/85">
                  <p>
                    <strong>Top:</strong> {blend.layers.top}
                  </p>
                  <p>
                    <strong>Heart:</strong> {blend.layers.heart}
                  </p>
                  <p>
                    <strong>Base:</strong> {blend.layers.base}
                  </p>

                  <div className="rounded-md border border-amber-900/15 bg-amber-50/70 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-amber-900/70">Starter Formula</p>
                    <ul className="mt-2 space-y-1">
                      {blend.formula.map((part) => (
                        <li key={`${blend.name}-${part}`}>• {part}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-amber-900/15 bg-[#f6efde]">
            <CardHeader>
              <CardTitle className="text-amber-950">Safety Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-amber-950/85">
                {usageGuide.safety.map((rule) => (
                  <li key={rule}>• {rule}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seasonality" className="mt-6 space-y-4">
          <Card className="border-amber-900/15 bg-[linear-gradient(145deg,#f6ecd8_0%,#efe2c5_100%)]">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl text-amber-950">General Guide to London Seasonality</CardTitle>
              <CardDescription className="max-w-4xl text-sm leading-relaxed text-amber-900/80">
                A guide-grade annual overview of major London tree and blossom markers, linked to normalized pollen
                burden plus monthly sunshine and sunset averages. This is not a real-time forecast.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-amber-900/70">Monthly combined pollen risk</p>
                <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-12">
                  {monthlyClimate.map((point) => (
                    <div
                      key={`risk-${point.month}`}
                      className={cn(
                        "rounded-md border border-amber-900/20 px-2 py-2 text-center text-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]",
                        getPollenRiskClass(point.pollenRiskScore),
                      )}
                    >
                      <p className="text-[0.65rem] uppercase tracking-[0.15em]">{point.month}</p>
                      <p className="mt-1 font-semibold">{point.pollenRiskScore}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {seasonalityValidationErrors.length ? (
            <Card className="border-red-300 bg-red-50/70">
              <CardHeader>
                <CardTitle className="text-base text-red-900">Seasonality data check failed</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-red-900/85">
                  {seasonalityValidationErrors.map((error) => (
                    <li key={error}>• {error}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null}

          <Card className="border-amber-900/15 bg-[#fbf6ea]">
            <CardHeader>
              <CardTitle className="text-amber-950">Tree and Blossom Timeline</CardTitle>
              <CardDescription className="text-amber-900/75">
                Active and peak windows for London markers, with each marker&apos;s typical pollen contribution.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <div className="min-w-[820px] space-y-2">
                  <div className="grid grid-cols-[16rem_repeat(12,minmax(0,1fr))] gap-2 text-[0.65rem] uppercase tracking-[0.16em] text-amber-900/65">
                    <p className="px-2">Marker</p>
                    {monthLabels.map((month) => (
                      <p key={`month-label-${month}`} className="text-center">
                        {month}
                      </p>
                    ))}
                  </div>

                  {seasonalMarkers.map((marker) => (
                    <div
                      key={marker.id}
                      className="grid grid-cols-[16rem_repeat(12,minmax(0,1fr))] gap-2 rounded-lg border border-amber-900/15 bg-amber-50/60 p-2"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-amber-950">{marker.name}</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge
                            variant="outline"
                            className={cn("border-amber-900/25 bg-transparent text-[0.65rem] uppercase", marker.type === "tree" ? "text-[#466a4b]" : "text-[#8a5730]")}
                          >
                            {marker.type}
                          </Badge>
                          <Badge className={cn("text-[0.65rem]", getContributionClass(marker.pollenContribution.score))}>
                            {marker.pollenContribution.score} · {marker.pollenContribution.label}
                          </Badge>
                        </div>
                        <p className="text-xs leading-relaxed text-amber-900/75">{marker.notes}</p>
                      </div>

                      {monthLabels.map((month) => {
                        const isPeak = marker.peakMonths.includes(month);
                        const isActive = marker.activeMonths.includes(month);
                        return (
                          <div
                            key={`${marker.id}-${month}`}
                            className={cn(
                              "rounded-md border border-amber-900/15 text-center text-[0.63rem] font-medium leading-6",
                              isPeak
                                ? "bg-[#b77735] text-amber-50"
                                : isActive
                                  ? "bg-[#ead6b0] text-amber-950"
                                  : "bg-amber-50/40 text-amber-900/35",
                            )}
                          >
                            {isPeak ? "Peak" : isActive ? "On" : "·"}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-900/15 bg-[#f7f0df]">
            <CardHeader>
              <CardTitle className="text-amber-950">Monthly Sunshine and Sunset Averages</CardTitle>
              <CardDescription className="text-amber-900/75">
                Dual-axis graph: sunshine hours on the left axis and average sunset time on the right axis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto rounded-xl border border-amber-900/15 bg-amber-50/60 p-3">
                <svg
                  viewBox={`0 0 ${climateChart.width} ${climateChart.height}`}
                  className="min-w-[760px]"
                  role="img"
                  aria-label="London monthly sunshine and sunset averages chart with dual axes"
                >
                  <title>London monthly sunshine and sunset averages</title>
                  {climateChart.sunshineTicks.map((tick) => (
                    <g key={`grid-${tick.value}`}>
                      <line
                        x1={climateChart.padding.left}
                        x2={climateChart.width - climateChart.padding.right}
                        y1={tick.y}
                        y2={tick.y}
                        stroke="#b88f5e"
                        strokeOpacity={0.32}
                        strokeDasharray="4 5"
                      />
                      <text
                        x={climateChart.padding.left - 8}
                        y={tick.y + 4}
                        textAnchor="end"
                        fontSize="11"
                        fill="#6f4a28"
                      >
                        {tick.value}h
                      </text>
                    </g>
                  ))}

                  {climateChart.sunsetTicks.map((tick) => (
                    <text
                      key={`sunset-tick-${tick.value}`}
                      x={climateChart.width - climateChart.padding.right + 8}
                      y={tick.y + 4}
                      fontSize="11"
                      fill="#3f583e"
                    >
                      {formatSunsetMinutes(tick.value)}
                    </text>
                  ))}

                  <line
                    x1={climateChart.padding.left}
                    x2={climateChart.padding.left}
                    y1={climateChart.padding.top}
                    y2={climateChart.height - climateChart.padding.bottom}
                    stroke="#8f6843"
                    strokeOpacity={0.7}
                  />
                  <line
                    x1={climateChart.width - climateChart.padding.right}
                    x2={climateChart.width - climateChart.padding.right}
                    y1={climateChart.padding.top}
                    y2={climateChart.height - climateChart.padding.bottom}
                    stroke="#5f795a"
                    strokeOpacity={0.7}
                  />
                  <line
                    x1={climateChart.padding.left}
                    x2={climateChart.width - climateChart.padding.right}
                    y1={climateChart.height - climateChart.padding.bottom}
                    y2={climateChart.height - climateChart.padding.bottom}
                    stroke="#8f6843"
                    strokeOpacity={0.7}
                  />

                  <polyline
                    points={buildPolyline(climateChart.sunshinePoints)}
                    fill="none"
                    stroke={chartColors.sunshine}
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points={buildPolyline(climateChart.sunsetPoints)}
                    fill="none"
                    stroke={chartColors.sunset}
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />

                  {climateChart.sunshinePoints.map((point) => (
                    <circle key={`sunshine-dot-${point.month}`} cx={point.x} cy={point.y} r="3.2" fill={chartColors.sunshine} />
                  ))}
                  {climateChart.sunsetPoints.map((point) => (
                    <circle key={`sunset-dot-${point.month}`} cx={point.x} cy={point.y} r="3.2" fill={chartColors.sunset} />
                  ))}

                  {climateChart.sunshinePoints.map((point) => (
                    <text
                      key={`month-${point.month}`}
                      x={point.x}
                      y={climateChart.height - climateChart.padding.bottom + 16}
                      textAnchor="middle"
                      fontSize="11"
                      fill="#6f4a28"
                    >
                      {point.month}
                    </text>
                  ))}
                </svg>
              </div>

              <div className="flex flex-wrap gap-3 text-xs">
                <p className="inline-flex items-center gap-1 rounded-md border border-amber-900/20 bg-amber-50/70 px-2 py-1 text-amber-950">
                  <span className="inline-block size-2 rounded-full" style={{ backgroundColor: chartColors.sunshine }} />
                  Sunshine hours (avg)
                </p>
                <p className="inline-flex items-center gap-1 rounded-md border border-amber-900/20 bg-amber-50/70 px-2 py-1 text-amber-950">
                  <span className="inline-block size-2 rounded-full" style={{ backgroundColor: chartColors.sunset }} />
                  Sunset time (avg)
                </p>
              </div>

              <div className="rounded-lg border border-amber-900/15 bg-amber-50/70 p-3 text-xs leading-relaxed text-amber-900/85">
                <p className="font-semibold text-amber-950">Text fallback</p>
                <ul className="mt-1 space-y-1">
                  {monthlyClimate.map((point) => (
                    <li key={`fallback-${point.month}`}>
                      {point.month}: {point.sunshineHoursAvg} sunshine hours, sunset {formatSunsetMinutes(point.sunsetAvgMinutes)}, pollen risk{" "}
                      {point.pollenRiskScore}/100.
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-900/15 bg-[#fbf6ea]">
            <CardHeader>
              <CardTitle className="text-amber-950">Sources and Baseline Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-amber-950/85">
                {sourceNotes.map((note) => (
                  <li key={note}>• {note}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

      {selectedTea ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-amber-950/45 p-4 backdrop-blur-[2px]"
          onClick={() => handleSelectTea(null)}
          role="presentation"
        >
          <Card
            className="max-h-[92vh] w-full max-w-5xl overflow-hidden border-amber-900/20 bg-[#fbf6ea]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="max-h-[92vh] overflow-y-auto lg:grid lg:grid-cols-[minmax(300px,38%)_1fr] lg:overflow-hidden">
              {(() => {
                const teaImageKey = `tea-${selectedTea.id}`;
                const fallbackStage = imageFallbackStage[teaImageKey] ?? 0;
                const imageSrc = resolveImageSrc(selectedTea.imageUrl, selectedTea.name, fallbackStage);
                return (
                  <div className="relative h-64 overflow-hidden border-b border-amber-900/10 bg-[#eee0c2] sm:h-72 lg:h-full lg:min-h-[92vh] lg:border-b-0 lg:border-r">
                    <Image
                      src={imageSrc}
                      alt={`${selectedTea.name} tea herb reference image`}
                      fill
                      quality={92}
                      className="object-cover sepia-[0.58] saturate-[0.8]"
                      sizes="(max-width: 768px) 100vw, 800px"
                      onError={() => {
                        if (fallbackStage < 3) {
                          setImageFallbackStage((prev) => ({ ...prev, [teaImageKey]: fallbackStage + 1 }));
                        }
                      }}
                    />
                  </div>
                );
              })()}
              <div className="lg:max-h-[92vh] lg:overflow-y-auto">
                <CardHeader className="space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-3xl text-amber-950">{selectedTea.name}</CardTitle>
                        {selectedTea.id === "purple-sage" ? (
                          <Badge className="bg-[#5f456f] text-[#f4ecfa]">Featured</Badge>
                        ) : null}
                      </div>
                      {selectedTea.latin ? (
                        <CardDescription className="italic text-amber-900/70">{selectedTea.latin}</CardDescription>
                      ) : null}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-amber-900/25"
                      onClick={() => handleSelectTea(null)}
                    >
                      Close
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-[#50623f] text-[#edf2e6]">Herbal Tea</Badge>
                    {selectedTea.therapeuticEffects.map((effect) => (
                      <Badge
                        key={`${selectedTea.id}-effect-modal-${effect}`}
                        variant="outline"
                        className="border-amber-900/25 text-amber-900"
                      >
                        {effect}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 text-sm text-amber-950/85">
                  <p className="rounded-md border border-amber-900/20 bg-amber-100/60 p-2 text-xs text-amber-950">
                    Traditional uses only; not medical advice; not intended to diagnose, treat, or cure.
                  </p>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">Flavor profile</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTea.flavorProfile.map((value) => (
                        <Badge
                          key={`${selectedTea.id}-flavor-modal-${value}`}
                          variant="secondary"
                          className="bg-amber-900/10 text-amber-900"
                        >
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">Traditionally used for</p>
                    <ul className="space-y-1 text-sm text-amber-950/85">
                      {selectedTea.traditionallyUsedFor.map((value) => (
                        <li key={`${selectedTea.id}-traditional-${value}`}>• {value}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">Therapeutic effect tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTea.therapeuticEffects.map((value) => (
                        <Badge
                          key={`${selectedTea.id}-effect-tag-${value}`}
                          variant="secondary"
                          className="bg-[#d7b474]/20 text-amber-900"
                        >
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-md border border-amber-900/15 bg-amber-50/70 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-amber-900/70">Brew guide</p>
                    <ul className="mt-2 space-y-1">
                      <li>• Amount: {selectedTea.brewGuide.amount}</li>
                      <li>• Water temperature: {selectedTea.brewGuide.waterTemp}</li>
                      <li>• Steep time: {selectedTea.brewGuide.steepTime}</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">Pairs well with</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTea.pairsWith.map((pairing) => (
                        <Badge
                          key={`${selectedTea.id}-pairing-${pairing}`}
                          variant="outline"
                          className="border-amber-900/25 text-amber-900"
                        >
                          {pairing}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedTea.caution ? (
                    <p className="rounded-md border border-amber-900/20 bg-amber-100/60 p-2 text-xs text-amber-950">
                      {selectedTea.caution}
                    </p>
                  ) : null}

                  <p className="text-xs text-amber-900/60">Image source: {selectedTea.imageSource}</p>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      ) : null}

      {selectedIngredient ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-amber-950/45 p-4 backdrop-blur-[2px]"
          onClick={() => handleSelectIngredient(null)}
          role="presentation"
        >
          <Card
            className="max-h-[92vh] w-full max-w-5xl overflow-hidden border-amber-900/20 bg-[#fbf6ea]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="max-h-[92vh] overflow-y-auto lg:grid lg:grid-cols-[minmax(300px,38%)_1fr] lg:overflow-hidden">
            {(() => {
              const fallbackStage = imageFallbackStage[selectedIngredient.id] ?? 0;
              const imageSrc = resolveImageSrc(selectedIngredient.imageUrl, selectedIngredient.name, fallbackStage);
              return (
            <div className="relative h-64 overflow-hidden border-b border-amber-900/10 bg-[#eee0c2] sm:h-72 lg:h-full lg:min-h-[92vh] lg:border-b-0 lg:border-r">
              <Image
                src={imageSrc}
                alt={`${selectedIngredient.name} archival herbarium scan`}
                fill
                quality={92}
                className="object-contain p-2 sepia-[0.58] saturate-[0.8] lg:p-4"
                style={{ objectPosition: selectedIngredient.imageObjectPosition ?? "center 30%" }}
                sizes="(max-width: 768px) 100vw, 800px"
                onError={() => {
                  if (fallbackStage < 3) {
                    setImageFallbackStage((prev) => ({ ...prev, [selectedIngredient.id]: fallbackStage + 1 }));
                  }
                }}
              />
            </div>
              );
            })()}
            <div className="lg:max-h-[92vh] lg:overflow-y-auto">
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <CardTitle className="text-3xl text-amber-950">{selectedIngredient.name}</CardTitle>
                  {selectedIngredient.latin ? (
                    <CardDescription className="italic text-amber-900/70">{selectedIngredient.latin}</CardDescription>
                  ) : null}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="border-amber-900/25"
                  onClick={() => handleSelectIngredient(null)}
                >
                  Close
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-amber-900 text-amber-50">{categoryLabels[selectedIngredient.category]}</Badge>
                {selectedIngredient.regions.map((region) => (
                  <Badge
                    key={`${selectedIngredient.id}-region-modal-${region}`}
                    variant="outline"
                    className="border-amber-900/25 text-amber-900"
                  >
                    {region}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-5 text-sm text-amber-950/85">
              <p>{selectedIngredient.vibe}</p>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">Scent profile</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedIngredient.scentProfile.map((note) => (
                    <Badge
                      key={`${selectedIngredient.id}-profile-modal-${note}`}
                      variant="secondary"
                      className="bg-amber-900/10 text-amber-900"
                    >
                      {note}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">Accords</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedIngredient.accords.map((accord) => (
                    <Badge
                      key={`${selectedIngredient.id}-accord-modal-${accord}`}
                      variant="secondary"
                      className="bg-[#d7b474]/20 text-amber-900"
                    >
                      {accord}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedIngredient.symbolism?.length ? (
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">Symbolism</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedIngredient.symbolism.map((symbol) => (
                      <Badge
                        key={`${selectedIngredient.id}-symbol-modal-${symbol}`}
                        variant="outline"
                        className="border-amber-900/30 bg-amber-50 text-amber-900"
                      >
                        {symbol}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">About</p>
                <p className="text-sm text-amber-950/85">{selectedIngredient.about}</p>
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">History</p>
                <p className="text-sm text-amber-950/85">{selectedIngredient.history}</p>
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">Prized origin</p>
                <p className="text-sm text-amber-950/85">{selectedIngredient.prizedOrigin}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">Preparation</p>
                <ul className="mt-1 space-y-1 text-amber-950/80">
                  {selectedIngredient.preparation.map((value) => (
                    <li key={`${selectedIngredient.id}-prep-modal-${value}`}>• {value}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">Facts</p>
                <ul className="space-y-1 text-sm text-amber-950/85">
                  {selectedIngredient.facts.map((fact) => (
                    <li key={`${selectedIngredient.id}-fact-${fact}`}>• {fact}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">Good for</p>
                <ul className="mt-1 space-y-1 text-amber-950/80">
                  {selectedIngredient.goodFor.map((value) => (
                    <li key={`${selectedIngredient.id}-for-modal-${value}`}>• {value}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-amber-900/60">How to use</p>
                <ul className="mt-1 space-y-1 text-amber-950/80">
                  {selectedIngredient.use.map((value) => (
                    <li key={`${selectedIngredient.id}-use-modal-${value}`}>• {value}</li>
                  ))}
                </ul>
              </div>

              {selectedIngredient.caution ? (
                <p className="rounded-md border border-amber-900/20 bg-amber-100/60 p-2 text-xs text-amber-950">
                  {selectedIngredient.caution}
                </p>
              ) : null}

              <p className="text-xs text-amber-900/60">Image source: {selectedIngredient.imageSource}</p>

              <a
                href={buildAmazonAffiliateSearchUrl(selectedIngredient.name)}
                target="_blank"
                rel="noreferrer noopener sponsored"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "w-full justify-center border border-amber-900/20 bg-amber-900/10 text-amber-950 hover:bg-amber-900/15",
                )}
              >
                Shop on Amazon
              </a>
            </CardContent>
            </div>
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
