import React from 'react'
import { Descriptions, Card, message, Button } from 'antd';
import { connect } from 'react-redux'
import UserAction from '../action'

class UserDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    const { orderId } = this.props.match.params
    this.props.queryOrderDetail(orderId)
  }

  render() {
    return (
      <React.Fragment>
        1111
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => ({
  userDetail: state.UserReducer.userDetail
});
const mapDispatchToProps = dispatch => ({
  queryUserDetail: payload => dispatch(UserAction.detail(payload))
});
export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
