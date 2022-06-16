import React from 'react'
import SectionContent from './SectionContent'

function HomeSection({title}) {
  return (
    <div className='h-full'>
        <div className='flex justify-center items-center bg-[#E12945] h-10 text-white'>
          <h2>{title}</h2>
        </div>
        <div>
          <SectionContent
            content={title}
          />       
        </div>       
    </div>
  )
}

export default HomeSection