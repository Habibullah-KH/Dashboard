"use client";
import React, { useEffect, useState } from 'react'
import PortfolioCard from './component/PortfolioCard';
import Loading from '../../app/components/Loading/Loading'
export default function MyPortfolio() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchPortfolioData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/portfolioData`)
            const portfolioData = await res.json();
            setData(portfolioData);
            setLoading(false)
        }
        fetchPortfolioData();
    }, [])

    if(loading){
      return <Loading/>;
    }

  return (
    <>

    <div className='w-3xl flex flex-col justify-center items-center p-5'>
      {data.map((d, i) => <PortfolioCard key={i} data={d}/>)}
    </div>
    </>
  )
}
