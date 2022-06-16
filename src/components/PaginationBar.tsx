import ReactPaginate from 'react-paginate';
/**
 * @description Custom Pagniation bar extending react-paginate package
 * @param limit number : number of records to be fetched/displayed
 * @param limitOptions number[ ] : options to show in dropdown to change limit
 * @param page number : current page number that is being displayed
 * @param totalRecords number : total number of records that exist for given filter
 * @param pageCount number : total number of pages calculated using total records and limit
 * @event setLimit number :returns the newly selected value from limit options dropdown
 * @event onHandlePageClick number : returns the page number which is clicked by user
 * @returns renders custom pagination bar
 */
const PaginationBar = ({
  limit = 10,
  limitOptions = [10],
  setLimit,
  page,
  totalRecords,
  pageCount,
  onHandlePageClick,
  isThemeV2 = false,
}: any) => (
  <div className={`flex justify-end ${isThemeV2 ? 'text-theme-v2-black2' : 'text-white'} py-2 px-2`}>
    {limitOptions.length > 0 && (
      <div className="px-2">
        Rows per page:
        <select
          id="rowsPerPage"
          name="rowsPerPage"
          className={` ${isThemeV2 ? 'bg-transparent' : 'bg-black-perl-100 text-white'} px-1`}
          onChange={(e) => {
            setLimit(parseInt(e.target.value, 10));
          }}
          value={limit}
        >
          {limitOptions.map((opt: number) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    )}
    <div className="px-2">
      Page: {page} of {pageCount}
    </div>
    <div className="px-2">
      Records: {page * limit - limit + 1}-{page * limit > totalRecords ? totalRecords : page * limit} of {totalRecords}
    </div>
    <button
      type="button"
      onClick={() => {
        if (page === 1) return;
        onHandlePageClick(1);
      }}
      disabled={page === 1}
      // className={page === 1 ? 'text-gray-700 px-2' : 'px-2'}
      className={page === 1 ? `${isThemeV2 ? 'px-2 text-theme-v2-gray2' : 'text-gray-700 px-2'}` : 'rounded px-2'}
    >
      {'|<'}
    </button>
    <ReactPaginate
      onPageChange={(e) => {
        onHandlePageClick(e.selected + 1);
      }}
      pageRangeDisplayed={0}
      pageCount={pageCount}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      className="flex justify-end"
      breakClassName="display-none"
      pageClassName="display-none"
      // previousClassName={page === 1 ? 'text-gray-700 px-2' : 'rounded px-2'}
      previousClassName={
        page === 1 ? `${isThemeV2 ? 'px-2 text-theme-v2-gray2' : 'px-2 text-theme-v2-black2'}` : 'rounded px-2'
      }
      // nextClassName={page === pageCount ? 'text-gray-700 px-2' : 'rounded px-2'}
      nextClassName={
        page === pageCount ? `${isThemeV2 ? 'px-2 text-theme-v2-gray2' : 'text-gray-700 px-2'}` : 'rounded px-2'
      }
      activeClassName="display-none"
    />
    <button
      type="button"
      onClick={() => {
        if (page === pageCount) return;
        onHandlePageClick(pageCount);
      }}
      disabled={page === pageCount}
      // className={page === pageCount ? 'text-gray-700 px-2' : 'px-2'}
      className={
        page === pageCount ? `${isThemeV2 ? 'px-2 text-theme-v2-gray2' : 'text-gray-700 px-2'}` : 'rounded px-2'
      }
    >
      {'>|'}
    </button>
  </div>
);
export default PaginationBar;
