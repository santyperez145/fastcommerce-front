import React, {useState, useEffect} from 'react'
import axios from "axios"
import Arrow from './Arrow'

export default function Carousel() {

    const[categories, setCategories] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/api/categories")
        .then(res => setCategories(res.data.categories))
        .catch(err => console.log(err))
    }, [])

    let [counter, setCounter] = useState(0)
    let next = () => (counter !== categories.length-1) ? setCounter(counter+1) : setCounter(0)
    let prev = () => (counter !== 0) ? setCounter(counter-1) : setCounter(categories.length-1)

    let left = "M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    let right = "M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"

    return (
    <div className="hidden lg:flex justify-center items-center w-full h-full">
        <div className='flex text-white w-[90%] h-[75%] rounded-md bg-gradient-to-b from-orange-600 to-orange-500 justify-around gap-[15px] items-center p-2'>
            <button className='button' onClick={prev}>
                <Arrow icon = {left} />
            </button>
            <img className='h-[120%] pb-[35px] max-w-[230px]' src={categories[counter]?.character_photo} />
            <img className='h-[120%] pb-[35px] rounded-md max-w-[170px]' src={categories[counter]?.cover_photo} />
            <div className='flex flex-col w-[40%] gap-4 ms-3'>
                <p className='font-medium text-[24px]'>{categories[counter]?.name}</p>
                <p className='w-[90%] text-[14px]'>{categories[counter]?.description}</p>
            </div>
            <button className='button' onClick={next}>
                <Arrow icon = {right}/>
            </button>
        </div>
    </div>
  )
}