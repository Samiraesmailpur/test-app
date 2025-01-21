import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';

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
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('');
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);


    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? product.bsr_category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });


    useEffect(() => {
        dispatch({ type: "PRODUCTS_FETCH_REQUESTED" });
    }, [dispatch]);


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
                                            {t("View")}
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
