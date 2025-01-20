import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import LanguageSelector from "../LanguageSelector";
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t } = useTranslation();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                    <Button component={Link} to="/" color="inherit">
                        {t("Home")}
                    </Button>
                    <Button component={Link} to="/products" color="inherit">
                        {t("Products")}
                    </Button>
                </Box>

                <LanguageSelector />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
