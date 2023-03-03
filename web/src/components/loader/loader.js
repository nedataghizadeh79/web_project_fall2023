import { useLoader } from '../../providers/loaderProvider';
import './loader.css'

function Loader({ children }) {
    const { isShown } = useLoader();

    return (

        isShown && <div className="loader-container">
            <div className="loader-center">
                <div class="loader"></div>
                {/* <p>در حال بارگذاری...</p> */}
            </div>
            {children}
        </div>

    )
}

export default Loader;
