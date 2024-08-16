import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, title, content, url, to, image, acceessArtikel, acceessVideo }) => {
  const renderButton = (hasAccess, type) => {
    if (!hasAccess) {
      return (
        <Link to={`/upgrade`}>
          <button className="w-full bg-red-600 py-2 text-white">
            Limit Reached for {type}
          </button>
        </Link>
      );
    }

    return (
      <Link to={`/${to}/${id}`}>
        <button className="w-full bg-blue-600 py-2 text-white">
          My List
        </button>
      </Link>
    );
  };

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
        {title}
      </h5>
      {image && <img src={image} alt={title} className="w-full h-40 object-cover rounded" />}
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2 mt-3">
        {content}
      </p>
      {acceessArtikel !== undefined && renderButton(acceessArtikel, 'Article')}
      {acceessVideo !== undefined && renderButton(acceessVideo, 'Video')}
    </div>
  );
};

export default Card;
