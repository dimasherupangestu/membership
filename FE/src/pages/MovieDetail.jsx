import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axiosInstance from '../utils/axios'
import { useState, useEffect } from 'react'
import CardDetail from '../components/CardDetail'
const MovieDetail = () => {
    const {id} = useParams()
    const IdMovie = Number(id)
    const [data, setData] = useState([]);
    const token = localStorage.getItem("token");
    const getMovie = async () => {
        try {
            const response = await axiosInstance.get(`/movie/${id}`);
            console.log('first', response.data.data);
            setData(response.data.data);
        } catch (error) {
            console.log(error)
        }
    }
    const updateUser = async () => {
        try {
            const response = await axiosInstance.patch('/memberVidio', {
                idVideo: IdMovie
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
          
            console.log('success', response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMovie();
        updateUser();
    }, [])
  return (
    <>
    <div>
    <Navbar />
    <h1 className="text-3xl font-bold text-center my-3">Detail Movie</h1>
    <div className="w-full h-full py-4 px-5 flex justify-center items-center gap-4 flex-wrap">
         <CardDetail  key={data.id}
                id={data.id} 
                title={data.title} 
                content={data.content} 
                image={data.imageString}
                url={data.url}
                to={'movie'}
            />
        </div>
    </div>
    </>
  )
}

export default MovieDetail