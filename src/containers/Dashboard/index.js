import React from 'react'
import { Card, Row, Col } from 'antd'
import SaleCurved from './components/SaleCurved'
import MovieSale from './components/MovieSale'
import CinemaSale from './components/CinemaSale'

export default class Dashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card title="一周销售趋势图">
          <SaleCurved />
        </Card>
        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={12}>
            <Card title="今日各个电影销售">
              <MovieSale />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="今日各个影院销售">
              <CinemaSale />
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}