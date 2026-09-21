import React, { createContext } from 'react'

export const data = createContext()

function UserContext({children}) {
let username="Ramanuj"

  return (
    <div>
        <data.Provider value={username}>
      <h1>hii</h1>
      {children}
      </data.Provider>
    </div>
  )
}

export default UserContext
