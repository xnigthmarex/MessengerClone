'use client'
import react from 'react'

export default function Chat(props) {
    console.log(props)
    //content
    //name
    return (
        <div key = {props.key}>
            <h1>{props.username}:{props.content}</h1>
        </div>
    )
}
