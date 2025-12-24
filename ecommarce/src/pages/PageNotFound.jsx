import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4 text-center'>
            <h1 className='text-6xl text-gray-800 font-extrabold mb-4'>404</h1>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-6">
                Oops! Page not found
            </h2>
            <p className="text-gray-500 mb-6">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="inline-block px-6 py-3 bg-blue-950 font-sans text-white font-medium rounded-lg hover:bg-blue-900 transition-colors duration-300"
            >
                Go Back Home
            </Link>
        </div>
    )
}

export default PageNotFound