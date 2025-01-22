import {Link, useParams} from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductByAsin } from "../store/products/productsOperations";


const Product = () => {
    const { asin } = useParams();
    const dispatch = useDispatch();
    const { product, loading } = useSelector((state) => state.products);


    useEffect(() => {
        dispatch(getProductByAsin(asin));
    }, [asin, dispatch]);


    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <p>Loading...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <p>Product not found</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex bg-white shadow-lg rounded-lg">
                <img
                    src={product.img}
                    alt={product.name}
                    className="w-1/2 object-contain p-4"
                />
                <div className="p-4 flex flex-col gap-2.5">
                    <h1 className="text-xl font-semibold">{product.name}</h1>
                    <p className="text-sm text-gray-600">Price: ${product.price}</p>
                    <p className="text-sm text-gray-600">Category: {product.bsr_category}</p>
                    <p className="text-sm text-gray-600">
                        Description: {product.description || "No description available."}
                    </p>
                    <Link to={product.link} className="mt-2">
                        <button className="bg-[#1976d2] text-white py-2 px-4 rounded hover:bg-[#186bbd  ]">
                           Детальніше
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;
