import root from 'react-shadow';
import React, {useMemo} from "react";
import {TaskModel} from "../../types/task-model";
import {frogsStyleText, getFrogSvg} from "../../constants";

function FrogsContainer(props: {level: TaskModel; userCss: string;}): JSX.Element {
  const frog0 = useMemo(() => {return getFrogSvg("#59A47B", "#BFE078")}, []);
  const frog1 = useMemo(() => {return getFrogSvg("#A4597B", "#FF9F78")}, []);
  const frog2 = useMemo(() => {return getFrogSvg("#597BA4", "#BF78E0")}, []);

  return(
    <root.div>
      <div className="items-wrapper" id="frogs">
        <style>{`${frogsStyleText} ${props.userCss}`}</style>
        {props.level.items.map((type, i) => (
          <div className={`frog ${type===0?"green":type===1?"red":type===2?"blue":"green"}`} key={i}>
            <div className="frog-item" dangerouslySetInnerHTML={{__html:type===0?frog0:type===1?frog1:type===2?frog2:frog0}}>
            </div>
          </div>
        ))}
      </div>
    </root.div>
  );
}

export default FrogsContainer;
