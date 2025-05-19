import { sql } from "../config/db.js";

const SAMPLE_PRODUCTS = [
    {
        name: "Twenty One Pilots Funko Pop",
        price: 149.99,
        category: 'Accessories',
        description:
            "A collectible Funko Pop figure of the band Twenty One Pilots, perfect for fans and collectors.",
        image:
            "https://i.pinimg.com/736x/48/8e/eb/488eeba7b0e1318c8f387cb9e4685e74.jpg",
    },
    {
        name: "Mechanical Gaming Keyboard",
        price: 159.99,
        category: 'Electronics',
        description:
            "A high-performance mechanical keyboard with customizable RGB lighting and programmable keys.",
        image:
            "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&auto=format&fit=crop&q=60",
    },
    {
        name: "Nord Stage 3 Keyboard",
        category: 'Electronics',
        description:
            "A versatile stage piano with a wide range of sounds and features, perfect for live performances.",
        price: 249.99,
        image:
            "https://images.unsplash.com/photo-1524578471438-cdd96d68d82c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Logitech G Pro Wireless Gaming Mouse",
        price: 89.99,
        category: 'Electronics',
        description:
            "A high-precision wireless gaming mouse with customizable buttons and RGB lighting.",
        image:
            "https://i.pinimg.com/736x/8b/64/d9/8b64d9419a63d63f86d0ba1bbfc3bd6f.jpg",
    },
    {
        name: "Dell Monitor Technology Antiglare Metallic ",
        price: 449.99,
        category: 'Electronics',
        description:
            "A high-resolution LED gaming monitor with a fast refresh rate and low response time.",
        image:
            "https://i.pinimg.com/736x/41/98/c2/4198c246b5625556ea5d1546c1f1ab21.jpg",
    },
];

async function seedDatabase() {
    try {
        // first, clear existing data
        await sql`TRUNCATE TABLE products RESTART IDENTITY`;

        // insert all products
        for (const product of SAMPLE_PRODUCTS) {
            await sql`
        INSERT INTO products (name, price, image, description, category)
        VALUES (${product.name}, ${product.price}, ${product.image}, ${product.description}, ${product.category})
      `;
        }

        console.log("Database seeded successfully");
        process.exit(0); // success code
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1); // failure code
    }
}

seedDatabase();