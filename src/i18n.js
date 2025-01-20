import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "Welcome": "Welcome to Our Website!",
            "We offer a variety of products to suit your needs. Explore and enjoy!": "We offer a variety of products to suit your needs. Explore and enjoy!",
            "Explore Products": "Explore Products",
            "Home": "Home",
            "Products": "Products",
            "Search": "Search",
            "Categories": "Categories",
            "View": "View Product",
        }
    },
    ua: {
        translation: {
            "Welcome": "Ласкаво просимо на наш сайт!",
            "We offer a variety of products to suit your needs. Explore and enjoy!": "Ми пропонуємо різноманітні продукти для ваших потреб. Досліджуйте і насолоджуйтесь!",
            "Explore Products": "Досліджуйте продукти",
            "Home": "Головна",
            "Products": "Каталог",
            "Search": "Пошук",
            "Categories": "Категорії",
            "View": "Переглянути",
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;