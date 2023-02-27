import './audio-player.scss'
import {useEffect, useMemo, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getIsPlayerMuted, getVolume} from "../../store/user/selectors";
import {setPlayerMuted, setVolume} from "../../store/user/user-data";

function AudioPlayer(): JSX.Element {
  const volume = useAppSelector(getVolume);
  const isPlayerMuted = useAppSelector(getIsPlayerMuted);
  const muteControl = useRef<HTMLButtonElement>(null);
  const audioElement = useMemo<HTMLAudioElement>(() => {
    const audioElement = new Audio(process.env.PUBLIC_URL + "/sounds/froggyLoop.ogg")
    audioElement.muted = true;
    audioElement.loop = true;
    return audioElement;
  },[])
  const dispatch = useAppDispatch();

  const onMuteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    audioElement.play();
    dispatch(setPlayerMuted(!isPlayerMuted));
    if (isPlayerMuted) {
      if (volume === 0) dispatch(setVolume(50));
    }
  }

  useEffect(() => {
    audioElement.volume = volume / 500;
    if (muteControl.current) {
      if (volume === 0) {
        dispatch(setPlayerMuted(true));
      } else if (!audioElement.paused) {
        dispatch(setPlayerMuted(false));
      }
    }
  }, [volume, audioElement.paused])

  useEffect(() => {
    audioElement.muted = isPlayerMuted
  }, [isPlayerMuted])

  useEffect(() => {
    if (muteControl.current) {
      if (audioElement.paused || audioElement.muted || isPlayerMuted) {
        muteControl.current.classList.add("off");
      } else {
        muteControl.current.classList.remove("off");
      }
    }
  }, [audioElement.paused, audioElement.muted, isPlayerMuted])

  return (
    <div className="audio-player">
      <div className="player-controls">
        <button className={`mute-control`} ref={muteControl} onClick={onMuteClick}></button>
      </div>
    </div>
  )
}

export default AudioPlayer;
