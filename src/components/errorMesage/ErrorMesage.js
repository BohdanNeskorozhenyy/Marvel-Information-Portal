import error from './error.gif'
import'./ErrorMesage.scss'

const ErrorMesage = ()=>{
   return(
     <img className="error-mesage" src={error} alt="error" />
   )
}

export default ErrorMesage