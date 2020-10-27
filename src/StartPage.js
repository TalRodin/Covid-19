import React, {useEffect} from 'react'
import './StartPage.css'
import covid from './covid.png'

function StartPage() {
    // useEffect(()=>{

    // const card = document.querySelector('.card')
    // const container = document.querySelector('.container')

    // container.addEventListener('mousemove',(e)=>{
    //     let xAxis = (window.innerWidth / 2 - e.pageX)/10
    //     let yAxis = (window.innerHeight / 2 - e.pageY)/10
    //     card.style.transform =`rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
    // },[])})
    return (
        <div className='landing_page'>
            <div className="container">
                <div className='card'>
                    <h1>COVID-19 TRACKER</h1>
                    {/* <img src={covid}/>  */}
                </div>
            </div>
        </div>
    )
}

export default StartPage
