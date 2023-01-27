import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import { baseURL } from 'lib/fetch'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

/**
 * fileList 对象子集
 {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  }
*/

export default class PicturesWall extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: props.fileList
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.fileList && nextProps.fileList && this.props.fileList.length !== nextProps.fileList.length) {
      this.setState({ fileList: nextProps.fileList })
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      const preview = await getBase64(file.originFileObj);
      file = { ...file, preview }
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList: [...fileList] }, () => {
    this.props.onChange && this.props.onChange(fileList)
  })

  renderBtn = () => (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">点击上传</div>
    </div>
  )

  renderUploadButton = () => {
    const { fileList } = this.state
    const max = this.props.maxLength
    if (max) {
      return fileList.length >= max ? null : this.renderBtn()
    }
    return this.renderBtn()
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    return (
      <div className="clearfix">
        <Upload
          action={`${baseURL}/admin/main/uploadImages`}
          listType="picture-card"
          accept="image/*"
          name="images"
          multiple={Boolean(1)}
          fileList={fileList}
          withCredentials={Boolean(1)}
          onPreview={this.handlePreview}
          onChange={this.handleChange} >
          {this.renderUploadButton()}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}