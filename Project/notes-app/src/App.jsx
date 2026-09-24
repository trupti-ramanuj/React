
import { useState } from 'react'
import './App.css'

function App() {
  const [title,setTitle] = useState('')
  const [details,setDetails]=useState('')
  const [task,setTask] = useState([])

  const submitHandler=(e)=>{
    e.preventDefault()

    const copyTask=[...task];

    copyTask.push({title,details});
    setTitle(copyTask)
    setDetails('')
  }

  return (
    <div className='h-screen lg:flex bg-black text-white '>
     <form onSubmit={(e)=>{
      submitHandler(e.target.value)
     }} className='flex p-10 gap-4 flex-col lg:w-1/2 items-start p-10'>
      <h1 className='text-4xl font-bold'>Add Notes</h1>

      <input type="text" placeholder='Enter Notes Heading' className='px-5 w-full font-medium py-2 border-2 outline-none rounded' value={title} onSubmit={(e)=>{
      setTitle(e.target.value)}}/>

      <textarea type="text" className="px-5 w-full h-32 py-2 flex items-start flex-row border-2 outline-none roundsed" placeholder='Write Details'>

      </textarea>

      <button className='bg-white active:scale-95 font-medium w-full outline-none text-black px-5 py-2 rounded'>Add Note

      </button>
    </form>

   <div className='lg:w-1/2 lg:border-l-2  p-10'>
    <h1 className='text-4xl font-bold'>Recent Notes</h1>
    <div className='flex flex-wrap item-start justify-start gap-5 mt-6 h-full over-flow-auto'>
   {task.map(function(e , idx){
     return <div key={idx} className='h-52 w-40 text-black p-4 rounded-xl bg-white'>
      <h3 className='leding-tight text-xl font-bold'>{e.title}</h3>
      <p className='mt-4 leading-tight font-medium text-gray-500'>{e.details}</p>
     </div>
   })}

    </div>
   </div>
  </div>
  )
}

export default App
