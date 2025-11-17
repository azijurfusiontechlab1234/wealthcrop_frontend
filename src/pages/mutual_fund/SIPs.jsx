import React from 'react'
import emptySip from "../../assets/mutualFund/sipEmpty2.svg"

const SIPs = () => {
  return (
    <div className='mx-auto w-full min-h-[400px] flex flex-col justify-center items-center space-y-8 mt-12'>
  <div>
    <img src={emptySip} alt="" className='w-76 object-center'/>
  </div>

  <div className='text-center mt-3'>
    <h1 className='text-2xl text-blue-900 font-semibold mb-2'>No active SIPs</h1>
    <p className='text-gray-600 text-md'>When you start an SIP, it will appear here</p>
  </div>
</div>

  )
}

export default SIPs