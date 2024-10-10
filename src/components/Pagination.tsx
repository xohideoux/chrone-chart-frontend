import { TASKS_PER_PAGE } from '../constants';

interface PaginationProps {
  total: number
  currPage: number
  setCurrPage: React.Dispatch<React.SetStateAction<number>>
  isLoading: boolean
}

const Pagination = ({ total, currPage, setCurrPage, isLoading }: PaginationProps) => {
  const pagesAmount: number = Math.ceil(total / TASKS_PER_PAGE);

  const onClick = (page: number): void => {
    if (isLoading) return;
    if (currPage === page) return;
    setCurrPage(page);
  };

  const handlePaginationPrevClick = (): void => {
    if (isLoading) return;
    if (currPage === 0) return;
    setCurrPage(prev => prev - 1);
  };

  const handlePaginationNextClick = (): void => {
    if (isLoading) return;
    if (currPage === pagesAmount - 1) return;
    setCurrPage(prev => prev + 1);
  };

  return (
    <>
      {total > TASKS_PER_PAGE && (
        <nav className={'self-end flex items-center gap-2'}>
          <button
            className='pagination_arrow'
            onClick={handlePaginationPrevClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M10.5 12.75L6.75 9L10.5 5.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
          {[...Array(pagesAmount)].map((_, index) => {
            const currentPage: number = currPage;
            const lastPage: number = pagesAmount - 1;
            const firstPage: number = Math.max(0, currentPage - 2);
            const lastVisiblePage: number = Math.min(lastPage, firstPage + 5);

            if (index === 0 || index === lastPage) {
              return (
                <button
                  key={`pagination_${index}`}
                  className={`pagination_item ${currentPage === index && 'active'}`}
                  onClick={() => onClick(index)}
                >
                  {index + 1}
                </button>
              );
            }

            if (index >= firstPage && index <= lastVisiblePage) {
              return (
                <button
                  key={`pagination_${index}`}
                  className={`pagination_item ${currentPage === index && 'active'}`}
                  onClick={() => onClick(index)}
                >
                  {index + 1}
                </button>
              );
            }

            if (index === firstPage - 1 || index === lastVisiblePage + 1) {
              return (
                <span key={`ellipsis_${index}`} className="text-black-500">...</span>
              );
            }

            return null;
          })}

          <button
            className='pagination_arrow'
            onClick={handlePaginationNextClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7.5 5.25L11.25 9L7.5 12.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </nav>
      )}
    </>
  );
};

export default Pagination;
