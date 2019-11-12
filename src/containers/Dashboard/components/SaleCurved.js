
import React from 'react'
import { Chart, Geom, Axis, Tooltip } from 'bizcharts'

export default class SaleCurved extends React.Component {
  render() {
    const data = [
      { date: '星期一', count: 23 },
      { date: '星期二', count: 21 },
      { date: '星期三', count: 33 },
      { date: '星期四', count: 13 },
      { date: '星期五', count: 63 },
      { date: '星期六', count: 73 },
      { date: '星期日', count: 79 }
    ];
    const cols = { count: { alias: '销售金额', formatter: val => `${val}元` } }
    return (
      <div>
        <Chart height={300} data={data} scale={cols} forceFit padding="auto">
          <Axis name="date" />
          <Axis name="count" />
          <Tooltip crosshairs={{type: 'y'}} />
          <Geom type="line" position="date*count" size={2} shape="smooth" />
          <Geom type="point" position="date*count" size={4} shape="circle"/>
        </Chart>
      </div>
    );
  }
}