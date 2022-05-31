import { message } from 'antd'
import React from 'react'
import { history, useModel } from 'umi'
import { login } from '@/services/public'
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components'

import { setToken } from '@/access'

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState')

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.()
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }))
    }
  }

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const res = await login({ ...values })
      if (res.code === 0) {
        const current = new Date()
        const expireTime = current.setTime(current.getTime() + 1000 * 12 * 60 * 60)
        console.log(expireTime)
        // 将 token 持久存储
        setToken(res.data?.token, res.data?.token, expireTime)
        message.success('登录成功')

        await fetchUserInfo()
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return

        const { query } = history.location;
        const { redirect } = query as { redirect: string }
        history.push(redirect || '/')
        return
      } else {
        message.error(res.message)
      }
    } catch (error) {
      message.error('登录失败，请重试！')
    }
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <LoginForm
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Github"
        subTitle="全球最大同性交友网站"
        onFinish={async (values) => {
          await handleSubmit(values as API.LoginParams);
        }}
      >
        { (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'用户名: admin or user'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'密码: ant.design'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        )}
      </LoginForm>
    </div>
  )
}

export default Login
