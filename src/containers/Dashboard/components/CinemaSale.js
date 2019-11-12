
import React from 'react'
import { Chart, Geom, Axis, Tooltip, Coord, Label } from 'bizcharts'
import DataSet from '@antv/data-set'

const DataView = DataSet.DataView;

export default class CinemaSale extends React.Component {
  render() {
    const data = [
      { cname: '时机大道店', count: 23 },
      { cname: '塘桥店', count: 21 },
      { cname: '三林店', count: 33 },
      { cname: '上影SFC', count: 13 },
      { cname: '汉京电影', count: 63 },
      { cname: '和平市场电影', count: 73 },
      { cname: '社会王电影', count: 79 }
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'cname',
      as: 'percent'
    });
    const cols = { percent: { alias: '销售量', formatter: val => (val * 100).toFixed(2) + '%' } }
    return (
      <div>
        <Chart height={180} data={dv} scale={cols} forceFit padding="auto">
          <Coord type="theta" radius={0.5} />
          <Axis name="percent" />
          <Tooltip showTitle={false} />
          <Geom type="intervalStack" position="percent" color="cname" tooltip={['cname*percent', (cname, percent) => {
                return { name: cname, value: (percent * 100).toFixed(2) + '%'};
              }
          ]} >
            <Label
              content="percent"
              formatter={(val, item) => {
                return item.point.cname + ': ' + val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}
