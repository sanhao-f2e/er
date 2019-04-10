import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import {
  Form,
  Card,
  Select,
  message,
  DatePicker,
  Input,
  Button,
  Table,
  InputNumber,
  Divider,
  Modal,
} from 'antd'
import StandardTable from '@/components/StandardTable'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import moment from 'moment'
import styles from './List.less'
//import styles from './style.less'

console.log(moment(1554433925000).format('YYYY-MM-DD HH:mm:ss'))

const FormItem = Form.Item
const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

@connect(({ commodity, loading }) => ({
  commodity,
  loading: loading.models.commodity,
}))
@Form.create()
export default class List extends Component {
  state = {
    visible: false,
    selectedRows: [],
  }

  columns = [
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '简述',
      width: 640,
      dataIndex: 'brief',
    },
    {
      title: '原价',
      dataIndex: 'original_price',
      render: val => val.toFixed(2),
    },
    {
      title: '转卖价',
      dataIndex: 'resale_price',
      render: val => val.toFixed(2),
    },
    {
      title: '编辑时间',
      dataIndex: 'edit_date',
      render: val => moment(val * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.showEditModal(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDelete(record)}>删除</a>
        </Fragment>
      )
    }
  ]

  formLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'commodity/list',
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    })
  }

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    })
  }

  handleDelete = record => {
    Modal.confirm({
      title: '删除',
      content: '确定删除该纪录吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const { dispatch } = this.props
        dispatch({
          type: 'commodity/remove',
          payload: {
            id: record.id,
          }
        })

        message.success('删除成功')
        this.componentDidMount()
      },
    })
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props
    const { formValues } = this.state
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    }
    dispatch({
      type: 'commodity/list',
      payload: params,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { dispatch, form } = this.props
    const { current } = this.state
    const id = current ? current.id : ''

    form.validateFields((err, fieldsValue) => {
      if (err) return
      dispatch({
        type: 'commodity/submit',
        payload: { id, ...fieldsValue },
      })

      message.success(`${id ? '编辑' : '新增'}成功`)
      this.handleCancel()
      this.componentDidMount()
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const {
      commodity: { data },
      loading,
    } = this.props

    const {
      form: { getFieldDecorator },
    } = this.props

    const { selectedRows, visible, current = {} } = this.state

    const modalFooter = { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel }

    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="app.commodity.list.title" />}
        content={<FormattedMessage id="app.commodity.list.description" />}
      >
        <Card bordered={false}>
          <div className={styles.buttonWrap}>
            <Button icon="plus" type="primary" onClick={() => this.showModal()}>新建</Button>
          </div>
          <StandardTable
            selectedRows={selectedRows}
            columns={this.columns}
            loading={loading}
            data={data}
            onChange={this.handleStandardTableChange}
            rowKey="id"
          />
        </Card>
        <Modal
          destroyOnClose
          title={`${current.id ? '编辑' : '新建'}商品`}
          visible={visible}
          width={640}
          {...modalFooter}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="名称" {...this.formLayout}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入至少五个字符的名称!', min: 1 }],
                initialValue: current.name,
              })(<Input placeholder="请输入名称" />)}
            </FormItem>
            <FormItem label="简述" {...this.formLayout}>
              {
                getFieldDecorator('brief', {
                  rules: [{ required: true, message: '请输入少于100字的简述!', min: 1 }],
                  initialValue: current.brief,
                })(<TextArea rows={4} placeholder="请输入简述" />)
              }
            </FormItem>
            <FormItem label="原价" {...this.formLayout}>
              {
                getFieldDecorator('original_price', {
                  rules: [{ required: true, message: '请输入原价!' }],
                  initialValue: current.original_price,
                })(<InputNumber precision={2} min={0.00} placeholder="原价" />)
              }
            </FormItem>
            <FormItem label="转卖价" {...this.formLayout}>
              {
                getFieldDecorator('resale_price', {
                  rules: [{ required: true, message: '请输入转卖价!' }],
                  initialValue: current.resale_price,
                })(<InputNumber precision={2} min={0.00} placeholder="转卖价" />)
              }
            </FormItem>
          </Form>
        </Modal>
      </PageHeaderWrapper>
    )
  }
}

