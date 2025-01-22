import { useEffect } from "react";
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

    const handleChange = (e) => {
        const params = new URLSearchParams(searchParams);
        console.log(params);
        if (e.target.value === "") {
            params.delete('name');
            onSearch(e.target.value);
        }
        setSearchParams(params);
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
        <div
            className='flex align-center justify-center mb-3'
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col w-[300px]'>
                    <input
                        className='w-full rounded-lg py-4 px-3.5 border-[#c7c7c9] border focus:outline-none'
                        type="text"
                        name="name"
                        placeholder={t("Search")}
                        onChange={(e) => handleChange(e)}
                        {...register("name", {
                            onChange: (e) => handleChange(e)
                        })}
                    />
                    <p className='text-red-700'>
                        {errors.name?.message}
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SearchProducts;
