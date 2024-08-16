import React from 'react'
import { Link } from 'react-router-dom'

const CardDetail = ({ id,title, content,url,to,image }) => {
  return (
    <>
    <div key={id} className="max-w-lg  p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h5 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1 ">{title}</h5>
        <iframe src={url} className="w-full h-64 object-cover rounded"></iframe>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-3 line-clamp-5 ">{content}</p>

         {to &&   <Link to={`/${to}`}>
           <button className={"w-full bg-blue-600 py-2 text-white"}>My List</button>
           </Link>}
    </div>
    </>
  )
}

export default CardDetail