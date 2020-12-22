import React from 'react'
import { Divider, Table, Button } from 'antd';
import { connect } from 'react-redux'
import SearchForm from 'components/SearchForm'
import Action from '../action'
import moment from 'moment';

class SnacksList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      limit: 10,
      list: [],
      count: 10,
      offset: 0,
      filter: {},
    }
  }

  componentDidMount() {
    this.getList();
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
      onClick: () => this.props.history.push('/voucher/membercardForm/0'),
      icon: 'plus',
      style: { marginLeft: 8 }
    }]
  }

  handleSearch = (values) => {
    this.setState({ filter: values, offset: 0 }, this.getList)
  }

  getList = () => {
    const { offset, limit, filter } = this.state
    return this.props.queryList({ offset, limit, filter: JSON.stringify(filter) }).then(res=>{
      const { message, code, data } = (res && res.value || {})
      if(code === 0){
        const { items = [], count = 0 } = data;
        this.setState({
          list: items,
          count
        })
      } else {
        message.error(`保存失败[${message}]`);
      }
    })
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
              <Button href={`/#/voucher/memberCardForm/${record.key}`} type="primary" >编辑</Button>
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
    return list.map(record => {
      return {
        key: record.id,
        name: record.name,
        icon: record.icon, 
        desc: record.desc, 
        note: record.note, 
        createdAt: record.created_at && moment(record.created_at).format('YYYY-MM-DD HH:mm:ss') || '--',
        updatedAt: record.updated_at && moment(record.updated_at).format('YYYY-MM-DD HH:mm:ss') || '--',
        expireDate: record.expire_date && moment(record.expire_date).format('YYYY-MM-DD HH:mm:ss') || '--',
        status: record.status ? '开启' : '关闭',
      }
    })
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

const mapStateToProps = (state) => ({});
const mapDispatchToProps = dispatch => ({
  queryList: payload => dispatch(Action.membercardList(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SnacksList);
