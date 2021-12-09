import React from 'react'

enum buttonType {
    primary = "primary",
    secondary = "secondary",
    tertiary = "tertiary"
}

interface IButton  {
    title: string
    type: buttonType
}

const Button = ({ title }: IButton) => {
    return <button>{title}</button>
}

export default Button