import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import * as React from 'react';
import { Chart, ChartCanvas } from 'react-financial-charts';
import { XAxis, YAxis } from 'react-financial-charts/lib/axes';
import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-financial-charts/lib/coordinates';
import { elderRay, ema } from 'react-financial-charts/lib/indicator';
import { ZoomButtons } from 'react-financial-charts/lib/interactive';
import { discontinuousTimeScaleProviderBuilder } from 'react-financial-charts/lib/scale';
import { BarSeries, CandlestickSeries, ElderRaySeries, LineSeries } from 'react-financial-charts/lib/series';
import { MovingAverageTooltip, OHLCTooltip, SingleValueTooltip } from 'react-financial-charts/lib/tooltip';
import { withDeviceRatio } from 'react-financial-charts/lib/utils';
import { lastVisibleItemBasedZoomAnchor } from 'react-financial-charts/lib/utils/zoomBehavior';
import { withSize } from 'utils';
import fetchStockData, { IOHLCData } from 'services/fetchStockData';

interface Props {
  readonly data: IOHLCData[];
  readonly height: number;
  readonly dateTimeFormat?: string;
  readonly width: number;
  readonly ratio: number;
  readonly stock: string;
}

class StockChart extends React.Component<Props> {
  private readonly margin = { left: 0, right: 48, top: 0, bottom: 24 };
  private readonly pricesDisplayFormat = format('.2f');
  private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d: IOHLCData) => d.date);

  public render() {
    const { data: initialData, dateTimeFormat = '%d %b', height, ratio, width } = this.props;

    const ema12 = ema()
      .id(1)
      .options({ windowSize: 12 })
      .merge((d: any, c: any) => {
        d.ema12 = c;
      })
      .accessor((d: any) => d.ema12);

    const ema26 = ema()
      .id(2)
      .options({ windowSize: 26 })
      .merge((d: any, c: any) => {
        d.ema26 = c;
      })
      .accessor((d: any) => d.ema26);

    const elder = elderRay();

    const calculatedData = elder(ema26(ema12(initialData)));

    const { margin, xScaleProvider } = this;

    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData);

    const start = xAccessor(data[data.length - 1]);
    const end = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [start, end];

    const gridHeight = height - margin.top - margin.bottom;

    const elderRayHeight = 100;
    const elderRayOrigin = (_: number, h: number) => [0, h - elderRayHeight];
    const barChartHeight = gridHeight / 4;
    const barChartOrigin = (_: number, h: number) => [0, h - barChartHeight - elderRayHeight];
    const chartHeight = gridHeight - elderRayHeight;

    const timeDisplayFormat = timeFormat(dateTimeFormat);

    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={width}
        margin={margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        <Chart id={2} height={barChartHeight} origin={barChartOrigin} yExtents={this.barChartExtents}>
          <BarSeries fill={this.openCloseColor} yAccessor={this.yBarSeries} />
        </Chart>
        <Chart id={3} height={chartHeight} yExtents={this.candleChartExtents}>
          <XAxis showGridLines showTickLabel={false} />
          <YAxis showGridLines tickFormat={this.pricesDisplayFormat} />
          <CandlestickSeries />
          <LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()} />
          <LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()} />
          <MouseCoordinateY rectWidth={margin.right} displayFormat={this.pricesDisplayFormat} />
          <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={this.openCloseColor}
            lineStroke={this.openCloseColor}
            displayFormat={this.pricesDisplayFormat}
            yAccessor={this.yEdgeIndicator}
          />
          <MovingAverageTooltip
            origin={[8, 24]}
            options={[
              {
                yAccessor: ema26.accessor(),
                type: 'EMA',
                stroke: ema26.stroke(),
                windowSize: ema26.options().windowSize,
              },
              {
                yAccessor: ema12.accessor(),
                type: 'EMA',
                stroke: ema12.stroke(),
                windowSize: ema12.options().windowSize,
              },
            ]}
          />

          <ZoomButtons />
          <OHLCTooltip origin={[8, 16]} />
        </Chart>
        <Chart
          id={4}
          height={elderRayHeight}
          yExtents={[0, elder.accessor()]}
          origin={elderRayOrigin}
          padding={{ top: 8, bottom: 8 }}
        >
          <XAxis showGridLines gridLinesStroke="#e0e3eb" />
          <YAxis ticks={4} tickFormat={this.pricesDisplayFormat} />

          <MouseCoordinateX displayFormat={timeDisplayFormat} />
          <MouseCoordinateY rectWidth={margin.right} displayFormat={this.pricesDisplayFormat} />

          <ElderRaySeries yAccessor={elder.accessor()} />

          <SingleValueTooltip
            yAccessor={elder.accessor()}
            yLabel="Elder Ray"
            yDisplayFormat={(d: any) =>
              `${this.pricesDisplayFormat(d.bullPower)}, ${this.pricesDisplayFormat(d.bearPower)}`
            }
            origin={[8, 16]}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }

  private readonly barChartExtents = (data: IOHLCData) => {
    return data.volume;
  };

  private readonly candleChartExtents = (data: IOHLCData) => {
    return [data.high, data.low];
  };

  private readonly yBarSeries = (data: IOHLCData) => {
    return data.volume;
  };

  private readonly yEdgeIndicator = (data: IOHLCData) => {
    return data.close;
  };

  private readonly openCloseColor = (data: IOHLCData) => {
    return data.close > data.open ? '#26a69a' : '#ef5350';
  };
}

const withOHLCState = fetchStockData()(withSize(400)(withDeviceRatio()(StockChart)));

export default withOHLCState;
