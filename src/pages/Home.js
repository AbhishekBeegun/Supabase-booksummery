import supabase from "./SupabaseClient";
import { useState,useEffect } from "react";
import BookCard from "../components/BookCard";
import Footer from "../components/Footer";

const Home = () => {
  const [fetchError, setfetchError] = useState(null);
  const [Booksavailble, setBooksavailable] = useState(null);
  //ordering 
  const[orderBy,setOrderby] = useState('created_at')


  useEffect(() => {
    const fetchBooks = async () =>{
      const {data,error} = await supabase
      .from('Books')
      .select()
      .order(orderBy,{ascending:false})

      if (error) {
        setfetchError("Cannot Fetch Books")
        setBooksavailable(null)
        console.log(error)
      }
      if (data) {
        console.log(data)
        setBooksavailable(data)
      }
    }

    fetchBooks()

  

  }, [orderBy])
  

  return (
    <>
    <div className="p-5">
      {fetchError && (<p>{fetchError}</p>)}
      {Booksavailble && (
        <div className="flex flex-col">
          <div className="flex justify-evenly items-center p-10">
            <p className="text-xl">Order by : {orderBy}</p>
            <button className="btn btn-blue" 
            onClick={() => setOrderby('created_at')}>Time Created</button>
            <button className="btn btn-blue" 
            onClick={() => setOrderby('title')}>Title</button>
            <button className="btn btn-blue" 
            onClick={() => setOrderby('rating')}>Rating</button>
          </div>


          <div className="flex flex-col lg:flex-row gap-2">
          {Booksavailble.map(Book => (
            <BookCard key={Book.id} Book={Book}/>
          ))}
          </div>


        </div>
      )}
    </div>
    <Footer/>
    </>
  )
}

export default Home