import Table from 'react-bootstrap/Table';

const TableBodyRowsComp = ({ rowData, index }: any) => (
  <tr className="flex-col h-24 border-b border-quickSilver" style={{ opacity: 0.8 }}>
    <td>{index + 1}</td>
    <td>
      <div className="border-quickSilver border-b">Entry Shot</div>
      <div>Exit Shot</div>
    </td>
    {/* <td>
      <div className="border-quickSilver border-b">BBandSE</div>
      <div>BBandSE</div>
    </td> */}
    <td>
      <div className="border-quickSilver border-b">{rowData.entryDate}</div>
      <div>{rowData.exitDate}</div>
    </td>
    <td>
      <div className="border-quickSilver border-b">{rowData.entryPrice}</div>
      <div>{rowData.exitPrice}</div>
    </td>
    <td>{rowData.contracts}</td>
    <td className={`${rowData.profit && rowData.profit[0] < 0 ? 'text-red-500' : ''}`}>
      <div>{rowData.profit && rowData.profit[0]}</div>
      <div>{rowData.profit && rowData.profit[1]}%</div>
    </td>
    <td className={`${rowData.cumProfit && rowData.cumProfit[0] < 0 ? 'text-red-500' : ''}`}>
      <div>{rowData.cumProfit && rowData.cumProfit[0]}</div>
      <div>{rowData.cumProfit && rowData.cumProfit[1]}%</div>
    </td>
    <td>
      <div>{rowData.runUp && rowData.runUp[0]}</div>
      <div>{rowData.runUp && rowData.runUp[1]}%</div>
    </td>
    <td className={`${rowData.drawDown && rowData.drawDown[0] < 0 ? 'text-red-500' : ''}`}>
      <div>{rowData.drawDown && rowData.drawDown[0]}</div>
      <div>{rowData.drawDown && rowData.drawDown[1]}%</div>
    </td>
  </tr>
);

const TableComp = ({ tableData }: any) => (
  <div className="flex justify-center" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
    <Table className="flex w-full items-center text-center">
      <thead className="border-b border-quickSilver">
        <tr className="h-10">
          <th>Trade #</th>
          <th>Type</th>
          {/* <th>Signal</th> */}
          <th>Date</th>
          <th>Price</th>
          <th>Contracts</th>
          <th>Profit</th>
          <th>Cum. Profit</th>
          <th>Run Up</th>
          <th>DrawDown</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((d: any, index: any) => (
          <TableBodyRowsComp key={`trades-${d.entryDate}${d.tradeNo}`} rowData={d} index={index} />
        ))}
      </tbody>
    </Table>
  </div>
);

export default TableComp;
