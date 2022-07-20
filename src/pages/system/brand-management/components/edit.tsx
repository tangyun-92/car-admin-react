import { CarBrandType } from '../data'
import {Col, Form, Modal, Row} from 'antd'
import {useEffect} from 'react'
import {
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormSelect,
  ProFormTextArea
} from '@ant-design/pro-form'
import {FormattedMessage} from 'umi'
import {brandTypeOption, statusOption, whetherOption} from '@/constant'

export type BrandFormValueType = Record<string, unknown> & Partial<CarBrandType>

export type BrandFormProps = {
  onCancel: (flag?: boolean, formVals?: BrandFormValueType) => void;
  onSubmit: (values: BrandFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<CarBrandType>;
}

const UserForm: React.FC<BrandFormProps> = (props) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
    form.setFieldsValue({
      id: props.values.id,
      cName: props.values.cName,
      eName: props.values.eName,
      sort: props.values.sort,
      country: props.values.country,
      brandType: props.values.brandType,
      brandCreateTime: props.values.brandCreateTime,
      isHot: props.values.isHot,
      status: props.values.status
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
    props.onSubmit(values as BrandFormValueType)
  }

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  }

  return (
    <Modal
      width={640}
      title="编辑品牌信息"
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
              name="cName"
              label="中文名称"
              width="xl"
              placeholder="请输入中文名称"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="请输入中文名称" defaultMessage="请输入中文名称" />
                }
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="eName"
              label="英文名称"
              width="xl"
              placeholder="请输入英文名称"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="请输入英文名称" defaultMessage="请输入英文名称" />
                }
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="sort"
              label="显示顺序"
              width="xl"
              placeholder="请输入显示顺序"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="请输入显示顺序" defaultMessage="请输入显示顺序" />
                }
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="country"
              label="国家"
              width="xl"
              placeholder="请输入国家"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="请输入国家" defaultMessage="请输入国家" />
                }
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormSelect
              valueEnum={brandTypeOption}
              name="brandType"
              label="品牌类型"
              width="xl"
              {...formItemLayout}
              placeholder="请选择品牌类型"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="请选择品牌类型" defaultMessage="请选择品牌类型" />
                }
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="brandCreateTime"
              label="品牌创建时间"
              width="xl"
              placeholder="请输入品牌创建时间"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="请输入品牌创建时间" defaultMessage="请输入品牌创建时间" />
                }
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormRadio.Group
              valueEnum={whetherOption}
              name="isHot"
              label="是否热门"
              width="xl"
              {...formItemLayout}
              placeholder="请选择"
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请选择" defaultMessage="请选择" />
                }
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormRadio.Group
              valueEnum={statusOption}
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
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTextArea
              name="description"
              label="描述"
              width="xl"
              placeholder="请输入品牌描述"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="请输入品牌描述" defaultMessage="请输入品牌描述" />
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
