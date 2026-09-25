import katanaImage from "../assets/Products/sword.jpg";
import foamGunImage from "../assets/Products/halo foam gun.jpg";
import foldingKnifeImage from "../assets/Products/knife.jpg";
import deadpoolKatanaImage from "../assets/Products/Deadpool Katanas.png";
import lordOfTheRingsHelmetImage from "../assets/Products/lord of the rings helmet.png";

export const SALES_TAX_RATE = 0.0725;

export const defaultProductItems = [
  {
    _id: "katana-display",
    name: "Katana Display Set",
    description:
      "A visually striking katana display set designed for collectors and fans who want a premium centerpiece for their shelf or wall.",
    image: katanaImage,
  },
  {
    _id: "halo-foam-gun",
    name: "Shotgun",
    description:
      "A lightweight foam blaster inspired by sci-fi action gameplay, crafted for display, cosplay, and playful reenactments.",
    image: foamGunImage,
  },
  {
    _id: "folding-knife",
    name: "Tactical Folding Knife",
    description:
      "A compact folding knife built with a practical tactical design, ideal for utility, collection display, or everyday carry styling.",
    image: foldingKnifeImage,
  },
];

export const defaultNewArrivals = [
  {
    _id: "katana",
    name: "Deadpool Katanas",
    description:
      "The product is a set of dual katana swords inspired by the character Deadpool, complete with a back sheath for storage and transport. These replica blades are designed to resemble the weapons wielded by Deadpool in various media appearances. Perfect for fans of the anti-hero Deadpool, these swords can be used for display.",
    category: "Anime, Katana, Marvel",
    image: deadpoolKatanaImage,
    price: 158.56,
  },
  {
    _id: "red-hood-foam-gun",
    name: "Red Hood Foam Gun",
    description:
      "Embrace the dark side of justice with the Red Hood / Arkham Knight Pistol from Batman: Arkham Knight. Crafted entirely from foam, this replica is perfect for cosplay, display, or collection purposes. The gun’s design mirrors the exact details seen in the game, showcasing Red Hood’s signature style, with sharp lines and a rugged, tactical aesthetic. Its lightweight foam material ensures it’s safe for conventions and easy to handle while still looking game-accurate. Fans of Batman: Arkham Knight will appreciate the authentic look and feel of this iconic weapon, making it a perfect addition for collectors or cosplayers alike..",
    category: "Anime, Foam Gun, Batman",
    image:
      "https://cdn11.bigcommerce.com/s-dd172/images/stencil/1920x1920/products/6284/25443/GH45__91568.1722373972.jpg?c=2&imbypass=on",
    price: 37.55,
  },
  {
    _id: "helmet",
    name: "Lord of the Rings-The Helm of King Elendil United Cutlery",
    description:
      "Replica of of the helmet seen in the New Line Cinema motion picture The Lord of the Rings: The Fellowship of the Ring. Iron construction with embossed brass decorations and a weathered and distressed finish. It is fully wearable and looks great on display. Leather lining. Individually serialized on a solid brass plate mounted on the inside back of the helmet to insure authenticity. Wooden display stand silkscreened with The One Ring inscription. Limited edition run of 5000 individually serialized pieces worldwide. Boxed.",
    category: "Armor, Helmet",
    image: lordOfTheRingsHelmetImage,
    price: 409.0,
  },
];

