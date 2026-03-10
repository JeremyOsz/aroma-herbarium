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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/OrangeBloss_wb.jpg/330px-OrangeBloss_wb.jpg",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Bergamot_orange_-_whole_and_slice.jpg/330px-Bergamot_orange_-_whole_and_slice.jpg",
    imageSource: "Wikimedia Commons (Citrus bergamia)",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/P1030323.JPG/330px-P1030323.JPG",
    imageSource: "Wikimedia Commons (Citrus limon)",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Cedrus_atlantica.jpg/330px-Cedrus_atlantica.jpg",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Pogostemon_cablin_001.jpg/330px-Pogostemon_cablin_001.jpg",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Boswellia_sacra.jpg/330px-Boswellia_sacra.jpg",
    imageSource: "Wikimedia Commons (Boswellia sacra)",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Styrax_benzoin_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-133.jpg/330px-Styrax_benzoin_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-133.jpg",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cistus_April_2017-2.jpg/330px-Cistus_April_2017-2.jpg",
    imageSource: "Wikimedia Commons (Cistus ladanifer; amber-accord botanical reference)",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Citrus_aurantium.jpg/330px-Citrus_aurantium.jpg",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/%28MHNT%29_Pelargonium_graveolens_flower_and_leaves.jpg/330px-%28MHNT%29_Pelargonium_graveolens_flower_and_leaves.jpg",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Cananga_odorata_01.JPG/330px-Cananga_odorata_01.JPG",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Lavandula_angustifolia_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-087.jpg/330px-Lavandula_angustifolia_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-087.jpg",
    imageSource: "Wikimedia Commons (Lavandula angustifolia)",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Salvia_sclarea3.jpg/330px-Salvia_sclarea3.jpg",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Rosemary_in_bloom.JPG/330px-Rosemary_in_bloom.JPG",
    imageSource: "Wikimedia Commons (Salvia rosmarinus)",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Eucalyptus_globulus_subsp._maidenii.jpg/330px-Eucalyptus_globulus_subsp._maidenii.jpg",
    imageSource: "Wikimedia Commons (Eucalyptus globulus)",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/%D9%85%D8%B1%D8%A7%D8%B3%D9%85_%DA%AF%D9%84%D8%A7%D8%A8%DA%AF%DB%8C%D8%B1%DB%8C_%D8%AF%D8%B1_%D9%82%D9%85%D8%B5%D8%B1_%DA%A9%D8%A7%D8%B4%D8%A7%D9%86_Golabgiri_%28%22making_Rosewater%22%29_-_Ghamsar-_Kashan-_Iran_19.jpg/330px-%D9%85%D8%B1%D8%A7%D8%B3%D9%85_%DA%AF%D9%84%D8%A7%D8%A8%DA%AF%DB%8C%D8%B1%DB%8C_%D8%AF%D8%B1_%D9%82%D9%85%D8%B5%D8%B1_%DA%A9%D8%A7%D8%B4%D8%A7%D9%86_Golabgiri_%28%22making_Rosewater%22%29_-_Ghamsar-_Kashan-_Iran_19.jpg",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Jasminum_grandiflorum_%28Oleaceae%29.jpg/330px-Jasminum_grandiflorum_%28Oleaceae%29.jpg",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Santalum_album_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-128.jpg/330px-Santalum_album_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-128.jpg",
    imageSource: "Wikimedia Commons (Santalum album)",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Vetiver_grass.jpg/330px-Vetiver_grass.jpg",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Aquilaria_malaccensis_-_Agar_Wood%2C_Eaglewood_-_Indian_Aloewood_at_Munnar_%282%29.jpg/330px-Aquilaria_malaccensis_-_Agar_Wood%2C_Eaglewood_-_Indian_Aloewood_at_Munnar_%282%29.jpg",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lichen_foliac%C3%A92..JPG/330px-Lichen_foliac%C3%A92..JPG",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/%E5%A4%A7%E6%99%BA%E5%AF%BA_%28%E5%B2%90%E9%98%9C%E5%B8%82%29-%E6%A8%B9%E9%BD%A2%E7%B4%84700%E5%B9%B4%E3%81%AE%E5%A4%A7%E3%83%92%E3%83%8E%E3%82%ADdaichiji008.jpg/330px-%E5%A4%A7%E6%99%BA%E5%AF%BA_%28%E5%B2%90%E9%98%9C%E5%B8%82%29-%E6%A8%B9%E9%BD%A2%E7%B4%84700%E5%B9%B4%E3%81%AE%E5%A4%A7%E3%83%92%E3%83%8E%E3%82%ADdaichiji008.jpg",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Bursera_graveolens.jpg/330px-Bursera_graveolens.jpg",
    imageSource: "Wikimedia Commons (Bursera graveolens)",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Csinensis.jpg/330px-Csinensis.jpg",
    imageSource: "Wikimedia Commons (Camellia sinensis; black-tea source plant)",
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
