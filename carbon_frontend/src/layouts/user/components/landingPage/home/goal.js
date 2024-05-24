import { Typography } from '@mui/material'
import React from 'react'
import goal1 from '../../../assets/images/goal1.png'
import goal2 from '../../../assets/images/goal2.png'
import goal3 from '../../../assets/images/goal3.png'
import goal4 from '../../../assets/images/goal4.png'
import goal5 from '../../../assets/images/goal5.png'
import goal6 from '../../../assets/images/goal6.png'
import goal7 from '../../../assets/images/goal7.png'

const Goal = () => {
    return (
        <div>
            <div>

                <Typography variant='h6' className='text-center fs-3 green pt-4 fontFamily fw-bold' >Targeted Sustainable Development Goals (SDGs)</Typography>
                <p className='text-center  py-3 pb-5 fontFamily '>As part of our framework, we are actively and directly contributing to the below 7 SDGs out of<span style={{ color: "#4edceb" }}> 17 UN SDGs.</span></p>
            </div>
            <div className='d-flex align-align-items-center flex-wrap justify-content-center'>

                <img src={goal1} alt='img' width={200} className='mx-2 my-2' />
                <img src={goal2} alt='img' width={200} className='mx-2 my-2' />
                <img src={goal3} alt='img' width={200} className='mx-2 my-2' />
                <img src={goal4} alt='img' width={200} className='mx-2 my-2' />
                <img src={goal5} alt='img' width={200} className='mx-2 my-2' />
                <img src={goal6} alt='img' width={200} className='mx-2 my-2' />
                <img src={goal7} alt='img' width={200} className='mx-2 my-2' />
            </div>
        </div>
    )
}

export default Goal
