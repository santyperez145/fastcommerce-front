import React from 'react'
import UserInfo from '../../layouts/UserInfo'
import UserMenu from '../../layouts/UserMenu'
import UserOrders from '../../components/UserOrders'

const Dashboard = ()=> {
    return (
        <div className="flex flex-col justify-around items-center h-screen bg-[url('/fondo-admin.jpg')] bg-cover">
            <UserInfo />
            <UserMenu />
            <UserOrders />
            
        </div>
    )
}

export default Dashboard