

export const products = [
  // ===== Shop (General/Unisex) =====
  {
    name: "Organic Shampoo",
    slug: "organic-shampoo",
    image: "/organicshampoo.jpg",
    price: "$20",
    originalPrice: "$25",
    badge: "Best Seller",
    category: "shop",
    description: "Nourishing shampoo made with natural plant extracts.",
    ingredients: ["Aloe Vera", "Neem Extract", "Coconut Oil", "Herbal Proteins"],
    benefits: [
      "Strengthens hair roots",
      "Reduces dandruff naturally",
      "Adds shine and softness",
      "Safe for daily use"
    ],
    howToUse: "Apply to wet hair, massage into scalp, rinse thoroughly.",
    faq: [
      { q: "Is it safe for colored hair?", a: "Yes, it is sulfate-free and safe for colored hair." },
      { q: "Can I use it daily?", a: "Yes, it’s gentle enough for everyday use." }
    ],
    rating: 4.6,
    reviews: 120,
    reviewList: [
      { user: "Priya", rating: 5, date: "2025-01-12", comment: "Best natural shampoo I’ve used. My hair feels soft and fresh." },
      { user: "Arjun", rating: 4, date: "2025-02-01", comment: "Helped reduce dandruff a lot. Smell is mild and pleasant." },
      { user: "Meera", rating: 5, date: "2025-03-05", comment: "Love that it’s chemical-free and safe for daily use." }
    ]
  },
  {
    name: "Herbal Conditioner",
    slug: "herbal-conditioner",
    image: "/herbalconditioner .jpg",
    price: "$22",
    originalPrice: "$28",
    badge: "New",
    category: "shop",
    description: "Moisturizing conditioner with herbal oils for silky smooth hair.",
    ingredients: ["Shea Butter", "Jojoba Oil", "Hibiscus Extract"],
    benefits: [
      "Deeply hydrates hair",
      "Prevents frizz and dryness",
      "Improves softness and shine"
    ],
    howToUse: "Apply after shampoo, leave for 2–3 minutes, rinse well.",
    faq: [
      { q: "Does it help with frizz?", a: "Yes, it locks in moisture and reduces frizz." },
      { q: "Is it suitable for oily hair?", a: "Yes, it balances hydration without greasiness." }
    ],
    rating: 4.4,
    reviews: 80,
    reviewList: [
      { user: "Sneha", rating: 5, date: "2025-02-14", comment: "Made my hair so smooth and frizz-free." },
      { user: "Karan", rating: 4, date: "2025-03-02", comment: "Good conditioner, works well with the shampoo." },
      { user: "Anjali", rating: 4, date: "2025-03-20", comment: "Moisturizes nicely without being heavy." }
    ]
  },
  {
    name: "Aloe Vera Gel",
    slug: "aloe-vera-gel",
    image: "/aloe-vera-gel-moisturizer.png",
    price: "$15",
    originalPrice: "$18",
    badge: "Trending",
    category: "shop",
    description: "Pure aloe vera gel for soothing and hydrating skin.",
    ingredients: ["100% Pure Aloe Vera", "Vitamin E"],
    benefits: [
      "Soothes sunburn instantly",
      "Hydrates and refreshes skin",
      "Reduces redness and irritation"
    ],
    howToUse: "Apply directly to skin or hair as needed.",
    faq: [
      { q: "Can it be used on hair?", a: "Yes, it works as a natural conditioner." },
      { q: "Does it have chemicals?", a: "No, it is 100% natural and safe." }
    ],
    rating: 4.7,
    reviews: 200,
    reviewList: [
      { user: "Ravi", rating: 5, date: "2025-01-30", comment: "Cools my skin instantly after sun exposure." },
      { user: "Lakshmi", rating: 5, date: "2025-02-18", comment: "Very pure and refreshing, I also use it on my hair." },
      { user: "Nisha", rating: 4, date: "2025-03-10", comment: "Good product, but wish it came in a bigger pack." }
    ]
  },
  {
    name: "Essential Oil Pack",
    slug: "essential-oil-pack",
    image: "/lavender-essential-oil.png",
    price: "$30",
    originalPrice: "$38",
    badge: "Top Rated",
    category: "shop",
    description: "Set of essential oils for relaxation and wellness.",
    ingredients: ["Lavender Oil", "Tea Tree Oil", "Eucalyptus Oil", "Peppermint Oil"],
    benefits: [
      "Relieves stress and tension",
      "Improves sleep quality",
      "Boosts skin and hair health"
    ],
    howToUse: "Use a few drops in diffuser, bath, or massage oil.",
    faq: [
      { q: "Are they pure oils?", a: "Yes, all oils are 100% pure and undiluted." },
      { q: "Can I apply directly on skin?", a: "Always dilute with carrier oil before applying." }
    ],
    rating: 4.8,
    reviews: 95,
    reviewList: [
      { user: "Harsha", rating: 5, date: "2025-02-05", comment: "Amazing fragrance, helps me sleep better." },
      { user: "Divya", rating: 5, date: "2025-02-22", comment: "I use them in my diffuser, very calming." },
      { user: "Shreya", rating: 4, date: "2025-03-15", comment: "Great oils, but the bottles are small." }
    ]
  },
  {
    name: "Herbal Soap Set",
    slug: "herbal-soap-set",
    image: "/herbalsoapset.jpg",
    price: "$18",
    originalPrice: "$22",
    badge: "",
    category: "shop",
    description: "Pack of 4 handmade herbal soaps with natural fragrance.",
    ingredients: ["Turmeric", "Sandalwood", "Neem", "Rose Petals"],
    benefits: [
      "Cleanses skin gently",
      "Prevents acne naturally",
      "Leaves skin soft and fresh"
    ],
    howToUse: "Use daily on face and body for best results.",
    faq: [
      { q: "Is it suitable for sensitive skin?", a: "Yes, it’s chemical-free and mild." },
      { q: "Does it have artificial fragrance?", a: "No, only natural extracts are used." }
    ],
    rating: 4.3,
    reviews: 60,
    reviewList: [
      { user: "Neha", rating: 5, date: "2025-01-15", comment: "Very gentle on skin, smells natural." },
      { user: "Rohit", rating: 4, date: "2025-02-09", comment: "Good set of soaps, lasts a long time." },
      { user: "Aarti", rating: 4, date: "2025-03-01", comment: "Nice herbal fragrance, not too strong." }
    ]
  },

  // ===== Men =====
  {
    name: "Herbal Face Wash",
    slug: "herbal-face-wash",
    image: "/herbal-face-wash.png",
    price: "$20",
    originalPrice: "$25",
    badge: "Best Seller",
    category: "men",
    description: "Gentle face wash for daily use, removes dirt and impurities.",
    ingredients: ["Neem", "Aloe Vera", "Basil"],
    benefits: [
      "Removes oil and dirt",
      "Prevents pimples",
      "Keeps skin refreshed"
    ],
    howToUse: "Apply to wet face, massage gently, rinse off.",
    faq: [
      { q: "Can it be used daily?", a: "Yes, it’s safe for daily use." },
      { q: "Does it control acne?", a: "Yes, neem and basil help reduce acne." }
    ],
    rating: 4.5,
    reviews: 110,
    reviewList: [
      { user: "Aditya", rating: 5, date: "2025-01-20", comment: "Cleans well and controls oiliness." },
      { user: "Sahil", rating: 4, date: "2025-02-07", comment: "Fresh feel after every wash, good for summers." },
      { user: "Kunal", rating: 5, date: "2025-02-25", comment: "Helped reduce pimples a lot." }
    ]
  },
  {
    name: "Charcoal Face Scrub",
    slug: "charcoal-face-scrub",
    image: "/charcoalscrub.jpg",
    price: "$25",
    originalPrice: "$30",
    badge: "Trending",
    category: "men",
    description: "Exfoliating scrub with activated charcoal to unclog pores.",
    ingredients: ["Activated Charcoal", "Green Tea Extract", "Lemon Peel"],
    benefits: [
      "Removes dead skin",
      "Unclogs pores",
      "Brightens complexion"
    ],
    howToUse: "Use twice a week for deep cleansing.",
    faq: [
      { q: "Is it harsh on skin?", a: "No, it’s formulated to be gentle yet effective." },
      { q: "Can women use it?", a: "Yes, it’s suitable for all skin types." }
    ],
    rating: 4.6,
    reviews: 85,
    reviewList: [
      { user: "Rohit", rating: 5, date: "2025-01-18", comment: "Skin feels very clean after use. Not too harsh." },
      { user: "Deepak", rating: 4, date: "2025-02-03", comment: "Good scrub, helps with blackheads." },
      { user: "Varun", rating: 5, date: "2025-02-27", comment: "Face looks brighter after a couple of uses." }
    ]
  },
  {
    name: "Vitamin C Serum",
    slug: "vitamin-c-serum",
    image: "/vitamin-c-serum.png",
    price: "$30",
    originalPrice: "$35",
    badge: "Top Rated",
    category: "men",
    description: "Brightening serum with Vitamin C to reduce dark spots.",
    ingredients: ["Vitamin C", "Hyaluronic Acid", "Orange Extract"],
    benefits: [
      "Fades dark spots",
      "Boosts collagen",
      "Gives glowing skin"
    ],
    howToUse: "Apply 2–3 drops daily before moisturizer.",
    faq: [
      { q: "Can it be used at night?", a: "Yes, best results when used twice daily." },
      { q: "Does it cause irritation?", a: "No, it’s dermatologically tested and safe." }
    ],
    rating: 4.7,
    reviews: 140,
    reviewList: [
      { user: "Manoj", rating: 5, date: "2025-01-29", comment: "Really helped reduce my acne marks." },
      { user: "Suresh", rating: 4, date: "2025-02-12", comment: "Good serum, absorbs quickly without stickiness." },
      { user: "Abhinav", rating: 5, date: "2025-03-03", comment: "My skin looks brighter within a few weeks." }
    ]
  },
  {
    name: "Men’s Sunscreen SPF 50",
    slug: "mens-sunscreen-spf50",
    image: "/mineral-sunscreen-spf30.png",
    price: "$22",
    originalPrice: "$28",
    badge: "",
    category: "men",
    description: "Broad-spectrum sunscreen designed for men's skin.",
    ingredients: ["Zinc Oxide", "Aloe Vera", "Vitamin E"],
    benefits: [
      "Protects against UVA/UVB",
      "Non-greasy formula",
      "Hydrates skin"
    ],
    howToUse: "Apply generously 15 mins before sun exposure.",
    faq: [
      { q: "Is it waterproof?", a: "Yes, lasts up to 80 mins in water." },
      { q: "Does it leave a white cast?", a: "No, it blends easily with skin." }
    ],
    rating: 4.4,
    reviews: 70,
    reviewList: [
      { user: "Rajat", rating: 5, date: "2025-02-15", comment: "Protects well and feels light on skin." },
      { user: "Hemant", rating: 4, date: "2025-02-28", comment: "Doesn’t leave white patches like other sunscreens." },
      { user: "Vikas", rating: 4, date: "2025-03-12", comment: "Good for daily use, not greasy at all." }
    ]
  },
  {
    name: "Beard Care Oil",
    slug: "beard-care-oil",
    image: "/beardoil.jpg",
    price: "$15",
    originalPrice: "$20",
    badge: "New",
    category: "men",
    description: "Nourishing oil to keep beard soft, healthy, and shiny.",
    ingredients: ["Argan Oil", "Jojoba Oil", "Vitamin E"],
    benefits: [
      "Softens beard hair",
      "Prevents itchiness",
      "Promotes healthy growth"
    ],
    howToUse: "Massage a few drops into beard daily.",
    faq: [
      { q: "Does it help with beard growth?", a: "Yes, it strengthens and stimulates growth." },
      { q: "Will it make beard greasy?", a: "No, it absorbs quickly." }
    ],
    rating: 4.5,
    reviews: 65,
    reviewList: [
      { user: "Imran", rating: 5, date: "2025-01-26", comment: "My beard feels softer and more manageable." },
      { user: "Yash", rating: 4, date: "2025-02-08", comment: "Good oil, no greasy feeling after applying." },
      { user: "Akhil", rating: 5, date: "2025-03-06", comment: "Helped reduce beard itch and improved growth." }
    ]
  },

  // ===== Women =====
  {
    name: "Herbal Night Cream",
    slug: "herbal-night-cream",
    image: "/herbalnightcream.jpg",
    price: "$28",
    originalPrice: "$35",
    badge: "Best Seller",
    category: "women",
    description: "Rich herbal night cream that deeply nourishes skin while you sleep.",
    ingredients: ["Saffron", "Aloe Vera", "Almond Oil"],
    benefits: [
      "Reduces dark spots",
      "Hydrates overnight",
      "Improves skin elasticity"
    ],
    howToUse: "Apply a thin layer on cleansed face before sleeping.",
    faq: [
      { q: "Is it suitable for oily skin?", a: "Yes, it is lightweight and non-greasy." },
      { q: "Can it be used daily?", a: "Yes, it’s formulated for daily night use." }
    ],
    rating: 4.8,
    reviews: 120,
    reviewList: [
      { user: "Sneha", rating: 5, date: "2025-01-19", comment: "My skin feels so soft and refreshed every morning." },
      { user: "Ankita", rating: 4, date: "2025-02-05", comment: "Helped lighten my dark spots gradually." },
      { user: "Nisha", rating: 5, date: "2025-02-27", comment: "Very nourishing, perfect for dry winters." }
    ]
  },
  {
    name: "Aloe Vera Moisturizer",
    slug: "aloe-vera-moisturizer",
    image: "/aloeverawomen.jpg",
    price: "$22",
    originalPrice: "$28",
    badge: "Trending",
    category: "women",
    description: "Lightweight aloe vera moisturizer for daily hydration.",
    ingredients: ["Aloe Vera", "Shea Butter", "Vitamin E"],
    benefits: [
      "Soothes skin",
      "Provides 24h hydration",
      "Reduces dryness"
    ],
    howToUse: "Massage gently on face and neck after cleansing.",
    faq: [
      { q: "Can it be used under makeup?", a: "Yes, it works as a perfect base." },
      { q: "Is it good for sensitive skin?", a: "Yes, aloe vera calms sensitivity." }
    ],
    rating: 4.6,
    reviews: 90,
    reviewList: [
      { user: "Ritika", rating: 5, date: "2025-01-25", comment: "Light and non-sticky, great for daily use." },
      { user: "Megha", rating: 4, date: "2025-02-10", comment: "Hydrates well, works even under makeup." },
      { user: "Kavya", rating: 5, date: "2025-02-28", comment: "My skin feels soft all day, love it!" }
    ]
  },
  {
    name: "Rose Water Toner",
    slug: "rose-water-toner",
    image: "/rose-water-toner.png",
    price: "$18",
    originalPrice: "$22",
    badge: "Top Rated",
    category: "women",
    description: "Refreshing rose water toner to balance and tighten skin.",
    ingredients: ["Rose Extract", "Aloe Vera", "Glycerin"],
    benefits: [
      "Balances skin pH",
      "Tightens pores",
      "Soothes irritation"
    ],
    howToUse: "Spray or apply with cotton pad after cleansing.",
    faq: [
      { q: "Is it alcohol-free?", a: "Yes, gentle and suitable for all skin types." },
      { q: "Can it be used daily?", a: "Yes, morning and night for best results." }
    ],
    rating: 4.7,
    reviews: 75,
    reviewList: [
      { user: "Divya", rating: 5, date: "2025-01-22", comment: "Smells amazing and refreshes my skin instantly." },
      { user: "Priya", rating: 4, date: "2025-02-08", comment: "Pores look tighter, skin feels fresh." },
      { user: "Aarti", rating: 5, date: "2025-02-25", comment: "Perfect for summer, very soothing." }
    ]
  },
  {
    name: "Herbal Face Pack",
    slug: "herbal-face-pack",
    image: "/herbalfacepack.jpg",
    price: "$20",
    originalPrice: "$25",
    badge: "",
    category: "women",
    description: "Nourishing herbal face pack for glowing skin.",
    ingredients: ["Turmeric", "Sandalwood", "Honey"],
    benefits: [
      "Brightens skin",
      "Removes impurities",
      "Softens texture"
    ],
    howToUse: "Apply a thin layer, leave 10–15 mins, rinse with lukewarm water.",
    faq: [
      { q: "How often should it be used?", a: "2–3 times a week for best results." },
      { q: "Is it suitable for all skin types?", a: "Yes, gentle on sensitive skin." }
    ],
    rating: 4.5,
    reviews: 60,
    reviewList: [
      { user: "Radhika", rating: 5, date: "2025-01-20", comment: "My skin feels fresh and glowing after each use." },
      { user: "Sonal", rating: 4, date: "2025-02-06", comment: "Good pack, smells natural and soothing." },
      { user: "Tanya", rating: 4, date: "2025-02-28", comment: "Leaves skin soft, gentle on sensitive areas." }
    ]
  },
  {
    name: "Hand Cream Set",
    slug: "hand-cream-set",
    image: "/herbalhandcream.jpg",
    price: "$15",
    originalPrice: "$20",
    badge: "New",
    category: "women",
    description: "Set of 3 nourishing hand creams with herbal extracts.",
    ingredients: ["Shea Butter", "Aloe Vera", "Lavender Oil"],
    benefits: [
      "Softens hands",
      "Hydrates dry skin",
      "Pleasant natural fragrance"
    ],
    howToUse: "Apply to hands as needed, massage gently until absorbed.",
    faq: [
      { q: "Is it greasy?", a: "No, absorbs quickly leaving hands soft." },
      { q: "Can it be used multiple times a day?", a: "Yes, safe for frequent use." }
    ],
    rating: 4.6,
    reviews: 55,
    reviewList: [
      { user: "Neha", rating: 5, date: "2025-01-15", comment: "Hands feel soft all day, smells lovely." },
      { user: "Shivani", rating: 4, date: "2025-02-03", comment: "Good set, travel-friendly size." },
      { user: "Kiran", rating: 5, date: "2025-02-20", comment: "Perfect for daily moisturizing." }
    ]
  },

  // ===== Kids =====
  {
    name: "Baby Shampoo",
    slug: "baby-shampoo",
    image: "/babyshampoo.jpg",
    price: "$12",
    originalPrice: "$15",
    badge: "Best Seller",
    category: "kids",
    description: "Gentle tear-free shampoo suitable for babies and toddlers.",
    ingredients: ["Chamomile Extract", "Aloe Vera", "Coconut Oil"],
    benefits: [
      "Gentle on eyes",
      "Softens hair",
      "No harsh chemicals"
    ],
    howToUse: "Apply a small amount to wet hair, massage, rinse thoroughly.",
    faq: [
      { q: "Can it be used daily?", a: "Yes, formulated for everyday use." },
      { q: "Is it safe for newborns?", a: "Yes, pediatrician tested." }
    ],
    rating: 4.8,
    reviews: 130,
    reviewList: [
      { user: "Maya", rating: 5, date: "2025-01-12", comment: "Very gentle, my baby doesn’t cry during bath anymore." },
      { user: "Rohan", rating: 5, date: "2025-01-30", comment: "Soft hair, nice natural fragrance." },
      { user: "Anaya", rating: 4, date: "2025-02-15", comment: "Good shampoo, tear-free works perfectly." }
    ]
  },
  {
    name: "Baby Lotion",
    slug: "baby-lotion",
    image: "/babylotion.jpg",
    price: "$14",
    originalPrice: "$18",
    badge: "Trending",
    category: "kids",
    description: "Moisturizing lotion for delicate baby skin.",
    ingredients: ["Shea Butter", "Aloe Vera", "Vitamin E"],
    benefits: [
      "Keeps skin soft and hydrated",
      "Prevents dryness",
      "Gentle and non-irritating"
    ],
    howToUse: "Apply gently after bath or as needed.",
    faq: [
      { q: "Is it hypoallergenic?", a: "Yes, safe for sensitive baby skin." },
      { q: "Can it be used multiple times a day?", a: "Yes, very safe and gentle." }
    ],
    rating: 4.7,
    reviews: 95,
    reviewList: [
      { user: "Kavya", rating: 5, date: "2025-01-18", comment: "Softens skin instantly, mild fragrance." },
      { user: "Vivaan", rating: 4, date: "2025-02-02", comment: "Good lotion, absorbs quickly." },
      { user: "Ishaan", rating: 5, date: "2025-02-20", comment: "No irritation, perfect for my newborn." }
    ]
  },
  {
    name: "Baby Soap",
    slug: "baby-soap",
    image: "/babysoap.jpg",
    price: "$10",
    originalPrice: "$12",
    badge: "",
    category: "kids",
    description: "Mild herbal soap for sensitive baby skin.",
    ingredients: ["Glycerin", "Chamomile", "Coconut Oil"],
    benefits: [
      "Cleanses gently",
      "Softens skin",
      "No harsh chemicals"
    ],
    howToUse: "Use during bath, lather gently, rinse thoroughly.",
    faq: [
      { q: "Is it suitable for newborns?", a: "Yes, specially formulated for sensitive skin." },
      { q: "Does it have fragrance?", a: "Light natural fragrance from herbs only." }
    ],
    rating: 4.6,
    reviews: 85,
    reviewList: [
      { user: "Aarav", rating: 5, date: "2025-01-25", comment: "Gentle soap, perfect for baby’s skin." },
      { user: "Sara", rating: 4, date: "2025-02-05", comment: "Soft lather, no irritation at all." },
      { user: "Diya", rating: 5, date: "2025-02-20", comment: "My baby loves bath time now!" }
    ]
  }
];
