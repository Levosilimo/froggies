import root from 'react-shadow';
import React from "react";
import {TaskModel} from "../../types/task-model";
import {frogsStyleText, getFrogSvg} from "../../constans";

function FrogsContainer(props: {level: TaskModel; userCss: string;}): JSX.Element {
  return(
    <root.div>
      <div className="items-wrapper" id="frogs">
        <style>{`${frogsStyleText} ${props.userCss}`}</style>
        {Array(props.level.type1Quantity).fill(0).map((x, i) => (
          <div className="frog" key={i}>
            <div className="frog-item" dangerouslySetInnerHTML={{__html: getFrogSvg("#59A47B", "#BFE078")}}>
            </div>
          </div>
        ))}
        {Array(props.level.type2Quantity).fill(0).map((x, i) => (
          <div className="frog yellow" key={i}>
            <div className="frog-item" dangerouslySetInnerHTML={{__html: getFrogSvg("#A4597B", "#FF9F78")}}>
            </div>
          </div>
        ))}
        {Array(props.level.type3Quantity).fill(0).map((x, i) => (
          <div className="frog red" key={i}>
            <div className="frog-item" dangerouslySetInnerHTML={{__html: getFrogSvg("#597BA4", "#BF78E0")}}>
            </div>
          </div>
        ))}
      </div>
    </root.div>
  );

}

export default FrogsContainer;
