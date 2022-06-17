import { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
// import AsyncSelect from 'react-select/async';
import ChartCanvasContainer from '../../../components/ChartCanvasContainer';
import Modal from './AdminModal';
import DashboardStrategyTable from './DashboardStrategyTable';
import CustomDropdown from '../../../components/CustomDropdown';
import { getHistoricalData, getStockData } from '../../../services/api';
import loadOption from '../../../components/instruments';
import PaginationBar from '../../../components/PaginationBar';

function AlgoTradingDashboard() {
  const [pageNo, setPageNo] = useState(1);
  const [laodingData, setLaodingData] = useState(false);

  const [toDeleteData, setToDeleteData] = useState<any>(null);
  const [timeData, setTimeData] = useState<any>('1m');
  const [candleData, setCandleData] = useState<any>([]);
  const [cName, setCname] = useState<any>(319233);
  const [tableData, setTableData] = useState<any>();
  const [limitCount, setLimit] = useState<any>(10);
  const [totalCount, setTotalCount] = useState<any>(0);
  const [activeCoinPageCount, setActiveCoinPageCount] = useState<any>(0);

  // const loadOption: any = [];
  // const [loadOption, setLoadOptions] = useState([{ label: '', value: '' }]);

  const timeOptions = [
    { label: '1m', value: '1m' },
    { label: '3m', value: '3m' },
    { label: '5m', value: '5m' },
    { label: '10m', value: '10m' },
    { label: '15m', value: '15m' },
    { label: '30m', value: '30m' },
    { label: '1h', value: '1h' },
    { label: '1d', value: '1d' },
  ];

  const getBackTest = async () => {
    try {
      setLaodingData(true);
      const data = {
        // instrumentTokens: parseInt(cName, 10),
        instrumentTokens: [cName],
        date: '2022-06-16 00:00:37',
        stratInputs: {
          stopLimitPer: 0.3,
          stopLossPer: 0.3,
          sharesQuantity: 10,
        },
      };
      const res = await getStockData(data);
      setTableData(res.data[cName].allOrders);
      setTotalCount(res.data[cName].allOrders.length);
      setActiveCoinPageCount(Math.ceil(res.data[cName].allOrders.length / limitCount));
      console.log('activeCoinPageCount', activeCoinPageCount);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLaodingData(false);
    }
  };

  const getHistoricalDataStock = async () => {
    try {
      setLaodingData(true);
      const data = {
        instruToken: cName,
        interval: timeData,
        startDate: '2022-06-16T10:49:21.446Z',
        endDate: '2022-06-16T10:49:21.446Z',
      };
      const res = await getHistoricalData(data);
      setCandleData(res.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLaodingData(false);
    }
  };

  const onHandlePageClick = async (e: number) => {
    console.log('e', e);
    setPageNo(e);
  };

  useEffect(() => {
    getHistoricalDataStock();
    getBackTest();
  }, [timeData, cName]);

  return (
    <div className="m-10">
      {/* SPINNER */}
      <div
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}
      >
        {laodingData ? <ReactLoading type="spokes" color="#2626D9" /> : <></>}
      </div>
      <Modal show={toDeleteData}>
        <div className="flex justify-center h-full m-4">
          <div className="bg-theme-v2-white1 rounded">
            <div className="border-b border-theme-v2-white5 p-4">Sell</div>
            <div className="p-4">
              Are you sure You want to sell Strategy <span className="font-bold">{toDeleteData?.strategyName}</span> for{' '}
              <span className="font-bold">{toDeleteData?.symbol} </span>
              <br /> at current Price <span className="font-bold">{toDeleteData?.price}</span> and Quantity{' '}
              <span className="font-bold">{toDeleteData?.amount}</span> ?
            </div>
            <div className="p-4 flex justify-end">
              <button
                type="button"
                className="rounded text-theme-v2-blue2"
                style={{ padding: ' 16px 40px' }}
                onClick={() => {
                  // setToDeleteData(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded text-theme-v2-white1 bg-theme-v2-red1"
                style={{ padding: ' 16px 40px' }}
                // onClick={() => onSellConfirm()}
              >
                Sell
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex mt-10 mb-5 gap-4">
        <div className="flex-1">
          <div className="bg-theme-v2-white1 border border-theme-v2-blue4 rounded-lg">
            <div className="flex justify-between px-5 border-b border-theme-v2-blue4">
              <p className="py-4 px-4 text-theme-v2-blue2 text-[18px] font-bold ">Stocks Data </p>
              <div className="flex mr-1">
                <div className="m-4">
                  <CustomDropdown
                    options={loadOption}
                    placeholder="Search Company"
                    selectedValue={(e: any) => {
                      console.log('e', e);
                      setCname(e.value);
                      console.log('cName', cName);
                    }}
                    searchable
                    useThemev2="true"
                    minWidth="200px"
                  />
                  {/* <AsyncSelect
                    loadOptions={getLoadOptions}
                    isSearchable
                    onChange={(e: any) => setCname(e)}
                    className="w-40"
                  /> */}
                </div>
                <div className="m-4">
                  <CustomDropdown
                    options={timeOptions}
                    placeholder="Select Interval"
                    selectedValue={(val: any) => {
                      setTimeData(val.value);
                    }}
                    useThemev2="true"
                    minWidth="200px"
                  />
                </div>
              </div>
            </div>
            <div className="flex w-80 h-full bg-theme-v2-white1" id="id-CandleStickChart">
              <div className="flex-1 py-4 px-5 border-r border-theme-v2-blue4">
                {/* {showChart && ( */}
                <ChartCanvasContainer
                  candleData={candleData}
                  widthRatio={0.9}
                  textFillOHLC="#444444"
                  coinVal="BTCUSDT"
                  // values={topPerformingStrategyList}
                  backTestData={tableData}
                  // dateState={state}
                  interval={timeData}
                />
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {cointable} */}
      <div className="bg-theme-v2-white1 border border-theme-v2-blue4 rounded-lg">
        <DashboardStrategyTable
          tableData={tableData}
          toDelete={(rowData: any) => setToDeleteData(rowData)}
          page={pageNo}
          // selectedStrategy={(e: any) => onHandleSearch(e)}
          // coinsList={coinsList}
          onReset={() => {
            setPageNo(1);
            // setSelectedStrategy(null);
            // tradeListData({ page: 1, strategyName: '' });
          }}
        />
        <PaginationBar
          limit={limitCount}
          setLimit={(e: number) => setLimit(e)}
          page={pageNo}
          totalRecords={totalCount}
          pageCount={activeCoinPageCount}
          limitOptions={[10, 20]}
          onHandlePageClick={(e: number) => {
            onHandlePageClick(e);
          }}
          isThemeV2="true"
        />
      </div>

      <ToastContainer />
    </div>
  );
}
export default AlgoTradingDashboard;
