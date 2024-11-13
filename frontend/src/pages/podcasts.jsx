import React from 'react'

const Podcasts = () => {
  const podcast = async () => {
    
    const result = await fetch('http://localhost:3000/api/get-podcasts')
    const data = await result.json()
    console.log(data)

  }
  podcast();
  return (
    <div>
      return (
    <div className='h-screen bg-slate-900'>
      <div className='px-4 lg:px-12 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          podcast.map((items,index)=><Link to={items.to} key={index} className={`rounded px-8 py-4 text-xl font-bold ${items.color} hover:scale-105 shadow-xl transition-all duration-150 relative h-[20vh] overflow-hidden`}>
            <div className="">{items.name}</div>
            <div className="w-full flex items-center justify-end absolute -bottom-2 -right-2">
              <img src={ items.img } alt="Category Image" className='rounded rotate-2 h-[15vh] md:h-[17vh] lg:h-[18vh]'/>
            </div>
          </Link>)
        }
      </div>
    </div> 
  )
    </div>
  )
}

export default Podcasts
