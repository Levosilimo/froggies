import './audio-player.scss'
import {useEffect, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getIsPlayerMuted, getVolume} from "../../store/user/selectors";
import {setPlayerMuted, setVolume} from "../../store/user/user-data";

const audioElement = new Audio(process.env.PUBLIC_URL + "/sounds/froggyLoop.wav")
audioElement.muted = true;
audioElement.loop = true;
audioElement.pause();
function AudioPlayer(): JSX.Element {
  const volume = useAppSelector(getVolume);
  const isPlayerMuted = useAppSelector(getIsPlayerMuted);
  const muteControl = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();

  const onMuteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (audioElement.paused) {
      audioElement.play();
      e.currentTarget.classList.remove("off");
      return;
    }
    dispatch(setPlayerMuted(!isPlayerMuted));
    if (!isPlayerMuted) {
      e.currentTarget.classList.add("off");
    } else {
      e.currentTarget.classList.remove("off");
      if (volume === 0) dispatch(setVolume(50));
    }
  }
  useEffect(() => {
    audioElement.volume = volume / 500;
    if (muteControl.current) {
      if (volume === 0) {
        muteControl.current.classList.add("off");
        dispatch(setPlayerMuted(true));
      } else if (!audioElement.paused) {
        muteControl.current.classList.remove("off");
        dispatch(setPlayerMuted(false));
      } else {
        audioElement.play();
        dispatch(setPlayerMuted(false));
      }
    }
  }, [volume, audioElement.paused])
  useEffect(() => {
    audioElement.muted = isPlayerMuted
  }, [isPlayerMuted])
  return (
    <div className="audio-player">
      <div className="player-controls">
        <button className={`mute-control off`} ref={muteControl} onClick={onMuteClick}></button>
      </div>
    </div>
  )
}

export default AudioPlayer;
