const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

const envFile = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) process.env[match[1]] = match[2];
});

const client = createClient({
  projectId: 'rrsnwe4c',
  dataset: 'production',
  apiVersion: '2024-06-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const assetsBaseDir = path.join(__dirname, '..', '..', 'JEWEL-EXCHANGE-ASSETS', 'products');

const itemsData = [
  {
    oldFilename: "necklace-u-shape-diamond-pendant-gold.png",
    categoryFolder: "necklaces",
    categoryTitle: "Necklaces",
    filename: "necklace-aura-u-silhouette-pave-diamond-gold-01.png",
    name: "Aura U-Silhouette Micropavé Diamond Pendant Necklace",
    slug: "aura-u-silhouette-pave-diamond-pendant-necklace",
    desc: "Sculptural U-silhouette pendant in radiant 18K yellow gold, illuminated along its inner curve with hand-set micropavé diamonds. [Editorial Front Showcase]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: None (Architectural U-Motif)",
      "Side Stones: 0.45ct tw Round Brilliant Micropavé Diamonds (VVS/F)",
      "Certification: NGJA & GIA Certified",
      "Details: 18.0 Inch Adjustable 18K Link Chain"
    ]
  },
  {
    oldFilename: "ring-yellow-gold-diamond-u-shape.png",
    categoryFolder: "rings",
    categoryTitle: "Rings",
    filename: "ring-aura-u-contour-pave-diamond-gold-01.png",
    name: "Aura U-Contour Micropavé Diamond Cocktail Ring",
    slug: "aura-u-contour-pave-diamond-cocktail-ring",
    desc: "Modern open-cuff silhouette ring hand-crafted in 18K solid yellow gold, accented by an arc of brilliant-cut pavé diamonds. [Studio Front Showcase]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: None (Open Contour Design)",
      "Side Stones: 0.35ct tw Round Brilliant Diamonds (VVS/F)",
      "Certification: NGJA Certified",
      "Details: Ergonomic Comfort-Fit Band"
    ]
  },
  {
    oldFilename: "necklace-u-shape-diamond-pendant-gold-close-up.png",
    categoryFolder: "necklaces",
    categoryTitle: "Necklaces",
    filename: "necklace-aura-u-silhouette-pave-diamond-gold-closeup.png",
    name: "Aura U-Silhouette Micropavé Diamond Pendant Necklace (Macro Detail)",
    slug: "aura-u-silhouette-pave-diamond-pendant-necklace-closeup",
    desc: "Intricate macro view capturing the precision prong setting and brilliant light dispersion of the micropavé diamonds. [Macro Detail Showcase]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: None (Architectural U-Motif)",
      "Side Stones: 0.45ct tw Round Brilliant Micropavé Diamonds (VVS/F)",
      "Certification: NGJA & GIA Certified",
      "Details: High-Polish Micro-Prong Detailing"
    ]
  },
  {
    oldFilename: "earrings-gold-textured-dangle-teardrop.png",
    categoryFolder: "earrings",
    categoryTitle: "Earrings",
    filename: "earrings-florentine-ripple-teardrop-dangle-gold.png",
    name: "Florentine Ripple Gilded Teardrop Dangle Earrings",
    slug: "florentine-ripple-gilded-teardrop-dangle-earrings",
    desc: "Artisanal drop earrings featuring hand-engraved Florentine ripple teardrops suspended from polished 18K gold huggie loops. [Showcase View]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: None (Florentine Ripple Engraving)",
      "Side Stones: None",
      "Certification: 18K Hallmark Certified",
      "Details: French Wire Leverback Closure"
    ]
  },
  {
    oldFilename: "necklace-gold-textured-dangle-teardrop.png",
    categoryFolder: "necklaces",
    categoryTitle: "Necklaces",
    filename: "necklace-florentine-ripple-teardrop-gold-01.png",
    name: "Florentine Ripple Gilded Teardrop Pendant Necklace",
    slug: "florentine-ripple-gilded-teardrop-pendant-necklace",
    desc: "A luminous teardrop pendant finished with Italian Florentine stippled texture, suspended on a fine 18K gold cable chain. [Front View]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: None (Florentine Stippled Texture)",
      "Side Stones: None",
      "Certification: 18K Hallmark Certified",
      "Details: 18.0 Inch Fine Link Chain with Lobster Catch"
    ]
  },
  {
    oldFilename: "bracelet-gold-textured-dangle-teardrop.png",
    categoryFolder: "bracelets",
    categoryTitle: "Bracelets",
    filename: "bracelet-florentine-ripple-teardrop-gold.png",
    name: "Florentine Ripple Gilded Teardrop Chain Bracelet",
    slug: "florentine-ripple-gilded-teardrop-chain-bracelet",
    desc: "Delicate chain bracelet adorned with a shimmering Florentine ripple teardrop charm in solid 18K yellow gold. [Showcase View]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: None (Florentine Stippled Texture)",
      "Side Stones: None",
      "Certification: 18K Hallmark Certified",
      "Details: 7.0 Inch Adjustable Fit with Safety Tag"
    ]
  },
  {
    oldFilename: "earrings-tricolor-interlocking-rings-studs.png",
    categoryFolder: "earrings",
    categoryTitle: "Earrings",
    filename: "earrings-trinity-entwined-tricolor-gold-studs-01.png",
    name: "Trinity Entwined Tri-Color Gold Stud Earrings",
    slug: "trinity-entwined-tricolor-gold-stud-earrings",
    desc: "Harmonious interlocking circular bands in solid 18K Rose Gold, Yellow Gold, and White Gold with a seamless mirror finish. [Showcase View]",
    specs: [
      "Metal: 18K Tri-Color Gold (Rose, Yellow, White)",
      "Center Stone: None (Seamless Rolling Geometry)",
      "Side Stones: None",
      "Certification: 18K Gold Hallmark Certified",
      "Details: Push-Back Posts with Comfort Discs"
    ]
  },
  {
    oldFilename: "earrings-tricolor-interlocking-rings-studs-close-up.png",
    categoryFolder: "earrings",
    categoryTitle: "Earrings",
    filename: "earrings-trinity-entwined-tricolor-gold-studs-closeup.png",
    name: "Trinity Entwined Tri-Color Gold Stud Earrings (Macro Detail)",
    slug: "trinity-entwined-tricolor-gold-stud-earrings-closeup",
    desc: "Close macro perspective highlighting the flawless junction and fluid curvature of the tri-color rolling gold bands. [Macro Detail Showcase]",
    specs: [
      "Metal: 18K Tri-Color Gold (Rose, Yellow, White)",
      "Center Stone: None",
      "Side Stones: None",
      "Certification: 18K Gold Hallmark Certified",
      "Details: High-Polish Tri-Tone Junction"
    ]
  },
  {
    oldFilename: "necklace-u-shape-diamond-pendant-gold-model.png",
    categoryFolder: "necklaces",
    categoryTitle: "Necklaces",
    filename: "necklace-aura-u-silhouette-pave-diamond-gold-model.png",
    name: "Aura U-Silhouette Micropavé Diamond Pendant Necklace (Editorial)",
    slug: "aura-u-silhouette-pave-diamond-pendant-necklace-model",
    desc: "Editorial styling on collarbone showcasing the refined proportion and fluid drape of the 18K gold link chain. [Model Editorial View]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: None (Architectural U-Motif)",
      "Side Stones: 0.45ct tw Round Brilliant Micropavé Diamonds (VVS/F)",
      "Certification: NGJA & GIA Certified",
      "Details: 18.0 Inch Adjustable On-Model View"
    ]
  },
  {
    oldFilename: "ring-yellow-gold-diamond-u-shape-model.png",
    categoryFolder: "rings",
    categoryTitle: "Rings",
    filename: "ring-aura-u-contour-pave-diamond-gold-model.png",
    name: "Aura U-Contour Micropavé Diamond Cocktail Ring (Editorial)",
    slug: "aura-u-contour-pave-diamond-cocktail-ring-model",
    desc: "Styled on hand illustrating the statement contour profile and ergonomic knuckle fit. [Model Editorial View]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: None (Open Contour Design)",
      "Side Stones: 0.35ct tw Round Brilliant Diamonds (VVS/F)",
      "Certification: NGJA Certified",
      "Details: Styled Hand Presentation"
    ]
  },
  {
    oldFilename: "necklace-gold-textured-dangle-teardrop-model.png",
    categoryFolder: "necklaces",
    categoryTitle: "Necklaces",
    filename: "necklace-florentine-ripple-teardrop-gold-model.png",
    name: "Florentine Ripple Gilded Teardrop Pendant Necklace (Editorial)",
    slug: "florentine-ripple-gilded-teardrop-pendant-necklace-model",
    desc: "Editorial portrait styling capturing the warm diffuse glow of the hand-textured 18K gold teardrop pendant. [Model Editorial View]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: None (Florentine Stippled Texture)",
      "Side Stones: None",
      "Certification: 18K Hallmark Certified",
      "Details: 18.0 Inch Styled Showcase"
    ]
  },
  {
    oldFilename: "necklace-gold-textured-dangle-teardrop-model-close.png",
    categoryFolder: "necklaces",
    categoryTitle: "Necklaces",
    filename: "necklace-florentine-ripple-teardrop-gold-model-closeup.png",
    name: "Florentine Ripple Gilded Teardrop Pendant Necklace (Model Close-Up)",
    slug: "florentine-ripple-gilded-teardrop-pendant-necklace-model-closeup",
    desc: "Macro on-model focus showcasing the artisanal ripple texturing and fluid golden movement. [Model Close-Up Showcase]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: None (Florentine Ripple Finish)",
      "Side Stones: None",
      "Certification: 18K Hallmark Certified",
      "Details: Hand-Textured Artisan Relief"
    ]
  },
  {
    oldFilename: "earrings-tricolor-interlocking-rings-studs-model.png",
    categoryFolder: "earrings",
    categoryTitle: "Earrings",
    filename: "earrings-trinity-entwined-tricolor-gold-studs-model.png",
    name: "Trinity Entwined Tri-Color Gold Stud Earrings (Editorial)",
    slug: "trinity-entwined-tricolor-gold-stud-earrings-model",
    desc: "Editorial ear-styling highlighting the delicate tri-gold warmth complementing every skin tone. [Model Styling View]",
    specs: [
      "Metal: 18K Tri-Color Gold (Rose, Yellow, White)",
      "Center Stone: None",
      "Side Stones: None",
      "Certification: 18K Gold Hallmark Certified",
      "Details: Styled On-Ear Perspective"
    ]
  },
  {
    oldFilename: "ring-tricolor-interlocking-rings-model.png",
    categoryFolder: "rings",
    categoryTitle: "Rings",
    filename: "ring-trinity-entwined-tricolor-rolling-band-model.png",
    name: "Trinity Entwined Tri-Color Rolling Band Ring (Editorial)",
    slug: "trinity-entwined-tricolor-rolling-band-ring-model",
    desc: "A timeless classic of three intertwined rolling bands in 18K Rose, Yellow, and White Gold. [Model Styling View]",
    specs: [
      "Metal: 18K Tri-Color Gold (Rose, Yellow, White)",
      "Center Stone: None (3-Band Interlocking Rolling Design)",
      "Side Stones: None",
      "Certification: 18K Gold Hallmark Certified",
      "Details: Fluid Rolling Comfort Band"
    ]
  },
  {
    oldFilename: "necklace-tricolor-interlocking-rings-model.png",
    categoryFolder: "necklaces",
    categoryTitle: "Necklaces",
    filename: "necklace-trinity-entwined-tricolor-gold-model.png",
    name: "Trinity Entwined Tri-Color Halo Pendant Necklace (Editorial)",
    slug: "trinity-entwined-tricolor-halo-pendant-necklace-model",
    desc: "Three interlocking rings in rose, yellow, and white gold suspended gracefully on a fine 18K chain. [Model Styling View]",
    specs: [
      "Metal: 18K Tri-Color Gold (Rose, Yellow, White)",
      "Center Stone: None (Interlocking Tri-Color Rings)",
      "Side Stones: None",
      "Certification: 18K Gold Hallmark Certified",
      "Details: 18.0 Inch Fine Chain"
    ]
  },
  {
    oldFilename: "necklace-tricolor-interlocking-rings-model-close.png",
    categoryFolder: "necklaces",
    categoryTitle: "Necklaces",
    filename: "necklace-trinity-entwined-tricolor-gold-model-closeup.png",
    name: "Trinity Entwined Tri-Color Halo Pendant Necklace (Model Close-Up)",
    slug: "trinity-entwined-tricolor-halo-pendant-necklace-model-closeup",
    desc: "Intimate on-model close-up revealing the precision polish and fluid alignment of the tri-color rings. [Model Close-Up Showcase]",
    specs: [
      "Metal: 18K Tri-Color Gold (Rose, Yellow, White)",
      "Center Stone: None",
      "Side Stones: None",
      "Certification: 18K Gold Hallmark Certified",
      "Details: Intimate Decolletage Detail"
    ]
  },
  {
    oldFilename: "bracelet-tricolor-interlocking-rings-model.png",
    categoryFolder: "bracelets",
    categoryTitle: "Bracelets",
    filename: "bracelet-trinity-entwined-tricolor-gold-model.png",
    name: "Trinity Entwined Tri-Color Station Chain Bracelet (Editorial)",
    slug: "trinity-entwined-tricolor-station-chain-bracelet-model",
    desc: "Refined wrist chain highlighted by interlocking tri-tone miniature rolling rings. [Model Styling View]",
    specs: [
      "Metal: 18K Tri-Color Gold (Rose, Yellow, White)",
      "Center Stone: None (Tri-Color Miniature Ring Station)",
      "Side Stones: None",
      "Certification: 18K Gold Hallmark Certified",
      "Details: 7.0 Inch Adjustable Chain with Lobster Catch"
    ]
  },
  {
    oldFilename: "earrings-u-shape-diamond-studs-gold.png",
    categoryFolder: "earrings",
    categoryTitle: "Earrings",
    filename: "earrings-aura-u-contour-pave-diamond-studs-gold.png",
    name: "Aura U-Contour Micropavé Diamond Stud Earrings",
    slug: "aura-u-contour-pave-diamond-stud-earrings",
    desc: "Sleek architectural stud earrings mirroring the iconic U-contour in solid 18K yellow gold with pavé-set diamonds. [Studio Showcase]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: None (Architectural U-Contour)",
      "Side Stones: 0.40ct tw Round Brilliant Micropavé Diamonds (VVS/F)",
      "Certification: NGJA & GIA Certified",
      "Details: Secure Threaded Push-Back Posts"
    ]
  },
  {
    oldFilename: "ring-yellow-gold-diamond-u-shape-glass.png",
    categoryFolder: "rings",
    categoryTitle: "Rings",
    filename: "ring-aura-u-contour-pave-diamond-gold-glass.png",
    name: "Aura U-Contour Micropavé Diamond Cocktail Ring (Glass Reflection)",
    slug: "aura-u-contour-pave-diamond-cocktail-ring-glass",
    desc: "Artistic high-fashion composition on reflective fluted glass highlighting the polished gold luster. [Creative Glass Showcase]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: None (Open Contour Silhouette)",
      "Side Stones: 0.35ct tw Round Brilliant Diamonds (VVS/F)",
      "Certification: NGJA Certified",
      "Details: Creative Prismatic Showcase"
    ]
  },
  {
    oldFilename: "necklace-u-shape-link-pendant-twotone.png",
    categoryFolder: "necklaces",
    categoryTitle: "Necklaces",
    filename: "necklace-bicolor-duo-link-elongated-pendant-gold.png",
    name: "Bicolor Duo-Link Elongated Pendant Necklace",
    slug: "bicolor-duo-link-elongated-pendant-necklace",
    desc: "Striking modernist pendant featuring interlocking elongated paperclip links in contrasting 18K yellow and white gold. [Showcase View]",
    specs: [
      "Metal: 18K Two-Tone Gold (Yellow & White)",
      "Center Stone: None (Bicolor Elongated Link Geometry)",
      "Side Stones: None",
      "Certification: 18K Hallmark Certified",
      "Details: 18.0 Inch Heavy Paperclip Link Chain"
    ]
  },
  {
    oldFilename: "necklace-hexagon-geometric-pendant-gold.png",
    categoryFolder: "necklaces",
    categoryTitle: "Necklaces",
    filename: "necklace-prism-geometric-hexagon-pendant-gold.png",
    name: "Prism Geometric Hexagon Pendant Necklace",
    slug: "prism-geometric-hexagon-pendant-necklace",
    desc: "Architectural open hexagon prism pendant hand-cast in high-polish 18K yellow gold, suspended from a classic link chain. [Showcase View]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: None (Hexagonal Prism Geometry)",
      "Side Stones: None",
      "Certification: 18K Hallmark Certified",
      "Details: 18.0 Inch Fine Cable Chain"
    ]
  },
  {
    oldFilename: "ring-hexagon-geometric-gold.png",
    categoryFolder: "rings",
    categoryTitle: "Rings",
    filename: "ring-prism-geometric-hexagon-gold.png",
    name: "Prism Geometric Hexagon Signet Ring",
    slug: "prism-geometric-hexagon-signet-ring",
    desc: "Bold geometric cocktail ring boasting a clean hexagonal prism crown in polished 18K solid yellow gold. [Showcase View]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: None (Faceted Hexagon Gold Crown)",
      "Side Stones: None",
      "Certification: 18K Hallmark Certified",
      "Details: Tapered Ergonomic Shank"
    ]
  },
  {
    oldFilename: "earrings-white-gold-diamond-teardrop-dangle.png",
    categoryFolder: "earrings",
    categoryTitle: "Earrings",
    filename: "earrings-cascading-starlight-pave-diamond-teardrop-white-gold.png",
    name: "Cascading Starlight Pavé Diamond Teardrop Earrings",
    slug: "cascading-starlight-pave-diamond-teardrop-earrings",
    desc: "Opulent evening chandelier drops in 18K white gold, encrusted with a river of brilliant micropavé diamonds. [Showcase View]",
    specs: [
      "Metal: 18K Solid White Gold",
      "Center Stone: None (Openwork Chandelier Drops)",
      "Side Stones: 1.20ct tw Round Brilliant Micropavé Diamonds (VVS/F)",
      "Certification: NGJA & GIA Certified",
      "Details: French Wire with Safety Catch"
    ]
  },
  {
    oldFilename: "bracelet-geometric-coin-circle-link-gold.png",
    categoryFolder: "bracelets",
    categoryTitle: "Bracelets",
    filename: "bracelet-imperial-medallion-disc-link-gold.png",
    name: "Imperial Medallion Disc Link Bracelet",
    slug: "imperial-medallion-disc-link-bracelet",
    desc: "Statement link bracelet featuring alternating satin-brushed circular coin medallions and polished gold connectors in 18K gold. [Showcase View]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: None (Satin Brushed Coin Discs)",
      "Side Stones: None",
      "Certification: 18K Hallmark Certified",
      "Details: 7.25 Inch Wrist Length with Integrated Box Clasp"
    ]
  },
  {
    oldFilename: "bracelet-textured-rigid-bangle-gold.png",
    categoryFolder: "bracelets",
    categoryTitle: "Bracelets",
    filename: "bracelet-florentine-stippled-torque-cuff-bangle-gold.png",
    name: "Florentine Stippled Gold Torque Cuff Bangle",
    slug: "florentine-stippled-gold-torque-cuff-bangle",
    desc: "Substantial rigid torque bangle featuring masterfully engraved Florentine stippled engraving across solid 18K yellow gold. [Showcase View]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: None (All-Around Florentine Stippled Texture)",
      "Side Stones: None",
      "Certification: 18K Hallmark Certified",
      "Details: Hinged Design with Concealed Safety Latch"
    ]
  },
  {
    oldFilename: "necklace-tricolor-interlocking-rings.png",
    categoryFolder: "necklaces",
    categoryTitle: "Necklaces",
    filename: "necklace-trinity-entwined-tricolor-gold-01.png",
    name: "Trinity Entwined Tri-Color Halo Pendant Necklace",
    slug: "trinity-entwined-tricolor-halo-pendant-necklace",
    desc: "Three interlocking rings in rose, yellow, and white gold suspended gracefully on a fine 18K chain. [Front View]",
    specs: [
      "Metal: 18K Tri-Color Gold (Rose, Yellow, White)",
      "Center Stone: None (Interlocking Tri-Tone Bands)",
      "Side Stones: None",
      "Certification: 18K Gold Hallmark Certified",
      "Details: 18.0 Inch Adjustable 18K Gold Chain"
    ]
  },
  {
    oldFilename: "ring-rosegold-ruby-bypass-glass.png",
    categoryFolder: "rings",
    categoryTitle: "Rings",
    filename: "ring-duet-crimson-ruby-bypass-rosegold-glass.png",
    name: "Duet Crimson Ruby Bypass Ring in 18K Rose Gold",
    slug: "duet-crimson-ruby-bypass-ring-rosegold",
    desc: "Romantic bypass silhouette in 18K rose gold holding dual round brilliant natural crimson rubies in floating bezel settings. [Creative Glass View]",
    specs: [
      "Metal: 18K Solid Rose Gold",
      "Center Stone: 0.85ct tw Natural Round Brilliant Crimson Rubies",
      "Side Stones: None",
      "Certification: NGJA Certified",
      "Details: Bypass Ergonomic Shank with Bezel Prongs"
    ]
  },
  {
    oldFilename: "earrings-pink-gemstone-square-diamond-halo-studs.png",
    categoryFolder: "earrings",
    categoryTitle: "Earrings",
    filename: "earrings-rose-blossom-pink-sapphire-diamond-halo-studs.png",
    name: "Rose Blossom Pink Sapphire & Diamond Cushion Halo Studs",
    slug: "rose-blossom-pink-sapphire-diamond-halo-studs",
    desc: "Regal square cushion studs featuring vibrant natural Ceylon pink sapphires encircled by a pavé diamond halo in 18K white gold. [Showcase View]",
    specs: [
      "Metal: 18K Solid White Gold",
      "Center Stone: 1.50ct tw Natural Square-Cut Ceylon Pink Sapphires",
      "Side Stones: 0.40ct tw Round Brilliant Diamonds (VVS/F)",
      "Certification: NGJA & GIA Certified",
      "Details: Double-Notch Push-Back Posts"
    ]
  },
  {
    oldFilename: "necklace-oval-emerald-diamond-halo-gold.png",
    categoryFolder: "necklaces",
    categoryTitle: "Necklaces",
    filename: "necklace-verdant-sovereign-oval-emerald-diamond-halo-gold-01.png",
    name: "Verdant Sovereign Oval Zambian Emerald & Diamond Halo Necklace",
    slug: "verdant-sovereign-oval-emerald-diamond-halo-necklace",
    desc: "A breathtaking natural oval Zambian emerald of deep velvety green, encircled by a radiant halo of brilliant diamonds in 18K yellow gold. [Front View]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: 1.25ct Natural Oval-Cut Zambian Emerald",
      "Side Stones: 0.30ct tw Round Brilliant Diamonds (VVS/F)",
      "Certification: NGJA & GIA Certified",
      "Details: 18.0 Inch 18K Solid Gold Cable Chain"
    ]
  },
  {
    oldFilename: "ring-round-emerald-diamond-halo-gold.png",
    categoryFolder: "rings",
    categoryTitle: "Rings",
    filename: "ring-verdant-solstice-round-emerald-diamond-halo-gold.png",
    name: "Verdant Solstice Round Emerald & Diamond Halo Ring",
    slug: "verdant-solstice-round-emerald-diamond-halo-ring",
    desc: "A vivid round brilliant Zambian emerald framed by a sparkling micro-pavé diamond halo on an 18K gold split-shoulder band. [Showcase View]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: 1.10ct Natural Round Brilliant Zambian Emerald",
      "Side Stones: 0.35ct tw Micropavé Diamonds (VVS/F)",
      "Certification: NGJA & GIA Certified",
      "Details: Split-Shoulder Comfort Band"
    ]
  },
  {
    oldFilename: "necklace-oval-emerald-diamond-halo-gold-close.png",
    categoryFolder: "necklaces",
    categoryTitle: "Necklaces",
    filename: "necklace-verdant-sovereign-oval-emerald-diamond-halo-gold-closeup.png",
    name: "Verdant Sovereign Oval Zambian Emerald & Diamond Halo Necklace (Close-Up)",
    slug: "verdant-sovereign-oval-emerald-diamond-halo-necklace-closeup",
    desc: "Macro close-up capturing the rich saturation, internal garden clarity, and diamond fire of the Zambian emerald pendant. [Close Up View]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: 1.25ct Natural Oval-Cut Zambian Emerald",
      "Side Stones: 0.30ct tw Round Brilliant Diamonds (VVS/F)",
      "Certification: NGJA & GIA Certified",
      "Details: Macro Gemological Showcase"
    ]
  },
  {
    oldFilename: "ring-multicolor-gemstone-half-eternity-gold.png",
    categoryFolder: "rings",
    categoryTitle: "Rings",
    filename: "ring-prismatic-ceylon-multicolor-sapphire-eternity-gold-01.png",
    name: "Prismatic Ceylon Multicolor Sapphire Half-Eternity Band",
    slug: "prismatic-ceylon-multicolor-sapphire-half-eternity-band",
    desc: "A vibrant spectrum of natural fancy Ceylon sapphires in yellow, orange, pink, purple, and blue set in 18K yellow gold. [Showcase View]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: 1.80ct tw Natural Multicolor Ceylon Sapphires",
      "Side Stones: None",
      "Certification: NGJA Certified",
      "Details: Channel-Set Half-Eternity Band"
    ]
  },
  {
    oldFilename: "ring-multicolor-gemstone-half-eternity-gold-close.png",
    categoryFolder: "rings",
    categoryTitle: "Rings",
    filename: "ring-prismatic-ceylon-multicolor-sapphire-eternity-gold-closeup.png",
    name: "Prismatic Ceylon Multicolor Sapphire Half-Eternity Band (Close-Up)",
    slug: "prismatic-ceylon-multicolor-sapphire-half-eternity-band-closeup",
    desc: "Intricate reflection detail highlighting the rainbow chromatic transition and precision prong alignment. [Macro Detail Showcase]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: 1.80ct tw Natural Multicolor Ceylon Sapphires",
      "Side Stones: None",
      "Certification: NGJA Certified",
      "Details: Precision Shared-Prong Setting"
    ]
  },
  {
    oldFilename: "earrings-round-emerald-diamond-halo-studs-gold.png",
    categoryFolder: "earrings",
    categoryTitle: "Earrings",
    filename: "earrings-verdant-solstice-round-emerald-diamond-halo-studs-gold.png",
    name: "Verdant Solstice Round Emerald & Diamond Halo Stud Earrings",
    slug: "verdant-solstice-round-emerald-diamond-halo-stud-earrings",
    desc: "Timeless studs showcasing matched vivid round Zambian emeralds encircled by fine diamond halos in 18K yellow gold. [Showcase View]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: 1.20ct tw Natural Round Zambian Emeralds",
      "Side Stones: 0.40ct tw Round Brilliant Diamonds (VVS/F)",
      "Certification: NGJA & GIA Certified",
      "Details: 4-Prong Center with Push-Back Posts"
    ]
  },
  {
    oldFilename: "earrings-white-gold-diamond-huggie-hoops.png",
    categoryFolder: "earrings",
    categoryTitle: "Earrings",
    filename: "earrings-lumiere-pave-diamond-huggie-hoops-white-gold.png",
    name: "Lumière Pavé Diamond Seamless Huggie Hoop Earrings",
    slug: "lumiere-pave-diamond-seamless-huggie-hoop-earrings",
    desc: "Seamless everyday luxury in 18K white gold, encrusted along the front curvature with sparkling pavé diamonds. [Showcase View]",
    specs: [
      "Metal: 18K Solid White Gold",
      "Center Stone: None",
      "Side Stones: 0.75ct tw Round Brilliant Diamonds (VVS/F)",
      "Certification: NGJA & GIA Certified",
      "Details: Seamless Hinged Snap Closure"
    ]
  },
  {
    oldFilename: "bracelet-textured-rigid-bangle-screw-details-gold.png",
    categoryFolder: "bracelets",
    categoryTitle: "Bracelets",
    filename: "bracelet-riviera-industrial-screw-textured-bangle-gold.png",
    name: "Riviera Industrial Screw-Accent Textured Bangle",
    slug: "riviera-industrial-screw-accent-textured-bangle",
    desc: "Bold architectural solid bangle in 18K yellow gold, pairing a stippled matte finish with high-polish industrial screw accents. [Showcase View]",
    specs: [
      "Metal: 18K Solid Yellow Gold",
      "Center Stone: None (Textured Surface with Screw Motifs)",
      "Side Stones: None",
      "Certification: 18K Hallmark Certified",
      "Details: Hinged Oval Wrist Contour with Safety Catch"
    ]
  }
];

