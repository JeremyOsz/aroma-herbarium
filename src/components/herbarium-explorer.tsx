"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  blendRecipes,
  categoryLabels,
  ingredients,
  regionNotes,
  worldScentLanes,
  type AromaCategory,
  type AromaRegion,
  type Ingredient,
  usageGuide,
} from "@/data/aromatherapy";

const categories = Object.keys(categoryLabels) as AromaCategory[];
const regions = Object.keys(regionNotes) as AromaRegion[];
const tabs = ["ingredients", "regions", "layering"] as const;
type ExplorerTab = (typeof tabs)[number];
const amazonAffiliateTag = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG?.trim();

function isExplorerTab(value: string | null): value is ExplorerTab {
  return value !== null && (tabs as readonly string[]).includes(value);
}

function isAromaCategory(value: string | null): value is AromaCategory {
  return value !== null && (categories as readonly string[]).includes(value);
}

function isAromaRegion(value: string | null): value is AromaRegion {
  return value !== null && (regions as readonly string[]).includes(value);
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

  const handleSelectIngredient = useCallback((item: Ingredient | null) => {
    updateUrlParams({ ingredient: item?.id ?? null });
  }, [updateUrlParams]);

  useEffect(() => {
    if (!selectedIngredient) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleSelectIngredient(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleSelectIngredient, selectedIngredient]);

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

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <header className="border-b border-border pb-10">
        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
          Aromatherapy Herbarium
        </p>
        <h1 className="mt-2 text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
          Vintage pressed-plant lookup for scent, mood, and layering
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Filter by scent family, browse regional scent lanes, and build balanced top–heart–base blends. Inspired by archival botanical plates.
        </p>
        <p className="mt-6 text-xs text-muted-foreground">
          References:{" "}
          <a
            className="underline underline-offset-2 hover:text-foreground"
            href="https://archive.org/details/flora-berolinensis"
            target="_blank"
            rel="noreferrer"
          >
            Flora Berolinensis
          </a>
          {" · "}
          <a
            className="underline underline-offset-2 hover:text-foreground"
            href="https://archive.org/details/piante-del-regio-orto-di-padova"
            target="_blank"
            rel="noreferrer"
          >
            Piante del Regio Orto di Padova
          </a>
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {ingredients.length} plants · {categories.length} families · {regions.length} regions
        </p>
      </header>

      <nav className="mt-8 flex flex-col gap-6 border-b border-border pb-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            placeholder="Search ingredient, accord, symbolism"
            className="h-8 border-0 border-b-2 border-border bg-transparent pl-7 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm">
          <span className="mr-2 text-muted-foreground">Category</span>
          <button
            type="button"
            onClick={() => handleCategoryChange("all")}
            className={
              activeCategory === "all"
                ? "rounded-md bg-muted px-2.5 py-1 font-medium text-foreground"
                : "rounded-md px-2.5 py-1 text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
            }
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={
                activeCategory === category
                  ? "rounded-md bg-muted px-2.5 py-1 font-medium text-foreground"
                  : "rounded-md px-2.5 py-1 text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
              }
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm">
          <span className="mr-2 text-muted-foreground">Region</span>
          <button
            type="button"
            onClick={() => handleRegionChange("all")}
            className={
              activeRegion === "all"
                ? "rounded-md bg-muted px-2.5 py-1 font-medium text-foreground"
                : "rounded-md px-2.5 py-1 text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
            }
          >
            All
          </button>
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => handleRegionChange(region)}
              className={
                activeRegion === region
                  ? "rounded-md bg-muted px-2.5 py-1 font-medium text-foreground"
                  : "rounded-md px-2.5 py-1 text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
              }
            >
              {region}
            </button>
          ))}
        </div>
      </nav>

      <p className="mt-4 text-[0.7rem] text-muted-foreground">
        Affiliate disclosure: Some links are Amazon affiliate links. As an Amazon Associate, you can earn from qualifying purchases.
        {!amazonAffiliateTag ? " Set NEXT_PUBLIC_AMAZON_AFFILIATE_TAG to enable your tag." : null}
      </p>

      <Tabs value={activeTab} onValueChange={(value) => handleTabChange(value as ExplorerTab)} className="mt-10 w-full">
        <TabsList variant="line" className="gap-6 border-0 p-0">
          <TabsTrigger
            value="ingredients"
            className="pb-2 pt-0.5 after:bottom-0 after:h-[2px] hover:text-foreground data-active:text-foreground"
          >
            Ingredients
          </TabsTrigger>
          <TabsTrigger
            value="regions"
            className="pb-2 pt-0.5 after:bottom-0 after:h-[2px] hover:text-foreground data-active:text-foreground"
          >
            World Scent Lanes
          </TabsTrigger>
          <TabsTrigger
            value="layering"
            className="pb-2 pt-0.5 after:bottom-0 after:h-[2px] hover:text-foreground data-active:text-foreground"
          >
            Layering
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ingredients" className="mt-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => {
              const fallbackStage = imageFallbackStage[item.id] ?? 0;
              const imageSrc = resolveImageSrc(item.imageUrl, item.name, fallbackStage);

              return (
                <article
                  key={item.id}
                  className="group cursor-pointer rounded-md border border-border bg-card transition-colors hover:border-foreground/25 hover:bg-muted/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/30"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectIngredient(item)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleSelectIngredient(item);
                    }
                  }}
                  aria-label={`View ${item.name}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-md border-b border-border bg-muted">
                    <Image
                      src={imageSrc}
                      alt=""
                      fill
                      quality={92}
                      className="object-cover sepia-[0.4] saturate-[0.75] transition-opacity duration-200 group-hover:opacity-92"
                      style={{ objectPosition: item.imageObjectPosition ?? "center 30%" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={() => {
                        if (fallbackStage < 3) {
                          setImageFallbackStage((prev) => ({ ...prev, [item.id]: fallbackStage + 1 }));
                        }
                      }}
                    />
                  </div>
                  <div className="p-3 pt-2.5 space-y-0.5">
                    <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                      {categoryLabels[item.category]}
                      {item.regions.length ? ` · ${item.regions.join(", ")}` : null}
                    </p>
                    <h2 className="text-lg font-normal text-foreground">{item.name}</h2>
                    {item.latin ? (
                      <p className="text-sm italic text-muted-foreground">{item.latin}</p>
                    ) : null}
                    <p className="line-clamp-2 text-sm text-muted-foreground">{item.vibe}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="regions" className="mt-10">
          <p className="mb-8 max-w-2xl text-sm text-muted-foreground">
            Six scent routes that map cultural perfume practice and signature materials. Use these lanes as inspiration while building blends.
          </p>
          <div className="space-y-10">
            {worldScentLanes.map((lane) => {
              const coverage = laneIngredientCoverage[lane.id] ?? { available: [], missing: [] };
              return (
                <article key={lane.id} className="border-b border-border pb-10 last:border-0">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{lane.routeName}</p>
                  <h3 className="mt-1 text-xl font-normal text-foreground">{lane.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{lane.culturalContext}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{lane.usage}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Signature materials: {lane.signatureMaterials.join(", ")}
                  </p>
                  {coverage.available.length > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      In this atlas: {coverage.available.join(", ")}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="layering" className="mt-10 space-y-10">
          <section>
            <h3 className="text-lg font-normal text-foreground">Layering blueprint</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {usageGuide.layeringRule} · {usageGuide.cycle}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              {usageGuide.dropGuide.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-normal text-foreground">Starter blends</h3>
            <p className="mt-1 text-sm text-muted-foreground">One bright top, one floral or herbal heart, one resinous base.</p>
            <div className="mt-6 space-y-8">
              {blendRecipes.map((blend) => (
                <article key={blend.name} className="border-b border-border pb-8 last:border-0">
                  <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">{blend.family}</p>
                  <h4 className="mt-1 text-base font-normal text-foreground">{blend.name}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{blend.vibe}</p>
                  <p className="mt-3 text-sm text-foreground">
                    <span className="text-muted-foreground">Top</span> {blend.layers.top} ·{" "}
                    <span className="text-muted-foreground">Heart</span> {blend.layers.heart} ·{" "}
                    <span className="text-muted-foreground">Base</span> {blend.layers.base}
                  </p>
                  <ul className="mt-2 text-sm text-muted-foreground">
                    {blend.formula.map((part) => (
                      <li key={`${blend.name}-${part}`}>· {part}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-normal text-foreground">Safety</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {usageGuide.safety.map((rule) => (
                <li key={rule}>· {rule}</li>
              ))}
            </ul>
          </section>
        </TabsContent>

      </Tabs>

      {selectedIngredient ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4"
          onClick={() => handleSelectIngredient(null)}
          role="presentation"
        >
          <div
            className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden border border-border bg-card lg:max-h-[85vh] lg:grid lg:grid-cols-[minmax(280px,40%)_1fr]"
            onClick={(event) => event.stopPropagation()}
          >
            {(() => {
              const fallbackStage = imageFallbackStage[selectedIngredient.id] ?? 0;
              const imageSrc = resolveImageSrc(selectedIngredient.imageUrl, selectedIngredient.name, fallbackStage);
              return (
                <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-muted lg:aspect-auto lg:min-h-0">
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    quality={92}
                    className="object-contain p-4 sepia-[0.4] saturate-[0.75] lg:object-cover lg:object-center"
                    style={{ objectPosition: selectedIngredient.imageObjectPosition ?? "center 30%" }}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    onError={() => {
                      if (fallbackStage < 3) {
                        setImageFallbackStage((prev) => ({ ...prev, [selectedIngredient.id]: fallbackStage + 1 }));
                      }
                    }}
                  />
                </div>
              );
            })()}
            <div className="flex min-h-0 flex-col overflow-y-auto p-6 lg:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {categoryLabels[selectedIngredient.category]}
                    {selectedIngredient.regions.length ? ` · ${selectedIngredient.regions.join(", ")}` : null}
                  </p>
                  <h2 className="mt-1 text-2xl font-normal text-foreground">{selectedIngredient.name}</h2>
                  {selectedIngredient.latin ? (
                    <p className="mt-0.5 text-sm italic text-muted-foreground">{selectedIngredient.latin}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/30"
                  onClick={() => handleSelectIngredient(null)}
                  aria-label="Close"
                >
                  Close
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-foreground">{selectedIngredient.vibe}</p>

              <div className="mt-6 space-y-4 text-sm">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Scent profile</p>
                  <p className="mt-1 text-foreground">{selectedIngredient.scentProfile.join(", ")}</p>
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Accords</p>
                  <p className="mt-1 text-foreground">{selectedIngredient.accords.join(", ")}</p>
                </div>
                {selectedIngredient.symbolism?.length ? (
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Symbolism</p>
                    <p className="mt-1 text-foreground">{selectedIngredient.symbolism.join(", ")}</p>
                  </div>
                ) : null}
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">About</p>
                  <p className="mt-1 leading-relaxed text-foreground">{selectedIngredient.about}</p>
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">History</p>
                  <p className="mt-1 leading-relaxed text-foreground">{selectedIngredient.history}</p>
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Prized origin</p>
                  <p className="mt-1 text-foreground">{selectedIngredient.prizedOrigin}</p>
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Preparation</p>
                  <ul className="mt-1 space-y-0.5 text-foreground">
                    {selectedIngredient.preparation.map((value) => (
                      <li key={value}>· {value}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Facts</p>
                  <ul className="mt-1 space-y-0.5 text-foreground">
                    {selectedIngredient.facts.map((fact) => (
                      <li key={fact}>· {fact}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Good for</p>
                  <ul className="mt-1 space-y-0.5 text-foreground">
                    {selectedIngredient.goodFor.map((value) => (
                      <li key={value}>· {value}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">How to use</p>
                  <ul className="mt-1 space-y-0.5 text-foreground">
                    {selectedIngredient.use.map((value) => (
                      <li key={value}>· {value}</li>
                    ))}
                  </ul>
                </div>
                {selectedIngredient.caution ? (
                  <p className="border-l-2 border-foreground/20 pl-3 text-foreground">
                    {selectedIngredient.caution}
                  </p>
                ) : null}
              </div>

              <p className="mt-6 text-[0.7rem] text-muted-foreground">
                Image: {selectedIngredient.imageSource}
              </p>

              <a
                href={buildAmazonAffiliateSearchUrl(selectedIngredient.name)}
                target="_blank"
                rel="noreferrer noopener sponsored"
                className="mt-4 inline-block rounded-md px-2.5 py-1.5 text-sm underline underline-offset-2 transition-colors hover:bg-muted hover:no-underline"
              >
                Shop on Amazon
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
