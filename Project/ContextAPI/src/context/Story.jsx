import React, { createContext } from 'react'

export let ek = createContext()
function Story({ children}) {

    let s = {
        name:"The Happy prince",
        storyline:"The Happy Prince illustration by Walter Crane, 1888",
    }
  return (
    <div>
        <ek.Provider value={s}>
      {children}
      </ek.Provider>
    </div>
  )
}

export default Story