async function syncLuxuryShoot() {
  console.log("Starting Luxury Sanity Sync for 36 items...");
  let count = 0;

  for (const item of itemsData) {
    const filePath = path.join(assetsBaseDir, item.categoryFolder, item.filename);
    if (!fs.existsSync(filePath)) {
      console.error(`File missing: ${filePath}`);
      continue;
    }

    console.log(`Uploading new asset: ${item.filename}...`);
    const fileStream = fs.createReadStream(filePath);
    const asset = await client.assets.upload('image', fileStream, {
      filename: item.filename,
    });
    console.log(`Asset uploaded. Asset ID: ${asset._id}`);

    // Search for existing document by oldFilename or new slug or matching current img filename
    const query = `*[_type == "product" && (
      img.asset->originalFilename == $oldFilename || 
      img.asset->originalFilename == $newFilename ||
      slug.current == $oldSlug ||
      slug.current == $newSlug
    )][0]`;
    
    // Construct old slug guess (slug without hyphens or with hyphens)
    const oldSlug1 = item.oldFilename.replace(/\.png$/, '').replace(/-/g, '');
    const oldSlug2 = item.oldFilename.replace(/\.png$/, '');

    const existingDoc = await client.fetch(query, {
      oldFilename: item.oldFilename,
      newFilename: item.filename,
      oldSlug: oldSlug1,
      newSlug: item.slug
    });

    const docData = {
      name: item.name,
      slug: { _type: 'slug', current: item.slug },
      type: 'Jewelry',
      category: item.categoryTitle,
      price: 'Price Upon Request',
      featured: false,
      description: item.desc,
      specifications: item.specs,
      img: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      },
    };

    if (existingDoc) {
      console.log(`Updating existing doc (${existingDoc._id}) -> "${item.name}"`);
      await client.patch(existingDoc._id).set(docData).commit();
    } else {
      console.log(`Creating new doc -> "${item.name}"`);
      await client.create({ _type: 'product', ...docData });
    }

    count++;
  }

  console.log(`\nSuccessfully synced ${count} products to Sanity!`);

  // Refetch full inventory to sanity_products.json
  console.log("Refetching all products from Sanity...");
  const refetchQuery = `*[_type == "product"] | order(_createdAt desc) {
    name,
    "slug": slug.current,
    type,
    category,
    price,
    featured,
    description,
    specifications,
    "image_filename": img.asset->originalFilename
  }`;

  const allProducts = await client.fetch(refetchQuery);
  const sanityProductsPath = path.join(__dirname, '..', '..', 'sanity_products.json');
  fs.writeFileSync(sanityProductsPath, JSON.stringify(allProducts, null, 2));
  console.log(`Saved ${allProducts.length} live products to sanity_products.json`);
}

syncLuxuryShoot().catch(console.error);
