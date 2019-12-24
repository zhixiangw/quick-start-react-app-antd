import './style.less';
import React from 'react';
import { Form, Row, Col, Input, Button, Select, Icon } from 'antd';

class AdvancedSearchForm extends React.Component {
  getFields() {
    const { getFieldDecorator } = this.props.form;
    const { fields = [] } = this.props
    return fields.map((item, i) => {
      const placeholder = item.placeholder || `请${item.type === 'select' ? '选择' : '输入'}${item.label}`;
      const component = item.type === 'select' ? this.renderSelect({ options: item.options, placeholder }) : this.renderInput({ placeholder });
      return (
        <Col span={4} key={i}>
          <Form.Item>
            {getFieldDecorator(item.name, {
              rules: item.rules,
            })(component)}
          </Form.Item>
        </Col>
      )
    })
  }
  getButtons() {
    const { buttons = [] } = this.props;
    return buttons.map((item, i) => (
      <Button type={item.type} key={i} style={item.style} onClick={item.onClick}><Icon type={item.icon} />{item.label}</Button>
    ));

  }

  renderInput = ({ placeholder }) => {
    return <Input placeholder={placeholder} />
  }

  renderSelect = ({ placeholder, options }) => {
    return (
      <Select placeholder={placeholder} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
        {options.map((opt, i) => <Select.Option key={i} value={opt.value}>{opt.name}</Select.Option>)}
      </Select>
    )
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSearch(values)
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清空
            </Button>
            {this.getButtons()}
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
export default WrappedAdvancedSearchForm;