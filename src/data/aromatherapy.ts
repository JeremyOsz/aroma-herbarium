export type AromaCategory = "citrus" | "woods" | "florals" | "herbs";
export type AromaRegion = "Mediterranean" | "Maghreb" | "Levant" | "Alpine" | "Global";

export interface Ingredient {
  id: string;
  name: string;
  latin?: string;
  category: AromaCategory;
  regions: AromaRegion[];
  scentProfile: string[];
  accords: string[];
  symbolism?: string[];
  vibe: string;
  about: string;
  history: string;
  prizedOrigin: string;
  preparation: string[];
  facts: string[];
  goodFor: string[];
  use: string[];
  caution?: string;
  imageUrl: string;
  imageSource: string;
  imageObjectPosition?: string;
}

export interface BlendRecipe {
  name: string;
  family: "warm" | "fresh" | "dreamy";
  vibe: string;
  layers: {
    top: string;
    heart: string;
    base: string;
  };
  formula: string[];
}

export interface WorldScentLane {
  id: string;
  title: string;
  routeName: string;
  culturalContext: string;
  signatureMaterials: string[];
  usage: string;
}

export const teaTherapeuticEffectFilters = [
  "calming support",
  "digestion support",
  "sleep support",
  "respiratory comfort",
  "focus support",
  "immune support",
] as const;

export type TeaTherapeuticEffect = (typeof teaTherapeuticEffectFilters)[number];

export interface TeaIngredient {
  id: string;
  name: string;
  latin?: string;
  flavorProfile: string[];
  therapeuticEffects: TeaTherapeuticEffect[];
  traditionallyUsedFor: string[];
  brewGuide: {
    waterTemp: string;
    steepTime: string;
    amount: string;
  };
  caution?: string;
  pairsWith: string[];
  imageUrl: string;
  imageSource: string;
}

export const regionNotes: Record<AromaRegion, string> = {
  Mediterranean:
    "Citrus-peel brightness, herbal steam, and sun-warmed woods. Think Marseille kitchens and coastal air.",
  Maghreb:
    "Orange blossom, amber warmth, resin, and tea-room depth. Soft florals over grounding woods.",
  Levant:
    "Frankincense and bitter-citrus lanes with contemplative, ceremonial clarity.",
  Alpine:
    "Piney lift, cedar edges, and fresh mountain herb energy for clear resets.",
  Global:
    "Classic aromatherapy staples used across traditions for practical home blending.",
};

export const worldScentLanes: WorldScentLane[] = [
  {
    id: "arabian-peninsula",
    title: "Arabian Peninsula",
    routeName: "The Oud Route",
    culturalContext:
      "Perfume culture here was shaped by ancient incense trade networks and spiritual traditions where scent marked hospitality, prayer, and status.",
    signatureMaterials: ["oud", "amber", "rose", "musk", "saffron"],
    usage:
      "Oil-based layering on skin and clothes, plus bukhoor burned in homes for lasting atmosphere.",
  },
  {
    id: "india",
    title: "India",
    routeName: "The Attar Corridor",
    culturalContext:
      "India's fragrance history runs through temple rituals, Ayurveda, and Mughal-era distillation craft, especially in Kannauj.",
    signatureMaterials: ["jasmine", "sandalwood", "vetiver (khus)", "rose", "kewra"],
    usage:
      "Alcohol-free attars, pulse-point application, and seasonal choices from cooling vetiver in heat to richer florals at night.",
  },
  {
    id: "france",
    title: "France",
    routeName: "The Grasse Perfumery Lane",
    culturalContext:
      "From glove-scenting origins to modern haute parfumerie, France systematized perfumery into recognizable scent families and composition styles.",
    signatureMaterials: ["lavender", "iris", "orange blossom", "oakmoss", "aldehydes"],
    usage:
      "Structured fragrance architecture (floral/chypre/fougere), fine fragrance wardrobes, and luxury storytelling.",
  },
  {
    id: "japan",
    title: "Japan",
    routeName: "The Kodo Incense Path",
    culturalContext:
      "In Japan, scent evolved as an art of attention. In kodo, people 'listen' to incense, emphasizing subtlety and memory over projection.",
    signatureMaterials: ["aloeswood", "sandalwood", "hinoki", "plum", "green tea nuances"],
    usage:
      "Quiet, intimate wear and ceremonial incense appreciation rooted in aesthetics and mindfulness.",
  },
  {
    id: "mediterranean",
    title: "Mediterranean",
    routeName: "The Citrus-Herbal Arc",
    culturalContext:
      "From Greek and Roman aromatic oils to monastic and apothecary waters, this lane favors brightness and clarity.",
    signatureMaterials: ["bergamot", "neroli", "lemon", "rosemary", "myrtle"],
    usage:
      "Colognes, aromatic waters, post-bath refreshers, and everyday skin scent in warm climates.",
  },
  {
    id: "latin-america",
    title: "Latin America",
    routeName: "The Resin & Botanical Trail",
    culturalContext:
      "Fragrance traditions blend Indigenous plant knowledge, sacred smoke practices, and later colonial botanical exchange.",
    signatureMaterials: ["copal", "palo santo", "cacao", "vanilla", "tobacco leaf"],
    usage:
      "Ceremonial fumigation, protective cleansing rituals, and modern perfumes with warm resinous depth.",
  },
];

