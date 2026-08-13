import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50'>
            <h1 className='mb-4 text-6xl font-extrabold text-gray-800'>404</h1>
            <h2 className="mb-6 text-2xl font-semibold text-gray-700 sm:text-3xl">
                Oops! Page not found
            </h2>
            <p className="mb-6 text-gray-500">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="inline-block px-6 py-3 font-sans font-medium text-white transition-colors duration-300 rounded-lg bg-blue-950 hover:bg-blue-900"
            >
                Go Back Home
            </Link>
        </div>
    )
}

export default PageNotFound