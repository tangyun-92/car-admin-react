import {UserType} from '../data'
import {Col, Form, Modal, Row} from 'antd'
import {useEffect} from 'react'
import {ProFormDigit, ProFormRadio, ProFormText} from '@ant-design/pro-form'
import {FormattedMessage} from 'umi'

export type UserFormValueType = Record<string, unknown> & Partial<UserType>

export type UserFormProps = {
  onCancel: (flag?: boolean, formVals?: UserFormValueType) => void;
  onSubmit: (values: UserFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<UserType>;
  statusOptions: any;
}

const UserForm: React.FC<UserFormProps> = (props) => {
  const [form] = Form.useForm()

  const { statusOptions } = props
  useEffect(() => {
    form.resetFields()
    form.setFieldsValue({
      id: props.values.id,
      username: props.values.username,
      phoneNumber: props.values.phoneNumber,
      nickName: props.values.nickName,
      gender: props.values.gender,
      isFrozen: props.values.isFrozen
    })
  }, [form, props])

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    props.onCancel()
    form.resetFields()
  }

  const handleFinish = (values: Record<string, any>) => {
    props.onSubmit(values as UserFormValueType)
  }

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  }

  return (
    <Modal
      width={640}
      title="编辑用户信息"
      visible={props.visible}
      destroyOnClose
      forceRender
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        initialValues={props.values}
        {...formItemLayout}
      >
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormDigit
              name="id"
              label="用户id"
              width="xl"
              placeholder="请输入用户id"
              disabled
              hidden={!props.values.id}
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请输入用户id" defaultMessage="请输入用户id" />
                }
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="username"
              label="用户名"
              width="xl"
              placeholder="请输入用户名"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="请输入用户名" defaultMessage="请输入用户名" />
                }
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="phoneNumber"
              label="手机号码"
              width="xl"
              placeholder="请输入手机号码"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="请输入手机号码" defaultMessage="请输入手机号码" />
                }
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="nickName"
              label="昵称"
              width="xl"
              placeholder="请输入昵称"
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请输入昵称" defaultMessage="请输入昵称" />
                }
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormRadio.Group
              valueEnum={
                {
                  0: {text: '保密'},
                  1: {text: '男'},
                  2: {text: '女'}
                }
              }
              name="gender"
              label="性别"
              width="xl"
              {...formItemLayout}
              placeholder="请选择性别"
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请选择性别" defaultMessage="请选择性别" />
                }
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormRadio.Group
              valueEnum={statusOptions}
              name="status"
              label="状态"
              width="xl"
              {...formItemLayout}
              placeholder="请选择状态"
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请选择状态" defaultMessage="请选择状态" />
                }
              ]}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default UserForm
