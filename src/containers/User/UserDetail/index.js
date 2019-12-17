import React from 'react'
import { connect } from 'react-redux'
import CreateUserForm from './CreateUserForm'
import UserAction from '../action'

class UserDetail extends React.Component {
  constructor(props) {
    super(props)
    const { orderId } = this.props.match.params
    this.state = {
      orderId: Number(orderId)
    }
  }

  componentDidMount() {
    const { orderId } = this.state
    orderId && this.props.queryUserDetail(orderId)
  }

  handleSubmit = (values) => {
    const { orderId } = this.state
    if (orderId) {
      values.id = orderId
    }
    this.props.createUser(values).then(() => {
      setTimeout(() => {
        this.props.history.go(-1)
      }, 1500);
    })
  }

  render() {
    const { userDetail } = this.props
    const { orderId } = this.state
    const type = orderId ? 'edit' : 'add'
    return <CreateUserForm type={type} detail={userDetail} onSubmit={this.handleSubmit} />
  }
}

const mapStateToProps = (state) => ({
  userDetail: state.UserReducer.userDetail
});
const mapDispatchToProps = dispatch => ({
  queryUserDetail: payload => dispatch(UserAction.detail(payload)),
  createUser: payload => dispatch(UserAction.create(payload))
});
export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
