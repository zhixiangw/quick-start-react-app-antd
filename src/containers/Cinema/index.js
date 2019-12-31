import React from 'react'
import { Divider, Table, Input, Modal, Button } from 'antd';
import { connect } from 'react-redux'
import SearchForm from 'components/SearchForm'
import Action from './action'
import moment from 'moment';

class CinemaList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      limit: 10,
      offset: 0,
      filter: {}
    }
  }

  componentDidMount() {
    this.getList()
  }

  getList = () => {
    const { offset, limit, filter } = this.state
    return this.props.queryList({ offset, limit, filter: JSON.stringify(filter) })
  }

  getColumns = () => {
    return [
      {
        title: 'CinameId',
        dataIndex: 'cinemaId',
        key: 'cinemaId',
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '地址',
        dataIndex: 'addr',
        key: 'addr',
      },
      {
        title: '通知标签',
        key: 'tags',
        dataIndex: 'tags'
      },
      {
        title: '猫眼在售',
        key: 'sell',
        dataIndex: 'sell'
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
      },
      {
        title: '更新时间',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
      },
      {
        title: '操作',
        key: 'action',
        width: 160,
        render: (action, record) => {
          return (
            <span>
              <Button type="primary" href={`/#/cinema/detail/${record.key}`}>
                编辑
              </Button>
              <Button href={`/#/cinema/tags/${record.key}`}>
                标签
              </Button>
            </span>
          )
        },
      },
    ]
  }
  getDataSource = () => {
    const { list = [] } = this.props
    return list.map(record => {
      return {
        key: record.cinema_id,
        cinemaId: record.cinema_id,
        name: record.name,
        addr: record.addr || '--',
        sell: record.sell,
        updatedAt: record.updated_at && moment(record.updated_at).format('YYYY-MM-DD HH:mm:ss') || '--',
        tags: record.tags && record.tags.join(',') || '--',
        status: record.status ? '开启' : '关闭',
        sell: record.sell ? '在售' : '禁售',
      }
    })
  }

  getPagination = () => {
    const { count } = this.props
    return {
      hideOnSinglePage: true,
      pageSize: this.state.limit,
      total: count
    }
  }

  // 同步影院信息
  syncCinema = () => {

  }

  getFields = () => {
    return [{
      label: '影院名称',
      name: 'name'
    }, {
      label: '猫眼影院ID',
      name: 'cinemaId'
    }]
  }
  getButtons = () => {
    return [{
      label: '同步',
      type: 'danger',
      onClick: () => this.syncCinema(),
      icon: 'cloud-download',
      style: { marginLeft: 8 }
    }]
  }

  handleSearch = (values) => {
    this.setState({ filter: values, offset: 0 }, this.getList)
  }

  handleTableChange = ({ current }) => {
    const { limit } = this.state
    this.setState({ offset: (current - 1) * limit }, this.getList)
  }

  render() {
    return (
      <React.Fragment>
        <SearchForm fields={this.getFields()} buttons={this.getButtons()} onSearch={this.handleSearch} />
        <Divider />
        <Table
          onChange={this.handleTableChange}
          columns={this.getColumns()}
          dataSource={this.getDataSource()}
          pagination={this.getPagination()} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.CinemaReducer.list,
  count: state.CinemaReducer.count
});
const mapDispatchToProps = dispatch => ({
  queryList: payload => dispatch(Action.list(payload)),
  deleteRecord: id => dispatch(Action.delete(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CinemaList);
