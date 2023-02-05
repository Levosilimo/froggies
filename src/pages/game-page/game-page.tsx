import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import {mockTasks} from "../../mock/tasks";
import "./game-page.scss";
import {TaskModel} from "../../types/task-model";
import {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom/client";

// type GamePageProps = {
//   tasks: TaskModel;
// }
const preFirst = "#pond {display: flex;";
const preLast = "}";

function GamePage (): JSX.Element {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const task: TaskModel = mockTasks[0];
  const backgroundContainer: any = useRef(null);
  const frogContainer: any = useRef(null);

 const valueChange = (event: any) =>  {
   console.log(event.target.value);
   frogContainer.current.setAttribute("style", event.target.value);
   // console.log(frogContainer.current.getAttribute("style") === backgroundContainer.current.getAttribute("style") )
   // if (frogContainer.current.getAttribute("style") ===
   //   backgroundContainer.current.getAttribute("style")) {
   //   setIsButtonDisabled(!isButtonDisabled);
   // }
 }

 const onButtonClick = () => {
   console.log('click');
 }

  useEffect(() => {
    if (backgroundContainer.current) {
      task.answer.forEach(answer => {
        console.log(answer);
        backgroundContainer.current.setAttribute("style", answer);
      })
    }

  });


  return (
    <div className="page page-main">
      <Header/>
      <main className="game">
        <section className="game-desc">
          <p className="task-desc">{task.desc.preview}</p>
          <ul className="rules-list">
            {task.desc.rulesList.map((rule, index) => (<li key={index}>{rule}</li>))}
          </ul>
          <p className="task-desc">{task.desc.example}</p>
          <div className="answer">
            <div className="answer-block">
              <pre>{preFirst}</pre>
              <textarea onChange={valueChange}></textarea>
              <pre>{preLast}</pre>
            </div>
            <button className="answer-button" type="button"
                    disabled={isButtonDisabled}
                    onClick={onButtonClick}>
              Next
            </button>
          </div>
        </section>
        <section className="view">
          <div className="board">
            <div className="frog" ref={frogContainer}>
              <div  className="frog-item">
                <div className="frog-image"></div>
              </div>
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
