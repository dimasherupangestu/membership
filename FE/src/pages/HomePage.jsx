import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import axiosInstance from '../utils/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
    const [article, setArticle] = useState([]);
    const [movie, setMovie] = useState([]);
   
    const GetAllArticle = async () => {
        try {
            const response = await axiosInstance.get("/articles");
            setArticle(response.data.data);
            console.log('tes',response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const GetAllMovie = async () => {
        try {
            const response = await axiosInstance.get("/movies");
            setMovie(response.data.data);
            console.log('tes',response.data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        GetAllArticle(); 
        GetAllMovie();
    },[])
  return (
    <>
    <Navbar />
    <div>
        <h1 className="text-3xl font-bold text-center my-4"> Chose your Article </h1>
        <div className="w-full h-full py-4 px-5  flex justify-center items-center gap-4 flex-wrap">
            {article.map((article) => (
                <Card  key={article.id}
                id={article.id} 
                title={article.title} 
                content={article.content} 
                url={article.url}
                to={'article'}
                
                />
            ))}
         </div>
    </div>

       
       <div>
       <h1 className="text-3xl font-bold text-center my-4">Chose your Movie</h1>
       <div className="w-full h-full py-4 px-5 flex justify-center items-center gap-4 flex-wrap">
            {movie.map((movie) => (
                <Card  key={movie.id}
                id={movie.id} 
                title={movie.title} 
                content={movie.content} 
                image={movie.imageString}
                url={movie.url}
                to={'movie'}
          
                />
            ))}
        </div>
       </div>
    </>
  )
}
