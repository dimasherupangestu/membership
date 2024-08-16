import {useParams, Link} from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import axiosInstance from '../utils/axios';

const ArticleDetail = () => {
    const {id} = useParams();
    const IdArtikel = Number(id);
    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);
    const hasUpdated = useRef(false);

    const updateUser = async () => {
        if (hasUpdated.current) return; // Prevent update if already done

        try {
            const response = await axiosInstance.patch('/memberArticle', {
                idArtikel: IdArtikel
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            hasUpdated.current = true; // Mark as updated
            console.log('success', response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const GetArticleId = async () => {
        try {
            const response = await axiosInstance.get(`/article/${id}`); 
            console.log('first', response.data); 
            setData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetArticleId();
        updateUser(); 
    }, []); 

    return (
        <>
            <Navbar />
            <div>
                <h1 className="text-3xl font-bold text-center my-3">Article Detail</h1>
                <div key={data.id} className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/article/${data.id}`}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.title}</h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.content}</p>
                </div>
            </div>
        </>
    );
};

export default ArticleDetail;
