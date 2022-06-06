import React, {useRef, useState} from 'react'
import {ActionType, ProColumns, ProTable} from '@ant-design/pro-table'
import { UserType } from '@/pages/system/user-management/data'
import {Button, FormInstance, message, Modal, Tag} from 'antd'
import {
  createUser,
  delUser,
  getUserList,
  updateUser
} from '@/services/system/user-management'
import {PageHeaderWrapper} from '@ant-design/pro-layout'
import UpdateForm from './components/edit'

/**
 * 删除用户
 * @param row 选中行数据
 */
const handleRemove = async (row: UserType) => {
  const hide = message.loading('正在删除')
  if (!row.id) return true
  try {
    const res = await delUser(row.id)
    hide()
    console.log(res)
    if (res.code === 0) {
      message.success('删除成功，即将刷新')
    } else {
      message.error(res.message)
    }
    return true
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
const handleCreate = async (fields: UserType) => {
  const hide = message.loading('正在添加')
  try {
    const res = await createUser({...fields})
    hide()
    if (res.code === 0) {
      message.success('添加成功')
    } else {
      message.error(res.message)
    }
    return true
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
const handleUpdate = async (fields: UserType) => {
  const hide = message.loading('正在更新')
  try {
    const res = await updateUser({...fields})
    hide()
    if (res.code === 0) {
      message.success('更新成功')
    } else {
      message.error(res.message)
    }
    return true
  } catch (e) {
    hide()
    message.error('更新失败请重试')
    return false
  }
}

const User: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const formTableRef = useRef<FormInstance>()

  const [modalVisible, setModalVisible] = useState<boolean>(false) // 弹窗状态
  const [currentRow, setCurrentRow] = useState<UserType>() // 当前点击行数据

  const frozenOption = {
    '0': { text: '冻结', status: 'Error' },
    '1': { text: '未冻结', status: 'Success' }
  }

  const columns: ProColumns<UserType>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
      valueType: 'text'
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      valueType: 'text'
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '性别',
      dataIndex: 'gender',
      hideInSearch: true,
      render: (_, { gender }) => (
        <>
          <Tag color={gender === '0' ? 'gold' : gender === '1' ? 'blue' : 'purple'}>
            {gender === '0' ? '保密' : gender === '1' ? '男' : '女'}
          </Tag>
        </>
      )
    },
    {
      title: '最后一次登录时间',
      dataIndex: 'latestLoginAt',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: frozenOption,
      // render: (_, {isFrozen}) => (
      //   <>
      //     <Tag color={isFrozen ? 'red' : 'green'}>
      //       {isFrozen ? '冻结' : '未冻结'}
      //     </Tag>
      //   </>
      // )
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
        <ProTable<UserType>
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
            getUserList({...params}).then(res => {
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
            res = await handleUpdate({...values} as UserType)
          } else {
            res = await handleCreate({...values} as UserType)
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

export default User
