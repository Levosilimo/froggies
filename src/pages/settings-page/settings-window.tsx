import React, { ChangeEvent, useContext, useState } from "react";
import { settingContext } from "../../context";
import "./setting-window.scss";

function SettingsWindow(): JSX.Element {

  const currentClass:string[] = ['setting'];
  const {isVisible, setIsVisible} = useContext(settingContext);

  if (isVisible) {
    currentClass.push('active')
  }

  const defaultSet: {theme: string, language: string, volume: string} = {
    language: `${localStorage.getItem('language') || 'en'}`,
    theme: `${localStorage.getItem('theme') || 'green'}`,
    volume: `${localStorage.getItem('volume') || '50'}`,
  }

  const [language, setLanguage] = useState(defaultSet.language);
  const [volume, setVolume] = useState(defaultSet.volume);
  const [theme, setTheme] = useState(defaultSet.theme);

  const changeLanguage = (e: ChangeEvent) => {
    const currentLanguage = (e.target as HTMLInputElement).value
    setLanguage(currentLanguage);
    localStorage.setItem('language', currentLanguage);
  }

  const changeTheme = (e: ChangeEvent) => {
    const currentTheme = (e.target as HTMLInputElement).value
    setTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
  }

  const changeVolume = (e: ChangeEvent) => {
    const currentVolume = (e.target as HTMLInputElement).value
    setVolume(currentVolume);
    localStorage.setItem('volume', currentVolume);
  }

  return (
    <div onClick={() => setIsVisible(false)} className={currentClass.join(' ')}>
      <div className="overlay">
          <ul onClick={(e) => e.stopPropagation()} className="setting-list">
            <li className="language setting-list__item">
              <h3 className="title">Language:</h3>
              <label>
                <input
                  className={`language__input ${language ===  'en' ? 'active' : null}`}
                  hidden type="radio" name="language" id="en" value="en" defaultChecked
                  onChange={changeLanguage}
                />
                <span className="flag-en"></span>
              </label>
              <label>
                <input
                  className={`language__input ${language ===  'ru' ? 'active' : null}`}
                  hidden type="radio" name="language" id="ru" value="ru"
                  onChange={changeLanguage}
                />
                <span className="flag-ru"></span>
              </label>
              <label>
                <input
                  className={`language__input ${language ===  'ua' ? 'active' : null}`}
                  hidden type="radio" name="language" id="ua" value="ua"
                  onChange={changeLanguage}
                  />
                <span className="flag-ua"></span>
              </label>
              <label>
                <input
                  className={`language__input ${language ===  'es' ? 'active' : null}`}
                  hidden type="radio" name="language" id="es" value="es"
                    onChange={changeLanguage}
                  />
                <span className="flag-es"></span>
              </label>
            </li>
            <li className="volume setting-list__item">
              <h3 className="title">Volume:</h3>
              <div className="volume">
                {/* <span className="min-volume"></span> */}
                <input
                  className="volume-range" type="range" step={5} value={volume}
                  onChange={changeVolume}
                />
                <p className="currentVolume">{volume+'%'}</p>
                {/* <span className="max-volume"></span> */}
              </div>
            </li>
            <li className="theme setting-list__item">
              <h3 className="title">Theme:</h3>
              <label>
                <input
                  className={`theme__input ${theme ===  'green' ? 'active' : null}`}
                  hidden type="radio" name="theme" id="green" value="green" defaultChecked
                  onChange={changeTheme}
                />
                <span className="theme-color">Green</span>
                </label>
              <label>
                <input
                  className={`theme__input ${theme ===  'red' ? 'active' : null}`}
                  hidden type="radio" name="theme" id="red" value="red"
                  onChange={changeTheme}
                />
                <span className="theme-color">Red</span>
              </label>
              <label>
              <input
                className={`theme__input ${theme ===  'yellow' ? 'active' : null}`}
                hidden type="radio" name="theme" id="yellow" value="yellow"
                onChange={changeTheme}
                />
                <span className="theme-color">Yellow</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    )
}

export default SettingsWindow;
