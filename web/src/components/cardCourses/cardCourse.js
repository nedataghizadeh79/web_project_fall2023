import './cardCourses.css'

const CardCourse =({courseName, masterName, status})=>{
    return(

            <div className='card' dir='rtl'>
                <span className='mainSpan'> نام درس:  </span> <span className='dataSpan' > {courseName} </span>
                <br/>
                <span className='mainSpan'> استاد درس:  </span>  <span className='dataSpan'> {masterName} </span>
                <br/>
                <span className='mainSpan'> وضعیت درخواست دستیار آموزشی:  </span>  <span className='dataSpan'> {status} </span>
            </div>


    )
}

export default CardCourse