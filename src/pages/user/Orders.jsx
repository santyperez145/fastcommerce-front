import React from 'react'
import Main from '../../layouts/Main'
import UserMenu from '../../layouts/UserMenu'
/* import {useAuth} from "../../context/auth" */
const Orders = ()=> {
    const [auth] = useAuth()
    return (
        <Main title={"Dashboard - Ecommerce App"}>
        <h1>Dashboard</h1>
        <h3>{auth?.user?.name}</h3>
        <h3>{auth?.user?.email}</h3>
        <h3>{auth?.user?.address}</h3>
        <UserMenu/>
        </Main>
    )
}

export default Orders