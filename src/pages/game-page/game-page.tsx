import "./game-page.scss";
import {TaskModel} from "../../types/task-model";
import React, {useEffect, useRef, useState} from "react";
import {getLevelActionf} from "../../store/api-action";
import LoadingScreen from "../../components/loading-screen/loading-screen";

const preFirst = "#pond {\n display: flex;";
const preLast = "}";

function GamePage(): JSX.Element {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [levelNumber, setLevelNumber] = useState<number>(1);
  const [level, setLevel] = useState<TaskModel>();
  const backgroundsContainer = useRef<HTMLDivElement>(null);
  const frogsContainer = useRef<HTMLDivElement>(null);

  const valueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (frogsContainer.current && backgroundsContainer.current) {
      frogsContainer.current.setAttribute("style", event.target.value);
      const frogStyle = (frogsContainer.current.getAttribute("style") ?? '').split(';').map(el => el.trim()).filter(str => str!=='').sort().join('; ')+';';
      const lilypadStyle = (backgroundsContainer.current.getAttribute("style") ?? '').split(';').map(el => el.trim()).filter(str => str!=='').sort().join('; ')+';';
      setIsButtonDisabled(frogStyle !== lilypadStyle)
    }
  }

  const onButtonClick = () => {
    console.log('click');
    setLevelNumber(prevState => prevState + 1);
  }


  useEffect(() => {
    setLevel(undefined);
    getLevelActionf({game: "flexbox", levelNumber})
      .then(level => {setLevel(level);});
  }, [levelNumber]);

  useEffect(() => {
    if (level && backgroundsContainer.current) {
      const style = level.winCondition.split(';').map(el => el.trim()).filter(str => str!=='').sort().join('; ')+';';
      backgroundsContainer.current.setAttribute("style", style);
    }
  });

  if(!level) return (<LoadingScreen />)

  return (
    <div className="page-game">
      <main className="game">
        <section className="game-desc">
          <div className="title">
            <h4>{level.name}</h4>
            <div className="level-selector">
              <button onClick={() => setLevelNumber(prevState => prevState - 1)}>{"<"}</button>
              <span>{levelNumber}</span>
              <button onClick={() => setLevelNumber(prevState => prevState + 1)}>{">"}</button>
            </div>
          </div>
          <p className="task-desc" dangerouslySetInnerHTML={{__html: level.description.paragraph}}></p>
          <ul className="rules-list">
            {level.description.rulesList.map((rule, index) => (<li dangerouslySetInnerHTML={{__html: rule}} key={index}></li>))}
          </ul>
          <p className="task-desc" dangerouslySetInnerHTML={{__html: level.description.example}}></p>
          <div className="answer">
            <div className="question-block">
              <pre>{preFirst}</pre>
              <div className="answer-block">
                <pre> </pre>
                <textarea onChange={valueChange} autoFocus={true} autoCapitalize="none" autoComplete="off" autoCorrect="off"></textarea>
              </div>
              <pre>{preLast}</pre>
            </div>
            <button className="answer-button" type="button" disabled={isButtonDisabled} onClick={onButtonClick}>{level.submitText}</button>
          </div>
        </section>
        <section className="view">
          <div className="board">
            <div className="items-wrapper frogs" ref={frogsContainer}>
              {Array(level.type1Quantity).fill(0).map((x, i) => (
                <div className="frog" key={i}>
                  <div className="frog-item" >
                    <div className="frog-image-1"></div>
                  </div>
                </div>
              ))}
              {Array(level.type2Quantity).fill(0).map((x, i) => (
                <div className="frog" key={i}>
                  <div className="frog-item" >
                    <div className="frog-image-2"></div>
                  </div>
                </div>
              ))}
              {Array(level.type3Quantity).fill(0).map((x, i) => (
                <div className="frog" key={i}>
                  <div className="frog-item" >
                    <div className="frog-image-3"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="items-wrapper lilypads" ref={backgroundsContainer}>
              {Array(level.type1Quantity).fill(0).map((x, i) => (
                <div className="background" key={i}>
                    <div className="background-item item-1"></div>
                </div>
              ))}
              {Array(level.type2Quantity).fill(0).map((x, i) => (
                <div className="background" key={i}>
                  <div className="background-item item-2"></div>
                </div>
              ))}
              {Array(level.type3Quantity).fill(0).map((x, i) => (
                <div className="background" key={i}>
                  <div className="background-item item-3"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default GamePage;
