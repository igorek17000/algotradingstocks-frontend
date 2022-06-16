import { useEffect, useRef, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChartCanvasContainer from '../../../components/ChartCanvasContainer';
// import PaginationBar from '../../../components/PaginationBar';
import { updateCoinsList } from '../../../redux/reducer';
import { getCryptoCoinsList, sellCoinForStrategy } from '../../../services/api';
import Modal from './AdminModal';
import DashboardStrategyTable from './DashboardStrategyTable';
import CustomDropdown from '../../../components/CustomDropdown';

function AslgoTradingDashboard() {
  const [pageNo, setPageNo] = useState(1);
  const { coinsList } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [showChart, setShowChart] = useState(true);
  // const param = useParams();
  // const [tableData, setTableData] = useState([]);
  // const [selectedStrategy, setSelectedStrategy] = useState<any>();
  // const [activeCoinsTotalCount, setActiveCoinsTotalCount] = useState<any>(0);
  // const [activeCoinPageCount, setActiveCoinPageCount] = useState<any>(0);

  const [toDeleteData, setToDeleteData] = useState<any>(null);
  // const [state, setState] = useState<any>([
  //   {
  //     startDate: new Date(),
  //     endDate: null,
  //     key: 'selection',
  //   },
  // ]);
  const [timeData, setTimeData] = useState<any>();

  // const [limitCount, setLimit] = useState<any>(10);
  // const [laodingData, setLoadingData] = useState(false);
  // const [coinData, setCoinData] = useState();
  // const strategyData: any = [];

  const timeOptions = [
    { label: '1m', value: '1m' },
    { label: '5m', value: '5m' },
    { label: '15m', value: '15m' },
    { label: '1h', value: '1h' },
    { label: '1d', value: '1d' },
  ];

  const ele: any = useRef(null);
  const handleScroll = async () => {
    if (
      showChart === false &&
      ele.current &&
      ele.current.getBoundingClientRect().top - window.scrollY < 300 &&
      ele.current.getBoundingClientRect().top - window.scrollY > 0
    ) {
      setShowChart(true);
    }
  };

  const getCoinsListForDropdown = async () => {
    const res: any = await getCryptoCoinsList();
    const modRes = res.map((rItem: any) => ({ label: rItem.symbol, value: rItem.cryptoCoin }));
    dispatch(updateCoinsList(modRes));
  };

  const onSellConfirm = async () => {
    try {
      // todo: integrate api
      console.log('data to be deleted => ', toDeleteData);
      const res: any = await sellCoinForStrategy({
        strategyName: toDeleteData.strategyName,
        coinToSell: toDeleteData.symbol,
      });

      toast.success(res.message);
      setToDeleteData(null);
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  useEffect(() => {
    ele.current = document.getElementById('id-CandleStickChart');
    if (!coinsList.length) {
      getCoinsListForDropdown();
    }
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="m-10">
      {/* SPINNER */}
      {/* <div
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}
      >
        {isLoadingForActiveDormant || laodingData ? <ReactLoading type="spokes" color="#2626D9" /> : <></>}
      </div> */}
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
                  setToDeleteData(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded text-theme-v2-white1 bg-theme-v2-red1"
                style={{ padding: ' 16px 40px' }}
                onClick={() => onSellConfirm()}
              >
                Sell
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex mt-10 mb-5 gap-4">
        {/* trades */}
        <div className="flex-1">
          <div className="bg-theme-v2-white1 border border-theme-v2-blue4 rounded-lg">
            {/* Top Performing Strategies */}
            <div className="flex justify-between px-5 border-b border-theme-v2-blue4">
              <p className="py-4 px-4 text-theme-v2-blue2 text-[18px] font-bold ">Coin Data </p>
              {/* todo filters etc */}
              {/* <img src={calendarIcon} alt="calendar" />{' '} */}
              <div className="flex mr-1">
                {/* <AiOutlineCalendar size={60}> */}
                {/* <ReactDatePicker
                  selected={startDate}
                  onChange={(date: any) => setStartDate(date)}
                  showPopperArrow
                  className="flex mt-4 mr-1"
                /> */}
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
                {/* <div>
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    style={{ marginTop: '1rem', marginRight: '1rem' }}
                  >
                    {!open ? (
                      <BsFillCalendarPlusFill size={35} color="#0000FF" />
                    ) : (
                      <BsCalendar2MinusFill size={35} color="#FF0000" />
                    )}
                  </button>
                  {open && (
                    <DateRange
                      showDateDisplay
                      // editableDateInputs
                      onChange={(item) => setState([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={state}
                      displayMode="dateRange"
                    />
                  )}
                </div> */}
              </div>
            </div>
            <div className="flex w-80 h-full bg-theme-v2-white1" id="id-CandleStickChart">
              <div className="flex-1 py-4 px-5 border-r border-theme-v2-blue4">
                {showChart && (
                  <ChartCanvasContainer
                    widthRatio={0.9}
                    textFillOHLC="#444444"
                    coinVal="BTCUSDT"
                    // values={topPerformingStrategyList}
                    // backTestData={tableData}
                    // dateState={state}
                    interval={timeData}
                  />
                )}
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
export default AslgoTradingDashboard;
