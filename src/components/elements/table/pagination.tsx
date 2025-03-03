'use client';

import React from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PaginationProps {
  selectedRows?: number;
  total: number;
  currentPage: number;
  totalPages: number;
}

const DataTablePagination = ({
  selectedRows = 0,
  total,
  currentPage,
  totalPages,
}: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { push } = useRouter();
  const perPage: number = Number(params.get('per_page')) || 10;
  const isMobile = useIsMobile();

  const handleNextPage = () => {
    params.set('page', (currentPage + 1).toString());
    push(`${pathname}?${params.toString()}`);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      params.set('page', (currentPage - 1).toString());
      if (currentPage - 1 === 1) {
        params.delete('page');
      }
      push(`${pathname}?${params.toString()}`);
    }
  };

  const handlePageChange = (pageTarget: number) => {
    params.set('page', pageTarget.toString());
    push(`${pathname}?${params.toString()}`);
  };

  const renderPageButtons = () => {
    const buttons = [];

    if (isMobile) {
      // Mobile version: show only 5 buttons
      const pageNumbers = [
        currentPage - 1,
        currentPage,
        currentPage + 1,
      ].filter((page) => page > 0 && page <= totalPages);

      pageNumbers.forEach((page) => {
        buttons.push(
          <PaginationItem key={`page-${page}`}>
            <Button
              variant={currentPage === page ? 'default' : 'outline'}
              onClick={() => handlePageChange(page)}
              size="icon"
            >
              {page}
            </Button>
          </PaginationItem>
        );
      });
    } else {
      // Desktop version: keep the existing logic
      if (currentPage <= 2) {
        // First 5 pages
        for (let i = 1; i <= Math.min(5, totalPages); i += 1) {
          buttons.push(
            <PaginationItem key={`page-${i}`}>
              <Button
                variant={currentPage === i ? 'default' : 'outline'}
                onClick={() => handlePageChange(i)}
                size="icon"
              >
                {i}
              </Button>
            </PaginationItem>
          );
        }
        if (totalPages > 5) {
          buttons.push(
            <PaginationItem key="ellipsis1">
              <PaginationEllipsis />
            </PaginationItem>
          );
          buttons.push(
            <PaginationItem key={`page-${totalPages}`}>
              <Button
                variant="outline"
                onClick={() => handlePageChange(totalPages)}
                size="icon"
              >
                {totalPages}
              </Button>
            </PaginationItem>
          );
        }
      } else if (currentPage >= totalPages - 1) {
        // Last 5 pages
        buttons.push(
          <PaginationItem key="page-1">
            <Button
              variant="outline"
              onClick={() => handlePageChange(1)}
              size="icon"
            >
              1
            </Button>
          </PaginationItem>
        );
        if (totalPages > 5) {
          buttons.push(
            <PaginationItem key="ellipsis2">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }
        for (let i = Math.max(totalPages - 4, 1); i <= totalPages; i += 1) {
          buttons.push(
            <PaginationItem key={`page-${i}`}>
              <Button
                variant={currentPage === i ? 'default' : 'outline'}
                onClick={() => handlePageChange(i)}
                size="icon"
              >
                {i}
              </Button>
            </PaginationItem>
          );
        }
      } else {
        // Middle pages
        buttons.push(
          <PaginationItem key="page-1">
            <Button
              variant="outline"
              onClick={() => handlePageChange(1)}
              size="icon"
            >
              1
            </Button>
          </PaginationItem>
        );
        buttons.push(
          <PaginationItem key="ellipsis3">
            <PaginationEllipsis />
          </PaginationItem>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i += 1) {
          buttons.push(
            <PaginationItem key={`page-${i}`}>
              <Button
                variant={currentPage === i ? 'default' : 'outline'}
                onClick={() => handlePageChange(i)}
                size="icon"
              >
                {i}
              </Button>
            </PaginationItem>
          );
        }
        buttons.push(
          <PaginationItem key="ellipsis4">
            <PaginationEllipsis />
          </PaginationItem>
        );
        buttons.push(
          <PaginationItem key={`page-${totalPages}`}>
            <Button
              variant="outline"
              onClick={() => handlePageChange(totalPages)}
              size="icon"
            >
              {totalPages}
            </Button>
          </PaginationItem>
        );
      }
    }

    return buttons;
  };

  return (
    <div>
      {total > 0 && (
        <div className="flex items-center justify-between gap-x-6">
          <p className="hidden w-full text-sm md:block">
            {selectedRows > 0 ? (
              <span>Selected {selectedRows} </span>
            ) : (
              <span>
                Showing {currentPage * perPage - perPage + 1} to{' '}
                {perPage * currentPage > total ? total : perPage * currentPage}{' '}
              </span>
            )}
            <span>of {total} entries</span>
          </p>
          {totalPages > 1 && (
            <Pagination className="mx-0 sm:justify-end">
              <PaginationContent className="w-full justify-end">
                <PaginationItem key="prev">
                  <Button
                    variant="outline"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    size="icon"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous page</span>
                  </Button>
                </PaginationItem>
                {renderPageButtons()}
                <PaginationItem key="next">
                  <Button
                    variant="outline"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    size="icon"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next page</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      )}
    </div>
  );
};

export default DataTablePagination;
