import { useRef } from 'react';
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
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import './CandleStick.css';

const ChartCanvasContainer = ({
  candleData,
  backTestData,
  widthRatio = 0.9,
  textFillOHLC = 'white',
}: // dateState = '0',
// ,
any) => {
  const candleHeight = useRef(0);
  const calculatedData = useRef<any>();
  const OHLCdata = useRef<any>(null);
  const movingAverageTooltipValue: any = [];

  const height = 800;
  const width = window.innerWidth * widthRatio;

  const margin = { left: 0, right: 60, top: 25, bottom: 25 };

  const gridHeight = height - margin.top - margin.bottom;

  const elderRayHeight = 50;

  const chartHeight = gridHeight - elderRayHeight;
  const openCloseColor = (OCcolordata: any) => (OCcolordata.close > OCcolordata.open ? '#26a69a' : '#ef5350');
  const yEdgeIndicator = (EdgeIndData: any) => EdgeIndData.close;
  const candleChartYExtents = (chartExdata: any) => [chartExdata.high, chartExdata.low];

  const pricesDisplayFormat = format('.2f');
  const dateTimeFormat = '%Y-%m-%d, %X';
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => new Date(d.date));
  calculatedData.current = candleData;
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
    y: 600,
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
      <Chart id={0} height={chartHeight - candleHeight.current} yExtents={candleChartYExtents}>
        <XAxis showGridLines={false} tickLabelFill="#7583FF" ticks={5} />
        <YAxis showGridLines={false} tickLabelFill="#7583FF" tickFormat={pricesDisplayFormat} />
        {backTestData && backTestData.length > 0 && (
          <>
            <Annotate
              with={LabelAnnotation}
              when={
                (d) =>
                  backTestData.some(
                    (e: any) =>
                      // console.log('new Date(e.time).toUTCString()', new Date(e.time).toUTCString(), 'd', d),
                      new Date(e.time).setSeconds(0, 0) === new Date(d.date).setSeconds(0, 0) && e.side === 'buy',
                  )
                /* some condition */
              }
              usingProps={annotationPropsBuy}
            />
            <Annotate
              with={LabelAnnotation}
              when={
                (d) =>
                  backTestData.some(
                    (e: any) =>
                      new Date(e.time).setSeconds(0, 0) === new Date(d.date).setSeconds(0, 0) && e.side === 'sell',
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
