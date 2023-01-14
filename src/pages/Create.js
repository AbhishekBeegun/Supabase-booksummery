import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import supabase from "./SupabaseClient"

const Create = () => {
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
      .insert([{ title, summery, rating }])
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

  return (
    <>
    <div className="p-3">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title : </label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        

        <label htmlFor="summery">Summery : </label>
        <textarea 
          id="summery"
          value={summery}
          onChange={(e) => setsummery(e.target.value)}
        />

        <label htmlFor="rating">Rating : 1 - 5 </label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Book Summery</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
    <Footer/>
    </>
  )
}

export default Create