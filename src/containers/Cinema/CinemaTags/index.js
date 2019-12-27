import React from 'react'
import { Checkbox, Button, Form } from 'antd';
import { connect } from 'react-redux'
import Action from '../action'

class cinemaTags extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      originValues: [],
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.queryTags()
    this.props.queryCinemaTags(id).then(res => {
      if (res && res.value && res.value.data) {
        this.setState({
          originValues: res.value.data.map(i => i.id),
        });
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { id } = this.props.match.params
        values.id = ~~id;
        values.originValues = this.state.originValues;
        this.props.onSubmit(values).then((res) => {
          if (res.value && res.value.code === 0) {
            setTimeout(() => {
              this.props.history.goBack();
            }, 1500);
          }
        })
      }
    });
  }

  render() {
    const { tags = [], cinemaTags = [] } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };
    const rd = tags.map((item, index) => (<Checkbox key={index} value={item.id}>{item.note}({item.tag})</Checkbox>))
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item {...formItemLayout} label="影院标签">
          {getFieldDecorator('tags', {
            initialValue: this.state.originValues,
            rules: [
              {
                required: true,
                message: '请选择影院标签',
                type: 'array'
              },
            ],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              {rd}
            </Checkbox.Group>,
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  tags: state.CinemaReducer.tags,
  cinemaTags: state.CinemaReducer.cinemaTags
});
const mapDispatchToProps = dispatch => ({
  queryTags: payload => dispatch(Action.tags(payload)),
  queryCinemaTags: payload => dispatch(Action.cinemaTags(payload)),
  onSubmit: payload => dispatch(Action.submitCinematag(payload)),
});

const WrappedNormalLoginForm = Form.create({ name: 'cinema_tags_form' })(connect(mapStateToProps, mapDispatchToProps)(cinemaTags));

export default WrappedNormalLoginForm;