import supabase from "./SupabaseClient";
import { useState,useEffect } from "react";
import BookCard from "../components/BookCard";

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
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {Booksavailble && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderby('created_at')}>Time Created</button>
            <button onClick={() => setOrderby('title')}>Title</button>
            <button onClick={() => setOrderby('rating')}>Rating</button>
            {orderBy}
          </div>
          <div className="smoothies-grid">
          {Booksavailble.map(Book => (
            <BookCard key={Book.id} Book={Book}/>
          ))}
        </div>
        </div>
      )}
    </div>
  )
}

export default Home