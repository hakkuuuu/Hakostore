import sql from '../config/db.js';

export const getProducts = async (req, res) => {
    try {
        const products = await sql`
         SELECT * FROM products
         ORDER BY created_at DESC`;

        console.log("Fetched in getProducts function:", products);
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in getProducts:", error);
        res.status(500).send("Server error");
    }
}

export const createProduct = async (req, res) => {
    const { name, image, price, description, category } = req.body;

    if (!name || !image || !price || !description || !category) {
        return res.status(400).send({ success: false, message: "Please fill all fields" });
    }

    try {
        const newProduct = await sql`
            INSERT INTO products (name, image, price, description, category)
            VALUES (${name}, ${image}, ${price}, ${description}, ${category})
            RETURNING *;
        `;

        console.log("Created in createProduct function:", newProduct);
        res.status(201).json({ success: true, data: newProduct[0] });
    } catch (error) {
        console.log('Error in createProduct:', error);
        res.status(500).send("Server error");
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await sql`
            SELECT * FROM products WHERE id = ${id};
        `;

        if (product.length === 0) {
            return res.status(404).send({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: product[0] });
    } catch (error) {
        console.log('Error in getProductById:', error);
    }
}

export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const products = await sql`
            SELECT * FROM products WHERE category = ${category};
        `;

        if (products.length === 0) {
            return res.status(404).send({ success: false, message: "No products found in this category" });
        }

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log('Error in getProductsByCategory:', error);
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, image, price, description } = req.body;

    try {
        const updatedProduct = await sql`
            UPDATE products
            SET name = ${name}, image = ${image}, price = ${price}, description = ${description}
            WHERE id = ${id}
            RETURNING *;
        `;

        if (updatedProduct.length === 0) {
            return res.status(404).send({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: updatedProduct[0] });
    } catch (error) {
        console.log('Error in updateProduct:', error);
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await sql`
            DELETE FROM products WHERE id = ${id} RETURNING *;
        `;

        if (deletedProduct.length === 0) {
            return res.status(404).send({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: deletedProduct[0] });
    } catch (error) {
        console.log('Error in deleteProduct:', error);
    }
}
