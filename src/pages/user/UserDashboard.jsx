import React from 'react'
import UserInfo from '../../layouts/UserInfo'
import UserMenu from '../../layouts/UserMenu'
import UserOrders from '../../components/UserOrders'

const Dashboard = ()=> {
    return (
        <div className="flex flex-col justify-around items-center h-screen bg-gray-200">
            <UserInfo />
            <UserMenu />
            <UserOrders />
            
        </div>
    )
}

export default Dashboard