import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import './charSearchForm.scss';

const CharSearchForm = () => {
   const [char, setChar] = useState(null);
   const [searchName, setSearchName] = useState(null)
   const { loading, error, getCharacterByName, ClearError } = useMarvelService();
   const [clearText, setCleartext] = useState(false)
   const  pageType = 'charPage'

   useEffect(() => {
      updateChar()
   }, [searchName])


   function updateChar() {
      ClearError()
      if (searchName) {
         getCharacterByName(searchName)
            .then(onCharLoaded)
            .catch(() => setChar('not found'))
      }

   }

   function onCharLoaded(char) {
      setChar( char);
      console.log(char)
   }

   function cleanNotification() {
      setCleartext(true)
   }

   return (
      <div className="char__search-form">
         <Formik
            initialValues={{
               charName: ''
            }}
            validationSchema={Yup.object({
               charName: Yup.string()
                  .required('This field is required')
            })}
            onSubmit={(values) => {
               setTimeout(()=>setCleartext(false),500)
               setSearchName(values.charName.replace(/ / % 20))
            }}
            >

            <Form>
               <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
               <div className="char__search-wrapper">
                  <div className="char__search-box">
                     <Field
                        id="charName"
                        name='charName'
                        type='text'
                        placeholder="Enter name"

                     >
                        {({
                           field, // { name, value, onChange, onBlur }
                           form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                           meta,
                        }) => (
                           <div>
                              <input onKeyDown={cleanNotification} type="text" placeholder="Enter name" {...field} />
                              {meta.touched && meta.error && (
                                 <div className='char__search-error'>{meta.error}</div>
                              )}
                           </div>
                        )}
                     </Field>
                     {!clearText && char == 'not found' && searchName ? <div className='char__search-error'>The character was not found. Check the name and try again</div> : null}
                     {!clearText && char && char !== 'not found' && searchName ? <Link to={`/comics/${pageType}/${char.id}`} className='char__search-success'>There is! Click to visit {char.name} page</Link> : null}
                  </div>
                  <button
                     type='submit'
                     className="button button__main"
                     disabled={loading}>
                     <div className="inner">find</div>
                  </button>
               </div>
            </Form>
         </Formik>
      </div>
   )
}

export default CharSearchForm;