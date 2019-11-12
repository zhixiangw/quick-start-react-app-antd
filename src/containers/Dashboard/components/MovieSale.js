
import React from 'react'
import { Chart, Geom, Axis, Tooltip, Coord, Label } from 'bizcharts'
import DataSet from '@antv/data-set'

const DataView = DataSet.DataView;

export default class MovieSale extends React.Component {
  render() {
    const data = [
      { mname: '夏洛克神探', count: 23 },
      { mname: '唐人街', count: 21 },
      { mname: '黑夜追凶', count: 33 },
      { mname: '懂游戏', count: 13 },
      { mname: '星期五', count: 63 },
      { mname: '和平市场', count: 73 },
      { mname: '交易王', count: 79 }
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'mname',
      as: 'percent'
    });
    const cols = { percent: { alias: '销售量', formatter: val => (val * 100).toFixed(2) + '%' } }
    return (
      <div>
        <Chart height={180} data={dv} scale={cols} forceFit padding="auto">
          <Coord type="theta" radius={0.5} />
          <Axis name="percent" />
          <Tooltip showTitle={false} />
          <Geom type="intervalStack" position="percent" color="mname" tooltip={['mname*percent', (mname, percent) => {
                return { name: mname, value: (percent * 100).toFixed(2) + '%'};
              }
          ]} >
            <Label
              content="percent"
              formatter={(val, item) => {
                return item.point.mname + ': ' + val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}
