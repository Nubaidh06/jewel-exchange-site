/**
 * showcaseHelper.js
 * Enriches product data for the in-store Showcase Mode.
 * Provides age-agnostic faceted classifications and recommendation logic.
 */

export function enrichShowcaseItem(item, index = 0) {
  const name = (item.name || "").trim();
  const desc = (item.description || "").trim();
  const rawCat = (item.category || "").trim();
  const rawType = (item.type || "").trim();
  const specs = Array.isArray(item.specifications) ? item.specifications : [];
  const specsStr = specs.join(" ");
  const allText = `${name} ${desc} ${rawCat} ${rawType} ${specsStr}`.toLowerCase();

  // 1. Normalized Category / Silhouette
  let category = "Fine Jewelry";
  const catLower = rawCat.toLowerCase();
  const typeLower = rawType.toLowerCase();

  if (catLower.includes("ring") || allText.includes(" ring") || allText.includes("band")) {
    category = "Rings";
  } else if (catLower.includes("necklace") || catLower.includes("pendant") || allText.includes("necklace") || allText.includes("pendant") || allText.includes("choker")) {
    category = "Necklaces & Pendants";
  } else if (catLower.includes("earring") || allText.includes("earring") || allText.includes("stud") || allText.includes("drop")) {
    category = "Earrings";
  } else if (catLower.includes("bracelet") || catLower.includes("bangle") || allText.includes("bracelet") || allText.includes("bangle") || allText.includes("cuff")) {
    category = "Bracelets & Bangles";
  } else if (typeLower.includes("gemstone") || catLower.includes("sapphire") || catLower.includes("ruby") || catLower.includes("emerald") || catLower.includes("padparadscha") || catLower.includes("rare")) {
    category = "Rare Gemstones";
  }

  // 2. Gemstone Classification
  let stone = "Fine Gold & Accents";
  let stoneColor = "#b8965a"; // default gold
  if (allText.includes("padparadscha")) {
    stone = "Padparadscha";
    stoneColor = "#f49372"; // sunset peach
  } else if (allText.includes("sapphire")) {
    stone = "Ceylon Sapphire";
    stoneColor = "#1a4f9c"; // royal sapphire blue
  } else if (allText.includes("ruby") || allText.includes("rubies")) {
    stone = "Burmese Ruby";
    stoneColor = "#aa1738"; // crimson ruby
  } else if (allText.includes("emerald")) {
    stone = "Colombian Emerald";
    stoneColor = "#0f7a55"; // emerald green
  } else if (allText.includes("diamond")) {
    stone = "Brilliant Diamond";
    stoneColor = "#d6e6f2"; // icy diamond
  } else if (allText.includes("spinel") || allText.includes("alexandrite") || allText.includes("garnet") || allText.includes("tourmaline") || catLower.includes("rare")) {
    stone = "Collector Gemstone";
    stoneColor = "#8e44ad"; // royal amethyst/purple
  }

  // 3. Precious Metal
  let metal = "18K Solid Gold";
  if (allText.includes("tri-color") || allText.includes("tri-tone") || allText.includes("tricolor")) {
    metal = "Tri-Color Gold";
  } else if (allText.includes("rose gold")) {
    metal = "18K Rose Gold";
  } else if (allText.includes("white gold") || allText.includes("platinum")) {
    metal = "18K White Gold / Platinum";
  } else if (allText.includes("yellow gold") || allText.includes("solid gold")) {
    metal = "18K Yellow Gold";
  }

  // 4. Style / Vibe
  let style = "Classic & Timeless";
  if (allText.includes("vintage") || allText.includes("art deco") || allText.includes("antique") || allText.includes("milgrain") || allText.includes("heirloom")) {
    style = "Vintage & Art Deco";
  } else if (allText.includes("halo") || allText.includes("cluster") || allText.includes("floral")) {
    style = "Halo & Cluster";
  } else if (allText.includes("three-stone") || allText.includes("trilogy") || allText.includes("three stone") || allText.includes("toi et moi")) {
    style = "Trilogy & Three-Stone";
  } else if (allText.includes("contour") || allText.includes("modern") || allText.includes("statement") || allText.includes("cuff") || allText.includes("open") || allText.includes("architectural")) {
    style = "Modern Statement";
  } else if (allText.includes("solitaire") || allText.includes("band") || allText.includes("stud")) {
    style = "Solitaire & Minimal";
  }

  // 5. Showroom Ready vs Bespoke Archive toggle
  // Distribute pieces between in-store ready-to-wear and bespoke archive commissions for inspiration
  const isArchive = index % 3 === 2 || allText.includes("commission") || allText.includes("bespoke") || allText.includes("archive");

  // 6. Parsed key specs for clean showroom reading
  let extractedMetal = specs.find(s => s.toLowerCase().startsWith("metal:"))?.replace(/^metal:\s*/i, "") || metal;
  let extractedStone = specs.find(s => s.toLowerCase().startsWith("center stone:"))?.replace(/^center stone:\s*/i, "") ||
                       specs.find(s => s.toLowerCase().startsWith("side stones:"))?.replace(/^side stones:\s*/i, "") ||
                       stone;
  let extractedCert = specs.find(s => s.toLowerCase().startsWith("certification:"))?.replace(/^certification:\s*/i, "") || "Jewel Exchange Certified";

  // 7. Strip price completely so it is never exposed in showroom state or data payload
  const { price, ...safeItem } = item;

  return {
    ...safeItem,
    id: item._id || item.slug || `item-${index}`,
    name,
    category,
    stone,
    stoneColor,
    metal,
    style,
    isArchive,
    summarySpecs: {
      metal: extractedMetal,
      stone: extractedStone,
      cert: extractedCert,
    },
    // Filterable keywords
    searchCorpus: `${name} ${category} ${stone} ${metal} ${style} ${specsStr}`.toLowerCase(),
  };
}

