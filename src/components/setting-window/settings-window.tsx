import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import { settingContext } from "../../context";
import "./setting-window.scss";
import {language, theme} from "../../types/user-data";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {setUserDataAction} from "../../store/api-action";
import {getLanguage, getTheme, getVolume} from "../../store/user/selectors";
import {setTheme, setVolume} from "../../store/user/user-data";
import {useTranslation} from "react-i18next";

function SettingsWindow(): JSX.Element {

  const currentClass: string[] = ['setting'];
  const {isVisible, setIsVisible} = useContext(settingContext);
  const [buttonsBlocked, setButtonsBlocked] = useState<boolean>(false);
  const { t } = useTranslation();

  if (isVisible) {
    currentClass.push('active')
  }

  const language = useAppSelector(getLanguage) ?? 'en_us';
  const theme = useAppSelector(getTheme);
  const volume = useAppSelector(getVolume);

  const dispatch = useAppDispatch();

  const changeLanguage = (e: ChangeEvent) => {
    const currentLanguage = (e.target as HTMLInputElement).value as language;
    setButtonsBlocked(true);
    dispatch(setUserDataAction({language: currentLanguage}))
      .finally(()=>setButtonsBlocked(false));
  }

  const changeTheme = (e: ChangeEvent) => {
    const currentTheme = (e.target as HTMLInputElement).value as theme
    dispatch(setTheme(currentTheme));
    localStorage.setItem('theme', currentTheme);
  }

  const changeVolume = (e: ChangeEvent) => {
    const currentVolume = (e.target as HTMLInputElement).value
    dispatch(setVolume(Number(currentVolume)));
    localStorage.setItem('volume', currentVolume);
  }

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if(e.keyCode === 27){
        setIsVisible(false);
      }
    }
    window.addEventListener('keydown', close)
  })

  return (
    <div onClick={() => setIsVisible(false)} className={currentClass.join(' ')}>
      <div className="overlay-settings" >
        <div className="setting__close">
          <span className="close__line_toLeft">|</span>
          <span className="close__line_toRight">|</span>
        </div>
          <ul onClick={(e) => e.stopPropagation()} className="setting-list">
            <li className="language setting-list__item">
              <h3 className="title">{t('languageTitle')}</h3>
              <label>
                <input
                  disabled={buttonsBlocked}
                  className={`language__input ${language ===  'en_us' ? 'active' : ''}`}
                  hidden type="radio" name="language" id="en" value="en_us" defaultChecked
                  onChange={changeLanguage}
                />
                <span className={`flag-en ${buttonsBlocked ? 'disabled' : ''}`}></span>
              </label>
              <label>
                <input
                  disabled={buttonsBlocked}
                  className={`language__input ${language ===  'ru' ? 'active' : ''}`}
                  hidden type="radio" name="language" id="ru" value="ru"
                  onChange={changeLanguage}
                />
                <span className={`flag-ru ${buttonsBlocked ? 'disabled' : ''}`}></span>
              </label>
              <label>
                <input
                  disabled={buttonsBlocked}
                  className={`language__input ${language ===  'uk' ? 'active' : ''}`}
                  hidden type="radio" name="language" id="uk" value="uk"
                  onChange={changeLanguage}
                  />
                <span className={`flag-ua ${buttonsBlocked ? 'disabled' : ''}`}></span>
              </label>
              <label>
                <input
                  disabled={buttonsBlocked}
                  className={`language__input ${language ===  'es_es' ? 'active' : ''}`}
                  hidden type="radio" name="language" id="es" value="es_es"
                    onChange={changeLanguage}
                  />
                <span className={`flag-es ${buttonsBlocked ? 'disabled' : ''}`}></span>
              </label>
            </li>
            <li className="volume setting-list__item">
              <h3 className="title">{t("volumeTitle")}</h3>
              <div className="volume">
                <input
                  className="volume-range" type="range" step={5} value={volume}
                  onChange={changeVolume}
                />
                <p className="currentVolume">{volume+'%'}</p>
              </div>
            </li>
            <li className="theme setting-list__item">
              <h3 className="title">{t("themeTitle")}</h3>
              <label>
                <input
                  className={`theme__input ${theme ===  'green' ? 'active' : ''}`}
                  hidden type="radio" name="theme" id="green" value="green" defaultChecked
                  onChange={changeTheme}
                />
                <span className="theme-color">{t("greenTheme")}</span>
                </label>
              <label>
                <input
                  className={`theme__input ${theme ===  'red' ? 'active' : ''}`}
                  hidden type="radio" name="theme" id="red" value="red"
                  onChange={changeTheme}
                />
                <span className="theme-color">{t("redTheme")}</span>
              </label>
              <label>
              <input
                className={`theme__input ${theme ===  'yellow' ? 'active' : ''}`}
                hidden type="radio" name="theme" id="yellow" value="yellow"
                onChange={changeTheme}
                />
                <span className="theme-color">{t("yellowTheme")}</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    )
}

export default SettingsWindow;
