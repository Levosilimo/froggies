import {useRef} from "react";

function AudioPlayer(): JSX.Element {
  const audioElement = useRef<HTMLMediaElement>(null);
  return  (
    <audio ref={audioElement}></audio>
  )
}

export default AudioPlayer;
