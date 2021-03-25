import React from 'react'
import { Avatar, Button } from '@alifd/next';
import { useHistory } from 'ice'
import { useCookies } from 'react-cookie'


const TopAction = () => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const history = useHistory();

    const signOut = () => {
        if (cookie) {
            Object.keys(cookie).forEach(item => {
                removeCookie(item, { path: "/" });
            });
        }
        history.push('/login');
    }
    return <div>
        <Avatar size='small' style={{ backgroundColor: '#87d068' }} icon="account" />
        <span style={{ marginLeft: 10 }}>你好，{cookie['username']}</span>
        <Button size='small' warning type='normal' onClick={() => signOut()} style={{ marginLeft: '5px' }}>退出</Button>
    </div>
}

export default TopAction;