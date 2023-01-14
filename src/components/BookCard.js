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
    <div className="flex flex-col justify-evenly items-center p-10 bg-black rounded-lg text-white relative h-[500px] lg:w-1/2">
        <h3>{Book.title}</h3>
        <p className="h-[50%] w-[70%] scrolling-auto">{Book.summery}</p>
        <div className="absolute flex justify-center items-center top-0 right-0 p-1 bg-yellow-500 rounded-sm text-white">
        {Book.rating}
        <i className="material-icons">star
        </i>
        </div>
          
        <div className="flex justify-evenly items-center w-full p-2">
          <Link to={'/' + Book.id}>
            <i className="material-icons btn btn-edit">edit</i>
          </Link>
            <i className="material-icons btn btn-del cursor-pointer"
            onClick={handleDelete}
            >delete</i>
        </div>
    </div>
  )
}

export default BookCard