export const ingredients: Ingredient[] = [
  {
    id: "orange",
    name: "Orange (Sweet/Bitter)",
    latin: "Citrus sinensis",
    category: "citrus",
    regions: ["Mediterranean", "Global"],
    scentProfile: ["bright", "sweet peel", "clean air"],
    accords: ["Citrus Spark", "Sunlit Peel"],
    symbolism: ["Joy", "Prosperity"],
    vibe: "Friendly brightness that cuts stale room smell.",
    about:
      "Sweet orange feels familiar because the peel is packed with tiny oil glands that spray a bright mist when twisted.",
    history:
      "In Mediterranean trade cities, dried orange peel was stored with linens and books to soften musty rooms and wardrobes between seasons.",
    prizedOrigin: "Sicily and Valencia are often prized for vivid, sweet peel character.",
    preparation: [
      "Expression (cold pressing) of fresh peels for top-note brightness.",
      "Some perfumery grades are lightly rectified to remove heavier waxy facets.",
    ],
    facts: [
      "Most orange essential oil is cold-pressed from peel, not distilled from pulp.",
      "Sweet and bitter orange come from related trees but produce noticeably different aromatic profiles.",
      "Orange peel oil oxidizes quickly, so fresher bottles smell noticeably cleaner and less flat.",
    ],
    goodFor: ["Day resets", "Post-cooking air", "Cleaning water"],
    use: ["3-5 drops solo in diffuser", "Base top note in blends"],
    imageUrl:
      "/images/ingredients/orange.jpg",
    imageSource: "Wikimedia Commons (Citrus × sinensis)",
    imageObjectPosition: "center 38%",
  },
  {
    id: "bergamot",
    name: "Bergamot",
    latin: "Citrus bergamia",
    category: "citrus",
    regions: ["Mediterranean"],
    scentProfile: ["citrus", "tea-like", "elegant"],
    accords: ["Earl Grey Lift", "Soft Citrus Tea"],
    symbolism: ["Confidence", "Lightness"],
    vibe: "Soft Earl Grey lift for late afternoon focus.",
    about:
      "Bergamot smells like citrus with a floral-tea shadow, which is why it brightens blends without feeling as sharp as lemon.",
    history:
      "Calabrian bergamot became globally famous through perfumery and tea, especially when its peel oil was used to scent early Earl Grey blends.",
    prizedOrigin: "Reggio Calabria, Italy is the benchmark origin for fine bergamot oil.",
    preparation: [
      "Cold expression of nearly ripe fruit peel.",
      "Furocoumarin-reduced (bergapten-free) processing is common for safer fragrance use.",
    ],
    facts: [
      "Most classic bergamot cultivation is concentrated on a narrow stretch of Calabria's Ionian coast.",
      "Perfumers use bergamot as a classic top note because it links citrus openings to floral hearts.",
      "Bergapten-free bergamot versions are often chosen when lower phototoxicity is needed.",
    ],
    goodFor: ["Slump reset", "Tea salon mood", "Elegant layering"],
    use: ["1-2 drops to brighten wood/resin blends"],
    imageUrl:
      "/images/ingredients/bergamot.jpg",
    imageSource: "Wikimedia Commons (Citrus bergamia; Köhler botanical plate)",
  },
  {
    id: "lemon-grapefruit",
    name: "Lemon / Grapefruit",
    latin: "Citrus limon / Citrus paradisi",
    category: "citrus",
    regions: ["Mediterranean", "Global"],
    scentProfile: ["sharp", "clean", "zesty"],
    accords: ["Clean Zest", "Kitchen Fresh"],
    vibe: "Marseille tile-clean sharpness.",
    about:
      "Lemon and grapefruit create a high-voltage opening that reads as 'clean' because their aldehydic sparkle clears heavier notes fast.",
    history:
      "Port kitchens and soap houses across the Mediterranean used citrus peel rinses and aromatic waters as practical deodorizers long before aerosols.",
    prizedOrigin: "Amalfi/Sicilian lemon and select Mediterranean grapefruit lots are most sought after.",
    preparation: [
      "Mechanical cold pressing of peel to preserve sparkling aldehydic lift.",
      "Short aging and filtration reduce sediment before blending.",
    ],
    facts: [
      "Grapefruit oil is often perceived as airy and bitter-zesty, while lemon leans crisper and more linear.",
      "Both oils are common in cleaning-era colognes because they evaporate quickly and refresh instantly.",
      "Citrus top notes are usually dosed higher, then supported with woods to extend their life.",
    ],
    goodFor: ["Kitchen", "Bathroom", "Quick freshening"],
    use: ["Short diffuser bursts", "Pair with rosemary/eucalyptus"],
    imageUrl:
      "/images/ingredients/lemon-grapefruit.jpg",
    imageSource: "Wikimedia Commons (Citrus limon; Köhler botanical plate)",
    imageObjectPosition: "center 33%",
  },
  {
    id: "cedarwood",
    name: "Cedarwood",
    latin: "Cedrus atlantica",
    category: "woods",
    regions: ["Alpine", "Levant", "Global"],
    scentProfile: ["dry wood", "grounding", "resinous"],
    accords: ["Dry Woods", "Cabinet Resin"],
    symbolism: ["Protection", "Steadiness"],
    vibe: "Dry wardrobe wood and mountain calm.",
    about:
      "Cedarwood contributes structure: it keeps sweet citrus or floral notes from feeling loose and gives a blend a dry, architectural backbone.",
    history:
      "Cedar species were prized in temple and ship timber cultures; their aromatic woods inspired long-standing links with preservation and sanctuary.",
    prizedOrigin: "Atlas cedar from Morocco is widely prized for dry, elegant wood tone.",
    preparation: [
      "Steam distillation of chipped wood and sawdust.",
      "Heavier fractions are sometimes redistilled for a cleaner perfumery profile.",
    ],
    facts: [
      "Atlas cedarwood and Virginian cedarwood are different aromatic materials with different tonal profiles.",
      "Cedar's sesquiterpene-rich profile is why it behaves as a persistent base note.",
      "Even tiny cedar doses can make a room blend feel calmer and less sugary.",
    ],
    goodFor: ["Evening grounding", "Balancing sweet blends"],
    use: ["1-3 drops with orange/neroli/amber"],
    imageUrl:
      "/images/ingredients/cedarwood.jpg",
    imageSource: "Wikimedia Commons (Cedrus atlantica)",
  },
  {
    id: "patchouli",
    name: "Patchouli",
    latin: "Pogostemon cablin",
    category: "woods",
    regions: ["Global"],
    scentProfile: ["earthy", "dark", "anchoring"],
    accords: ["Earth Anchor", "Dark Chypre"],
    symbolism: ["Grounding", "Material abundance"],
    vibe: "Dark depth for sweet and citrus tops.",
    about:
      "Patchouli is less about projection and more about gravity: it pulls bright notes downward and creates a velvety, lived-in atmosphere.",
    history:
      "In 19th-century trade, patchouli-scented textiles from South Asia became a marker of authenticity and luxury in European markets.",
    prizedOrigin: "Aged Indonesian patchouli (notably Sumatra/Sulawesi lots) is highly prized.",
    preparation: [
      "Leaves are partially dried/fermented before steam distillation.",
      "Oil is often matured for months to round rough edges.",
    ],
    facts: [
      "Patchouli often smells rounder after aging; fresh oil can feel sharper and greener.",
      "It is a key pillar in chypre and oriental perfume structures.",
      "Overdosing patchouli can mute an entire blend, so single-drop adjustments matter.",
    ],
    goodFor: ["Evening depth", "Anchor note"],
    use: ["1 drop at a time; dominates quickly"],
    imageUrl:
      "/images/ingredients/patchouli.jpg",
    imageSource: "Wikimedia Commons (Pogostemon cablin)",
  },
  {
    id: "frankincense",
    name: "Frankincense",
    latin: "Boswellia sacra",
    category: "woods",
    regions: ["Levant", "Maghreb"],
    scentProfile: ["resin", "cool", "spiritual"],
    accords: ["Sacred Resin", "Stone Incense"],
    symbolism: ["Purification", "Prayer"],
    vibe: "Cool stone and reflective calm.",
    about:
      "Frankincense feels spacious because it combines citrus-like lift with dry resin depth, creating a 'cool air in stone rooms' effect.",
    history:
      "Boswellia resins moved along ancient incense routes linking Arabia, the Levant, and North Africa, where they were used in ritual and hospitality.",
    prizedOrigin: "Dhofar (Oman) and parts of Yemen/Somalia are famed for top-grade tears.",
    preparation: [
      "Resin tears are hand-harvested after bark tapping and air-dried.",
      "Material is either burned as resin or steam-distilled into essential oil.",
    ],
    facts: [
      "Different Boswellia species produce distinct scent signatures, from lemony to deeper balsamic tones.",
      "The material can be used as essential oil or as raw resin warmed on charcoal.",
      "Frankincense often helps transitions between citrus tops and woody bases.",
    ],
    goodFor: ["Post-cleaning reset", "Journaling"],
    use: ["1-2 drops with citrus/woods", "Resin on charcoal with airflow"],
    imageUrl:
      "/images/ingredients/frankincense.jpg",
    imageSource: "Wikimedia Commons (Boswellia sacra; Köhler botanical plate)",
  },
  {
    id: "benzoin",
    name: "Benzoin",
    category: "woods",
    regions: ["Global"],
    scentProfile: ["vanilla-resin", "cosy", "soft"],
    accords: ["Vanillic Resin", "Comfort Amber"],
    vibe: "Gentle resin sweetness for winter rooms.",
    about:
      "Benzoin offers a soft, almost edible warmth that smooths harsh edges and makes herbal blends feel plush instead of sharp.",
    history:
      "Styrax resins were traded as incense and perfumery fixatives for centuries, especially across Indian Ocean and Middle Eastern routes.",
    prizedOrigin: "Sumatran and Laotian benzoin are the most referenced premium sources.",
    preparation: [
      "Resin is tapped from Styrax bark and cured into brittle tears.",
      "Perfumery uses solvent extraction or tincturing more often than direct distillation.",
    ],
    facts: [
      "Benzoin materials can be sold as resinoid, absolute, or tincture, each with slightly different texture.",
      "Its vanillic tone makes it a frequent bridge between woods and florals.",
      "Benzoin is often used at low dose to avoid turning a blend overly sweet.",
    ],
    goodFor: ["Comforting evenings", "Softening sharper herbs"],
    use: ["1-2 drops with orange, cedar, tea"],
    imageUrl:
      "/images/ingredients/benzoin.jpg",
    imageSource: "Wikimedia Commons (Styrax benzoin)",
  },
  {
    id: "amber",
    name: "Amber (Room Fragrance)",
    category: "woods",
    regions: ["Maghreb", "Levant"],
    scentProfile: ["warm", "golden", "slightly sweet"],
    accords: ["Amber Glow", "Warm Resin"],
    symbolism: ["Warmth", "Hospitality"],
    vibe: "Tunisian amber room warmth.",
    about:
      "Amber accords are built fragrances rather than a single oil, designed to create a golden, radiant glow in the base of room perfumes.",
    history:
      "Across Maghreb and Levant interiors, amber-style blends became part of guest culture, used to make evening rooms feel softer and more ceremonial.",
    prizedOrigin: "Traditional souk-style amber profiles are most associated with Maghreb and Levant perfumery.",
    preparation: [
      "Constructed accord blending resinous, vanillic, woody, and musky materials.",
      "Typically macerated/rested to let the base notes knit together before use.",
    ],
    facts: [
      "Modern amber accords often combine labdanum, vanilla-like notes, woods, and musks.",
      "Amber as a perfume family is different from fossilized amber resin used in jewelry.",
      "A trace amount can transform a dry blend into a warmer, more enveloping profile.",
    ],
    goodFor: ["Lounge", "Reading nights"],
    use: ["1 drop in mostly-essential-oil blend"],
    caution: "Fragrance versions are room-only, not skin use.",
    imageUrl:
      "/images/ingredients/amber.jpg",
    imageSource: "Wikimedia Commons (Frankincense resin tears; amber-accord resin reference)",
  },
  {
    id: "neroli",
    name: "Neroli / Orange Blossom",
    category: "florals",
    regions: ["Maghreb", "Mediterranean"],
    scentProfile: ["white floral", "warm night air", "precious"],
    accords: ["Orange Blossom", "White Floral"],
    symbolism: ["Purity", "Bridal calm"],
    vibe: "White petals in warm evening air.",
    about:
      "Neroli gives luminous floral lift without powderiness, which is why it can make a small space feel polished and expensive quickly.",
    history:
      "Orange blossom waters and oils were central to Mediterranean and North African hospitality rituals, from sweets to scented guest textiles.",
    prizedOrigin: "Tunisia and Morocco are especially prized for high-quality orange blossom material.",
    preparation: [
      "Steam distillation of fresh blossoms yields neroli essential oil.",
      "Hydrosol from the same run is retained as orange blossom water.",
    ],
    facts: [
      "Neroli is steam-distilled from blossoms, while orange blossom absolute is solvent-extracted and richer.",
      "The same tree can yield several perfumery materials: petitgrain, neroli, and orange oil.",
      "Because of cost and intensity, many blends only need one drop of true neroli.",
    ],
    goodFor: ["Bedroom", "Romantic evenings"],
    use: ["1 drop in burner or linen spray"],
    imageUrl:
      "/images/ingredients/neroli.jpg",
    imageSource: "Wikimedia Commons (Citrus × aurantium blossom / neroli source)",
  },
  {
    id: "geranium",
    name: "Geranium (Rose Geranium)",
    latin: "Pelargonium graveolens",
    category: "florals",
    regions: ["Mediterranean", "Global"],
    scentProfile: ["green-rosy", "minty", "balancing"],
    accords: ["Green Rose", "Balancing Floral"],
    vibe: "Old-world floral elegance with green lift.",
    about:
      "Rose geranium sits between leaf and petal, adding floral elegance while keeping blends fresh and slightly mint-green.",
    history:
      "Pelargonium oils were cultivated at scale in the 19th and 20th centuries as a more accessible rosy note for soaps and perfumes.",
    prizedOrigin: "Reunion and Egypt are longstanding reference origins for rose geranium oil.",
    preparation: [
      "Fresh aerial parts are steam-distilled soon after cutting.",
      "Batches may be fractionated to emphasize greener or rosier tones.",
    ],
    facts: [
      "Rose geranium can substitute or extend rose notes in budget-conscious compositions.",
      "Chemotypes vary: some feel brighter and mintier, others rounder and rosy.",
      "It pairs especially well with citrus tops and resinous bases.",
    ],
    goodFor: ["Balancing resinous blends", "Mood uplift"],
    use: ["1-2 drops with citrus, amber, patchouli"],
    imageUrl:
      "/images/ingredients/geranium.jpg",
    imageSource: "Wikimedia Commons (Pelargonium graveolens)",
    imageObjectPosition: "center 40%",
  },
  {
    id: "ylang",
    name: "Ylang Ylang",
    latin: "Cananga odorata",
    category: "florals",
    regions: ["Global"],
    scentProfile: ["creamy", "heady", "sensual"],
    accords: ["Creamy Floral", "Sensual Bouquet"],
    vibe: "Rich floral velvet for slow evenings.",
    about:
      "Ylang ylang is intensely diffusive; even minimal amounts create a plush, creamy floral aura that can dominate smaller rooms.",
    history:
      "Cananga flowers were traditionally macerated in oils for hair and skin perfuming in island cultures before modern distillation spread.",
    prizedOrigin: "Comoros and Madagascar are the most prized modern production origins.",
    preparation: [
      "Long, staged distillation with multiple cuts (Extra, I, II, III).",
      "Higher grades are separated early for brighter floral nuance.",
    ],
    facts: [
      "Distillation often produces several grades (extra, I, II, III) with different heaviness.",
      "Its benzyl acetate and floral esters contribute to a narcotic, tropical character.",
      "Ylang is usually balanced with citrus to avoid a cloying result.",
    ],
    goodFor: ["Bath rituals", "Sensual blends"],
    use: ["Use 1 drop only; cut with citrus"],
    imageUrl:
      "/images/ingredients/ylang.jpg",
    imageSource: "Wikimedia Commons (Cananga odorata)",
  },
  {
    id: "lavender",
    name: "Lavender",
    latin: "Lavandula angustifolia",
    category: "florals",
    regions: ["Mediterranean", "Alpine"],
    scentProfile: ["herbal-floral", "familiar", "sleepy"],
    accords: ["Aromatic Floral", "Sleepy Herb"],
    symbolism: ["Peace", "Sleep"],
    vibe: "Classic wind-down softness.",
    about:
      "Lavender feels universally calming because it combines herbal clarity with soft floral sweetness rather than leaning hard in either direction.",
    history:
      "Lavender became a household staple in linen cupboards, baths, and wash waters across southern Europe, especially in soap-making regions.",
    prizedOrigin: "High-altitude Provence lavender is widely prized for refined sweetness.",
    preparation: [
      "Flower spikes are steam-distilled after harvesting at peak bloom.",
      "Altitude and cut timing are controlled to optimize linalool/linalyl acetate balance.",
    ],
    facts: [
      "True lavender (angustifolia) smells smoother than spike lavender, which is sharper and camphoraceous.",
      "Altitude and harvest time can shift lavender from sweeter to more herbal profiles.",
      "Lavender is one of the few notes that blends easily with almost every family.",
    ],
    goodFor: ["Bedtime", "Linen sprays"],
    use: ["Few drops in bedroom spray or bath"],
    imageUrl:
      "/images/ingredients/lavender.jpg",
    imageSource: "Wikimedia Commons (Lavandula angustifolia; Köhler botanical plate)",
    imageObjectPosition: "center 34%",
  },
  {
    id: "clary-sage",
    name: "Clary Sage",
    latin: "Salvia sclarea",
    category: "herbs",
    regions: ["Mediterranean", "Global"],
    scentProfile: ["soft herbal", "tea-like", "dreamy"],
    accords: ["Dreamy Herbal", "Soft Muscatel"],
    symbolism: ["Vision", "Intuition"],
    vibe: "Exhale lane without heavy sweetness.",
    about:
      "Clary sage has a soft, almost wine-like herb tone that calms busy citrus blends without turning them woody.",
    history:
      "Historically associated with eye and clarity folklore in Europe, clary sage also appeared in aromatic wines and cordials.",
    prizedOrigin: "France and parts of Eastern Europe are key prized sources for clary sage.",
    preparation: [
      "Flowering tops and leaves are steam-distilled after field wilting.",
      "Producers often blend lots to stabilize muscatel-like sweetness.",
    ],
    facts: [
      "Its linalyl acetate content contributes to the gentle, rounded feel.",
      "Clary sage is less camphor-heavy than common culinary sage oils.",
      "It bridges floral and herbal accords very effectively in evening blends.",
    ],
    goodFor: ["De-stress", "Evening calm"],
    use: ["1-2 drops with orange or lavender"],
    imageUrl:
      "/images/ingredients/clary-sage.jpg",
    imageSource: "Wikimedia Commons (Salvia sclarea)",
  },
  {
    id: "rosemary",
    name: "Rosemary",
    latin: "Salvia rosmarinus",
    category: "herbs",
    regions: ["Mediterranean", "Alpine"],
    scentProfile: ["sharp herb", "sea air", "kitchen green"],
    accords: ["Herbal Camphor", "Kitchen Green"],
    symbolism: ["Memory", "Clarity"],
    vibe: "Kitchen-garden clarity.",
    about:
      "Rosemary cuts through stale air with a dry, aromatic edge that makes enclosed spaces feel more alert and ventilated.",
    history:
      "From classical Greece to Mediterranean kitchens, rosemary carried strong associations with memory, remembrance, and ritual cleanliness.",
    prizedOrigin: "Mediterranean coastal origins (Spain, Tunisia, Morocco) are highly regarded.",
    preparation: [
      "Steam distillation of flowering tops yields cineole/camphor/verbenone chemotypes.",
      "Chemotype selection is the main quality decision before blending.",
    ],
    facts: [
      "Modern taxonomy places rosemary within Salvia, now Salvia rosmarinus.",
      "Different chemotypes (cineole, camphor, verbenone) can smell and behave differently.",
      "A little rosemary can sharpen citrus formulas that feel too soft.",
    ],
    goodFor: ["Focus", "Kitchen cleaning"],
    use: ["1-2 drops with lemon/orange"],
    imageUrl:
      "/images/ingredients/rosemary.jpg",
    imageSource: "Wikimedia Commons (Salvia rosmarinus / Rosmarinus officinalis; Köhler botanical plate)",
    imageObjectPosition: "center 35%",
  },
  {
    id: "eucalyptus",
    name: "Eucalyptus",
    latin: "Eucalyptus globulus",
    category: "herbs",
    regions: ["Global"],
    scentProfile: ["spa steam", "menthol", "clear"],
    accords: ["Aromatic Camphor", "Spa Steam"],
    vibe: "Steam-room freshness in short bursts.",
    about:
      "Eucalyptus creates an instant steam effect, so it works best as a quick pulse rather than a long all-day diffuser note.",
    history:
      "As eucalyptus cultivation spread globally in the 19th century, its leaves and oils became widely associated with baths, steam, and winter air care.",
    prizedOrigin: "Australian and Portuguese-origin lots are often preferred for cleaner cineole profile.",
    preparation: [
      "Leaves and small twigs are steam-distilled to capture volatile cineole-rich fractions.",
      "Rectification can reduce rough notes for smoother room blends.",
    ],
    facts: [
      "Eucalyptus globulus is stronger and more camphoraceous than gentler species like radiata.",
      "Its high volatility means the opening feels immediate but can fade fast.",
      "Short diffusion cycles usually keep it crisp instead of medicinal.",
    ],
    goodFor: ["Shower steam", "Winter room refresh"],
    use: ["1-2 drops in shower tray/diffuser"],
    imageUrl:
      "/images/ingredients/eucalyptus.jpg",
    imageSource: "Wikimedia Commons (Eucalyptus globulus; Köhler botanical plate)",
  },
  {
    id: "rose",
    name: "Rose",
    latin: "Rosa damascena / Rosa centifolia",
    category: "florals",
    regions: ["Mediterranean", "Maghreb", "Global"],
    scentProfile: ["petal-rich", "honeyed", "velvety"],
    accords: ["Rose Attar", "Velvet Floral"],
    symbolism: ["Love", "Devotion"],
    vibe: "Classic petal richness that softens dry woods.",
    about:
      "Rose adds volume and polish to a blend, creating a rounded heart that links bright openings to deeper resin bases.",
    history:
      "Rose waters and oils shaped perfumery from Persian and Arab traditions through Ottoman and European scent cultures.",
    prizedOrigin: "Bulgarian Valley of Roses, Taif, and Turkish Isparta are benchmark references.",
    preparation: [
      "Steam distillation of fresh petals for rose otto.",
      "Solvent extraction is used for fuller, richer rose absolute profiles.",
    ],
    facts: [
      "Rose otto and rose absolute smell related but not identical, with absolute often feeling darker and richer.",
      "Rose is a common bridge between saffron/oud warmth and citrus brightness.",
      "Even trace doses can make a room blend feel more luxurious.",
    ],
    goodFor: ["Evening elegance", "Softening smoky blends"],
    use: ["1 drop with woods/resins; avoid overdosing"],
    imageUrl:
      "/images/ingredients/rose.jpg",
    imageSource: "Wikimedia Commons (Rosa × damascena)",
    imageObjectPosition: "center 34%",
  },
  {
    id: "jasmine",
    name: "Jasmine",
    latin: "Jasminum grandiflorum / Jasminum sambac",
    category: "florals",
    regions: ["Mediterranean", "Global"],
    scentProfile: ["indolic", "lush", "night-blooming"],
    accords: ["White Petal", "Night Floral"],
    symbolism: ["Sensuality", "Grace"],
    vibe: "Lush dusk floral with soft tea-like diffusion.",
    about:
      "Jasmine gives plush floral depth that can turn simple citrus blends into evening-ready compositions.",
    history:
      "Jasmine has long been central in Indian and Middle Eastern perfumery and garland traditions, then later in French floral architecture.",
    prizedOrigin: "India (sambac) and Egypt (grandiflorum) are key perfumery origins.",
    preparation: [
      "Usually extracted as absolute because delicate flowers lose character in direct distillation.",
      "Traditional enfleurage and modern solvent methods both aim to preserve nuanced floral facets.",
    ],
    facts: [
      "Jasmine sambac often reads greener and tea-like, while grandiflorum can feel fruitier and fuller.",
      "Jasmine is commonly paired with sandalwood in attar-style structures.",
      "Low doses keep jasmine radiant; high doses can dominate quickly.",
    ],
    goodFor: ["Night blends", "Floral-luxury moods"],
    use: ["1 drop with sandalwood, rose, or citrus tops"],
    imageUrl:
      "/images/ingredients/jasmine.jpg",
    imageSource: "Wikimedia Commons (Jasminum grandiflorum)",
  },
  {
    id: "sandalwood",
    name: "Sandalwood",
    latin: "Santalum album / Santalum spicatum",
    category: "woods",
    regions: ["Global", "Levant"],
    scentProfile: ["creamy wood", "milky", "meditative"],
    accords: ["Creamy Wood", "Attar Base"],
    symbolism: ["Stillness", "Sacredness"],
    vibe: "Smooth wood calm that extends floral life.",
    about:
      "Sandalwood creates a creamy, quiet base that smooths sharper notes and supports long, skin-like diffusion.",
    history:
      "Used in South Asian ritual, carving, and perfumery for centuries, sandalwood became a cornerstone of attars and incense paths.",
    prizedOrigin: "Mysore-style Santalum album is historic benchmark quality.",
    preparation: [
      "Heartwood is chipped and steam-distilled over long cycles.",
      "Aged oil is often preferred for deeper, smoother profiles.",
    ],
    facts: [
      "True Indian sandalwood differs from Australian sandalwood in sweetness and creaminess.",
      "Sandalwood is a classic base for jasmine, rose, and incense profiles.",
      "It can increase perceived softness even at low dosage.",
    ],
    goodFor: ["Meditation rooms", "Fixing volatile florals"],
    use: ["1-2 drops as base with floral hearts"],
    imageUrl:
      "/images/ingredients/sandalwood.jpg",
    imageSource: "Wikimedia Commons (Santalum album; Köhler botanical plate)",
  },
  {
    id: "vetiver",
    name: "Vetiver (Khus)",
    latin: "Chrysopogon zizanioides",
    category: "woods",
    regions: ["Global", "Mediterranean"],
    scentProfile: ["dry root", "smoky earth", "cool"],
    accords: ["Rooted Green", "Dry Earth Wood"],
    symbolism: ["Grounding", "Resilience"],
    vibe: "Cool-earth base that reins in sweetness.",
    about:
      "Vetiver offers rooty dryness and faint smoke, adding architecture and restraint to sweet floral or citrus blends.",
    history:
      "Khus mats and vetiver-infused cooling systems in South Asia made the note culturally linked with heat relief and clean air.",
    prizedOrigin: "Haiti and India are leading references for high-grade vetiver oils.",
    preparation: [
      "Roots are washed, dried, and steam-distilled.",
      "Oils are often matured to tame rough smoky edges.",
    ],
    facts: [
      "Haitian vetiver tends cleaner and drier; some other origins can feel smokier or earthier.",
      "Vetiver is a major pillar of many masculine and chypre-style frameworks.",
      "Micro-dosing prevents blends from turning too dusty or austere.",
    ],
    goodFor: ["Summer grounding", "Balancing florals"],
    use: ["1 drop with citrus/rose/jasmine structures"],
    imageUrl:
      "/images/ingredients/vetiver.jpg",
    imageSource: "Wikimedia Commons (Chrysopogon zizanioides)",
    imageObjectPosition: "center 40%",
  },
  {
    id: "oud-accord",
    name: "Oud Accord",
    category: "woods",
    regions: ["Levant", "Maghreb", "Global"],
    scentProfile: ["dark wood", "animalic", "incense"],
    accords: ["Oud Amber", "Majlis Wood"],
    symbolism: ["Status", "Ritual"],
    vibe: "Dense ceremonial wood warmth for evening rooms.",
    about:
      "Oud accords emulate agarwood's dense resinous darkness and are used to give a blend ceremonial gravity.",
    history:
      "Agarwood and oud culture became central across Arabian fragrance traditions in personal oil layering and home fumigation.",
    prizedOrigin: "Classic references come from Assam, Cambodia, and the wider Southeast Asian agarwood belt.",
    preparation: [
      "Most room versions are composed accords combining woody, leathery, smoky, and amber facets.",
      "When natural oud is used, material may be distilled from resin-formed Aquilaria heartwood.",
    ],
    facts: [
      "Natural oud is rare and expensive, so many commercial profiles are re-created accords.",
      "Oud combines particularly well with rose, saffron, and amber-style bases.",
      "Small amounts can shift a blend from casual to ceremonial.",
    ],
    goodFor: ["Majlis-style ambiance", "Late-evening depth"],
    use: ["1 drop with rose/amber/sandalwood"],
    caution: "Often a fragrance accord; room use only unless skin-safe specs are confirmed.",
    imageUrl:
      "/images/ingredients/oud-accord.jpg",
    imageSource: "Wikimedia Commons (Aquilaria malaccensis; oud source species)",
  },
  {
    id: "oakmoss-accord",
    name: "Oakmoss Accord",
    category: "woods",
    regions: ["Alpine", "Global"],
    scentProfile: ["mossy", "inky", "forest floor"],
    accords: ["Classic Chypre", "Mossy Leather"],
    symbolism: ["Depth", "Memory"],
    vibe: "Vintage perfumery shadow with earthy elegance.",
    about:
      "Oakmoss-style accords add dark green texture and help floral-citrus blends feel classic rather than bright-only.",
    history:
      "Oakmoss became essential in French chypre perfumery, defining elegant mossy bases in 20th-century classics.",
    prizedOrigin: "Historic oakmoss sources include Balkan and Central European lichen harvests.",
    preparation: [
      "Traditional oakmoss is extracted from lichen; modern accords often simulate this profile with compliant materials.",
      "Chypre structures pair moss notes with bergamot and labdanum-like warmth.",
    ],
    facts: [
      "Regulatory limits changed how real oakmoss is used, increasing reliance on accords.",
      "A moss accord can make citrus openings feel far more sophisticated.",
      "Overuse quickly darkens a blend and suppresses brightness.",
    ],
    goodFor: ["Chypre styling", "Vintage atmosphere"],
    use: ["Trace to 1 drop with bergamot/rose/vetiver"],
    caution: "Usually an accord; check IFRA-compliant versions for skin use.",
    imageUrl:
      "/images/ingredients/oakmoss-accord.jpg",
    imageSource: "Wikimedia Commons (Evernia prunastri; oakmoss lichen)",
  },
  {
    id: "hinoki",
    name: "Hinoki (Japanese Cypress)",
    latin: "Chamaecyparis obtusa",
    category: "woods",
    regions: ["Global", "Alpine"],
    scentProfile: ["dry cypress", "clean temple wood", "quiet"],
    accords: ["Zen Wood", "Clean Cypress"],
    symbolism: ["Purity", "Attention"],
    vibe: "Quiet temple-like wood clarity.",
    about:
      "Hinoki has a dry, transparent wood character that feels cleaner and less resin-heavy than many conifer notes.",
    history:
      "Hinoki has deep roots in Japanese architecture, baths, and ritual spaces where aroma and craftsmanship meet.",
    prizedOrigin: "Kiso and other Japanese cypress regions are historic reference origins.",
    preparation: [
      "Wood shavings and branches are steam-distilled for aromatic oil.",
      "Some profiles are built as accords when true hinoki oil is limited.",
    ],
    facts: [
      "Hinoki is central to many modern minimalist wood accords.",
      "It pairs naturally with green tea, citrus, and subtle incense.",
      "Compared with cedar, hinoki often feels drier and more transparent.",
    ],
    goodFor: ["Focus rooms", "Minimalist blends"],
    use: ["1-2 drops with bergamot or tea accords"],
    imageUrl:
      "/images/ingredients/hinoki.jpg",
    imageSource: "Wikimedia Commons (Chamaecyparis obtusa)",
  },
  {
    id: "palo-santo",
    name: "Palo Santo",
    latin: "Bursera graveolens",
    category: "woods",
    regions: ["Global"],
    scentProfile: ["resinous wood", "citrus smoke", "sweet dry"],
    accords: ["Sacred Smoke", "Citrus Resin Wood"],
    symbolism: ["Cleansing", "Protection"],
    vibe: "Warm resin smoke with bright edges.",
    about:
      "Palo santo combines gentle smoke, citrus facets, and resin warmth, making it useful for ritual-style reset blends.",
    history:
      "In parts of Latin America, palo santo has long been used in cleansing smoke practices and contemporary spiritual routines.",
    prizedOrigin: "Ecuador and Peru are the main reference origins.",
    preparation: [
      "Traditionally used as aged wood sticks for smudging-like fumigation.",
      "Essential oil is steam-distilled from ethically sourced, naturally fallen wood.",
    ],
    facts: [
      "Scent profile varies by origin and aging, from sweeter to smokier styles.",
      "Palo santo can replace heavier incense notes when you want more lift.",
      "Sustainable sourcing matters because overharvesting pressures wild stocks.",
    ],
    goodFor: ["Reset rituals", "Evening unwinding"],
    use: ["1 drop with citrus/woods or as wood stick fumigation"],
    caution: "Use only responsibly sourced material and ventilate smoke-based use.",
    imageUrl:
      "/images/ingredients/palo-santo.jpg",
    imageSource: "Wikimedia Commons (Bursera graveolens)",
  },
  {
    id: "musk-accord",
    name: "Musk Accord",
    category: "woods",
    regions: ["Levant", "Maghreb", "Global"],
    scentProfile: ["skin-like", "soft", "lasting"],
    accords: ["Clean Musk", "Skin Scent"],
    symbolism: ["Intimacy", "Presence"],
    vibe: "Soft diffusion that extends florals and woods.",
    about:
      "Modern musk accords add a clean, skin-like aura and improve persistence without adding obvious heaviness.",
    history:
      "Contemporary perfumery shifted from animal-derived musks to synthetic musk molecules that are safer and more consistent.",
    prizedOrigin: "Fine musk profiles are usually composition-dependent rather than place-dependent.",
    preparation: [
      "Built as a perfumery accord from macrocyclic or polycyclic musk materials.",
      "Maceration is often used so musk facets integrate with woods and amber notes.",
    ],
    facts: [
      "Most commercial musk notes are synthetic accords, not botanical distillations.",
      "Musks are often dosed low but strongly affect longevity.",
      "Musk can make bright top notes feel smoother and less sharp.",
    ],
    goodFor: ["Fixing volatile blends", "Soft evening projection"],
    use: ["Trace to 1 drop in room-accord blends"],
    caution: "Usually a fragrance accord; use room-safe materials only.",
    imageUrl:
      "/images/ingredients/amber.jpg",
    imageSource: "Wikimedia Commons (resin reference image used for accord card)",
  },
  {
    id: "saffron",
    name: "Saffron",
    latin: "Crocus sativus",
    category: "herbs",
    regions: ["Levant", "Maghreb", "Global"],
    scentProfile: ["spicy", "leathery", "golden"],
    accords: ["Saffron Rose", "Oud Saffron"],
    symbolism: ["Luxury", "Warmth"],
    vibe: "Golden spice lift for rose and oud structures.",
    about:
      "Saffron-style notes bring dry spice and subtle leather warmth, often used to brighten dark resin blends.",
    history:
      "Saffron traveled major trade routes through Persia, the Levant, and the Mediterranean, shaping culinary and aromatic traditions.",
    prizedOrigin: "Iranian, Kashmiri, and Spanish saffron styles are common perfumery references.",
    preparation: [
      "Natural saffron can be infused or extracted, though many room profiles are built as accords.",
      "Perfumery blends often combine saffron facets with rose and woods.",
    ],
    facts: [
      "Saffron notes are powerful and easy to overdose.",
      "It pairs especially well with oud accords and damask rose.",
      "Even tiny amounts can add perceived richness.",
    ],
    goodFor: ["Evening warmth", "Oriental-style blends"],
    use: ["Trace amount with rose, oud, amber"],
    caution: "Often an accord; check skin-safety specifications.",
    imageUrl:
      "/images/ingredients/rose.jpg",
    imageSource: "Wikimedia Commons (Rosa × damascena; illustrative card image)",
  },
  {
    id: "kewra",
    name: "Kewra",
    latin: "Pandanus odorifer",
    category: "florals",
    regions: ["Global", "Levant"],
    scentProfile: ["green floral", "dewy", "sweet-herbal"],
    accords: ["Attar Floral", "Green Blossom"],
    symbolism: ["Festivity", "Care"],
    vibe: "Bright floral-green note used in attar-style profiles.",
    about:
      "Kewra contributes a floral-green brightness that can lift heavier woods and rose structures.",
    history:
      "Kewra water and attar are longstanding aromatic materials in South Asian scent and culinary traditions.",
    prizedOrigin: "Odisha (India) is a major traditional source region.",
    preparation: [
      "Traditionally hydro-distilled from pandanus male flowers.",
      "Used as aromatic water, attar component, or floral modifier accord.",
    ],
    facts: [
      "Kewra reads fresher and greener than many white florals.",
      "It is often layered with sandalwood in attar traditions.",
      "Small doses can brighten dense compositions.",
    ],
    goodFor: ["Attar-inspired blends", "Refreshing floral lift"],
    use: ["1 drop with rose/sandalwood/vetiver"],
    imageUrl:
      "/images/ingredients/jasmine.jpg",
    imageSource: "Wikimedia Commons (Jasminum reference image used for floral card)",
  },
  {
    id: "iris-accord",
    name: "Iris Accord",
    latin: "Iris pallida / Iris germanica",
    category: "florals",
    regions: ["Mediterranean", "Global"],
    scentProfile: ["powdery", "cool", "elegant"],
    accords: ["Powder Floral", "Orris Veil"],
    symbolism: ["Elegance", "Refinement"],
    vibe: "Cool powdery floral polish in classic French structures.",
    about:
      "Iris/orris notes add a soft powdery veil that makes citrus and florals feel more formal and composed.",
    history:
      "Orris root became a luxury perfumery material in European fine fragrance traditions, especially in floral and chypre styles.",
    prizedOrigin: "Italian and French orris traditions are benchmark references.",
    preparation: [
      "True orris is aged rhizome material, often years before extraction.",
      "Many modern uses rely on accorded iris effects due to cost.",
    ],
    facts: [
      "Real orris is one of perfumery's costliest materials.",
      "Iris notes are often subtle and textural, not loudly floral.",
      "It pairs well with aldehydes and rose.",
    ],
    goodFor: ["Powdery elegance", "French-style floral structures"],
    use: ["Trace to 1 drop with rose, bergamot, oakmoss"],
    caution: "Often an accord; verify usage concentration.",
    imageUrl:
      "/images/ingredients/geranium.jpg",
    imageSource: "Wikimedia Commons (Pelargonium reference image used for floral card)",
  },
  {
    id: "aldehydic-accord",
    name: "Aldehydic Accord",
    category: "citrus",
    regions: ["Global", "Mediterranean"],
    scentProfile: ["sparkling", "soapy", "lifted"],
    accords: ["Aldehydic Floral", "Clean Linen"],
    vibe: "Effervescent top-note lift with vintage polish.",
    about:
      "Aldehydic accords add a bright, diffusive sparkle that amplifies top notes and makes florals feel airy.",
    history:
      "Aldehydes became iconic in early 20th-century French perfumery and shaped the style of many classic luxury florals.",
    prizedOrigin: "Aldehydic effects are synthetic and formulation-driven rather than region-specific.",
    preparation: [
      "Built from selected aldehydes blended with citrus/floral supports.",
      "Usually pre-diluted for controlled dosing in blends.",
    ],
    facts: [
      "Aldehydes can smell waxy, citrusy, or metallic depending on chain length.",
      "Very small amounts produce strong lift.",
      "They are a key part of many 'clean linen' impressions.",
    ],
    goodFor: ["Top-note sparkle", "Classic French lift"],
    use: ["Trace amount with bergamot, iris, rose"],
    caution: "Synthetic accord; use room-safe dilution levels.",
    imageUrl:
      "/images/ingredients/lemon-grapefruit.jpg",
    imageSource: "Wikimedia Commons (citrus reference image used for accord card)",
  },
  {
    id: "plum-accord",
    name: "Plum Accord",
    category: "florals",
    regions: ["Global", "Mediterranean"],
    scentProfile: ["fruity", "jammy", "velvet"],
    accords: ["Plum Chypre", "Velvet Fruit"],
    vibe: "Velvety fruit tone for floral-wood blends.",
    about:
      "Plum accords add fruity depth and a velvet texture that rounds sharp woods and moss notes.",
    history:
      "Stone-fruit accords became popular in modern fine fragrance as bridges between florals and amber-wood bases.",
    prizedOrigin: "Plum effects are usually accord-based and not tied to one origin.",
    preparation: [
      "Composed with fruity lactonic and floral materials.",
      "Often paired with tea, woods, or moss accords for depth.",
    ],
    facts: [
      "Plum notes can feel elegant at low dose and syrupy at high dose.",
      "Works well with rose, jasmine, and oakmoss.",
      "Adds perceived richness to minimalist formulas.",
    ],
    goodFor: ["Evening fruit-floral mood", "Softening dry woods"],
    use: ["Trace to 1 drop with floral or mossy bases"],
    caution: "Usually an accord; check material specs.",
    imageUrl:
      "/images/ingredients/rose.jpg",
    imageSource: "Wikimedia Commons (Rosa reference image used for accord card)",
  },
  {
    id: "green-tea-accord",
    name: "Green Tea Accord",
    latin: "Camellia sinensis",
    category: "herbs",
    regions: ["Global", "Mediterranean"],
    scentProfile: ["fresh tea", "green", "transparent"],
    accords: ["Tea Leaf", "Zen Tea"],
    vibe: "Clean green tea air with quiet freshness.",
    about:
      "Green tea accords provide transparent, leafy freshness without heavy citrus or menthol sharpness.",
    history:
      "Tea aroma profiles expanded from beverage culture into modern perfumery as symbols of calm, clarity, and understated luxury.",
    prizedOrigin: "Japanese and Chinese tea profiles often inspire premium green tea accords.",
    preparation: [
      "Usually built as accords from tea-like aromatics and gentle green facets.",
      "Can be blended with hinoki or citrus for airy minimalist styles.",
    ],
    facts: [
      "Most tea notes in fragrance are accords, not true distilled oils.",
      "Green tea pairs naturally with cypress and soft citrus.",
      "It can refresh dense amber or resin structures.",
    ],
    goodFor: ["Focus blends", "Daytime minimalist profiles"],
    use: ["1 drop with hinoki, bergamot, neroli"],
    caution: "Fragrance accord use only unless material is specified skin-safe.",
    imageUrl:
      "/images/ingredients/black-tea.jpg",
    imageSource: "Wikimedia Commons (Camellia sinensis; tea reference image)",
  },
  {
    id: "myrtle",
    name: "Myrtle",
    latin: "Myrtus communis",
    category: "herbs",
    regions: ["Mediterranean", "Global"],
    scentProfile: ["aromatic green", "camphor-soft", "clean"],
    accords: ["Mediterranean Green", "Aromatic Water"],
    symbolism: ["Vitality", "Purity"],
    vibe: "Clean aromatic herb with soft coastal greenness.",
    about:
      "Myrtle sits between rosemary and eucalyptus, giving Mediterranean blends a cleaner herbal center.",
    history:
      "Myrtle appears in Mediterranean aromatic waters and traditional rituals as a symbolically and practically valued plant.",
    prizedOrigin: "Corsican and Sardinian myrtle traditions are often referenced.",
    preparation: [
      "Leaves and twigs are steam-distilled into essential oil.",
      "Used in aromatic waters and herb-forward cologne styles.",
    ],
    facts: [
      "Myrtle is softer than eucalyptus and often less piercing than rosemary.",
      "Pairs well with citrus peels in Mediterranean profiles.",
      "Useful when you want freshness without menthol dominance.",
    ],
    goodFor: ["Coastal-fresh blends", "Daytime aromatics"],
    use: ["1-2 drops with bergamot, lemon, neroli"],
    imageUrl:
      "/images/ingredients/rosemary.jpg",
    imageSource: "Wikimedia Commons (rosemary reference image used for herbal card)",
  },
  {
    id: "copal",
    name: "Copal",
    category: "woods",
    regions: ["Global", "Levant"],
    scentProfile: ["bright resin", "piney", "ceremonial"],
    accords: ["Ceremonial Resin", "Bright Incense"],
    symbolism: ["Cleansing", "Offering"],
    vibe: "Luminous ritual resin smoke for cleansing moods.",
    about:
      "Copal offers a brighter resin effect than heavy incense notes, adding ceremonial atmosphere with lift.",
    history:
      "Mesoamerican traditions used copal resins in offerings and ritual fumigation, and the material remains central in spiritual practice.",
    prizedOrigin: "Mexico and Central America are key traditional copal sources.",
    preparation: [
      "Usually used as raw resin on charcoal or as tincture/extract.",
      "Some room blends recreate copal with resin accords.",
    ],
    facts: [
      "Copal is a family of related resins, not one single standardized material.",
      "Its smoke profile is often perceived as cleaner than darker incense resins.",
      "Pairs well with citrus and palo santo.",
    ],
    goodFor: ["Ritual resets", "Protective cleansing ambiance"],
    use: ["Burn resin with ventilation or add trace accord"],
    caution: "Ventilate when using smoke; use responsible sourcing.",
    imageUrl:
      "/images/ingredients/frankincense.jpg",
    imageSource: "Wikimedia Commons (Boswellia resin reference image used for copal card)",
  },
  {
    id: "cacao-accord",
    name: "Cacao Accord",
    latin: "Theobroma cacao",
    category: "herbs",
    regions: ["Global", "Maghreb"],
    scentProfile: ["dark cocoa", "powdery", "warm"],
    accords: ["Cocoa Amber", "Gourmand Resin"],
    vibe: "Dry cocoa warmth that deepens amber bases.",
    about:
      "Cacao accords add dark gourmand warmth without turning blends fully dessert-like when dosed carefully.",
    history:
      "Cacao's aromatic profile moved from food traditions into modern perfumery as part of gourmand and amber styles.",
    prizedOrigin: "Latin American and West African cacao profiles inspire many fragrance interpretations.",
    preparation: [
      "Usually built as an accord with cocoa, woody, and vanilla-like facets.",
      "Can be paired with tobacco or resins for darker compositions.",
    ],
    facts: [
      "Cacao notes are often drier and less sweet than vanilla notes.",
      "Small amounts can make woods feel richer.",
      "Overuse can flatten fresh top notes.",
    ],
    goodFor: ["Evening warmth", "Gourmand-wood depth"],
    use: ["Trace to 1 drop with vanilla, amber, tobacco"],
    caution: "Generally an accord; check intended application use.",
    imageUrl:
      "/images/ingredients/benzoin.jpg",
    imageSource: "Wikimedia Commons (resin reference image used for cacao accord card)",
  },
  {
    id: "vanilla-accord",
    name: "Vanilla Accord",
    latin: "Vanilla planifolia",
    category: "woods",
    regions: ["Global", "Maghreb"],
    scentProfile: ["warm sweet", "creamy", "comforting"],
    accords: ["Vanilla Amber", "Soft Gourmand"],
    symbolism: ["Comfort", "Tenderness"],
    vibe: "Comforting sweetness that rounds dry woods.",
    about:
      "Vanilla accords add creamy sweetness and make smoky or mossy structures feel friendlier and more wearable.",
    history:
      "Vanilla spread globally through colonial botanical exchange and later became foundational in gourmand perfumery.",
    prizedOrigin: "Madagascar and Mexican vanilla profiles are commonly used references.",
    preparation: [
      "True vanilla absolute is extracted from cured pods.",
      "Many fragrance uses rely on vanillin-rich accords for consistency.",
    ],
    facts: [
      "Vanilla tones can be natural absolute, synthetic vanillin, or blended accords.",
      "It is a common bridge between florals and woods.",
      "Low doses can add comfort without becoming sugary.",
    ],
    goodFor: ["Cozy room blends", "Smoothing resin edges"],
    use: ["Trace to 1 drop with sandalwood, benzoin, cacao"],
    caution: "Often an accord; verify concentration for intended use.",
    imageUrl:
      "/images/ingredients/amber.jpg",
    imageSource: "Wikimedia Commons (resin reference image used for vanilla accord card)",
  },
  {
    id: "tobacco-leaf-accord",
    name: "Tobacco Leaf Accord",
    latin: "Nicotiana tabacum",
    category: "woods",
    regions: ["Global", "Levant"],
    scentProfile: ["dry leaf", "honeyed", "smoky"],
    accords: ["Tobacco Amber", "Dry Leaf"],
    vibe: "Dry, warm leaf tone for deep evening blends.",
    about:
      "Tobacco leaf accords contribute dry sweetness and subtle smoke, useful for adding depth to vanilla, woods, and resin bases.",
    history:
      "Tobacco aroma became an enduring perfumery theme through trade-era leaf culture and later amber-tobacco fine fragrances.",
    prizedOrigin: "Cuban, Turkish, and Virginia leaf styles often inspire accord profiles.",
    preparation: [
      "Usually composed as an accord with leaf, hay, honey, and smoky facets.",
      "Sometimes paired with vanilla or cacao notes for richer depth.",
    ],
    facts: [
      "Fragrance tobacco notes do not require smoke to convey a tobacco effect.",
      "Works especially well with vanilla, saffron, and resins.",
      "Too much can overshadow delicate florals.",
    ],
    goodFor: ["Evening depth", "Warm lounge atmospheres"],
    use: ["Trace to 1 drop with vanilla, amber, woods"],
    caution: "Room fragrance accord only unless skin-safe blend is confirmed.",
    imageUrl:
      "/images/ingredients/black-tea.jpg",
    imageSource: "Wikimedia Commons (tea reference image used for tobacco accord card)",
  },
  {
    id: "black-tea",
    name: "Black Tea Accord",
    category: "herbs",
    regions: ["Maghreb", "Global"],
    scentProfile: ["tannic", "cozy", "bookish"],
    accords: ["Tannic Tea", "Smoky Library"],
    vibe: "Tea-salon depth with amber and woods.",
    about:
      "Black tea accords mimic steeped leaves and warm cups, adding tannic texture that makes citrus-and-wood blends feel lived-in.",
    history:
      "Tea salons from Tangier to London popularized the pairing of citrus peel, tea vapour, and polished wood interiors as an aromatic mood template.",
    prizedOrigin: "Assam, Darjeeling, and Chinese Keemun profiles inspire many premium tea accords.",
    preparation: [
      "Usually built as an accord using tannic, smoky, and woody aroma materials.",
      "When tea absolute is used, it is typically solvent-extracted from processed leaves.",
    ],
    facts: [
      "Most 'black tea' room notes are accords rather than true distilled tea essential oil.",
      "A touch of smoke or leather facets can make tea accords feel more library-like.",
      "Tea notes pair naturally with bergamot because of the Earl Grey scent memory.",
    ],
    goodFor: ["Reading evenings", "Tea-room blends"],
    use: ["1 drop with orange, bergamot, amber"],
    caution: "Usually a fragrance accord; use as room scent only.",
    imageUrl:
      "/images/ingredients/black-tea.jpg",
    imageSource: "Wikimedia Commons (Camellia sinensis; Köhler botanical plate)",
  },
];

