import React from 'react'
import { Divider, Table, Input, Avatar, Modal, Button, Icon } from 'antd';
import { connect } from 'react-redux'
import SearchForm from 'components/SearchForm'
import Action from '../action'
import moment from 'moment';

class SnacksList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      limit: 10,
      offset: 0,
      filter: {},
      distcounts: [],
    }
  }

  componentDidMount() {
    this.props.queryAllDiscount().then(res=>{
      this.getList();
      const {
        items = [],
      } = res.value.data;
      this.state.distcounts = items;
    })
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
        title: '展示文案',
        width: 150,
        dataIndex: 'note',
        key: 'note',
      },
      {
        title: '详情',
        key: 'desc',
        width: 250,
        dataIndex: 'desc'
      },
      {
        title: '折扣信息',
        key: 'discount',
        dataIndex: 'discount'
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
              <Button href={`/#/voucher/snacksForm/${record.key}`} type="primary" >编辑</Button>
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
    const { distcounts = [] } = this.state;
    return list.map(record => {
      return {
        key: record.id,
        name: record.name,
        icon: record.icon, 
        desc: record.desc, 
        note: record.note, 
        discount: (distcounts.find(i=>i.id === record.preferential) || {}).name, 
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
  queryAllDiscount: payload => dispatch(Action.allDiscount(payload)),
  queryList: payload => dispatch(Action.membercardList(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SnacksList);
