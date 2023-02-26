import SettingsWindow from "../../components/setting-window/settings-window";
import "./user-page.scss";
import { useAppSelector } from "../../hooks";
import { getToken, getUserData } from "../../services/local-storage";
import { getIsAdmin } from "../../store/user/selectors";
import UpdateAvatar from "../../components/update-avatar/update-avatar";
import { useEffect, useRef, useState } from "react";
import { IAvatar, UserRecordsReq } from "../../types/user-data";
import {useTranslation} from "react-i18next";
import { getRecords } from "../../store/api-action";
import { APIRoute, serverURL } from '../../constants';

function UserPage(): JSX.Element {

  const { t } = useTranslation();
  const isAdmin = useAppSelector(getIsAdmin);
  const userName = getUserData()?.username || '';
  const urlForUserImage = `https://rsclone-backend.adaptable.app/avatar/${userName}`;
  const avatar = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const showUploadWindow = (): void => setIsShow(!isShow);
  const token = getToken();

  const updateAvatarProps: IAvatar = {
    username: userName,
    imageRef: avatar.current,
    onClose: showUploadWindow,
    show: isShow,
  }

  const topScoreProps: UserRecordsReq = {
    page: 1,
    limit: 10,
    sorting: "records.flexbox",
    order: 'desc',
  }

  const [topScoreList, setTopScoreList] = useState<JSX.Element[]>();

  useEffect(() => {
    async function getTopScoreList(props: UserRecordsReq): Promise<void> {
      const {items: top10Records} = await getRecords(props);
      const topScoreList = await top10Records.map((elem, index) => <li key={index} className="score__item"><span>{elem.username}</span> - <span>level {elem.records.flexbox.length}</span></li>);
      setTopScoreList(topScoreList);
      console.log(topScoreList);
  }
  getTopScoreList(topScoreProps);
  }, []);

  const [gameProgress, setGameProgress] = useState();

  useEffect(() => {
    async function getGameProgress(): Promise<void> {
      const response = await fetch(`${serverURL}${APIRoute.UserData}`, {headers: { 'x-access-token': token}});
      const data = await response.json()
      const gameProgress = await data.records.flexbox.length;
      setGameProgress(gameProgress);
    }
  getGameProgress();
  }, []);

  return (
    <div className="UserPage">
      <SettingsWindow/>
      <UpdateAvatar {...updateAvatarProps}/>
      <main className="user-page">
        <h1 className="user__title">{t("Profile")}</h1>
        <section className="info user__info">
          <h2 className="info__title">Info</h2>
          <div className="avatar info__avatar">
            <img ref={avatar} src={urlForUserImage} alt="User avatar" className="avatar__img"/>
            <div className="edit" onClick={showUploadWindow}></div>
          </div>
          <div className="flex-container">
            <p className="name info__item">{t("Name")}<span>{userName}</span></p>
            <div className="edit"></div>
          </div>
            <p className="access info__item">{t("Access level")}<span>{isAdmin ? "Administrator" : "User"}</span></p>
          <p className="level info__item">{t("Game progress")}<span>{t("Level")} {gameProgress}</span></p>
        </section>
        <section className="score user__score">
          <h2 className="score__title">{t("Top 10 score")}</h2>
          <ol className="score__list">{topScoreList}</ol>
        </section>
     </main>
    </div>
  )
}

export default UserPage;
