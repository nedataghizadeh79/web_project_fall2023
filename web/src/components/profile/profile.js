import profileImg from '../../assets/images/profile/profile.JPG'
import './profile.css'

const Profile=()=>{
    return(
        <div className='profile'>

            <section className='rightPart'>

                <section className='img'>
                    <img src={profileImg} alt='profile picture'/>
                </section>

                <br/>

                <p> ندا </p>
                <p> تقی زاده </p>
                <p> دانشجو </p>
                <p> Nedath1378@gmail.com </p>


            </section>






            <section className='leftPart'>

            </section>

        </div>
    )
}

export default Profile