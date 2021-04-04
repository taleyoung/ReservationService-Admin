import React, { useState } from 'react'
import { useRequest, useHistory } from 'ice'
import { useCookies } from 'react-cookie'
import { Form, Input, Grid, Message } from '@alifd/next';
import { userService } from '@/service/user'
import styles from './index.module.scss'

const { Item: FormItem } = Form;
const { Row, Col } = Grid;


const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

const Login = () => {
    const { request: login, loading: loginLoading } = useRequest(userService.login);
    const { request: register, loading: regisLoading } = useRequest(userService.add);
    const [cookie, setCookie, removeCookie] = useCookies();
    const [pageLogin, setPageLogin] = useState<boolean>(true)
    const history = useHistory();

    const loginSubmit = async (v) => {
        const res = await login(v);
        if (res.loginSuccess) {
            setCookie("jwtToken", res.jwtToken, { path: "/" });
            setCookie("username", res.userInfo.username, { path: "/" });
            setCookie("userId", res.userInfo.id, { path: "/" });
            setCookie("role", res.userInfo.role, { path: "/" });
            history.push('/home');
        } else {
            Message.warning(res.msg);
        }
    }

    const regisSubmit = async (v) => {
        if (v.password !== v.password2) {
            Message.warning("两次密码输入不一致，请重新设置");
            return;
        }
        await register(v);
        Message.notice("注册成功")
        setPageLogin(true);
    }

    const LoginForm = <div>
        <FormItem label="用户名:">
            <Input name="username" />
        </FormItem>
        <FormItem label="密码:">
            <Input.Password name="password" />
        </FormItem>
        <Form.Submit loading={loginLoading} validate type="secondary" style={{ marginRight: 10 }} onClick={(v) => loginSubmit(v)}>登录</Form.Submit>
        <Form.Submit text onClick={() => setPageLogin(false)}>立即注册</Form.Submit>
    </div>;

    const RegisterForm = <div>
        <FormItem label="用户名:">
            <Input name="username" required />
        </FormItem>
        <FormItem label="密码:">
            <Input.Password name="password" required />
        </FormItem>
        <FormItem label="再次输入密码:">
            <Input.Password name="password2" required />
        </FormItem>
        <FormItem label="手机号:">
            <Input name="mobile" required />
        </FormItem>
        <FormItem label="邮箱:">
            <Input name="email" />
        </FormItem>
        <Form.Submit loading={regisLoading} validate type="secondary" style={{ marginRight: 10 }} onClick={(v) => regisSubmit(v)}>注册</Form.Submit>
        <Form.Submit text onClick={() => setPageLogin(true)}>立即登录</Form.Submit>
    </div>;

    return <div>
        <Row justify='space-around' align='center' style={{ height: '100vh' }}>
            <Col span='6'>
                <div className={styles.login}>
                    <h1>综合预订服务</h1>
                    <Form {...formItemLayout} size='medium' style={{ maxWidth: '500px' }}>
                        {pageLogin ? LoginForm : RegisterForm}
                    </Form>
                </div>
            </Col>
        </Row>
    </div>
}

export default Login;