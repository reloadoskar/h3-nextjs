'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const PaginationControls = ( {hasNextPage,hasPrevPage,length}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const page = searchParams.get('page') ?? '1'
  const [per_page, setPerPage] = useState( searchParams.get('per_page') ?? '10' )

  useEffect(()=>{
    router.push(`${pathname}/?page=1&per_page=${per_page}`)
  },[per_page, ])

  return (
    <div className='flex gap-2 justify-center items-center'>
      <button
        className='px-4'
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`${pathname}/?page=${Number(page) - 1}&per_page=${per_page}`)
        }}>
        <ChevronLeft />
      </button>

      <div>
        {page} / {Math.ceil(length / Number(per_page))}
      </div>

      <div>
        <select className='inputmini' value={per_page} onChange={(e)=>setPerPage(e.target.value)}>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
        </select>
      </div>

      <button
        className='px-4'
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`${pathname}/?page=${Number(page) + 1}&per_page=${per_page}`)
        }}>
        <ChevronRight />
      </button>
    </div>
  )
}

export default PaginationControls