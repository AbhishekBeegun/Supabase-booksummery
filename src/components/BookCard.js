import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import supabase from "../pages/SupabaseClient"

const BookCard = ({ Book }) => {

  const navigate = useNavigate();

  const handleDelete = async () => {
    const {data,error} = await supabase
    .from('Books')
    .delete()
    .eq('id', Book.id)
    .select()

    if(error){
      console.log(error)
    }
    if(data){
      alert("Book deleted")
      window.location.href=window.location.href
    }
  }


  return (
    <div className="smoothie-card">
        <h3>{Book.title}</h3>
        <p>{Book.summery}</p>
        <div className="rating">
        {Book.rating}
        </div>
          
        <div className="buttons">
          <Link to={'/' + Book.id}>
            <i className="material-icons">edit</i>
          </Link>
            <i className="material-icons"
            onClick={handleDelete}
            >delete</i>
        </div>
    </div>
  )
}

export default BookCard