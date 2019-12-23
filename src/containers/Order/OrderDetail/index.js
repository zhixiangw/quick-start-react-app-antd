import React from 'react'
import { Descriptions, Card, Button } from 'antd';
import { connect } from 'react-redux'
import moment from 'moment'
import Upload from 'components/Upload'
import OrderAction from '../action'

class OrderDetail extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                fileList: []
            }
        }

        componentDidMount() {
            const { orderId } = this.props.match.params
            this.props.queryOrderDetail(orderId)
        }

        handleFileChange = (fileList) => {
            this.setState({ fileList })
        }

        onSubmitOrderTicketing = () => {
            const { orderId } = this.props.match.params
            const { fileList } = this.state
            this.props.submitOrderTicketing({ orderId, fileList })
        }

        render() {
            const { orderDetail = {} } = this.props
            const { movie = {}, cinema = {}, order = {}, user = {} } = orderDetail || {}
            const fileList = order.ticketing && JSON.parse(order.ticketing) || []
            return ( <
                React.Fragment >
                <
                Descriptions title = "订单详情" >
                <
                Descriptions.Item label = "电影名称" > { movie.name } < /Descriptions.Item> <
                Descriptions.Item label = "影院名称" > { cinema.name } < /Descriptions.Item> <
                Descriptions.Item label = "场次" > { order.show_time } < /Descriptions.Item> <
                Descriptions.Item label = "用户" > { user.name || '--' } < /Descriptions.Item> <
                Descriptions.Item label = "金额" > { order.amount } 元 < /Descriptions.Item> <
                Descriptions.Item label = "下单时间" > { order.created_at && moment(order.created_at).format('YYYY-MM-DD hh:mm:ss') || '--' } < /Descriptions.Item> <
                Descriptions.Item label = "支付时间" > { order.pay_time && moment(order.pay_time).format('YYYY-MM-DD hh:mm:ss') || '--' } < /Descriptions.Item> <
                Descriptions.Item label = "状态" > { order.statusText } < /Descriptions.Item> <
                Descriptions.Item label = "座位排座" > { order.seatsText && order.seatsText.join(',') } < /Descriptions.Item> <
                Descriptions.Item label = "总票数" > { order.count } < /Descriptions.Item> < /
                Descriptions > <
                Card title = "上传票证"
                extra = {
                    <
                    Button type = "primary"
                    onClick = { this.onSubmitOrderTicketing } > 保存票证信息 < /Button>}> <
                    Upload fileList = { fileList } onChange = { this.handleFileChange }
                    /> < /
                    Card > <
                    /React.Fragment>
                )
            }
        }


        const mapStateToProps = (state) => ({
            orderDetail: state.OrderReducer.orderDetail
        });
        const mapDispatchToProps = dispatch => ({
            queryOrderDetail: payload => dispatch(OrderAction.detail(payload)),
            submitOrderTicketing: payload => dispatch(OrderAction.submit(payload)),
        });
        export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);