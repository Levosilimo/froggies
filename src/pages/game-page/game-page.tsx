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
import {frogsStyleText} from "../../constans";
import FrogsContainer from "../../components/frogs-container/frogs-container";
import LilypadsContainer from "../../components/lilypads-container/lilypads-container";

function GamePage(): JSX.Element {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [level, setLevel] = useState<TaskModel>();
  const [show, setShow] = useState<boolean>(false);
  const questionBlock = useRef<HTMLDivElement>(null);
  const records: Record<string, Array<number>> | undefined = useAppSelector(getRecords);
  const levelNumber = useAppSelector(getCurrentLevel)
  const [preFirst, setPreFirst] = useState<string>("#frogs {\n  display: flex;");
  const [preLast, setPreLast] = useState<string>("}");
  const tooltipsRef = useRef<Array<HTMLDivElement | null>>([]);
  const tooltipContainerRef = useRef<HTMLDivElement | null>();
  const [frogsUserStyle, setFrogsUserStyle] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [linesCount, setLinesCount] = useState<number>(0);

  const valueChange = (code: string) => {
    setUserInput(code);
    setFrogsUserStyle(frogsStyleText+preFirst+code+preLast);
    if(level){
      const userStyle = code.split(';').map(el => el.trim()).filter(str => str!=='').sort().join('; ')+';';
      const winningStyle = level.winCondition.split(';').map(el => el.trim()).filter(str => str!=='').sort().join('; ')+';';
      setIsButtonDisabled(userStyle !== winningStyle)
    }
  }

  const onButtonClick = () => {
    const recordsCopy: Record<string, number[]> = {};
    if (records) {
      Object.assign(recordsCopy, records);
      if (!recordsCopy["flexbox"].includes(levelNumber)) {
        recordsCopy["flexbox"] = [...recordsCopy["flexbox"], levelNumber]
      }
      dispatch(setUserDataAction({language: undefined, records: recordsCopy}))
    }
    if(levelNumber !== level?.levelsCount) {
      store.dispatch(setLevelAction(levelNumber+1));
      setFrogsUserStyle(frogsStyleText+preFirst+preLast);
    } else if(recordsCopy['flexbox'] && recordsCopy['flexbox'].length === level?.levelsCount) {
      alert('Hooray! Finish!');
    } else {
      store.dispatch(setLevelAction(1));
    }
  }

  const onLevelNumberClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleLevelButtonsModal();
  }

  const onSelectLevelButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFrogsUserStyle('');
    store.dispatch(setLevelAction(Number(event.currentTarget.value)));
    closeLevelButtonsModal();
  }

  const toggleLevelButtonsModal = () => {
    setShow(!show);
  }

  const closeLevelButtonsModal = () => {
    setShow(false);
  }

  const onDescriptionClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
    if(!level || !tooltipContainerRef.current) return;
    const target = event.target as HTMLElement;
    const tooltipsKeys = level.description.tooltips.map(e => e.key);
    if(target.hasAttribute("data-tooltip")){
      event.stopPropagation();
      const divElement = tooltipsKeys.find((key) => target.getAttribute("data-tooltip") === key);
      for (const key of tooltipsKeys) {
        if (target.getAttribute("data-tooltip") === key){
          const divElement = tooltipsRef.current.find((htmlElement) => htmlElement && htmlElement.hasAttribute("data-tooltip") && htmlElement.getAttribute("data-tooltip") === key);
          if(divElement) {
            if (tooltipContainerRef.current.style.top === target.getBoundingClientRect().bottom+10+"px"
            && tooltipContainerRef.current.getAttribute("data-tooltip") === key) {
              closeTooltip();
              return;
            }
            tooltipContainerRef.current.style.top = target.getBoundingClientRect().bottom+10+"px";
            tooltipContainerRef.current.style.left = target.getBoundingClientRect().left-20+"px";
            tooltipContainerRef.current.hidden = false;
            tooltipContainerRef.current.setAttribute("data-tooltip", key);
            tooltipContainerRef.current.innerHTML = divElement.innerHTML;
            return;
          }
        }
      }
    }
  }

  const onTooltipContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    if(target.tagName.toLowerCase()==="code"){
      let newCode: string | null = event.currentTarget.getAttribute("data-tooltip");
      if (!newCode || target.classList.contains("off")) return;
      const codeWordsArr = target.innerText.split(' ');
      if(codeWordsArr.length>1){
        const defaultIndex = codeWordsArr.findIndex((str) => str.startsWith("(default)"));
        if (defaultIndex>0){
          newCode += `: ${codeWordsArr[defaultIndex-1]};`
        }
      } else {
        newCode += `: ${codeWordsArr[0]};`;
      }
      valueChange(newCode);
    }
  }

  const closeTooltip = () => {
    if(tooltipContainerRef.current) {
      tooltipContainerRef.current.hidden=true;
      tooltipContainerRef.current.setAttribute("style", "");
    }
  }

  const closeModals = () => {
    closeTooltip();
    closeLevelButtonsModal();
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
        setPreFirst(level.pre);
        setPreLast(level.post);
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
    const close = (e: KeyboardEvent) => {
      if(e.keyCode === 27){
        closeModals();
      }
    };
    window.addEventListener('keydown', close);
    window.addEventListener('click', closeModals);
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
    return str.replace(regex, (match, content: string) => {
      let addClass = false;
      if (level?.description.tooltips.find((tooltip) => tooltip.key===content)) addClass = true;
      return `<pre class="game-desc-code ${addClass ? "tooltip-code" : ''}" data-tooltip=${content}>${(content.split("\n").map(e => highlight(e, languages.css, "css")).join("\n"))}</pre>`
    })
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
              <span unselectable={"on"} onClick={onLevelNumberClick}>{levelNumber}</span>
              {show?(
                <div className="level-selector-buttons" onClick={(e) => e.stopPropagation()}>
                  {Array(level.levelsCount).fill(0).map((x, i) => (
                    <button key={i+1} value={i+1} onClick={onSelectLevelButtonClick} className={`${(i+1===levelNumber ? 'current': '')} ${records && records["flexbox"].includes(i+1) ? 'passed': ''}`}>{i+1}</button>
                  ))}
                </div>
              ):''}
            </div>
          </div>
          <p className="task-desc" onClick={onDescriptionClick} dangerouslySetInnerHTML={{__html: highlightCode(level.description.paragraph)}}></p>
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
                      lineHeight: "1rem",
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
          <div className="tooltip-container" hidden={true} onClick={onTooltipContainerClick} ref={el => tooltipContainerRef.current = el}></div>
          {level.description.tooltips.map((tooltip, i) => (
            <div key={i} data-tooltip={tooltip.key} ref={el => tooltipsRef.current[i] = el} className="tooltip" style={{display: "none"}}>
              <h5>{tooltip.key}</h5>
              <p dangerouslySetInnerHTML={{__html: tooltip.text}}></p>
            </div>
          ))}
        </section>
        <section className="view">
          <div className="board">
            <FrogsContainer level={level} userCss={frogsUserStyle}/>
            <LilypadsContainer level={level}/>
          </div>
        </section>
      </main>
    </div>
  )
}

export default GamePage;
