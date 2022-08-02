import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from 'react-youtube'
import SongBanner from "./SongBanner";
import SongVideo from "./SongVideo";
import "./SongDetails.css"
import SongVideoForm from "./SongVideoForm";

const SongDetails = ( { currentUser } ) => {

  const [isLoaded, setIsLoaded] = useState(false)
  const [song, setSong] = useState([])
  const [songVideos, setSongVideos] = useState([])
  const { id } = useParams();

  const opts = {
      height: '400',
      width: '50%',
      playerVars: {
          // https://developers.google.com/youtube/player_parameters,
      },
  };

  useEffect(() => {
    fetch(`/songs/${id}`)
    .then((r) => r.json())
    .then(song => {
      setSong(song);
      setIsLoaded(true)
      setSongVideos([...song.song_videos])
  })
}, [id])

if (!isLoaded) return <h2>Loading...</h2>

let videoId
song.music_video.startsWith("https://youtu.be") ? videoId = song.music_video.slice(17, 28) : videoId = song.music_video.slice(32, 43)



function updateSongVideos(newVideo) {
  setSongVideos([...songVideos, newVideo])
}

const songVideoArray = songVideos.map(songVideo => <SongVideo key={songVideo} songVideo={songVideo} videoId={videoId} opts={opts}/>)


  return (
    <div className="song_body">
      <SongBanner song={song} />
      <div className="song_about">
        <p>{song.about}</p>
      </div>
      <YouTube videoId={videoId} opts={opts} className="song_video"/>
      <h2>Add a Live Performance or Cover!</h2> 
      <SongVideoForm id={id} currentUser={currentUser} updateSongVideos={updateSongVideos}/> 
      <div>
          {songVideoArray}
      </div>     
    </div>
  );
};

export default SongDetails;