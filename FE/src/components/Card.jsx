import React from 'react';
import { Link } from 'react-router-dom';
const Card = ({ id,title, content,url,to,image }) => {
   
  return (
    <div className="max-w-sm  p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">{title}</h5>
            {image && <img src={image} alt={title} className="w-full h-40 object-cover rounded"/>}
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2 mt-3">{content}</p>
            <Link to={`/${to}/${id}`}>
             <button className="py-2.5 px-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-10">
                Read more ...
                </button>
         </Link>
    </div>
  );
}

export default Card;