export const defaultProductLists = [
  {
    _id: "red-hood-foam-gun",
    name: "Red Hood Foam Gun",
    description:
      "Embrace the dark side of justice with the Red Hood / Arkham Knight Pistol from Batman: Arkham Knight. Crafted entirely from foam, this replica is perfect for cosplay, display, or collection purposes. The gun’s design mirrors the exact details seen in the game, showcasing Red Hood’s signature style, with sharp lines and a rugged, tactical aesthetic. Its lightweight foam material ensures it’s safe for conventions and easy to handle while still looking game-accurate. Fans of Batman: Arkham Knight will appreciate the authentic look and feel of this iconic weapon, making it a perfect addition for collectors or cosplayers alike..",
    category: "Anime and Game Collection, Foam Gun",
    image:
      "https://cdn11.bigcommerce.com/s-dd172/images/stencil/1920x1920/products/6284/25443/GH45__91568.1722373972.jpg?c=2&imbypass=on",
    price: 37.55,
  },
  {
    _id: "vash-the-stampede",
    name: "Vash the Stampede Foam Gun",
    description:
      "A stylized anime-inspired foam gun with a distinctive look that fits fans of iconic series collectibles, cosplay, and display shelves.",
    category: "Anime, Foam Gun",
    image: "https://i.ebayimg.com/images/g/a7EAAeSwJm1qkdxp/s-l1600.webp",
    price: 35.45,
  },
  {
    _id: "fallout-10-mm-pistol",
    name: "Fallout 10mm Pistol 9-Inch Foam Replica",
    description:
      "The Fallout 10mm Pistol 9-Inch Foam Replica, manufactured by Neptune Trading, is a gun replica inspired by the popular video game series. This replica, while not functional, is perfect for fans looking to showcase their love for the Fallout universe. The 9-inch size makes it a unique and eye-catching piece of video game merchandise that would be a great addition to any collection..",
    category: "Anime, Foam Gun",
    image: "https://i.ebayimg.com/images/g/wygAAeSweR5pWL4g/s-l1600.webp",
    price: 34.99,
  },
  {
    _id: "Gnasher-shotgun",
    name: "Gears Of War Gnasher Foam Shotgun 1:1 Gun Toys Cosplay Full Size",
    description:
      "The 24 in Gears of War Gnasher Foam Shotgun is a 1:1 scale replica toy inspired by the iconic weapon from the popular video game series. This full-size foam shotgun is perfect for fans looking to bring a piece of the game into the real world. Whether for cosplay or display, this unique item allows gamers to engage with their favorite franchise in a playful and safe manner.",
    category: "Anime, Foam Gun",
    image: "https://i.ebayimg.com/images/g/L34AAeSwm9NpWCKy/s-l1600.webp",
    images: [
      "https://i.ebayimg.com/images/g/L34AAeSwm9NpWCKy/s-l1600.webp",
      "https://i.ebayimg.com/images/g/-nUAAeSwyElpWCKx/s-l1600.webp",
    ],
    price: 85.99,
  },
  {
    _id: "batman-grapple-gun",
    name: "8.25” The Batman Grapple Launcher Replica Collectible Foam Gun Cosplay Costume",
    description: "Foam Batman Grapple Launcher",
    category: "Anime, Foam Gun",
    image: "https://i.ebayimg.com/images/g/brUAAeSw8Ghp9nT2/s-l1600.webp",
    price: 30.55,
  },
  {
    _id: "doom-plasma-rifle",
    name: "Doom Eternal Plasma Rifle Replica Toy Made Of Foam Video Games Full Size 23”",
    description:
      "The Doom Eternal Plasma Rifle Replica Toy is a 23-inch full-size replica gun made of foam, inspired by the popular video game series Doom. Designed as a gun replica for enthusiasts and collectors, this product is a must-have for fans of the franchise. Made in the United States, this unique item allows users to hold and display a replica of the iconic weapon from the game, making it a valuable addition to any video game merchandise collection.",
    category: "Anime, Foam Gun",
    image: "https://i.ebayimg.com/images/g/VzwAAeSwRNhpYo5C/s-l1600.webp",
    price: 30.55,
  },
  {
    _id: "fallout-laser-pistol",
    name: "Fallout Laser Pistol Replica",
    description:
      "The Fallout Laser Pistol Replica Foam is a unique collectible item inspired by the popular video game series and TV show. This gun replica is a part of the Bethesda brand's product line, specifically designed for fans of the Fallout series. The model, featuring the character of the Courier, is a precise representation of the laser pistol from the game Fallout 4. Made in the China, this replica is a must-have for any video game enthusiast looking to add a piece of their favorite game to their collection..",
    category: "Anime, Foam Gun",
    image: "https://i.ebayimg.com/images/g/3qYAAeSw-xxpjsn2/s-l1600.webp",
    price: 45.55,
  },
  {
    _id: "rick-deckard-blaster",
    name: "Blade Runner - Rick Deckard's Blaster",
    description:
      "Blade Runner Rick Deckard blaster prop replica with translucent orange grip. Handcrafted sci-fi display piece for cosplay and collectors.",
    category: "Anime, Foam Gun",
    image: "https://i.ebayimg.com/images/g/7xYAAeSwmH9p2AdA/s-l1600.webp",
    price: 365.55,
  },
  {
    _id: "legend-of-zelda-wall-sword",
    name: "Legend of Zelda Master Skyward Sword Full Size Metal Replica with Wall Display",
    description:
      "The Legend of Zelda Master Sword has a glossy metallic blue metal hilt and guard. The hilt has hand painted green accents signature of the Skyward Sword. Golden painted accents adorn the guard to make the piece pop.  The 440 stainless steel blade comes with a factory edge and the Triforce symbol etched on both sides of the blade. Included is a wooden wall plaque so you can proudly display your piece.  The plaque is silkscreened with a golden Triforce symbol and darkened around the outer edges.",
    category: "Anime, Fantasy Swords, Swords",
    image: "https://i.ebayimg.com/images/g/xVwAAeSwqGRpXCoF/s-l1600.webp",
    price: 111.55,
  },
  {
    _id: "joker",
    name: "11.5” Suicide Squad - Joker M1911 Pistol Replica Collectible Cosplay Foam Gun",
    description:
      "Unveil your chaotic side with the Joker M1911 Pistol, a beautifully crafted foam replica from Suicide Squad, designed for cosplay, collection, or display purposes. Measuring 11.5 inches by 7 inches with an 11.5-inch foam barrel and a 4-inch foam grip, this replica captures the Joker's signature flair with striking details. The dark purple body is adorned with intricate golden designs across the barrel, paired with a white and gold grip featuring a devilish engraving, bringing the iconic weapon from the film to life. The gold accents, from the hammer to the magazine base, reflect the Joker’s love for opulence. This collectible foam gun is an ideal addition for fans of Suicide Squad, offering an authentic yet safe prop for cosplay or a must-have piece in any DC collection.",
    category: "Anime, Batman",
    image: "https://i.ebayimg.com/images/g/sqoAAeSwuvJpXsTF/s-l1600.webp",
    price: 35.55,
  },
  {
    _id: "hellsing-pistol",
    name: "15.5” Hellsing Jackal Combat Pistol Replica Collectible Cosplay Foam Gun Prop",
    description:
      "Step into the shadowy world of Hellsing with the Jackal Combat Pistol Replica, Alucard’s devastatingly powerful sidearm forged for obliterating the undead. Designed by Hellsing Arms and inscribed with the ominous “Jesus Christ is in Heaven now,” this oversized foam pistol measures 15.5 inches long and embodies the intimidating presence of its anime counterpart. Crafted entirely from safe, lightweight foam with a black finish and deep brown grip, this replica is perfect for cosplay, conventions, or display setups. Fans of the Hellsing series will recognize this legendary anti-vampire weapon as an essential piece of the collection, making it a standout foam collectible with maximum impact.",
    category: "Anime",
    image: "https://i.ebayimg.com/images/g/wc8AAeSw6fhp1VfJ/s-l1600.webp",
    price: 35.55,
  },
  {
    _id: "destiny-pistol",
    name: "Destiny 2 Duke MK.44 Video Game Replica Prop Gun Foam Cosplay",
    description:
      "The Destiny 2 Duke MK.44 video game replica prop gun is an officially licensed reproduction designed for cosplay or display. This foam gun is a perfect accessory for fans of the popular video game looking to add a touch of authenticity to their cosplay costumes or collections. With its detailed design and high-quality construction, this gun replica from the world of movies will surely be a must-have for any avid collector or fan of the game.",
    category: "Anime",
    image: "https://i.ebayimg.com/images/g/pUkAAeSw~1RplAY2/s-l1600.webp",
    price: 45.58,
  },
  {
    _id: "silent-hill-knife",
    name: "Pyramid Head’s Great Knife Silent Hill 2 Heavy Duty 1:1 Full Size Foam",
    description:
      "46 inch FOAM EXECUTIONER KNIFE PROP Full size 46 inch foam knife designed for horror cosplay, costume events, and display. Features a weathered blade with bloody finish for realistic effect.",
    category: "Anime",
    image: "https://i.ebayimg.com/images/g/6isAAeSwpRtpkS10/s-l1600.webp",
    price: 45.58,
  },
  {
    _id: "jango-fett-blaster",
    name: "Star-Wars-Jango Fett Westar 34 in Blaster Foam Cosplay Replica",
    description:
      "Embrace the iconic bounty hunter aesthetic with the Jango Fett Westar-34 Blaster Foam Replica. This meticulously crafted prop captures the essence of the legendary weapon, offering fans a tangible connection to the Star Wars universe. Whether for cosplay, prop play, or simply as a collector's item, this replica is a must-have for any Star Wars enthusiast.",
    category: "Anime",
    image: "https://i.ebayimg.com/images/g/g28AAeSw3i5pBh3p/s-l1600.webp",
    price: 29.99,
  },
  {
    _id: "needler-blaster",
    name: "18 in Needler Pistol Halo 3 Hand Foam 1:1 Gun Toys Cosplay Full Size",
    description:
      "The 18 in Needler Pistol Halo 3 Hand Foam1:1 Gun Toys Cosplay Full Size is a replica toy gun inspired by the Halo video game series, specifically Halo 3. With a 1:1 scale, this foam gun is designed to resemble the iconic weapon from the game, allowing fans to engage in imaginative play and cosplay. Perfect for collectors or enthusiasts looking to bring a piece of the virtual world to life, this toy gun is sure to be a unique addition to any gaming merchandise collection.",
    category: "Anime",
    image: "https://i.ebayimg.com/images/g/z6AAAeSweN9pazSr/s-l1600.webp",
    price: 65.65,
  },
  {
    _id: "halo3-blaster",
    name: "Halo 3 Type 52 Pistol Hand Foam 1:1 Gun Toys Cosplay Full Size Large",
    description: "Halo 3 Type 52 Pistol.",

    category: "Anime",
    image: "https://i.ebayimg.com/images/g/lncAAeSwC1VqTs51/s-l1600.webp",
    price: 85.65,
  },
  {
    _id: "Lord-of-the-rings-sting",
    name: "Lord of the Rings Movie 28 in Foam Sting Sword with Scabbard",
    description:
      "Step into Middle-earth with the Sting Sword, an iconic foam replica from Lord of the Rings. This 28-inch short sword is crafted for cosplay, collection, or display purposes, featuring a detailed 20-inch silver foam blade engraved with Elvish script and shaped for battle precision. The 8-inch brown foam handle is meticulously designed with golden accents, replicating the sword's intricate craftsmanship from the films. Ideal for cosplayers and fans of Frodo Baggins, this lightweight sword includes a matching foam scabbard with detailed embellishments for added authenticity. Whether you're recreating legendary moments from the films or adding it to your fantasy collection, this Sting Sword brings a perfect balance of safety, design, and craftsmanship for every fan of the series.",

    category: "Anime, fantasy sword",
    image: "https://i.ebayimg.com/images/g/AE0AAeSwVKVqAUht/s-l1600.webp",
    price: 45.65,
  },
  {
    _id: "mandolorian-foam-gun",
    name: "Mandalorian Din Djarin Foam Cosplay Blaster Replica",
    description:
      "Join the ranks of the galaxy’s finest bounty hunters with this Mandalorian Din Djarin Foam Cosplay Blaster Replica, inspired by the iconic weapon wielded by the Mandalorian himself. Modeled after the blaster used by Din Djarin in the Star Wars universe, this foam replica is the ideal finishing touch for any Mandalorian cosplay. Designed for both safety and style, it provides the authenticity you need to complete your look while being convention-friendly and lightweight. With its impressive detailing and sturdy construction, this blaster is a must-have for cosplayers, collectors, and Star Wars enthusiasts who want to embody the Mandalorian’s spirit..",

    category: "Anime, Star Wars",
    image: "https://i.ebayimg.com/images/g/GuIAAeSwGb1qpuo1/s-l1600.webp",
    price: 29.55,
  },
  {
    _id: "musashi-horse-katana",
    name: "Musashi Horse and Flower Katana",
    description:
      "From the Musashi Silver Shirakawa Series comes this hand crafted “Horse and Flower” (Uma to hana 馬と花) Katana. Maru-kitae hand forged technique using 1060 high carbon steel and clay tempered process, the Horse and Flower katana with its rare color theme will stand out.",

    category: "katana",
    image: "https://i.ebayimg.com/images/g/guwAAeSwM81oF5nL/s-l1600.webp",
    price: 500.55,
  },
  {
    _id: "Spartan-shield",
    name: "Spartan King Leonidas Lifesize Cosplay Shield - Resin",
    description: "Spartan King Leonidas Lifesize Cosplay Shield - Resin..",

    category: "shield",
    image: "https://i.ebayimg.com/images/g/vR0AAeSwCYho3hxw/s-l1600.webp",
    price: 95.55,
  },
  {
    _id: "rambo-knife",
    name: "Rambo III 18 inch Knife Sylvester Stallone Officially Licensed Signature Edition",
    description:
      "18 inch (45.72cm) overall 13 inch (33.02cm) stainless bowie blade. Laminated hardwood handles with stainless guard and pommel. Black cord lanyard. Blade features anti-glare sighting slot. Top grain leather sheath with leg tie. Officially licensed reproduction.",

    category: "combat-knives",
    image: "https://i.ebayimg.com/images/g/MLoAAeSwXCxor~iU/s-l1600.webp",
    price: 245.55,
  },
  {
    _id: "dom-pedro",
    name: "Dom Pedro Pistol Fallout 76 Replica Foam Video Games Props TV show",
    description:
      "18 inch (45.72cm) overall 13 inch (33.02cm) stainless bowie blade. Laminated hardwood handles with stainless guard and pommel. Black cord lanyard. Blade features anti-glare sighting slot. Top grain leather sheath with leg tie. Officially licensed reproduction.",
    category: "anime",
    image: "https://i.ebayimg.com/images/g/RokAAeSwhLRqAT9C/s-l1600.webp",
    images: [
      "https://i.ebayimg.com/images/g/RokAAeSwhLRqAT9C/s-l1600.webp",
      "https://i.ebayimg.com/images/g/0ZUAAeSw-7BqAT9C/s-l1600.webp",
    ],
    price: 245.55,
  },
  {
    _id: "Samwise-Sword",
    name: "United Cutlery Lord of the Rings: Sword Of Samwise",
    description:
      "23.5 inch (59.69cm) overall. 15.5 inch (39.37cm) stainless blade. Leaf-shaped, double-edged blade with a wide fuller down its center. The swords serial number and copyright marks adorn the fuller. Curved crossguard. Licensed replica of the actual Weta Workshop sword prop wielded in the Lord of the Rings films by New Line Cinema. Comes with a wooden display stand and a certificate of authenticity. Boxed.",
    category: "fantasy sword",
    image: "https://i.ebayimg.com/images/g/hEwAAeSwrBFqg4ya/s-l1600.webp",
    images: [
      "https://i.ebayimg.com/images/g/hEwAAeSwrBFqg4ya/s-l1600.webp",
      "https://i.ebayimg.com/images/g/NhwAAeSw2rZqg4yZ/s-l1600.webp",
      "https://i.ebayimg.com/images/g/VqkAAeSwZuRqg4ya/s-l1600.webp",
      "https://i.ebayimg.com/images/g/VD0AAeSwPdNqg4ya/s-l1600.webp",
    ],
    price: 245.55,
  },
  {
    _id: "kill-bill-o-ren-ishii",
    name: "Kill Bill O Ren Ishii Handmade Hand Forged Carbon Steel Samurai Katana Sword",
    description:
      "This is Kill Bill O-REN Japanese Samurai HandMade Sword, The blade of the sword is constructed from carbon steel and aesthetic hamon. The sword comes very sharp and full tang. Saya (Scabbard): The saya is wooden with a laquered black finish. The saya has been crafted to contour the shape of the blade. And fits seamlessly into the handle. Tsuka (Handle): The handle is the same laquered black finish as the saya. When the sword is sheathed the handle and saya look like one solid piece. The handle has been crafted to contour to the tang of the sword, and the shape of your hands. There are two pins that secures the tang in the handle of the sword. The handle has silver flowers and leaves that complements the sword very nicely.",

    category: "Kill Bill, Katana",
    image: "https://i.ebayimg.com/images/g/09cAAeSwZU5p2qLO/s-l1600.webp",

    images: [
      "https://i.ebayimg.com/images/g/09cAAeSwZU5p2qLO/s-l1600.webp",
      "https://i.ebayimg.com/images/g/W3UAAeSwy6tp2qLN/s-l1600.webp",
      "https://i.ebayimg.com/images/g/agEAAeSwVcBp2qLO/s-l1600.webp",
    ],
    price: 145.55,
  },
];

