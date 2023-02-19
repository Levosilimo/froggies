import root from 'react-shadow';
import React from "react";
import {TaskModel} from "../../types/task-model";
import {getLilypadSvg, lilypadsStyleText} from "../../constants";

function LilypadsContainer(props: {level: TaskModel;}): JSX.Element {
  return(
    <root.div>
      <div className="items-wrapper" id="lilypads">
        <style>{`${lilypadsStyleText} ${props.level.pre.replaceAll('frogs', 'lilypads')}${props.level.winCondition}${props.level.post.replaceAll('frogs', 'lilypads')}`}</style>
        {props.level.items.map((type, i) => (
          <div className={`background ${type===0?"green":type===1?"red":type===2?"blue":"green"}`} key={i} dangerouslySetInnerHTML={{__html: getLilypadSvg( `${type===0?"#82D73F":type===1?"#F7623F":type===2?"#528FFF":"#82D73F"}`)}} />
        ))}
      </div>
    </root.div>
  );
}

export default LilypadsContainer;
