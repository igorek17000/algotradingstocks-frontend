import Table from 'react-bootstrap/Table';
// import { useLocation, useParams } from 'react-router-dom';
// import SearchBar from '../../../components/Searchbar';

const TableBodyRowsComp = ({ rowData, index, page }: any) => (
  <>
    <tr
      key={`${index}_${rowData.orderId}`}
      className={`${rowData.isManual === true ? `bg-theme-v2-orange1` : ``} flex-col py-4 border-b`}
    >
      <td className="p-3">{(page - 1) * 10 + index + 1 || index + 1}</td>
      <td className="p-3">{rowData.cost}</td>
      <td className="p-3">{rowData.price}</td>
      <td className="p-3">{rowData.quantity}</td>
      <td className="p-3">{rowData.side}</td>
      <td className="p-3">{rowData.profit}</td>
      <td className="p-3">{rowData.cummProfit}</td>
      <td className="p-3">{rowData.time}</td>
    </tr>
  </>
);
const DashboardStrategyTable = ({
  tableData,
  toDelete,
  page,
  // strategies,
  // selectedStrategy,
  // selectedCoinFromList,
  showInternalHeader = true,
}: // onReset,
// showError,
// onSearch,
any) => (
  // {
  //   const location = useLocation();
  //   const param = useParams();
  //   return
  <div className="flex justify-center pb-4 bg-theme-v2-white1">
    <Table className=" w-full h-full text-center  rounded-lg border">
      <thead className="border border-theme-v2-blue4">
        {showInternalHeader && (
          <>
            <tr className="border-b border-theme-v2-blue4">
              <th colSpan={2} className="text-left py-4 px-5 text-theme-v2-blue2 text-[18px]">
                Trades
              </th>
              {/* <th colSpan={9} className="px-5">
                <div className="flex justify-end">
                  <div className="flex m-1">
                    <div className="mr-1">
                      <SearchBar
                        onFilterChange={(e: any) => {
                          console.log(e);
                          if ((!e.strategyName && !e.coin) || !e.strategyName) {
                            onReset();
                          } else if (!e.strategyName && e.coin) {
                            selectedCoinFromList(e.coin);
                          } else if (e.strategyName && !e.coin) {
                            selectedStrategy(e.strategyName);
                          } else if (e.strategyName && e.coin) {
                            onSearch(e);
                          }
                        }}
                        showError={showError}
                        showCoinDropdown
                        showStrategyDropdown
                        strategies={strategies}
                        showResetButton
                      />
                    </div>
                  </div>
                </div>
              </th> */}
            </tr>
          </>
        )}
        <tr className=" font-medium text-theme-v2-blue1">
          <th className="p-3">No</th>
          <th className="p-3">Cost</th>
          <th className="p-3">Price</th>
          <th className="p-3">Quantity</th>
          <th className="p-3">Profit</th>
          <th className="p-3">Side</th>
          <th className="p-3">CumProfit</th>
          <th className="p-3">date</th>
        </tr>
      </thead>
      <tbody className="w-full text-theme-v2-black3">
        {tableData?.length > 0 ? (
          tableData.map((d: any, index: number) => (
            <TableBodyRowsComp rowData={d} index={index} key={d.orderId} toDelete={toDelete} page={page} />
          ))
        ) : (
          <tr>
            <td colSpan={10} className="px-2 py-3 text-center font-bold">
              <h3>No Details Available</h3>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
);
// };

export default DashboardStrategyTable;
