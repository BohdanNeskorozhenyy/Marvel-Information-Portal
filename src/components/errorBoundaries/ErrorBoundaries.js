import { Component } from "react";
import './ErrorBoundaries.scss'
import ErrorMesage from "../errorMesage/ErrorMesage";

class ErrorBoundaries extends Component{
   constructor(props){
      super(props)
      this.state = {
         error: false
      }
   }
   componentDidCatch(error, errorInfo){
      console.log(error, errorInfo)
      this.setState({error:true})
   }

   render(){
      if(this.state.error){
         return <div className="error-box"><ErrorMesage/></div>
      }
      return this.props.children;
   }
}

export default ErrorBoundaries