import React from 'react'
import './notification.css'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    return (
        <div className="notification">
            {notification}
        </div>
    )
}

export default Notification