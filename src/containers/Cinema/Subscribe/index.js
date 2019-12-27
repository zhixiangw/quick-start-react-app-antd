import React from 'react'
import { Divider, Table, Input, Avatar, Modal, Button, Icon } from 'antd';
import { connect } from 'react-redux'
import SearchForm from 'components/SearchForm'
import Action from '../action'
import moment from 'moment';

class Subscribe extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      limit: 10,
      offset: 0,
      filter: {}
    }
  }

  componentDidMount() {
    this.getTagsList()
  }

  getTagsList = () => {
    const { offset, limit, filter } = this.state
    return this.props.queryTagsList({ offset, limit, filter: JSON.stringify(filter) })
  }

  getColumns = () => {
    return [
      {
        title: 'ID',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: '标签',
        dataIndex: 'tag',
        key: 'tag',
      },
      {
        title: '备注',
        dataIndex: 'note',
        key: 'note',
      },
      {
        title: '用户',
        key: 'user',
        dataIndex: 'user'
      },
      {
        title: '创建时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
      },
      {
        title: '操作',
        key: 'action',
        width: 180,
        render: (action, record) => {
          return (
            <span>
              <Button href={`/#/cinema/subscribeForm/${record.key}`} type="primary" >编辑</Button>
              <Button onClick={this.handleDelete.bind(this, record.key)} type="danger">删除</Button>
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
    const { tagsList = [] } = this.props
    return tagsList.map(record => {
      return {
        key: record.id,
        tag: record.tag,
        note: record.note,
        user: record.user.join(','),
        createdAt: record.created_at && moment(record.created_at).format('YYYY-MM-DD hh:mm:ss') || '--',
        updatedAt: record.updated_at && moment(record.updated_at).format('YYYY-MM-DD hh:mm:ss') || '--',
        status: record.status ? '开启' : '关闭',
      }
    })
  }

  getFields = () => {
    return [{
      label: 'TAG',
      name: 'tag'
    }, {
      label: '备注',
      name: 'note'
    }]
  }
  getButtons = () => {
    return [{
      label: '新增标签',
      type: '',
      onClick: () => this.props.history.push('/cinema/subscribeForm/0'),
      icon: 'plus',
      style: { marginLeft: 8 }
    }]
  }

  handleDelete = (id) => {
    Modal.confirm({
      title: '是否确定删除此用户？',
      content: '此操作不可逆，请三思后行！',
      okType: 'danger',
      onOk: () => {
        return new Promise((resolve, reject) => {
          this.props.deleteTags(id).then(() => {
            this.getTagsList()
            resolve()
          }, reject)
        });
      },
    })
  }

  handleSearch = (values) => {
    this.setState({ filter: values, offset: 0 }, this.getTagsList)
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
  tagsList: state.CinemaReducer.tagsList,
  count: state.CinemaReducer.tagsCount
});
const mapDispatchToProps = dispatch => ({
  queryTagsList: payload => dispatch(Action.tagsList(payload)),
  deleteTags: payload => dispatch(Action.tagsDelete(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);
