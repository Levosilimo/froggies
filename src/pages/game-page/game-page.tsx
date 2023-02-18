import "./game-page.scss";
import 'prismjs/themes/prism.css';
import {TaskModel} from "../../types/task-model";
import React, {useEffect, useRef, useState} from "react";
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs';
import {getLevelActionf, getUserDataAction, setUserDataAction} from "../../store/api-action";
import LoadingScreen from "../../components/loading-screen/loading-screen";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getCurrentLevel, getRecords} from "../../store/user/selectors";
import {store} from "../../store";
import {setLevelAction} from "../../store/user/user-data";
import {frogsStyleText, getLilypadSvg} from "../../constans";
import FrogsContainer from "../../components/frogs-container/frogs-container";

const preFirst = "#frogs {\n  display: flex;";
const preLast = "}";

function GamePage(): JSX.Element {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [level, setLevel] = useState<TaskModel>();
  const [show, setShow] = useState<boolean>(false);
  const backgroundsContainer = useRef<HTMLDivElement>(null);
  const questionBlock = useRef<HTMLDivElement>(null);
  const records = useAppSelector(getRecords);
  const levelNumber = useAppSelector(getCurrentLevel)
  const [frogsUserStyle, setFrogsUserStyle] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [linesCount, setLinesCount] = useState<number>(0);

  const valueChange = (code: string) => {
    setUserInput(code);
    if (backgroundsContainer.current) {
      setFrogsUserStyle(frogsStyleText+preFirst+code+preLast);
      const frogStyle = code.split(';').map(el => el.trim()).filter(str => str!=='').sort().join('; ')+';';
      const lilypadStyle = (backgroundsContainer.current.getAttribute("style") ?? '').split(';').map(el => el.trim()).filter(str => str!=='').sort().join('; ')+';';
      setIsButtonDisabled(frogStyle !== lilypadStyle)
    }
  }

  const onButtonClick = () => {
    if (records) {
      const recordsCopy: Record<string, number[]> = {};
      Object.assign(recordsCopy, records);
      if (!recordsCopy["flexbox"].includes(levelNumber)) {
        recordsCopy["flexbox"] = [...recordsCopy["flexbox"], levelNumber]
      }
      dispatch(setUserDataAction({language: undefined, records: recordsCopy}))
    }
    if(levelNumber !== level?.levelsCount) {
      store.dispatch(setLevelAction(levelNumber+1));
      setFrogsUserStyle(frogsStyleText+preFirst+preLast);
    }
    else alert('Hooray! Finish!');
  }

  const onSelectLevelButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    store.dispatch(setLevelAction(Number(event.currentTarget.value)));
    setShow(false);
  }

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserDataAction());
  }, [])

  useEffect(() => {
    setLevel(undefined);
    getLevelActionf({game: "flexbox", levelNumber})
      .then(level => {
        setUserInput('');
        setLevel(level);
        if (questionBlock.current){
          setLinesCount(countLines(questionBlock.current));
        }
      });
  }, [levelNumber]);

  useEffect(() => {
    if (questionBlock.current){
      setLinesCount(countLines(questionBlock.current));
    }
    if (level && backgroundsContainer.current) {
      const style = level.winCondition.split(';').map(el => el.trim()).filter(str => str !== '').sort().join('; ') + ';';
      backgroundsContainer.current.setAttribute("style", style);
    }
  });

  if(!level) return (<LoadingScreen />)

  function countLines(target: HTMLDivElement) {
    const getStyle = (element: HTMLElement, styleProp: string): string => {
      if (document.defaultView) return document.defaultView.getComputedStyle(element).getPropertyValue(styleProp);
      return '';
    }
    let lineHeight = parseInt(getStyle(target, 'line-height'), 10);

    if (isNaN(lineHeight)) {
      let clone: HTMLDivElement = target.cloneNode() as HTMLDivElement;
      clone.innerHTML = '<br>';
      target.appendChild(clone);
      const singleLineHeight = clone.offsetHeight;
      clone.innerHTML = '<br><br>';
      const doubleLineHeight = clone.offsetHeight;
      target.removeChild(clone);
      lineHeight = doubleLineHeight - singleLineHeight;
    }
    return Math.ceil(target.offsetHeight / lineHeight) - 1
  }

  function highlightCode(str: string) {
    const regex = /<code>(.*?)<\/code>/gs;
    return str.replace(regex, (match, content: string) => {return `<pre class="game-desc-code">${(content.split("\n").map(e => highlight(e, languages.css, "css")).join("\n"))}</pre>`})
  }

  function highlightMultiline(str: string) {
    return str.split("\n").map(e => highlight(e, languages.css, "css")).join("<br/>");
  }

  return (
    <div className="page-game">
      <main className="game">
        <section className="game-desc">
          <div className="title">
            <h4>{level.name}</h4>
            <div className="level-selector">
              <span unselectable={"on"} onClick={() => setShow(!show)}>{levelNumber}</span>
              {show?(
                <div className="level-selector-buttons">
                  {Array(level.levelsCount).fill(0).map((x, i) => (
                    <button key={i+1} value={i+1} onClick={onSelectLevelButtonClick} className={`${(i+1===levelNumber ? 'current': '')} ${records && records["flexbox"].includes(i+1) ? 'passed': ''}`}>{i+1}</button>
                  ))}
                </div>
              ):''}
            </div>
          </div>
          <p className="task-desc" dangerouslySetInnerHTML={{__html: highlightCode(level.description.paragraph)}}></p>
          <ul className="rules-list">
            {level.description.rulesList.map((rule, index) => (<li dangerouslySetInnerHTML={{__html: rule}} key={index}></li>))}
          </ul>
          <p className="task-desc" dangerouslySetInnerHTML={{__html: highlightCode(level.description.example)}}></p>
          <div className="answer">
            <div>
              <div className="question-block" ref={questionBlock}>
                <p dangerouslySetInnerHTML={{__html: highlightMultiline(preFirst)}}></p>
                <div className="answer-block">
                  <Editor
                    value={userInput}
                    onValueChange={code => {valueChange(code)}}
                    highlight={code => highlight(code, languages.css, "css")}
                    autoFocus={true}
                    autoCapitalize="none"
                    autoCorrect="off"
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 12,
                      lineHeight: "15px",
                      width: "100%",
                      background: "#FFF",
                    }}
                  />
                </div>
                <p dangerouslySetInnerHTML={{__html: highlightMultiline(preLast)}}></p>
              </div>
              <div className="lines-counter">
                {(Array(linesCount).fill(0).map((x,i)=>
                  (<div key={i+1}>{i+1}</div>)
                ))}
              </div>
            </div>
            <button className="answer-button" type="button" disabled={isButtonDisabled} onClick={onButtonClick}>{level.submitText}</button>
          </div>
        </section>
        <section className="view">
          <div className="board">
            <FrogsContainer level={level} userCss={frogsUserStyle}/>
            <div className="items-wrapper lilypads" ref={backgroundsContainer}>
              {Array(level.type1Quantity).fill(0).map((x, i) => (
                <div className="background" key={i} dangerouslySetInnerHTML={{__html: getLilypadSvg("#82D73F")}} />
              ))}
              {Array(level.type2Quantity).fill(0).map((x, i) => (
                <div className="background" key={i} dangerouslySetInnerHTML={{__html: getLilypadSvg("#F7623F")}} />
              ))}
              {Array(level.type3Quantity).fill(0).map((x, i) => (
                <div className="background" key={i} dangerouslySetInnerHTML={{__html: getLilypadSvg("#528FFF")}} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default GamePage;
