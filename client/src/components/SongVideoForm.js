import { useEffect, useState } from "react";

function SongVideoForm( { id, currentUser, updateSongVideos } ) {


    const [formData, setFormData] = useState({
        // FIX USER ID ONCE AUTHENTICATION WORKS
        user_id: 1,
        song_id: id, 
        title: "",
        video_url: "",
        comments: ""
      })
    
      function handleChange(e){
        const { name, value } = e.target
        setFormData({...formData, [name]: value})
      }

      function handleSubmit(e){
        e.preventDefault();
        fetch('/song_videos', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept:"application/json",
            },
            body: JSON.stringify(formData),
        })
        .then(r => r.json())
        .then(song_video => updateSongVideos(song_video))
        setFormData({
            user_id: 1,
            song_id: id, 
            title: "",
            video_url: "",
            comments: ""
          })
      }
    

    return (
      <div className='songVideoForm'>
        <form onSubmit={handleSubmit}>
          <div> 
            <input className='input' type="text" id="user_id" placeholder="Username..." name="name" value={formData.user_id} onChange={handleChange}/>
          </div>

          <div> 
            <input className='input' type="text" id="title" placeholder="Title..." name="title" value={formData.title} onChange={handleChange}/>
          </div>

          <div> 
            <input className='input' type="text" id="video_url" placeholder="Video URL..." name="video_url" value={formData.video_url} onChange={handleChange}/>
          </div>

          <div> 
            <textarea className='textarea' id="comments" name="comments" placeholder="Comments..." value={formData.comments} onChange={handleChange} style={{height:200}}></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
  export default SongVideoForm;