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
     <div className="flex flex-col justify-evenly items-center p-10 bg-black rounded-lg text-white relative h-[500px] lg:w-6/12">
        <h3 className="text-xl">{Book.title}</h3>
        <p className="text-sm">{Book.summery}</p>
        <div className="absolute flex justify-center items-center top-0 right-0 p-1 bg-yellow-500 rounded-sm text-white">
         {Book.rating}
         <i className="material-icons">star
         </i>
        </div>
          
        <div className="flex justify-evenly items-center w-full p-2 transition-all ease-in-out">
          <Link className="flex items-center gap-2 hover:scale-110" 
          to={'/' + Book.id}>
            <i className="material-icons btn btn-edit">edit</i>
            <p>Edit</p>
          </Link>
          <div className="flex items-center gap-2 cursor-pointer hover:scale-110">
            <i className="material-icons btn btn-del cursor-pointer"
            onClick={handleDelete}
            >delete</i>
            <p>Delete</p>
          </div>
        </div>
    </div>
  )
}

export default BookCard