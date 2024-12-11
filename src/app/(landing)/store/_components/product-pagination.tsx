import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export default function ProductPagination({
  searchParams,
  currentPage,
  totalPaginationButtons,
  totalProducts,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
  currentPage: number
  totalPaginationButtons: number
  totalProducts: number
}) {
  const totalPages = Math.ceil(totalProducts / 10)

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams as Record<string, string>)
    params.set('page', page.toString())
    return `?${params.toString()}`
  }

  return (
    <div className="mt-12">
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={createPageUrl(currentPage - 1)} />
            </PaginationItem>
          )}
          {Math.ceil(currentPage / totalPaginationButtons) > 1 && (
            <>
              <PaginationItem>
                <PaginationLink href={createPageUrl(1)}>{1}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}
          {[...Array(totalPaginationButtons)].map((_, index) => {
            const pageNumber =
              Math.floor((currentPage - 1) / totalPaginationButtons) *
                totalPaginationButtons +
              index +
              1

            if (pageNumber > totalPages) {
              return null
            }
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  href={createPageUrl(pageNumber)}
                  size={'sm'}
                  isActive={pageNumber === currentPage}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          {Math.ceil(currentPage / totalPaginationButtons) *
            totalPaginationButtons <
            totalPages && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={createPageUrl(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext href={createPageUrl(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}
