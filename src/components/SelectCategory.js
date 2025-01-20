import {useEffect, useState} from "react";
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="select-category-label">{t("Categories")}</InputLabel>
            <Select
                labelId="select-category-label"
                id="select-category"
                value={selectedCategory}
                label="Categories"
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {categories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                        {category}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectCategory;
