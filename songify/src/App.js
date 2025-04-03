import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Star } from "lucide-react";
import "./Styles.css";

const ControlButton = ({ children, onClick }) => (
  <button className="control-btn" onClick={onClick}>
    {children}
  </button>
);

const tracks = [
  "/music/track1.mp3",
  "/music/track2.mp3",
  "/music/track3.mp3",
  "/music/track4.mp3",
];

export default function BeatBox() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);
  const [viewLiked, setViewLiked] = useState(false);
  const audioRef = useRef(new Audio(tracks[currentTrack]));

  useEffect(() => {
    audioRef.current.src = tracks[currentTrack];
    if (playing) audioRef.current.play();
  }, [currentTrack]);

  const handlePlayPause = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };
  const nextSong = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };
  const prevSong = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };
  const chooseTrack = (index) => {
    setCurrentTrack(index);
    setPlaying(true);
    audioRef.current.play();
  };
  const toggleLike = (song) => {
    setLikedSongs(likedSongs.includes(song) ? likedSongs.filter((s) => s !== song) : [...likedSongs, song]);
  };

  return (
    <div className="beatbox-app">
      <header>
        <h1>BeatBox</h1>
        <p>Feel the Rhythm</p>
      </header>

      <div className="beatbox-container">
        <div className="track-list">
          <div className="tab-buttons">
            <button onClick={() => setViewLiked(false)}>All Tracks</button>
            <button onClick={() => setViewLiked(true)}>Favorites ⭐</button>
          </div>

          <h2>{viewLiked ? "Liked Tracks" : "Music Library"}</h2>
          <ul>
            {(viewLiked ? likedSongs : tracks).map((track, index) => (
              <li key={index} className={index === currentTrack ? "playing" : ""}>
                <span onClick={() => chooseTrack(index)}>{track.split("/").pop()}</span>
                <button className="like-btn" onClick={() => toggleLike(track)}>
                  <Star color={likedSongs.includes(track) ? "gold" : "white"} fill={likedSongs.includes(track) ? "gold" : "none"} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="music-controller">
          <h2>Now Playing</h2>
          <h1>{tracks[currentTrack].split("/").pop()}</h1>
          <div className="player-controls">
            <ControlButton onClick={prevSong}><SkipBack /></ControlButton>
            <ControlButton onClick={handlePlayPause}>{playing ? <Pause /> : <Play />}</ControlButton>
            <ControlButton onClick={nextSong}><SkipForward /></ControlButton>
          </div>
        </div>
      </div>
    </div>
  );
}

