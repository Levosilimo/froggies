import React from "react";
import {Tooltip} from "../../types/task-model";

function Tooltip(props: {tooltip: Tooltip;}): JSX.Element {
  return(
    <div className="tooltip">
      <h5>{props.tooltip.key}</h5>
      <p dangerouslySetInnerHTML={{__html: props.tooltip.text}}></p>
    </div>
  );
}

export default Tooltip;
