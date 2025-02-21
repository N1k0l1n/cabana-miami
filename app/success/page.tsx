"use client"

import { useRouter } from 'next/navigation'

export default function Success() {
  const router = useRouter()

  return (
    <div className="bg-luxury-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-store-300 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="space-y-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 text-green-500 mx-auto" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
          
          <h1 className="text-3xl font-bold text-gray-800">
            Authentication Successful! 🎉
          </h1>
          
          <p className="text-gray-600 text-lg">
            Your QuickBooks account has been successfully connected. 
            You can now access all financial features and manage your 
            accounting seamlessly.
          </p>

          <button
            onClick={() => router.push('/')}
            className="bg-luxury-300 hover:bg-luxury-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}