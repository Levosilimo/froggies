import React, { ChangeEvent, useContext, useState } from "react";
import { serverURL } from "../../constants";
import { settingContext } from "../../context";
import { getToken } from "../../services/local-storage";
import "./setting-window.scss";

function SettingsWindow(): JSX.Element {

  const currentClass: string[] = ['setting'];
  const {isVisible, setIsVisible} = useContext(settingContext);

  if (isVisible) {
    currentClass.push('active')
  }

  type themes = "green" |'red' | 'yellow';
  type languages = 'en_us' | 'ru' | 'ua' | 'es_es';

  interface settings {
    theme: themes,
    language: languages,
    volume: string
  }

  const defaultSet: settings = {
    language: `${localStorage.getItem('language') || 'en_us'}` as languages,
    theme: `${localStorage.getItem('theme') || 'green'}` as themes,
    volume: `${localStorage.getItem('volume') || '50'}`,
  }

  const [language, setLanguage] = useState(defaultSet.language);
  const [volume, setVolume] = useState(defaultSet.volume);
  const [theme, setTheme] = useState(defaultSet.theme);

  const changeLanguage = (e: ChangeEvent) => {
    const currentLanguage = (e.target as HTMLInputElement).value as languages;
    setLanguage(currentLanguage);
    updateUserData({language: currentLanguage});
  }

  const changeTheme = (e: ChangeEvent) => {
    const currentTheme = (e.target as HTMLInputElement).value as themes
    setTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
  }

  const changeVolume = (e: ChangeEvent) => {
    const currentVolume = (e.target as HTMLInputElement).value
    setVolume(currentVolume);
    localStorage.setItem('volume', currentVolume);
  }

  interface UpdateBody {
    language?: languages;
    levelFlexbox?: number;
  }

  async function updateUserData(preferences: UpdateBody): Promise<UpdateBody> {
    const response = await fetch(`${serverURL}/user`, {
      method: 'PATCH',
      body: JSON.stringify(preferences),
      headers: {
        'Content-type': 'application/json',
        'x-access-token': `${getToken()}`,
      },
    });
    console.log(1)
    const resBody: UpdateBody = await response.json();
    return resBody;
  }

  return (
    <div onClick={() => setIsVisible(false)} className={currentClass.join(' ')}>
      <div className="setting__overlay" >
        <div className="setting__close">
          <span className="close__line_toLeft">|</span>
          <span className="close__line_toRight">|</span>
        </div>
          <ul onClick={(e) => e.stopPropagation()} className="setting-list">
            <li className="language setting-list__item">
              <h3 className="title">Language:</h3>
              <label>
                <input
                  className={`language__input ${language ===  'en_us' ? 'active' : ''}`}
                  hidden type="radio" name="language" id="en" value="en_us" defaultChecked
                  onChange={changeLanguage}
                />
                <span className="flag-en"></span>
              </label>
              <label>
                <input
                  className={`language__input ${language ===  'ru' ? 'active' : ''}`}
                  hidden type="radio" name="language" id="ru" value="ru"
                  onChange={changeLanguage}
                />
                <span className="flag-ru"></span>
              </label>
              <label>
                <input
                  className={`language__input ${language ===  'ua' ? 'active' : ''}`}
                  hidden type="radio" name="language" id="ua" value="ua"
                  onChange={changeLanguage}
                  />
                <span className="flag-ua"></span>
              </label>
              <label>
                <input
                  className={`language__input ${language ===  'es_es' ? 'active' : ''}`}
                  hidden type="radio" name="language" id="es" value="es_es"
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
                  className={`theme__input ${theme ===  'green' ? 'active' : ''}`}
                  hidden type="radio" name="theme" id="green" value="green" defaultChecked
                  onChange={changeTheme}
                />
                <span className="theme-color">Green</span>
                </label>
              <label>
                <input
                  className={`theme__input ${theme ===  'red' ? 'active' : ''}`}
                  hidden type="radio" name="theme" id="red" value="red"
                  onChange={changeTheme}
                />
                <span className="theme-color">Red</span>
              </label>
              <label>
              <input
                className={`theme__input ${theme ===  'yellow' ? 'active' : ''}`}
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
