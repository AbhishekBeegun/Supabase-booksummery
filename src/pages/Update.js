import { useEffect,useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import supabase from "./SupabaseClient";



const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [summery, setsummery] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !summery || !rating) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const { data, error } = await supabase
      .from('Books')
      .update({ title, summery, rating })
      .eq('id',id)
      .select()



    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }
    if (data) {
      console.log(data)
      setFormError(null)
      navigate('/')
    }
  }

  useEffect(() => {
    const fetchBooks = async () => {
      const{data,error} = await supabase
      .from('Books')
      .select()
      .eq('id',id)
      .single()
      
      if(error){
        Navigate('/',{replace:true})
      }

      if(data){
        setTitle(data.title)
        setsummery(data.summery)
        setRating(data.rating)
      }
    }

    fetchBooks()
  },[id,navigate])
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title :</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="summery">Summery :</label>
        <textarea 
          id="summery"
          value={summery}
          onChange={(e) => setsummery(e.target.value)}
        />

        <label htmlFor="rating">Rating :</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Book Summery</button>

        {formError && <p className="error">{formError}</p>}
      </form>

      <div className="flex flex-col items-center">

      <div className="lg:w-1/4 h-20 flex justify-center items-center">
        <h1 className="text-lg">Preview : </h1>
      </div>

      <div className="relative flex flex-col items-center h-[500px] justify-evenly bg-black w-8/12 lg:w-1/2 text-white p-5 rounded-lg">
        <h1>{title}</h1>
        <p>{summery}</p>
        <div className="absolute flex justify-center items-center top-0 right-0 p-1 bg-yellow-500 rounded-sm text-white">
         {rating}
         <i className="material-icons">star
         </i>
        </div>
       
      </div>
    
      </div>
      <Footer/>
    </div>
  )
}

export default Update