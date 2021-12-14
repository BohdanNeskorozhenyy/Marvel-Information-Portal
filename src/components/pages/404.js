import { Link } from "react-router-dom"

import errorImage from '../../resources/img/Error.jpg'

const Page404 = () =>{
   return(
         <div className='error-page'>
            <img className="hulk-error" src={errorImage} alt='error-image' />
            <Link className='error-button'  to="/">
                 Back to main page
            </Link>
        </div>

   )
}

export default Page404