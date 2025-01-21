import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";

const Product = () => {
    const { asin } = useParams();
    const dispatch = useDispatch();
    const { product, loading } = useSelector((state) => state.products);


    useEffect(() => {
        dispatch({ type: "PRODUCT_FETCH_REQUESTED", payload: asin });
    }, [asin, dispatch]);


    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!product) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Typography variant="h6">Product not found</Typography>
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
