import { useEffect, useRef } from 'react';
import {
  ChartCanvas,
  lastVisibleItemBasedZoomAnchor,
  discontinuousTimeScaleProvider,
  Chart,
  XAxis,
  YAxis,
  CandlestickSeries,
  MouseCoordinateY,
  MovingAverageTooltip,
  EdgeIndicator,
  ZoomButtons,
  OHLCTooltip,
  CrossHairCursor,
  MouseCoordinateX,
  Annotate,
  LabelAnnotation,
} from 'react-financial-charts';
// import useWebSocket from 'react-use-websocket'; // , { ReadyState }
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import useWebSocket from 'react-use-websocket';
import candleService from '../services/candleService';
import './CandleStick.css';

// let some = false;

const ChartCanvasContainer = ({
  backTestData,
  coinVal = 'BTCUSDT',
  widthRatio = 0.9,
  textFillOHLC = 'white',
  interval = '1h',
}: // dateState = '0',
// ,
any) => {
  const candleHeight = useRef(0);
  const socketUrl = `wss://stream.binance.com:9443/ws/${coinVal.toLowerCase()}@kline_${interval}`;
  const candleData = useRef([]);
  const calculatedData = useRef<any>();
  const OHLCdata = useRef<any>(null);
  const movingAverageTooltipValue: any = [];

  const height = 800;
  const width = window.innerWidth * widthRatio;

  const margin = { left: 0, right: 60, top: 25, bottom: 25 };

  const gridHeight = height - margin.top - margin.bottom;

  const elderRayHeight = 50;

  // const candleWithoutHeight = 450;

  // const barChartHeight = gridHeight / 4;
  // const barChartOrigin = (_: any, h: any) => [0, h - barChartHeight - elderRayHeight];

  const chartHeight = gridHeight - elderRayHeight;
  const openCloseColor = (OCcolordata: any) => (OCcolordata.close > OCcolordata.open ? '#26a69a' : '#ef5350');
  const yEdgeIndicator = (EdgeIndData: any) => EdgeIndData.close;
  const candleChartYExtents = (chartExdata: any) => [chartExdata.high, chartExdata.low];

  const pricesDisplayFormat = format('.2f');
  const dateTimeFormat = '%Y-%m-%d, %X';
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  useEffect(() => {
    candleService.getCandleData(coinVal, interval).then((d: any) => {
      candleData.current = d;
    });
    // }
  }, [coinVal, interval]);

  const { lastMessage } = useWebSocket(socketUrl);
  if (lastMessage && lastMessage.data) {
    const parsedData = JSON.parse(lastMessage?.data);
    const latestData: any = {
      date: parsedData.E,
      open: parseFloat(parsedData.k.o),
      low: parseFloat(parsedData.k.l),
      high: parseFloat(parsedData.k.h),
      close: parseFloat(parsedData.k.c),
      volume: parseFloat(parsedData.k.v),
    };
    OHLCdata.current = latestData;
    const newCandle: any = candleData.current;
    newCandle.pop();
    newCandle.push(latestData);
    candleData.current = newCandle;
  }
  // }, [lastMessage1]);

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => new Date(d.date));
  calculatedData.current = candleData.current;
  //! processing chart data based on the indicators selected.

  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData.current);

  const max = xAccessor(data[data.length - 1]);
  const min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [min, max + 5];

  const annotationPropsBuy = {
    fontSize: 30,
    fill: 'green',
    text: '⬆',
    y: 50,
  };

  const annotationPropsSell = {
    fontSize: 30,
    fill: 'red',
    text: '⬇',
    y: 50,
  };

  return (
    <ChartCanvas
      height={height}
      ratio={4}
      width={width}
      margin={margin}
      data={data}
      displayXAccessor={displayXAccessor}
      seriesName="MSFT"
      xScale={xScale}
      xAccessor={xAccessor}
      xExtents={xExtents}
      zoomAnchor={lastVisibleItemBasedZoomAnchor}
    >
      <CrossHairCursor />
      {/* {!showKagiChart.current && ( */}
      <Chart id={0} height={chartHeight - candleHeight.current} yExtents={candleChartYExtents}>
        <XAxis
          showGridLines={false}
          tickLabelFill="#7583FF"
          ticks={5}
          // tickFormat={(d) => {
          //   console.log('d', d);
          //   return new Date(d).toDateString();
          // }}
        />
        <YAxis showGridLines={false} tickLabelFill="#7583FF" tickFormat={pricesDisplayFormat} />
        {backTestData && backTestData.length > 0 && (
          <>
            <Annotate
              with={LabelAnnotation}
              when={
                (d) =>
                  backTestData.some(
                    (e: any) =>
                      // console.log('=>', new Date(e.dateTime).setSeconds(0, 0), d.date),
                      (e.dateEpoch === d.date?.toString() && e.signal === 'buy') || interval === '1d'
                        ? new Date(e.dateTime).toUTCString().slice(0, 15) ===
                            new Date(d.date).toUTCString().slice(0, 15) && e.side === 'buy'
                        : new Date(e.dateTime).setUTCSeconds(0, 0) === d.date && e.side === 'buy',
                    // console.log(
                    //   new Date(e.dateTime).toUTCString().slice(0, 15),
                    //   '=>',
                    //   new Date(d.date).toUTCString().slice(0, 15),
                    // ),
                    // console.log('backTestData', backTestData),
                  )
                /* some condition */
              }
              usingProps={annotationPropsBuy}
            />
            <Annotate
              with={LabelAnnotation}
              when={
                (d) =>
                  backTestData.some((e: any) =>
                    (e.dateEpoch === d.date?.toString() && e.signal === 'sell') || interval === '1d'
                      ? new Date(e.dateTime).toUTCString().slice(0, 15) ===
                          new Date(d.date).toUTCString().slice(0, 15) && e.side === 'sell'
                      : new Date(e.dateTime).setUTCSeconds(0, 0) === d.date && e.side === 'sell',
                  )
                /* some condition */
              }
              usingProps={annotationPropsSell}
            />
          </>
        )}
        <CandlestickSeries />
        <MouseCoordinateX displayFormat={timeDisplayFormat} />
        <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat} />
        <EdgeIndicator
          itemType="last"
          rectWidth={margin.right}
          fill={openCloseColor}
          lineStroke={openCloseColor}
          displayFormat={pricesDisplayFormat}
          yAccessor={yEdgeIndicator}
        />

        <ZoomButtons />
        <OHLCTooltip
          accessor={(d) => {
            if (new Date(d.date).toDateString() !== new Date().toDateString()) {
              return d;
            }
            return OHLCdata.current || d;
          }}
          origin={[900 * widthRatio, 0]}
          textFill={textFillOHLC}
          className="flex text-white bg-red-300"
          fontSize={14}
          labelFontWeight={700}
        />
        <MovingAverageTooltip options={movingAverageTooltipValue[0] ? movingAverageTooltipValue[0] : []} />
      </Chart>
    </ChartCanvas>
  );
};

export default ChartCanvasContainer;
