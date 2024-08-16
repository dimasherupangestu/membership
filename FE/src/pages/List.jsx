import React from 'react'
import Card from '../components/Card'
import axiosInstance from '../utils/axios';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CardDetail from '../components/CardDetail';
const List = () => {
    const [movie, setMovie] = useState([])
    const [article, setArticle] = useState([])
    const token = localStorage.getItem("token");
    const getMovie = async () => {
       try {
        const response = await axiosInstance.get("/userVidio", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovie(response.data.data);
        console.log('tes',response.data)
       } catch (error) {
        console.log(error)
       }
    }

    const getArticle = async () => {
        try {
            const response = await axiosInstance.get("/userArticle", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            setArticle(response.data.data)
            console.log('tes',response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getMovie()
        getArticle()
    }, [])
    
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
                <CardDetail  key={movie.id}
                id={movie.id} 
                title={movie.title} 
                content={movie.content} 
                image={movie.imageString}
                url={movie.url}
               
          
                />
            ))}
        </div>
       </div>

    
    </>
  )
}

export default List