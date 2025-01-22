import {useEffect, useState} from "react";
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const SelectCategory = ({ products, onSelectCategory }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get("category") || "";
    const [selectedCategory, setSelectedCategory] = useState(queryParam);
    const { t } = useTranslation();

    const categories = [...new Set(products.map((item) => item.bsr_category))];

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue);
        onSelectCategory(selectedValue);
        setSearchParams({ ...Object.fromEntries(searchParams), category: selectedValue });
    };

    useEffect(() => {
        if (queryParam) {
            onSelectCategory(queryParam);
        } else {
            setSearchParams((params) => {
                params.delete('category');
                return params;
            });
        }
    }, [queryParam, onSelectCategory]);

    return (
        <div className="py-4 relative w-[150px]">
            <label htmlFor="select-category" className="block text-sm font-medium text-gray-700 absolute top-0">
                {t("Categories")}
            </label>
            <select
                id="select-category"
                value={selectedCategory}
                onChange={handleChange}
                className="text-[#929292] mt-1 block w-full px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-4"
            >
                <option value="">
                    None
                </option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectCategory;
