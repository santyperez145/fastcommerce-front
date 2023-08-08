import React from 'react'
import UserMenu from '../../layouts/UserMenu'

const Orders = ()=> {
    return (
        <>
        <h1>Dashboard</h1>
        <h3>{auth?.user?.name}</h3>
        <h3>{auth?.user?.email}</h3>
        <h3>{auth?.user?.address}</h3>
        <UserMenu/>
        </>
    )
}

export default Orders