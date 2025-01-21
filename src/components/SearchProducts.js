import { useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useSearchParams } from "react-router-dom";

import { useTranslation } from 'react-i18next';

const SearchProducts = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get("name") || "";
    const { t } = useTranslation();


    const onSubmit = values => {
        onSearch(values.name);
        setSearchParams({ ...Object.fromEntries(searchParams), name: values.name });
    };


    const schema = Yup.object({
        name: Yup.string()
            .min(3, "Minimum 3 symbols are required")
    })

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: queryParam,
        },
    });



    useEffect(() => {
        if (queryParam) {
            onSearch(queryParam);
        } else {
            setSearchParams((params) => {
                params.delete('name');
                return params;
            });
        }
    }, [queryParam, onSearch]);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 4,
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
                    <TextField
                        id="outlined-basic"
                        label={t("Search")}
                        variant="outlined"
                        type="text"
                        name="name"
                        {...register("name")}
                        sx={{
                            width: "100%",
                            borderRadius: "8px",
                        }}
                    />
                    <Typography sx={{ color: "red", marginTop: 1 }} variant="body2">
                        {errors.name?.message}
                    </Typography>
                </Box>
            </form>
        </Box>
    );
};

export default SearchProducts;
