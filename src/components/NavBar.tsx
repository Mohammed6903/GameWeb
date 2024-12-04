import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { Input } from '@/components/ui/input';

export default function NavBar() {
  return (
    <div className="bg-blue-300 w-full h-16 flex items-center justify-between px-4 md:px-8">
      <a href="/" className="flex items-center">
        <Image
          src="/logogame.png"
          alt="Game Logo"
          width={100}
          height={40}
          className="h-10 md:h-12"
        />
      </a>
      <div className="flex items-center space-x-4 md:space-x-6">
        <div className="relative">
          <BiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search games..."
            className="bg-[#3F3F4F] rounded-md pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4C4F6F]"
          />
        </div>
        <a href="/login" className="text-white hover:text-gray-300 transition-colors duration-200">
          <FaUserCircle className="w-6 h-6 md:w-7 md:h-7" />
        </a>
      </div>
    </div>
  );
}