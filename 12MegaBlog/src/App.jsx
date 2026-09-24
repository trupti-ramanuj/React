import React, { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'

function App() {
 
  const [loding,setLoding] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((useData)=>{
      if(useData){
        dispatch(login({userData}))
      } else{
         dispatch(logout())
      }
    })
    .finally(()=>setLoding(false))
  },[])

   return !loding ? (<div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block '>
      <Header />
      <main>
          TODO:{/*  <Outlet /> */}
      </main>
      <Footer />
    </div>
   </div>) : null
}

export default App
