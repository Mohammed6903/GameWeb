import React from 'react'
import Link from 'next/link'
import { Home, Info, Phone, Shield, FileText, Settings } from 'lucide-react'

interface footerProps {
  siteName: string
}

export default function Footer({siteName}: footerProps) {
  return (
    <footer className='bg-gradient-to-br from-purple-600 to-purple-800 w-full py-4 md:py-6'>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6'>
          <div className='text-white'>
            <Link href="/">
              <h1 className='text-xl font-semibold hover:text-purple-300 transition-colors'>
                {siteName ?? "Game"} | Browse all games
              </h1>
            </Link>
          </div>

          <nav className='text-white flex flex-wrap justify-center gap-4 md:gap-6'>
            <FooterLink href="/" icon={Home} text="Home" />
            <FooterLink href="/pages/about" icon={Info} text="About Us" />
            <FooterLink href="/pages/contacts" icon={Phone} text="Contact" />
            <FooterLink href="/pages/dmca" icon={Shield} text="DMCA" />
            <FooterLink href="/pages/privacy-policy" icon={FileText} text="Privacy Policy" />
            <FooterLink href="/pages/terms" icon={FileText} text="Terms of Service" />
            <FooterLink href="#" icon={Settings} text={`Powered by ${siteName ?? "Games"}`} />
          </nav>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, icon: Icon, text }: { href: string, icon: React.ElementType, text: string }) {
  return (
    <Link href={href} className='flex items-center gap-2 hover:text-purple-300 transition-colors'>
      <Icon className='w-4 h-4' />
      <span className='text-sm font-medium'>{text}</span>
    </Link>
  )
}