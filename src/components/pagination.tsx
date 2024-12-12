import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page if we're near the end
    if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex items-center space-x-2">
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link href={`${baseUrl}?page=${currentPage - 1}`}>
          <Button 
            variant="outline" 
            size="icon" 
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <ChevronLeft className="size-5" />
          </Button>
        </Link>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <Link key={page} href={`${baseUrl}?page=${page}`}>
          <Button
            variant={page === currentPage ? "default" : "outline"}
            className={`
              ${page === currentPage 
                ? 'bg-violet-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-white/10'}
            `}
          >
            {page}
          </Button>
        </Link>
      ))}

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link href={`${baseUrl}?page=${currentPage + 1}`}>
          <Button 
            variant="outline" 
            size="icon" 
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <ChevronRight className="size-5" />
          </Button>
        </Link>
      )}
    </div>
  )
}