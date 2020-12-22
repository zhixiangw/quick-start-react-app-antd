import React from 'react'
import { Divider, Table, Input, Avatar, Modal, Button, Icon } from 'antd';
import { connect } from 'react-redux'
import SearchForm from 'components/SearchForm'
import Action from '../action'
import moment from 'moment';

class movieList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      limit: 10,
      offset: 0,
      filter: {},
      voucherMatchType: [],
    }
  }

  componentDidMount() {
    this.props.voucherConfig().then(res=>{
      this.getList();
      const {
        voucherMatchType = [],
      } = res.value.data;
      this.state.voucherMatchType = voucherMatchType;
    })
  }

  getFields = () => {
    return [{
      label: '名称',
      name: 'name'
    }]
  }

  getButtons = () => {
    return [{
      label: '新增',
      type: 'primary',
      onClick: () => this.props.history.push('/voucher/movieForm/0'),
      icon: 'plus',
      style: { marginLeft: 8 }
    }]
  }

  handleSearch = (values) => {
    this.setState({ filter: values, offset: 0 }, this.getList)
  }

  getList = () => {
    const { offset, limit, filter } = this.state
    return this.props.queryList({ offset, limit, filter: JSON.stringify(filter) })
  }

  getColumns = () => {
    return [
      {
        title: 'ID',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: 'ICON',
        key: 'icon',
        width: 70,
        render: (action, record) => {
          return (
            <img width="30"  src={`${record.icon}`} alt= "" />
          )
        },
      },
      {
        title: '名称',
        width: 150,
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '详情',
        key: 'desc',
        width: 250,
        dataIndex: 'desc'
      },
      {
        title: '适用范围',
        key: 'type',
        dataIndex: 'type'
      },
      {
        title: '有效时间(天)',
        key: 'value',
        dataIndex: 'value'
      },
      {
        title: '过期时间',
        key: 'expireDate',
        dataIndex: 'expireDate',
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
      },
      {
        title: '操作',
        key: 'action',
        width: 90,
        render: (action, record) => {
          return (
            <span>
              <Button href={`/#/voucher/movieForm/${record.key}`} type="primary" >编辑</Button>
            </span>
          )
        },
      },
    ]
  }

  getPagination = () => {
    const { count } = this.props
    return {
      hideOnSinglePage: true,
      pageSize: this.limit,
      total: count
    }
  }

  getDataSource = () => {
    const { list = [] } = this.props;
    const { voucherMatchType = [] } = this.state;
    return list.map(record => {
      return {
        key: record.id,
        name: record.name,
        icon: record.icon, 
        desc: record.desc, 
        type: (voucherMatchType.find(i=>i.value===record.type) || {}).label , 
        value: record.voucher_expire, 
        createdAt: record.created_at && moment(record.created_at).format('YYYY-MM-DD HH:mm:ss') || '--',
        updatedAt: record.updated_at && moment(record.updated_at).format('YYYY-MM-DD HH:mm:ss') || '--',
        expireDate: record.expire_date && moment(record.expire_date).format('YYYY-MM-DD HH:mm:ss') || '--',
        status: record.status ? '开启' : '关闭',
      }
    })
  }

  handleTableChange = ({ current }) => {
    const { limit } = this.state
    this.setState({ offset: (current - 1) * limit }, this.getTagsList)
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
  list: state.VoucherReducer.list,
  count: state.VoucherReducer.count
});
const mapDispatchToProps = dispatch => ({
  voucherConfig: payload => dispatch(Action.voucherConfig(payload)),
  queryList: payload => dispatch(Action.movieList(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(movieList);
