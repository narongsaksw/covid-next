import React from 'react'

const Select = ({ options }) => {
    return <select>
        {
            options.map(({ id, name, value }) => 
                 <option key={id} value={value}>
                    {name}
                </option>
            )
        }
    </select>
}

export default Select