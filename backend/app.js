const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const app = express();


// =====================================================
// Middleware
// =====================================================

app.use(express.json());
app.use(cors());


// =====================================================
// Database Models
// =====================================================

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }
});


const User = mongoose.model("User", {
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    cartData: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now
    }
});


// =====================================================
// Basic Routes
// =====================================================

app.get("/", (req, res) => {
    res.send("Express App is Running");
});


app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is working fine"
    });
});


// =====================================================
// Image Upload
// =====================================================

const storage = multer.diskStorage({

    destination: "./upload/images",

    filename: (req, file, cb) => {

        cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );

    }

});


const upload = multer({
    storage: storage
});


app.use(
    "/images",
    express.static("upload/images")
);


app.post("/upload", upload.single("product"), (req, res) => {

    res.json({
        success: 1,
        image_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });

});


// =====================================================
// Product APIs
// =====================================================

// Add Product
app.post("/add-product", async (req, res) => {

    try {

        const allProducts = await Product.find({});

        let id;

        if (allProducts.length > 0) {

            const lastProduct =
                allProducts[allProducts.length - 1];

            id = lastProduct.id + 1;

        } else {

            id = 1;

        }

        const product = new Product({

            id: id,

            name: req.body.name,

            image: req.body.image,

            category: req.body.category,

            new_price: req.body.new_price,

            old_price: req.body.old_price

        });

        await product.save();

        res.json({

            success: true,

            name: req.body.name

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            error: "Failed to add product"

        });

    }

});


// Remove Product
app.post("/remove-product", async (req, res) => {

    try {

        await Product.findOneAndDelete({
            id: req.body.id
        });

        res.json({

            success: true,

            name: req.body.name

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            error: "Failed to remove product"

        });

    }

});


// Get All Products
app.get("/all-products", async (req, res) => {

    try {

        const allProducts = await Product.find({});

        res.json(allProducts);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            error: "Failed to fetch products"

        });

    }

});


// New Collection
app.get("/new-collection", async (req, res) => {

    try {

        const allProducts = await Product.find({});

        const newProducts = allProducts.slice(-8);

        res.json(newProducts);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            error: "Failed to fetch new collection"

        });

    }

});


// Popular Phones
app.get("/popular-phones", async (req, res) => {

    try {

        const phones = await Product.find({
            category: "Phones"
        });

        res.json(phones.slice(0, 4));

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            error: "Failed to fetch popular phones"

        });

    }

});


// Related Phones
app.get("/related-phones", async (req, res) => {

    try {

        const phones = await Product.find({
            category: "Phones"
        });

        res.json(phones.slice(0, 4));

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            error: "Failed to fetch related phones"

        });

    }

});


// Related Tablets
app.get("/related-tablets", async (req, res) => {

    try {

        const tablets = await Product.find({
            category: "Tablets"
        });

        res.json(tablets.slice(0, 4));

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            error: "Failed to fetch related tablets"

        });

    }

});


// Related Laptops
app.get("/related-laptops", async (req, res) => {

    try {

        const laptops = await Product.find({
            category: "Laptops"
        });

        res.json(laptops.slice(0, 4));

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            error: "Failed to fetch related laptops"

        });

    }

});


// Related Audio
app.get("/related-audio", async (req, res) => {

    try {

        const audio = await Product.find({
            category: "Audio"
        });

        res.json(audio.slice(0, 4));

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            error: "Failed to fetch related audio"

        });

    }

});


// =====================================================
// Authentication Middleware
// =====================================================

const fetchUser = (req, res, next) => {

    const token = req.header("auth-token");

    if (!token) {

        return res.status(401).json({

            error: "Please authenticate using valid token"

        });

    }

    try {

        const data = jwt.verify(
            token,
            "secret_ecom"
        );

        req.user = data.user;

        next();

    } catch (error) {

        return res.status(401).json({

            error: "Please authenticate using valid token"

        });

    }

};


// =====================================================
// Cart APIs
// =====================================================

// Get Cart
app.post("/getcart", fetchUser, async (req, res) => {

    try {

        const userData = await User.findOne({
            _id: req.user.id
        });

        res.json(userData.cartData);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            error: "Failed to fetch cart"

        });

    }

});


// Add To Cart
app.post("/addtocart", fetchUser, async (req, res) => {

    try {

        const userData = await User.findOne({
            _id: req.user.id
        });

        userData.cartData[req.body.itemId] += 1;

        await User.findByIdAndUpdate(
            req.user.id,
            {
                cartData: userData.cartData
            }
        );

        res.send("Added to Cart");

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            error: "Failed to add item to cart"

        });

    }

});


// Remove From Cart
app.post("/removefromcart", fetchUser, async (req, res) => {

    try {

        const userData = await User.findOne({
            _id: req.user.id
        });

        if (userData.cartData[req.body.itemId] > 0) {

            userData.cartData[req.body.itemId] -= 1;

        }

        await User.findByIdAndUpdate(
            req.user.id,
            {
                cartData: userData.cartData
            }
        );

        res.send("Removed from Cart");

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            error: "Failed to remove item from cart"

        });

    }

});


// =====================================================
// Authentication APIs
// =====================================================

// Signup
app.post("/signup", async (req, res) => {

    try {

        const check = await User.findOne({
            email: req.body.email
        });

        if (check) {

            return res.status(400).json({

                success: false,

                error: "Existing user found with same email address"

            });

        }

        const cart = {};

        for (let i = 0; i < 300; i++) {

            cart[i] = 0;

        }

        const user = new User({

            name: req.body.username,

            email: req.body.email,

            password: req.body.password,

            cartData: cart

        });

        await user.save();

        const data = {

            user: {
                id: user.id
            }

        };

        const token = jwt.sign(
            data,
            "secret_ecom"
        );

        res.json({

            success: true,

            token: token

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            error: "Signup failed"

        });

    }

});


// Login
app.post("/login", async (req, res) => {

    try {

        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {

            return res.json({

                success: false,

                error: "User does not exist"

            });

        }

        const passwordCompare =
            req.body.password === user.password;

        if (!passwordCompare) {

            return res.json({

                success: false,

                error: "Invalid Password"

            });

        }

        const data = {

            user: {
                id: user.id
            }

        };

        const token = jwt.sign(
            data,
            "secret_ecom"
        );

        res.json({

            success: true,

            token: token

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            error: "Login failed"

        });

    }

});


// =====================================================
// Export Application
// =====================================================

module.exports = app;