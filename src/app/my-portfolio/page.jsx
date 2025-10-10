// "use client";
// import React, { useEffect, useState } from 'react'
import PortfolioCard from './component/PortfolioCard';
// import Loading from '../../app/components/Loading/Loading'
 const fetchPortfolioData = async () => {
 const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/portfolioData`, {
  cache: "no-store",
 });
 const portfolioData = await res.json();
return portfolioData;
}
export default async function MyPortfolio() {
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(()=>{

    //     fetchPortfolioData();
    // }, [])
const data = await fetchPortfolioData()

  return (
    <>
    <div className='w-3xl h-dvh flex flex-col justify-center items-center mx-auto p-5'>
    <h2 className="font-bold text-2xl mb-7">My Work</h2>
      {data && data.length > 0 ?
        data.map((d, i) => <PortfolioCard key={i} data={d}/>)
        :
        <div className='text-red-500'>
          Empty!
        </div>
        }
    </div>
    </>
  )
}
