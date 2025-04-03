import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import "./App.css";

const Button = ({ children, onClick }) => (
  <button className="music-btn" onClick={onClick}>
    {children}
  </button>
);

const songs = [
  "/songs/song 1.mp3",
  "/songs/song 2.mp3",
  "/songs/song 3.mp3",
  "/songs/song 4.mp3",
  "/songs/song 5.mp3",
];

export default function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(songs[currentIndex]));

  useEffect(() => {
    audioRef.current.src = songs[currentIndex];
    if (isPlaying) audioRef.current.play();
  }, [currentIndex]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const prevTrack = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const selectSong = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
    audioRef.current.play();
  };

  return (
    <>
    <div className = "heading">
      <h1>Songify</h1>
      <p>🎶 Your Music Player 🎶</p>
      <p>Click on a song to play it!</p>
    </div>
    <div className="music-player-container">
      {/* 🎵 Left Side - Song List */}
      <div className="song-list">
        <h2>Playlist</h2>
        <ul>
          {songs.map((song, index) => (
            <li
              key={index}
              className={index === currentIndex ? "active" : ""}
              onClick={() => selectSong(index)}
            >
              {song.split("/").pop()}
            </li>
          ))}
        </ul>
      </div>

      {/* 🎶 Right Side - Player */}
      <div className="player">
        <h1>{songs[currentIndex].split("/").pop()}</h1>
        <div className="controls">
          <Button onClick={prevTrack}><SkipBack /></Button>
          <Button onClick={togglePlayPause}>{isPlaying ? <Pause /> : <Play />}</Button>
          <Button onClick={nextTrack}><SkipForward /></Button>
        </div>
      </div>
    </div>
    </>
  );
}
