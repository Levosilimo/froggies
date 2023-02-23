import root from 'react-shadow';
import React from "react";
import {TaskModel} from "../../types/task-model";
import {frogsStyleText, getFrogSvg} from "../../constants";

function FrogsContainer(props: {level: TaskModel; userCss: string;}): JSX.Element {
  return(
    <root.div>
      <div className="items-wrapper" id="frogs">
        <style>{`${frogsStyleText} ${props.userCss}`}</style>
        {props.level.items.map((type, i) => (
          <div className={`frog ${type===0?"green":type===1?"red":type===2?"blue":"green"}`} key={i}>
            <div className="frog-item" dangerouslySetInnerHTML={{__html: getFrogSvg(`${type===0?"#59A47B":type===1?"#A4597B":type===2?"#597BA4":"#59A47B"}`, `${type===0?"#BFE078":type===1?"#FF9F78":type===2?"#BF78E0":"#BFE078"}`)}}>
            </div>
          </div>
        ))}
      </div>
    </root.div>
  );
}

export default FrogsContainer;
