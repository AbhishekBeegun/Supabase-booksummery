import { useEffect,useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
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
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="summery">summery:</label>
        <textarea 
          id="summery"
          value={summery}
          onChange={(e) => setsummery(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Book Summery</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update