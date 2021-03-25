import React from 'react'
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
    const { request: login, loading } = useRequest(userService.login);
    const [cookie, setCookie, removeCookie] = useCookies();
    const history = useHistory();

    const loginSubmit = async (v) => {
        const res = await login(v);
        if (res.loginSuccess) {
            setCookie("jwtToken", res.jwtToken, { path: "/" });
            setCookie("username", res.userInfo.username, { path: "/" });
            setCookie("userId", res.userInfo.id, { path: "/" });
            history.push('/home');
        } else {
            Message.warning(res.msg);
        }
    }
    return <div>
        <Row justify='space-around' align='center' style={{ height: '100vh' }}>
            <Col span='6'>
                <div className={styles.login}>
                    <h1>综合预订服务</h1>
                    <Form {...formItemLayout} size='medium' style={{ maxWidth: '500px' }}>
                        <FormItem label="用户名:">
                            <Input name="username" />
                        </FormItem>
                        <FormItem label="密码:">
                            <Input.Password name="password" />
                        </FormItem>
                        <Form.Submit loading={loading} validate type="primary" style={{ marginRight: 10 }} onClick={(v) => loginSubmit(v)}>登录</Form.Submit>
                        <Form.Submit validate type="secondary" style={{ marginRight: 10 }}>注册</Form.Submit>
                    </Form>
                </div>
            </Col>
        </Row>

    </div>
}

export default Login;