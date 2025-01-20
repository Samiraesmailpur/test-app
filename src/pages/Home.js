import { useTranslation } from 'react-i18next';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    const { t } = useTranslation();

    return (
        <Container maxWidth="lg" sx={{ padding: 4 }}>
            <Box
                sx={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "80vh",
                }}
            >
                <Typography variant="h3" sx={{ marginBottom: 2 }}>
                    {t("Welcome")}
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: 4 }}>
                    {t("We offer a variety of products to suit your needs. Explore and enjoy!")}
                </Typography>

                <Button
                    component={Link}
                    to="/products"
                    variant="contained"
                    color="primary"
                    sx={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        borderRadius: "8px",
                    }}
                >
                    {t("Explore Products")}
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
