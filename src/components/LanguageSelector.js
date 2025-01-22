import { useTranslation } from "react-i18next";
import "../i18n";

const LanguageSelector = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="relative inline-block">
            <select
                className="bg-transparent text-white border border-white rounded px-2 py-1 focus:outline-none hover:bg-[#ffffff14]"
                onChange={(e) => changeLanguage(e.target.value)}
                defaultValue="en"
            >
                <option value="en" className="bg-gray-800 text-white">EN</option>
                <option value="ua" className="bg-gray-800 text-white">UA</option>
            </select>
        </div>

    );
}


export default LanguageSelector;