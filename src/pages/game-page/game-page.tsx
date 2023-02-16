import "./game-page.scss";
import {TaskModel} from "../../types/task-model";
import React, {useEffect, useRef, useState} from "react";
import {getLevelActionf, getUserDataAction, setUserDataAction} from "../../store/api-action";
import LoadingScreen from "../../components/loading-screen/loading-screen";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getCurrentLevel, getRecords} from "../../store/user/selectors";
import {store} from "../../store";
import {setLevelAction} from "../../store/user/user-data";
import {frogsStyleText, getLilypadSvg} from "../../constans";
import FrogsContainer from "../../components/frogs-container/frogs-container";

const preFirst = "#frogs {\n display: flex;";
const preLast = "}";

function GamePage(): JSX.Element {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [level, setLevel] = useState<TaskModel>();
  const [show, setShow] = useState<boolean>(false);
  const backgroundsContainer = useRef<HTMLDivElement>(null);
  //const frogsContainer = useRef<HTMLDivElement>(null);
  const records = useAppSelector(getRecords);
  const levelNumber = useAppSelector(getCurrentLevel)
  const [frogsMainStyle, setFrogsMainStyle] = useState<CSSStyleSheet>();
  const [frogsUserStyle, setFrogsUserStyle] = useState<string>('');

  const valueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (backgroundsContainer.current) {
      setFrogsUserStyle(frogsStyleText+preFirst+event.target.value+preLast);
      const frogStyle = event.target.value.split(';').map(el => el.trim()).filter(str => str!=='').sort().join('; ')+';';
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
    if(levelNumber !== level?.levelsCount) store.dispatch(setLevelAction(levelNumber+1));
    else alert('Hooray! Finish!');
    setFrogsUserStyle(frogsStyleText+preFirst+preLast);
  }
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserDataAction());
    new CSSStyleSheet().replace(frogsStyleText).then(sheet => setFrogsMainStyle(sheet));
  }, [])

  useEffect(() => {
    setLevel(undefined);
    getLevelActionf({game: "flexbox", levelNumber})
      .then(level => {setLevel(level);});
  }, [levelNumber]);

  useEffect(() => {
    if (level && backgroundsContainer.current) {
      const style = level.winCondition.split(';').map(el => el.trim()).filter(str => str !== '').sort().join('; ') + ';';
      backgroundsContainer.current.setAttribute("style", style);
    }
  });

  if(!level || !frogsMainStyle) return (<LoadingScreen />)

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
                    <button key={i+1} value={i+1} onClick={(e) => {store.dispatch(setLevelAction(Number(e.currentTarget.value))); setShow(false);}} className={`${(i+1===levelNumber ? 'current': '')} ${records && records["flexbox"].includes(i+1) ? 'passed': ''}`}>{i+1}</button>
                  ))}
                </div>
              ):''}
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
