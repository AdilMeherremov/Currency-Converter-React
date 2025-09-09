import React, { useEffect, useState } from 'react'
import axios from 'axios'

function CurrencyConverter() {

    const [Currencies, SetCurrencies] = useState([])
    const [CurrencyFrom, SetCurrencyFrom] = useState('')
    const [CurrencyTo, SetCurrencyTo] = useState('')
    const [CurrencyAmount, SetCurrencyAmount] = useState(0)
    const [CurrencyResult, SetCurrencyResult] = useState(0)


    const baseurl = 'https://api.freecurrencyapi.com/v1/latest'
    const apikey = 'fca_live_dkg33vAYJMUBLsjsccib674BIckXbaKhmiPdcvH8'

    const GetCurrencies = async () => {
        const response = await axios.get(`${baseurl}?apikey=${apikey}`)
        SetCurrencies(response.data.data)
    }

    const CalculateCurrency = async() =>{
        const response = await axios.get(`${baseurl}?apikey=${apikey}&base_currency=${CurrencyFrom}`)
        const result =  (response.data.data[CurrencyTo] * CurrencyAmount).toFixed(2)
        SetCurrencyResult(result)
    }

    useEffect(() => {
        GetCurrencies()
    }, [])

    return (
        <main className='flex w-full h-[92vh] justify-center'>
            <div className='flex flex-col w-[90%] md:w-[70%] lg:w-[50%] h-fit pb-10 mt-10 rounded-2xl items-center p-3 py-5 bg-[#023e8a]'>
                <div className='flex w-full h-10 bg-white rounded-2xl items-center border-2 border-[#001233]'>
                    <input type="number" onChange={(e) => SetCurrencyAmount(e.target.value)} className='w-full h-9 rounded-2xl mr-2 px-3 outline-0' placeholder='Enter a currency' />
                    <select onChange={(e) => SetCurrencyFrom(e.target.value)} className='h-10 w-18'>
                        {Object.entries(Currencies).map(([currency, value]) => (
                            <option value={currency} key={value}>{currency}</option>
                        ))}
                    </select>
                </div>

                <span className='w-[40%] my-4 h-[1px] bg-[#001233] opacity-70'></span>

                <div className='flex w-full h-10 bg-white rounded-2xl items-center border-2 border-[#001233]'>
                    <input type="number" value={CurrencyResult} onChange={(e) => SetCurrencyResult(e.target.value)} className='w-full h-9 rounded-2xl mr-2 px-3 outline-0' placeholder='Converted currency' readOnly/>
                    <select onChange={(e) => SetCurrencyTo(e.target.value)} className='h-10 w-18'>
                        {Object.entries(Currencies).map(([currency, value]) => (
                            <option value={currency} key={value}>{currency}</option>
                        ))}
                    </select>
                </div>
                <button onClick={CalculateCurrency} className='w-[70%] h-10 mt-7 rounded-2xl active:opacity-85 hover:opacity-85 bg-white'>Convert</button>
            </div>
        </main>
    )
}

export default CurrencyConverter