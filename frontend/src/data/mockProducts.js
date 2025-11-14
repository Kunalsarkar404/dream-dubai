// Mock Product Data for all categories
export const mockProducts = {
    // Activewear Products
    activewear: [
        {
            id: "activewear-1",
            name: "Pro Performance Running Tank",
            description: "Designed for serious athletes, this lightweight running tank features advanced moisture-wicking technology and strategic ventilation. The seamless construction reduces chafing during long runs. Reflective details for low-light visibility.",
            price: 295.00,
            currency: "AED",
            category: "activewear",
            colors: [
                { name: "electric-blue", hex: "#00BFFF" },
                { name: "neon-yellow", hex: "#FFE135" },
                { name: "black", hex: "#000000" },
                { name: "coral", hex: "#FF6B6B" }
            ],
            sizes: ["XS", "S", "M", "L", "XL"],
            images: [
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=1000&fit=crop"
            ]
        },
        {
            id: "activewear-2",
            name: "High-Performance Compression Shorts",
            description: "Engineered compression shorts provide muscle support and reduce fatigue during intense workouts. Four-way stretch fabric moves with you, while the wide waistband ensures a secure, comfortable fit. Quick-dry technology keeps you cool.",
            price: 340.00,
            currency: "AED",
            category: "activewear",
            colors: [
                { name: "black", hex: "#000000" },
                { name: "navy", hex: "#1E3A8A" },
                { name: "forest-green", hex: "#2D6A4F" },
                { name: "burgundy", hex: "#8B0000" }
            ],
            sizes: ["XS", "S", "M", "L", "XL", "XXL"],
            images: [
                "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1603251578711-3290ca1a0187?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?w=800&h=1000&fit=crop"
            ]
        },
        {
            id: "activewear-3",
            name: "Elite Training Jacket",
            description: "The ultimate training jacket for all weather conditions. Features water-resistant outer shell, breathable mesh panels, and adjustable hood. Multiple zippered pockets keep your essentials secure. Reflective branding for safety.",
            price: 580.00,
            currency: "AED",
            category: "activewear",
            colors: [
                { name: "slate-gray", hex: "#708090" },
                { name: "olive-green", hex: "#808000" },
                { name: "midnight-blue", hex: "#191970" },
                { name: "charcoal", hex: "#36454F" }
            ],
            sizes: ["S", "M", "L", "XL", "XXL"],
            images: [
                "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop"
            ]
        },
        {
            id: "activewear-4",
            name: "Yoga Performance Leggings",
            description: "Premium yoga leggings with buttery-soft fabric that moves with your body. High-rise waistband provides core support and coverage. Hidden pocket for cards or keys. Squat-proof and perfect for any workout.",
            price: 420.00,
            currency: "AED",
            category: "activewear",
            colors: [
                { name: "deep-purple", hex: "#663399" },
                { name: "teal", hex: "#008080" },
                { name: "black", hex: "#000000" },
                { name: "wine", hex: "#722F37" }
            ],
            sizes: ["XS", "S", "M", "L", "XL"],
            images: [
                "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop"
            ]
        }
    ],

    // Men's Products
    men: [
        {
            id: "men-1",
            name: "Men's Premium Cotton Hoodie",
            description: "Experience ultimate comfort with our premium cotton hoodie. Made from 100% organic cotton with a soft brushed interior, this hoodie features a relaxed fit perfect for everyday wear. The durable fabric ensures long-lasting quality while maintaining breathability.",
            price: 625.00,
            currency: "AED",
            category: "men",
            colors: [
                { name: "black", hex: "#000000" },
                { name: "white", hex: "#FFFFFF" },
                { name: "navy", hex: "#1E3A8A" },
                { name: "gray", hex: "#6B7280" }
            ],
            sizes: ["XS", "S", "M", "L", "XL", "XXL"],
            images: [
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&h=1000&fit=crop"
            ]
        },
        {
            id: "men-2",
            name: "Men's Dip-Dye Hoodie",
            description: "Stand out with our unique dip-dye hoodie featuring a stunning gradient design. Crafted from premium cotton blend fabric, this hoodie offers both style and comfort. The innovative dyeing technique ensures each piece is unique.",
            price: 700.00,
            currency: "AED",
            category: "men",
            colors: [
                { name: "yellow-green", hex: "#FFE135" },
                { name: "papaya", hex: "#FF6B35" },
                { name: "ocean", hex: "#004E89" },
                { name: "sunset", hex: "#FF5A5F" }
            ],
            sizes: ["S", "M", "L", "XL", "XXL"],
            images: [
                "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop"
            ]
        },
        {
            id: "men-3",
            name: "Men's Classic Sweatshirt",
            description: "A wardrobe essential - our classic sweatshirt in premium fabric. Features ribbed cuffs and hem for a perfect fit, crew neckline, and a comfortable relaxed silhouette. Perfect for layering or wearing on its own.",
            price: 410.00,
            currency: "AED",
            category: "men",
            colors: [
                { name: "green-ash", hex: "#A8DADC" },
                { name: "charcoal", hex: "#457B9D" },
                { name: "burgundy", hex: "#A8201A" },
                { name: "olive", hex: "#606C38" }
            ],
            sizes: ["XS", "S", "M", "L", "XL", "XXL"],
            images: [
                "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop"
            ]
        },
        {
            id: "men-4",
            name: "Men's Sports Joggers",
            description: "Engineered for performance and comfort. These joggers feature moisture-wicking fabric, tapered fit with elastic cuffs, and multiple pockets for convenience. Perfect for workouts or casual wear.",
            price: 480.00,
            currency: "AED",
            category: "men",
            colors: [
                { name: "black", hex: "#000000" },
                { name: "navy", hex: "#1E3A8A" },
                { name: "gray", hex: "#6B7280" },
                { name: "forest", hex: "#2D6A4F" }
            ],
            sizes: ["S", "M", "L", "XL", "XXL"],
            images: [
                "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1603251578711-3290ca1a0187?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?w=800&h=1000&fit=crop"
            ]
        }
    ],

    // Women's Products
    women: [
        {
            id: "women-1",
            name: "Women's Luxury Sweatshirt",
            description: "Indulge in luxury with our premium sweatshirt crafted from the finest materials. Featuring a contemporary design with exceptional attention to detail, this piece combines style and comfort effortlessly.",
            price: 550.00,
            currency: "AED",
            category: "women",
            colors: [
                { name: "rose", hex: "#FFB6C1" },
                { name: "lavender", hex: "#E6E6FA" },
                { name: "cream", hex: "#FFFDD0" },
                { name: "sage", hex: "#9DC183" }
            ],
            sizes: ["XS", "S", "M", "L", "XL"],
            images: [
                "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1614251055880-b5e3e6eb3fb3?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop"
            ]
        },
        {
            id: "women-2",
            name: "Women's Cozy Hoodie",
            description: "Stay warm and stylish with our ultra-soft hoodie. Features an oversized fit, kangaroo pocket, and buttery-soft fabric that feels like a warm hug. Perfect for lazy days or active adventures.",
            price: 625.00,
            currency: "AED",
            category: "women",
            colors: [
                { name: "pale-banana", hex: "#FFE66D" },
                { name: "blush", hex: "#FF99C8" },
                { name: "mint", hex: "#B5EAD7" },
                { name: "sky", hex: "#A8DADC" }
            ],
            sizes: ["XS", "S", "M", "L", "XL"],
            images: [
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1614251055880-b5e3e6eb3fb3?w=800&h=1000&fit=crop"
            ]
        },
        {
            id: "women-3",
            name: "Women's Athletic Leggings",
            description: "High-performance leggings designed for your active lifestyle. Features four-way stretch, high waistband for support, and sweat-wicking technology. Perfect for yoga, running, or everyday wear.",
            price: 380.00,
            currency: "AED",
            category: "women",
            colors: [
                { name: "black", hex: "#000000" },
                { name: "plum", hex: "#8E4585" },
                { name: "teal", hex: "#008080" },
                { name: "charcoal", hex: "#36454F" }
            ],
            sizes: ["XS", "S", "M", "L", "XL"],
            images: [
                "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop"
            ]
        },
        {
            id: "women-4",
            name: "Women's Soft Joggers",
            description: "Experience cloud-like comfort with our ultra-soft joggers. Made from brushed cotton blend with a relaxed tapered fit. Features elastic waistband with drawstring and deep side pockets.",
            price: 480.00,
            currency: "AED",
            category: "women",
            colors: [
                { name: "coral", hex: "#FF6B6B" },
                { name: "lilac", hex: "#C8B6E2" },
                { name: "peach", hex: "#FFB5A7" },
                { name: "seafoam", hex: "#70D6C5" }
            ],
            sizes: ["XS", "S", "M", "L", "XL"],
            images: [
                "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1603251578711-3290ca1a0187?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?w=800&h=1000&fit=crop"
            ]
        }
    ],

    // Kids' Products
    kids: [
        {
            id: "kids-1",
            name: "Kids' Adventure Joggers",
            description: "Let your little ones explore in comfort with our durable adventure joggers. Made with active kids in mind, these joggers feature reinforced knees, adjustable waistband, and plenty of stretch for all-day play.",
            price: 355.00,
            currency: "AED",
            category: "kids",
            colors: [
                { name: "blue", hex: "#4A90E2" },
                { name: "green", hex: "#7ED321" },
                { name: "orange", hex: "#F5A623" },
                { name: "purple", hex: "#9013FE" }
            ],
            sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
            images: [
                "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1519278409-aa1e39022b2a?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&h=1000&fit=crop"
            ]
        },
        {
            id: "kids-2",
            name: "Boy's Cozy Sweatshirt",
            description: "Keep your boy warm and comfortable with our soft cotton sweatshirt. Features fun designs, ribbed cuffs and hem, and durable construction that withstands active play and frequent washing.",
            price: 355.00,
            currency: "AED",
            category: "kids",
            colors: [
                { name: "blue-atoll", hex: "#00B4D8" },
                { name: "red", hex: "#E63946" },
                { name: "sunshine", hex: "#FFD60A" },
                { name: "forest", hex: "#2D6A4F" }
            ],
            sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
            images: [
                "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1519278409-aa1e39022b2a?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&h=1000&fit=crop"
            ]
        },
        {
            id: "kids-3",
            name: "Girl's Playful Hoodie",
            description: "Bright and cheerful hoodie perfect for everyday adventures. Made from soft cotton blend with a relaxed fit, kangaroo pocket, and adorable design details that kids love.",
            price: 380.00,
            currency: "AED",
            category: "kids",
            colors: [
                { name: "pink-lemonade", hex: "#FFB3D9" },
                { name: "lavender", hex: "#C8B6E2" },
                { name: "aqua", hex: "#7FDBFF" },
                { name: "coral", hex: "#FF6B6B" }
            ],
            sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
            images: [
                "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1519278409-aa1e39022b2a?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&h=1000&fit=crop"
            ]
        },
        {
            id: "kids-4",
            name: "Kids' Fun T-Shirt",
            description: "Comfortable everyday t-shirt in vibrant colors. Made from soft, breathable cotton that's gentle on sensitive skin. Features fun graphics and a relaxed fit for all-day comfort.",
            price: 250.00,
            currency: "AED",
            category: "kids",
            colors: [
                { name: "yellow", hex: "#FFE135" },
                { name: "turquoise", hex: "#36D7B7" },
                { name: "hot-pink", hex: "#FF1493" },
                { name: "lime", hex: "#BFFF00" }
            ],
            sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
            images: [
                "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1519278409-aa1e39022b2a?w=800&h=1000&fit=crop"
            ]
        }
    ],

    // Stationery Products
    stationery: [
        {
            id: "stationery-1",
            name: "Premium Notebook Set",
            description: "Elevate your writing experience with our premium notebook collection. Features thick cream paper, durable hardcover binding, and elegant design. Perfect for journaling, sketching, or note-taking.",
            price: 125.00,
            currency: "AED",
            category: "stationery",
            colors: [
                { name: "midnight-blue", hex: "#191970" },
                { name: "forest-green", hex: "#228B22" },
                { name: "burgundy", hex: "#800020" },
                { name: "charcoal", hex: "#36454F" }
            ],
            sizes: ["A5", "A4", "A6"],
            images: [
                "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=1000&fit=crop"
            ]
        },
        {
            id: "stationery-2",
            name: "Luxury Pen Collection",
            description: "Write in style with our curated collection of luxury pens. Featuring smooth ink flow, ergonomic design, and premium materials. Includes ballpoint, gel, and fountain pen options.",
            price: 180.00,
            currency: "AED",
            category: "stationery",
            colors: [
                { name: "gold", hex: "#FFD700" },
                { name: "silver", hex: "#C0C0C0" },
                { name: "rose-gold", hex: "#B76E79" },
                { name: "black", hex: "#000000" }
            ],
            sizes: ["Standard"],
            images: [
                "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&h=1000&fit=crop"
            ]
        },
        {
            id: "stationery-3",
            name: "Designer Planner 2024",
            description: "Stay organized in style with our premium designer planner. Features monthly and weekly layouts, goal-setting pages, habit trackers, and inspirational quotes throughout. Durable cover with elastic closure.",
            price: 220.00,
            currency: "AED",
            category: "stationery",
            colors: [
                { name: "blush-pink", hex: "#FFB3BA" },
                { name: "sage-green", hex: "#B5C99A" },
                { name: "lavender", hex: "#C8B6E2" },
                { name: "terracotta", hex: "#D4A574" }
            ],
            sizes: ["A5"],
            images: [
                "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=1000&fit=crop"
            ]
        },
        {
            id: "stationery-4",
            name: "Art Supplies Bundle",
            description: "Complete art supplies set for creative minds. Includes colored pencils, watercolors, brushes, sketchpad, and more. Premium quality materials perfect for artists of all levels.",
            price: 350.00,
            currency: "AED",
            category: "stationery",
            colors: [
                { name: "rainbow", hex: "#FF6B6B" },
                { name: "pastel", hex: "#B5EAD7" },
                { name: "neon", hex: "#FFE66D" },
                { name: "earth-tones", hex: "#A8DADC" }
            ],
            sizes: ["Complete Set"],
            images: [
                "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=1000&fit=crop",
                "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=1000&fit=crop"
            ]
        }
    ]
};

// Get all products as a flat array with IDs
export const getAllProducts = () => {
    const allProducts = {};
    Object.keys(mockProducts).forEach(category => {
        mockProducts[category].forEach(product => {
            allProducts[product.id] = product;
        });
    });
    return allProducts;
};

// Get product by ID
export const getProductById = (id) => {
    const allProducts = getAllProducts();
    return allProducts[id] || null;
};

// Get products by category
export const getProductsByCategory = (category) => {
    return mockProducts[category] || [];
};
