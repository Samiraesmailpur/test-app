import { useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "react-router-dom";

const SearchProducts = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get("name") || "";

    const formik = useFormik({
        initialValues: {
            name: queryParam,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "Minimum 3 symbols are required"),
        }),
        onSubmit: (values) => {
            onSearch(values.name);
            setSearchParams({ ...Object.fromEntries(searchParams), name: values.name });
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
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
                    <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        sx={{
                            width: "100%",
                            borderRadius: "8px",
                        }}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <Typography sx={{ color: "red", marginTop: 1 }} variant="body2">
                            {formik.errors.name}
                        </Typography>
                    )}
                </Box>
            </form>
        </Box>
    );
};

export default SearchProducts;
