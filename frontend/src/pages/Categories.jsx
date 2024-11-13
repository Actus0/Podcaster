import React from 'react'
import { Link } from 'react-router-dom'

const Categories = () => {
  const category =[
    {
      name: "Comedy",
      color: "bg-violet-200",
      to:"/categories/comedy",
      img: "https://w0.peakpx.com/wallpaper/480/419/HD-wallpaper-hungry-face-comedy-food-funny-laugh-lol.jpg",
    },
    {
      name: "Horror",
      color: "bg-slate-200",
      to:"/categories/horror",
      img: "https://media.wired.com/photos/5926c981cfe0d93c47431612/master/w_1920,c_limit/GettyImages-495652395.jpg",
    },
    {
      name: "Education",
      color: "bg-green-200",
      to:"/categories/comedy",
      img: "https://img.freepik.com/free-photo/book-with-green-board-background_1150-3837.jpg?t=st=1724062577~exp=1724066177~hmac=7ccea23b554d526cb32cb3aece254b94a6fd036fd6df01d32fd3f8f938d62dc0&w=1380",
    }
  ]
  return (
    <div className='h-screen bg-neutral-900'>
      <div className='px-4 lg:px-12 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          category.map((items,index)=><Link to={items.to} key={index} className={`rounded px-8 py-4 text-xl font-bold ${items.color} hover:scale-105 shadow-xl transition-all duration-150 relative h-[20vh] overflow-hidden`}>
            <div className="">{items.name}</div>
            <div className="w-full flex items-center justify-end absolute -bottom-2 -right-2">
              <img src={ items.img } alt="Category Image" className='rounded rotate-2 h-[15vh] md:h-[14vh] lg:h-[16vh]'/>
            </div>
          </Link>)
        }
      </div>
    </div> 
  )
}

export default Categories
