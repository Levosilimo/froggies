import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import {mockTasks} from "../../mock/tasks";
import "./game-page.scss";
import {TaskModel} from "../../types/task-model";
import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom/client";
import {getLevelAction} from "../../store/api-action";
import LoadingScreen from "../../components/loading-screen/loading-screen";

// type GamePageProps = {
//   tasks: TaskModel;
// }
const preFirst = "#pond {\n display: flex;";
const preLast = "}";

function GamePage(): JSX.Element {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [levelNumber, setLevelNumber] = useState<number>(1);
  const [level, setLevel] = useState<TaskModel>();
  const backgroundContainer = useRef<HTMLDivElement>(null);
  const greenFrogContainer = useRef<HTMLDivElement>(null);
  const yellowFrogContainer = useRef<HTMLDivElement>(null);
  const redFrogContainer = useRef<HTMLDivElement>(null);

  const valueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (greenFrogContainer.current && backgroundContainer.current) {
      greenFrogContainer.current.setAttribute("style", event.target.value);
      const frogStyle = (greenFrogContainer.current.getAttribute("style") ?? '').trim().split(';').filter((str) => str!=='').map(el => el.trim());
      const lilypadStyle = (backgroundContainer.current.getAttribute("style") ?? '').trim().split(';').filter((str) => str!=='').map(el => el.trim());
      const compareArrays = (a: Array<any>, b: Array<any>) =>
        a.length === b.length && a.every((element, index) => element === b[index]);
      if (compareArrays(frogStyle, lilypadStyle)) {
        setIsButtonDisabled(!compareArrays(frogStyle, lilypadStyle));
      }
    }
  }

  const onButtonClick = () => {
    console.log('click');
    setLevelNumber(prevState => prevState + 1);
  }

  useEffect(() => {
    setLevel(undefined);
    getLevelAction("flexbox", levelNumber)
      .then(level => setLevel(level));
  }, [levelNumber]);

  useEffect(() => {
    if (backgroundContainer.current) {
      const container = backgroundContainer.current;
      if(level) level.winCondition.split(';').filter((str) => str!=='').map(el => el.trim()).forEach(answer => {
        console.log(answer);
        container.setAttribute("style", answer);
      })
    }
  });

  if(!level) return (<LoadingScreen />)

  return (
    <div className="page page-main">
      <Header/>
      <main className="game">
        <section className="game-desc">
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
            <button className="answer-button" type="button" disabled={isButtonDisabled} onClick={onButtonClick}>Next
            </button>
          </div>
        </section>
        <section className="view">
          <div className="board">
            <div className="frog" ref={greenFrogContainer}>
              {Array(level.type1Quantity).fill(0).map((x, i) => (
                <div className="frog-item" key={i}>
                  <div className="frog-image"></div>
                </div>
              ))}
            </div>
            <div ref={backgroundContainer} className="background">
              <div className="background-item"></div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export default GamePage;
