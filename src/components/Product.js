import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Product = () => {
    const { asin } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch("/products.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch product");
                }
                const data = await response.json();
                const foundProduct = data.products.find(p => p.asin === asin);
                setProduct(foundProduct);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [asin]);

    if (!product) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Typography variant="h6">Loading...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
            <Card sx={{ display: "flex" }}>
                <CardMedia
                    component="img"
                    sx={{ width: "50%", objectFit: "contain" }}
                    image={product.img}
                    alt={product.name}
                />
                <CardContent>
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography variant="body1" color="text.secondary">
                        Price: ${product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Category: {product.bsr_category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                        Description: {product.description || "No description available."}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Product;
