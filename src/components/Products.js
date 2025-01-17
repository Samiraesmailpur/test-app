import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import SearchProducts from "./SearchProducts";
import SelectCategory from "./SelectCategory";



const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('');

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? product.bsr_category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/products.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);



    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress disableShrink />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>
                <SearchProducts onSearch={(query) => setSearchQuery(query)} />
                <SelectCategory products={products} onSelectCategory={(category) => setSelectedCategory(category)}/>
            </Box>
            <List>
                {filteredProducts.map((product) => (
                    <ListItem key={product.asin} sx={{ marginBottom: 2 }}>
                        <Card sx={{ display: "flex", width: "100%" }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 150, objectFit: "contain" }}
                                image={product.img}
                                alt={product.name}
                            />
                            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                                <CardContent>
                                    <Typography variant="h6">{product.name}</Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Price: ${product.price}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Category: {product.bsr_category}
                                    </Typography>
                                    <Link to={`/product/${product.asin}`}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ marginTop: 1 }}
                                        >
                                            View Product
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Box>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Products;