/**
 * Inspiration Matcher recommendation algorithm
 */
export function getRecommendedItems(items, { occasion, aesthetic, color }) {
  if (!items || items.length === 0) return [];

  const scored = items.map((item) => {
    let score = 0;
    const text = item.searchCorpus;

    // Occasion scoring
    if (occasion === "engagement") {
      if (item.category === "Rings") score += 6;
      if (item.style === "Solitaire & Minimal" || item.style === "Halo & Cluster" || item.style === "Trilogy & Three-Stone") score += 4;
      if (item.stone === "Brilliant Diamond" || item.stone === "Ceylon Sapphire") score += 3;
    } else if (occasion === "anniversary") {
      if (item.category === "Necklaces & Pendants" || item.category === "Rings" || item.category === "Bracelets & Bangles") score += 5;
      if (item.stone === "Ceylon Sapphire" || item.stone === "Burmese Ruby" || item.stone === "Brilliant Diamond") score += 4;
    } else if (occasion === "statement") {
      if (item.style === "Modern Statement" || item.style === "Halo & Cluster") score += 6;
      if (item.category === "Necklaces & Pendants" || item.category === "Earrings") score += 4;
    } else if (occasion === "daily") {
      if (item.style === "Solitaire & Minimal" || item.style === "Classic & Timeless") score += 6;
      if (item.category === "Earrings" || item.category === "Bracelets & Bangles") score += 4;
    } else if (occasion === "heirloom") {
      if (item.style === "Vintage & Art Deco" || item.isArchive) score += 7;
      if (item.category === "Rare Gemstones" || item.category === "Rings") score += 4;
    }

    // Aesthetic scoring
    if (aesthetic === "classic") {
      if (item.style === "Classic & Timeless" || item.style === "Solitaire & Minimal") score += 5;
    } else if (aesthetic === "royal") {
      if (item.style === "Halo & Cluster" || item.style === "Trilogy & Three-Stone") score += 5;
      if (item.stone === "Ceylon Sapphire" || item.stone === "Burmese Ruby") score += 4;
    } else if (aesthetic === "vintage") {
      if (item.style === "Vintage & Art Deco") score += 8;
    } else if (aesthetic === "modern") {
      if (item.style === "Modern Statement") score += 8;
    }

    // Color / Gemstone scoring
    if (color === "blue" && item.stone === "Ceylon Sapphire") score += 10;
    else if (color === "peach" && item.stone === "Padparadscha") score += 10;
    else if (color === "red" && item.stone === "Burmese Ruby") score += 10;
    else if (color === "green" && item.stone === "Colombian Emerald") score += 10;
    else if (color === "diamond" && item.stone === "Brilliant Diamond") score += 10;
    else if (color === "surprise") score += 2;

    return { item, score };
  });

  // Sort by highest matching score
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 12).map((s) => s.item);
}
