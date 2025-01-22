import { Link } from "react-router-dom";
import LanguageSelector from "../LanguageSelector";
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t } = useTranslation();

    return (
        <div className='sticky bg-[#1976d2] top-0 z-50'>
            <div className='container'>
            <div className='flex items-center justify-between px-4 py-4'>
                <div className='flex items-center gap-2'>
                    <Link to="/"  className='text-white hover:bg-[#ffffff14] p-1 duration-300'>
                        {t("Home")}
                    </Link>
                    <Link to="/products" className='text-white hover:bg-[#ffffff14] p-1 duration-300'>
                        {t("Products")}
                    </Link>
                </div>

                <LanguageSelector />
            </div>
            </div>
        </div>
    );
};

export default Header;
