import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

export default function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h2 className="line-clamp-2 text-base font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  )
}