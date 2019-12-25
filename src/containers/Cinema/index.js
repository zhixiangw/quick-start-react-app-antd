import React from 'react'
import { Divider, Table, Input, Avatar, Modal, Button, Icon } from 'antd';
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
        title: '标签',
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
        render: (action, record) => {
          return (
            <span>
              <a href={`/#/cinema/detail/${record.key}`}>编辑</a>
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
        key: record.id,
        cinemaId: record.cinema_id,
        name: record.name,
        addr: record.addr || '--',
        sell: record.sell,
        updatedAt: record.updated_at && moment(record.updated_at).format('YYYY-MM-DD hh:mm:ss') || '--',
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
      pageSize: this.limit,
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
      type: 'primary',
      onClick: () => this.syncCinema(),
      icon: 'plus',
      style: { marginLeft: 8 }
    }]
  }


  handleResetPassword = (id) => {
    Modal.confirm({
      title: '是否重置此用户密码?',
      content: <Input placeholder="请输入重置的新密码" onChange={(e) => this.setState({ password: e.target.value })} />,
      onOk: () => {
        const { password } = this.state
        if (password) {
          return new Promise((resolve, reject) => {
            this.props.passwordRest({ password, id: String(id) }).then(resolve, reject)
          });
        } else {
          message.error('请输入密码')
          return Promise.reject('请输入密码');
        }
      },
    })
  }

  handleSearch = (values) => {
    this.setState({ filter: values, offset: 0 }, this.getList)
  }

  handleTableChange = ({ current }) => {
    const { limit } = this.state
    this.setState({ offset: current * limit }, this.getList)
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