export const teaIngredients: TeaIngredient[] = [
  {
    id: "purple-sage",
    name: "Purple Sage",
    latin: "Salvia officinalis 'Purpurascens'",
    flavorProfile: ["earthy", "savory", "softly camphoraceous"],
    therapeuticEffects: ["calming support", "respiratory comfort", "focus support"],
    traditionallyUsedFor: [
      "Traditionally used to support gentle calm during mentally busy evenings.",
      "Often brewed as a warm herbal infusion for seasonal throat and respiratory comfort.",
      "May support mental clarity when used in small, balanced tea blends.",
    ],
    brewGuide: {
      waterTemp: "90-95 C",
      steepTime: "5-7 minutes",
      amount: "1-2 tsp dried leaf per 250 ml",
    },
    caution:
      "Avoid high-frequency use during pregnancy; pause use if it feels drying. Traditional use only, not medical advice.",
    pairsWith: ["lemon balm", "lavender", "fennel seed"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Salvia_officinalis_%27Purpurascens%27_kz01.jpg",
    imageSource: "Wikimedia Commons (Salvia officinalis 'Purpurascens')",
  },
  {
    id: "chamomile",
    name: "Chamomile",
    latin: "Matricaria chamomilla",
    flavorProfile: ["apple-like", "honeyed", "soft floral"],
    therapeuticEffects: ["calming support", "sleep support", "digestion support"],
    traditionallyUsedFor: [
      "Traditionally used to support winding down before sleep.",
      "Often used after meals for gentle digestive comfort.",
      "May support a calmer nervous-system tone during stress-heavy periods.",
    ],
    brewGuide: {
      waterTemp: "95 C",
      steepTime: "5-8 minutes",
      amount: "1 tbsp flowers per 250 ml",
    },
    caution: "May not suit people sensitive to ragweed-family plants.",
    pairsWith: ["lavender", "lemon balm", "rooibos"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Matricaria_February_2008-1.jpg",
    imageSource: "Wikimedia Commons (Matricaria chamomilla)",
  },
  {
    id: "peppermint",
    name: "Peppermint",
    latin: "Mentha x piperita",
    flavorProfile: ["cooling", "minty", "bright"],
    therapeuticEffects: ["digestion support", "focus support", "respiratory comfort"],
    traditionallyUsedFor: [
      "Traditionally used for post-meal digestive ease.",
      "Often used to support clear-headed alertness without caffeine.",
      "May provide a cooling sensation associated with easier breathing comfort.",
    ],
    brewGuide: {
      waterTemp: "95 C",
      steepTime: "4-6 minutes",
      amount: "1 tbsp leaf per 250 ml",
    },
    caution: "May aggravate reflux in sensitive people.",
    pairsWith: ["ginger", "fennel seed", "nettle"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/72/Pfefferminze_natur_peppermint.jpg",
    imageSource: "Wikimedia Commons (Mentha x piperita / peppermint)",
  },
  {
    id: "ginger",
    name: "Ginger Root",
    latin: "Zingiber officinale",
    flavorProfile: ["warming", "spicy", "zesty"],
    therapeuticEffects: ["digestion support", "immune support", "respiratory comfort"],
    traditionallyUsedFor: [
      "Traditionally used to support digestion and reduce queasy feelings.",
      "Often used in winter infusions for warming, seasonal comfort.",
      "May support throat comfort when sipped warm with honey/lemon.",
    ],
    brewGuide: {
      waterTemp: "100 C",
      steepTime: "8-12 minutes",
      amount: "5-8 thin slices per 250 ml",
    },
    caution: "Use moderate portions if sensitive to spicy preparations.",
    pairsWith: ["peppermint", "licorice root", "hibiscus"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/18/Koeh-146-no_text.jpg",
    imageSource: "Wikimedia Commons (Zingiber officinale)",
  },
  {
    id: "lemon-balm",
    name: "Lemon Balm",
    latin: "Melissa officinalis",
    flavorProfile: ["citrusy", "soft green", "gentle"],
    therapeuticEffects: ["calming support", "sleep support", "focus support"],
    traditionallyUsedFor: [
      "Traditionally used to support emotional calm and reduce tension.",
      "Often used in evening tea to support easier sleep onset.",
      "May support focused calm for daytime tasks when used lightly.",
    ],
    brewGuide: {
      waterTemp: "90-95 C",
      steepTime: "5-7 minutes",
      amount: "1 tbsp dried leaf per 250 ml",
    },
    caution: "Use with care alongside sedative medications.",
    pairsWith: ["purple sage", "chamomile", "lavender"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/70/Lemon_balm_plant.jpg",
    imageSource: "Wikimedia Commons (Melissa officinalis)",
  },
  {
    id: "tulsi",
    name: "Tulsi (Holy Basil)",
    latin: "Ocimum tenuiflorum",
    flavorProfile: ["peppery", "clove-like", "green"],
    therapeuticEffects: ["calming support", "focus support", "immune support"],
    traditionallyUsedFor: [
      "Traditionally used as an adaptogenic herb to support stress resilience.",
      "Often used to support stable energy and focused calm.",
      "May support seasonal wellness routines as part of daily tea practice.",
    ],
    brewGuide: {
      waterTemp: "95 C",
      steepTime: "5-8 minutes",
      amount: "1 tbsp leaf per 250 ml",
    },
    caution: "Consult a clinician if pregnant or on blood-thinning medication.",
    pairsWith: ["ginger", "rooibos", "hibiscus"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/01/Tulsi_or_Tulasi_Holy_basil.jpg",
    imageSource: "Wikimedia Commons (Ocimum tenuiflorum / tulsi)",
  },
  {
    id: "hibiscus",
    name: "Hibiscus",
    latin: "Hibiscus sabdariffa",
    flavorProfile: ["tart", "berry-like", "refreshing"],
    therapeuticEffects: ["immune support", "digestion support", "calming support"],
    traditionallyUsedFor: [
      "Traditionally used as a cooling, vitamin-rich herbal infusion.",
      "Often used for refreshing digestion support after heavy meals.",
      "May support relaxation when served warm with balancing herbs.",
    ],
    brewGuide: {
      waterTemp: "95 C",
      steepTime: "6-10 minutes",
      amount: "1 tbsp calyces per 250 ml",
    },
    caution: "May be too tart for sensitive stomachs; adjust strength.",
    pairsWith: ["ginger", "rooibos", "licorice root"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Roselle%2C_Hibiscus_sabdariffa%2C_2014_01.JPG",
    imageSource: "Wikimedia Commons (Hibiscus sabdariffa / roselle)",
  },
  {
    id: "rooibos",
    name: "Rooibos",
    latin: "Aspalathus linearis",
    flavorProfile: ["malty", "smooth", "naturally sweet"],
    therapeuticEffects: ["calming support", "immune support", "digestion support"],
    traditionallyUsedFor: [
      "Traditionally used as a caffeine-free base for calming daily tea.",
      "Often used to support hydration-friendly, low-tannin tea routines.",
      "May support gentle digestive comfort in evening blends.",
    ],
    brewGuide: {
      waterTemp: "100 C",
      steepTime: "6-10 minutes",
      amount: "1 tbsp per 250 ml",
    },
    pairsWith: ["chamomile", "tulsi", "fennel seed"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Rooibos_%28Aspalathus_linearis%29PICT2813.JPG",
    imageSource: "Wikimedia Commons (Aspalathus linearis / rooibos)",
  },
  {
    id: "nettle",
    name: "Nettle",
    latin: "Urtica dioica",
    flavorProfile: ["green", "grassy", "mineral-rich"],
    therapeuticEffects: ["immune support", "focus support", "digestion support"],
    traditionallyUsedFor: [
      "Traditionally used as a nutritive herb in daily tonic infusions.",
      "Often used to support seasonal wellness and mineral intake.",
      "May support steady, clear energy without caffeine.",
    ],
    brewGuide: {
      waterTemp: "95 C",
      steepTime: "7-10 minutes",
      amount: "1 tbsp dried leaf per 250 ml",
    },
    caution: "Start with light strength if new to nettle tea.",
    pairsWith: ["peppermint", "lemon balm", "rooibos"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Fen_nettle_%28Urtica_dioica_ssp._galeopsifolia%29_-_geograph.org.uk_-_5423125.jpg",
    imageSource: "Wikimedia Commons (Urtica dioica)",
  },
  {
    id: "fennel-seed",
    name: "Fennel Seed",
    latin: "Foeniculum vulgare",
    flavorProfile: ["sweet anise", "warming", "aromatic"],
    therapeuticEffects: ["digestion support", "respiratory comfort", "calming support"],
    traditionallyUsedFor: [
      "Traditionally used after meals for digestive comfort and less bloating.",
      "Often used in warm tea for throat comfort in colder months.",
      "May support a settled feeling when paired with mint or sage.",
    ],
    brewGuide: {
      waterTemp: "100 C",
      steepTime: "8-10 minutes",
      amount: "1 tsp lightly crushed seeds per 250 ml",
    },
    caution: "Use culinary-level portions; avoid concentrated use in pregnancy.",
    pairsWith: ["peppermint", "purple sage", "ginger"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Foeniculum_July_2011-1a.jpg",
    imageSource: "Wikimedia Commons (Foeniculum vulgare / fennel)",
  },
  {
    id: "licorice-root",
    name: "Licorice Root",
    latin: "Glycyrrhiza glabra",
    flavorProfile: ["sweet", "earthy", "rounding"],
    therapeuticEffects: ["respiratory comfort", "digestion support", "immune support"],
    traditionallyUsedFor: [
      "Traditionally used to support throat comfort and smoother herbal blends.",
      "Often used in digestive tea formulas for soothing sweetness.",
      "May support seasonal comfort as part of short-term tea routines.",
    ],
    brewGuide: {
      waterTemp: "100 C",
      steepTime: "8-12 minutes",
      amount: "1 tsp chopped root per 250 ml",
    },
    caution: "Avoid regular use with high blood pressure or potassium imbalance concerns.",
    pairsWith: ["ginger", "hibiscus", "tulsi"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Illustration_Glycyrrhiza_glabra0.jpg",
    imageSource: "Wikimedia Commons (Glycyrrhiza glabra / licorice)",
  },
  {
    id: "lavender-tea",
    name: "Lavender",
    latin: "Lavandula angustifolia",
    flavorProfile: ["floral", "sweet-herbal", "aromatic"],
    therapeuticEffects: ["calming support", "sleep support", "digestion support"],
    traditionallyUsedFor: [
      "Traditionally used to support relaxation and bedtime wind-down.",
      "Often used in tiny amounts to support stress decompression rituals.",
      "May support digestive comfort when blended gently with chamomile.",
    ],
    brewGuide: {
      waterTemp: "90 C",
      steepTime: "4-6 minutes",
      amount: "1-2 tsp buds per 250 ml",
    },
    caution: "Keep doses light to avoid a perfumey, bitter cup.",
    pairsWith: ["chamomile", "lemon balm", "purple sage"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/Lavandula_angustifolia_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-087.jpg",
    imageSource: "Wikimedia Commons (Lavandula angustifolia)",
  },
];

export const categoryLabels: Record<AromaCategory, string> = {
  citrus: "Citrus",
  woods: "Woods & Resins",
  florals: "Florals",
  herbs: "Herbs, Teas & Greens",
};

export const blendRecipes: BlendRecipe[] = [
  {
    name: "Tunisian Amber Room",
    family: "warm",
    vibe: "Warm amber-tea lounge with wood and a little earth.",
    layers: {
      top: "Orange",
      heart: "Geranium",
      base: "Cedarwood + Amber + Tiny Patchouli",
    },
    formula: ["Orange x3", "Geranium x2", "Cedarwood x1", "Amber x1", "Patchouli x1 tiny"],
  },
  {
    name: "Mini Hammam Reset",
    family: "fresh",
    vibe: "Steam + clean tiles, whole-flat refresh.",
    layers: {
      top: "Lemon/Orange",
      heart: "Eucalyptus",
      base: "Rosemary or Frankincense",
    },
    formula: ["Lemon x3", "Eucalyptus x2", "Rosemary x1", "Frankincense x1 optional"],
  },
  {
    name: "Dreamy Herbal Evening",
    family: "dreamy",
    vibe: "Soft herbal calm, not heavy, easy exhale.",
    layers: {
      top: "Orange",
      heart: "Clary Sage",
      base: "Benzoin or Lavender",
    },
    formula: ["Orange x3", "Clary Sage x2", "Benzoin x1", "Lavender x1 optional"],
  },
  {
    name: "Library Tea Woods",
    family: "warm",
    vibe: "Dry tea, polished wood, and quiet amber depth.",
    layers: {
      top: "Bergamot",
      heart: "Black Tea Accord",
      base: "Hinoki + Amber",
    },
    formula: ["Bergamot x3", "Black Tea Accord x2", "Hinoki x1", "Amber x1"],
  },
  {
    name: "Sunlit Citrus Focus",
    family: "fresh",
    vibe: "Bright and clean with a crisp herbal spine.",
    layers: {
      top: "Lemon + Bergamot",
      heart: "Rosemary",
      base: "Cedarwood",
    },
    formula: ["Lemon x2", "Bergamot x2", "Rosemary x1", "Cedarwood x1"],
  },
  {
    name: "Velvet Floral Night",
    family: "dreamy",
    vibe: "Soft petals over creamy woods for evening wind-down.",
    layers: {
      top: "Neroli",
      heart: "Rose + Jasmine",
      base: "Sandalwood + Benzoin",
    },
    formula: ["Neroli x1", "Rose x1", "Jasmine x1", "Sandalwood x1", "Benzoin x1"],
  },
];

export const usageGuide = {
  layeringRule: "1 top + 1 heart + 1 base",
  dropGuide: ["Small room: 4-6 drops total", "Medium room: 6-8 drops total"],
  cycle: "Diffuse 20-30 minutes, then switch off and re-enter the room later.",
  safety: [
    "No medical claims; this is for home scent mood exploration.",
    "Avoid eyes, pets, and undiluted skin use.",
    "Air the room regularly.",
    "Fragrance accords (amber, tea) are room scent only.",
  ],
};
