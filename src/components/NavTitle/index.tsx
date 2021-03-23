import React from 'react'
import { Divider } from '@alifd/next';

interface IProps {
    title: string;
}

const NavTitle = (props: IProps) => {
    const { title } = props;
    return <div>
        <h2>{title}</h2>
        <Divider></Divider>
    </div>
}

export default NavTitle;