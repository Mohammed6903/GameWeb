import React from 'react'
import Link from 'next/link'
import { Home, Info, Phone, Shield, FileText, Settings } from 'lucide-react' // Importing icons from Lucide

export default function Footer() {
  return (
    <div className='bg-gradient-to-br from-purple-600 to-purple-800 w-full h-14 border-t'>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
            <div className='text-white'>
                <Link href="/">
                    <h1 className='text-xl font-semibold hover:text-purple-300 transition-colors'>
                        Game | Browse all games
                    </h1>
                </Link>
            </div>

            <div className='text-white flex items-center gap-6'>
                <Link href="/" className='flex items-center gap-2 hover:text-purple-300'>
                    <Home className='w-5 h-5' />
                    <span className='text-base font-medium'>Home</span>
                </Link>
                <Link href="/pages/about" className='flex items-center gap-2 hover:text-purple-300'>
                    <Info className='w-5 h-5' />
                    <span className='text-base font-medium'>About Us</span>
                </Link>
                <Link href="/pages/contact" className='flex items-center gap-2 hover:text-purple-300'>
                    <Phone className='w-5 h-5' />
                    <span className='text-base font-medium'>Contact</span>
                </Link>
                <Link href="/pages/dmca" className='flex items-center gap-2 hover:text-purple-300'>
                    <Shield className='w-5 h-5' />
                    <span className='text-base font-medium'>DMCA</span>
                </Link>
                <Link href="/pages/privacy-policy" className='flex items-center gap-2 hover:text-purple-300'>
                    <FileText className='w-5 h-5' />
                    <span className='text-base font-medium'>Privacy Policy</span>
                </Link>
                <Link href="/pages/terms" className='flex items-center gap-2 hover:text-purple-300'>
                    <FileText className='w-5 h-5' />
                    <span className='text-base font-medium'>Terms of Service</span>
                </Link>
                <Link href="/pages/powered-by" className='flex items-center gap-2 hover:text-purple-300'>
                    <Settings className='w-5 h-5' />
                    <span className='text-base font-medium'>Powered by Games</span>
                </Link>
            </div>
        </div>
    </div>
  )
}
