import { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import ChartCanvasContainer from '../../../components/ChartCanvasContainer';
import Modal from './AdminModal';
import DashboardStrategyTable from './DashboardStrategyTable';
import CustomDropdown from '../../../components/CustomDropdown';
import getStockName, { getStockData } from '../../../services/api';

function AlgoTradingDashboard() {
  const [pageNo, setPageNo] = useState(1);
  const { coinsList } = useSelector((state: any) => state);
  const [tokenName, setTokenName] = useState();
  const [laodingData, setLaodingData] = useState(false);

  const [toDeleteData, setToDeleteData] = useState<any>(null);
  // const [state, setState] = useState<any>([
  //   {
  //     startDate: new Date(),
  //     endDate: null,
  //     key: 'selection',
  //   },
  // ]);
  const [timeData, setTimeData] = useState<any>();

  const timeOptions = [
    { label: '1m', value: '1m' },
    { label: '5m', value: '5m' },
    { label: '15m', value: '15m' },
    { label: '1h', value: '1h' },
    { label: '1d', value: '1d' },
  ];

  const getInstrument = async () => {
    try {
      const res: any = await getStockName();
      setTokenName(res);
      console.log('res', res);
      console.log('tokenName', tokenName);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getDataStok = async () => {
    try {
      setLaodingData(true);
      const res = await getStockData();
      console.log('res', res);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLaodingData(false);
    }
  };

  useEffect(() => {
    getInstrument();
    getDataStok();
  }, []);

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
                    options={timeOptions}
                    placeholder={timeOptions[3].value || 'Select Interval'}
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
                  widthRatio={0.9}
                  textFillOHLC="#444444"
                  coinVal="BTCUSDT"
                  // values={topPerformingStrategyList}
                  // backTestData={tableData}
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
          // tableData={tableData}
          toDelete={(rowData: any) => setToDeleteData(rowData)}
          page={pageNo}
          // selectedStrategy={(e: any) => onHandleSearch(e)}
          coinsList={coinsList}
          onReset={() => {
            setPageNo(1);
            // setSelectedStrategy(null);
            // tradeListData({ page: 1, strategyName: '' });
          }}
        />
        {/* {activeCoinPageCount > 0 ? (
          <PaginationBar
            limit={limitCount}
            setLimit={(e: number) => setLimit(e)}
            page={pageNo}
            totalRecords={activeCoinsTotalCount}
            pageCount={activeCoinPageCount}
            limitOptions={[1, 2]}
            // onHandlePageClick={(e: number) => {
            //   onHandlePageClick(e);
            // }}
            isThemeV2="true"
          />
        ) : (
          ''
        )} */}
      </div>

      <ToastContainer />
    </div>
  );
}
export default AlgoTradingDashboard;
