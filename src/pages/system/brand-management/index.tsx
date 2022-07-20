import React, {useRef, useState} from 'react'
import {ActionType, ProColumns, ProTable} from '@ant-design/pro-table'
import { CarBrandType } from './data'
import {Button, FormInstance, message, Modal, Tag} from 'antd'
import {
  getCarBrandList,
  createCarBrand,
  updateCarBrand,
  delCarBrand
} from '@/services/system/brand-management'
import {PageHeaderWrapper} from '@ant-design/pro-layout'
import UpdateForm from './components/edit'
import {brandTypeOption, statusOption} from '@/constant'

/**
 * 删除用户
 * @param row 选中行数据
 */
const handleRemove = async (row: CarBrandType) => {
  const hide = message.loading('正在删除')
  if (!row.id) return true
  try {
    const res = await delCarBrand(row.id)
    hide()
    if (res.code === 0) {
      message.success('删除成功，即将刷新')
      return true
    } else {
      message.error(res.message)
      return false
    }
  } catch (e) {
    hide()
    message.error('删除失败，请重试')
    return false
  }
}

/**
 * 添加用户
 * @param fields
 */
const handleCreate = async (fields: CarBrandType) => {
  const hide = message.loading('正在添加')
  try {
    const res = await createCarBrand({...fields})
    hide()
    if (res.code === 0) {
      message.success('添加成功')
      return true
    } else {
      message.error(res.message)
      return false
    }
  } catch (e) {
    hide()
    message.error('添加失败请重试')
    return false
  }
}

/**
 * 更新用户
 * @param fields
 */
const handleUpdate = async (fields: CarBrandType) => {
  const hide = message.loading('正在更新')
  try {
    const res = await updateCarBrand({...fields})
    hide()
    if (res.code === 0) {
      message.success('更新成功')
      return true
    } else {
      message.error(res.message)
      return false
    }
  } catch (e) {
    hide()
    message.error('更新失败请重试')
    return false
  }
}

const CarBrand: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const formTableRef = useRef<FormInstance>()

  const [modalVisible, setModalVisible] = useState<boolean>(false) // 弹窗状态
  const [currentRow, setCurrentRow] = useState<CarBrandType>() // 当前点击行数据

  const columns: ProColumns<CarBrandType>[] = [
    {
      title: '中文名称',
      dataIndex: 'cName',
      valueType: 'text'
    },
    {
      title: '英文名称',
      dataIndex: 'eName',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '显示顺序',
      dataIndex: 'sort',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '国家',
      dataIndex: 'country',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '品牌类型',
      dataIndex: 'brandType',
      valueType: 'text',
      valueEnum: brandTypeOption
    },
    {
      title: '品牌创建时间',
      dataIndex: 'brandCreateTime',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '是否热门',
      dataIndex: 'isHot',
      render: (_, { isHot }) => (
        <>
          <Tag color={isHot === '1' ? 'error' : 'default'}>
            {isHot === '1' ? '是' : '否'}
          </Tag>
        </>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: statusOption
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: '220px',
      valueType: 'option',
      render: (_, record) => [
        <Button
          type="link"
          size="small"
          key="edit"
          onClick={() => {
            setModalVisible(true)
            setCurrentRow(record)
          }}
        >
          编辑
        </Button>,
        <Button
          type="link"
          size="small"
          danger
          key="batchRemove"
          onClick={() => {
            Modal.confirm({
              title: '删除',
              content: '确定删除该项吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                const res = await handleRemove(record)
                if (res) {
                  if (actionRef.current) {
                    actionRef.current?.reload()
                  }
                }
              }
            })
          }}
        >
          删除
        </Button>
      ]
    }
  ]

  return (
    <PageHeaderWrapper>
      <div style={{width: '100%', float: 'right'}}>
        <ProTable<CarBrandType>
          headerTitle="信息"
          actionRef={actionRef}
          formRef={formTableRef}
          rowKey="id"
          search={{
            labelWidth: 120
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="add"
              onClick={() => {
                setModalVisible(true)
                setCurrentRow(undefined)
              }}
            >
              新建
            </Button>
          ]}
          request={(params) =>
            getCarBrandList({...params}).then(res => {
              return {
                data: res.data.list,
                total: res.data.count,
                success: true
              }
            })
          }
          columns={columns}
          pagination={{
            pageSize: 10,
            showSizeChanger: true
          }}
        >

        </ProTable>
      </div>
      <UpdateForm
        onSubmit={async (values) => {
          let res = false
          if (values.id) {
            res = await handleUpdate({...values} as CarBrandType)
          } else {
            res = await handleCreate({...values} as CarBrandType)
          }
          if (res) {
            setModalVisible(false)
            setCurrentRow(undefined)
            if (actionRef.current) {
              actionRef.current?.reload()
            }
          }
        }}
        onCancel={() => {
          setModalVisible(false)
          setCurrentRow(undefined)
        }}
        visible={modalVisible}
        values={currentRow || {}}
      />
    </PageHeaderWrapper>
  )
}

export default CarBrand