export const allProducts = Array.from(
  new Map(
    [...defaultProductItems, ...defaultNewArrivals, ...defaultProductLists].map(
      (item) => [item._id, item],
    ),
  ).values(),
);

export function getProductsByCategory(categoryName) {
  if (!categoryName) return [];
  const normalizedCategory = categoryName.toLowerCase().trim();

  const matched = allProducts.filter((product) => {
    if (!product.category) return false;
    const prodCat = product.category.toLowerCase();

    if (
      prodCat.includes(normalizedCategory) ||
      normalizedCategory.includes(prodCat)
    ) {
      return true;
    }

    if (normalizedCategory.includes("anime") && prodCat.includes("anime"))
      return true;
    if (
      normalizedCategory.includes("fantasy") &&
      normalizedCategory.includes("sword") &&
      prodCat.includes("fantasy") &&
      prodCat.includes("sword")
    )
      return true;
    if (normalizedCategory.includes("sword") && prodCat.includes("sword"))
      return true;
    if (normalizedCategory.includes("katana") && prodCat.includes("katana"))
      return true;
    if (
      (normalizedCategory.includes("knife") ||
        normalizedCategory.includes("knives")) &&
      (prodCat.includes("knife") || prodCat.includes("knives"))
    )
      return true;
    if (
      (normalizedCategory.includes("gun") ||
        normalizedCategory.includes("pistol") ||
        normalizedCategory.includes("sci fi")) &&
      (prodCat.includes("gun") ||
        prodCat.includes("pistol") ||
        prodCat.includes("sci fi") ||
        prodCat.includes("foam"))
    )
      return true;
    if (
      (normalizedCategory.includes("armor") ||
        normalizedCategory.includes("helmet") ||
        normalizedCategory.includes("shield")) &&
      (prodCat.includes("armor") || prodCat.includes("helmet"))
    )
      return true;

    return false;
  });

  return matched;
}

export function getProductsByFranchise(franchiseName) {
  if (!franchiseName) return [];
  const normalizedFranchise = franchiseName.toLowerCase().trim();

  return allProducts.filter((product) => {
    const searchableText = [product.name, product.category, product.description]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedFranchise);
  });
}
