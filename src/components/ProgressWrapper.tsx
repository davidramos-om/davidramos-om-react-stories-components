import React from 'react'
import { ProgressWrapperProps } from './../interfaces'

const ProgressWrapper = (props: ProgressWrapperProps) => {
    return (
        <div style={{ ...styles.progress, ...getProgressWrapperStyle(props) }}>
            {props.children}
        </div>
    )
}

const getProgressWrapperStyle = ({ width, automatic }) => ({
    width: `${width * 100}%`,
    opacity: 1,
})

const styles = {
    progress: {
        height: 2,
        maxWidth: '100%',
        background: '#555',
        margin: 2,
        borderRadius: 2,
        transition: 'opacity 400ms ease-in-out'
    }
}

export default ProgressWrapper