import "./user-page.scss";
import {useAppDispatch, useAppSelector} from "../../hooks";
import { getToken } from "../../services/local-storage";
import {getIsAdmin, getUsername} from "../../store/user/selectors";
import UpdateAvatar from "../../components/update-avatar/update-avatar";
import { useEffect, useRef, useState } from "react";
import {IAvatar, UserRecordsItem, UserRecordsReq} from "../../types/user-data";
import {useTranslation} from "react-i18next";
import {getLevelCount, getRecords} from "../../store/api-action";
import {APIRoute, AppRoute, serverURL} from '../../constants';
import UpdateUsername from "../../components/update-username/update-username";
import {setLevelAction} from "../../store/user/user-data";
import {redirectToRoute} from "../../store/action";
import LoadingScreen from "../../components/loading-screen/loading-screen";

function UserPage(): JSX.Element {

  const { t } = useTranslation();
  const isAdmin = useAppSelector(getIsAdmin);
  const username = useAppSelector(getUsername);
  const urlForUserImage = `https://rsclone-backend.adaptable.app/avatar/${username}`;
  const avatar = useRef(null);
  const [isUpdateAvatarShown, setIsUpdateAvatarShown] = useState(false);
  const closeUploadWindow = (): void => setIsUpdateAvatarShown(false);
  const [isUpdateUsernameShown, setIsUpdateUsernameShown] = useState(false);
  const closeUpdateUsername = (): void => setIsUpdateUsernameShown(false);
  const [topPlayers, setTopPlayers] = useState<Array<UserRecordsItem>>([]);
  const [topPlayersInfoElements, setTopPlayersInfoElements] = useState<Array<string>>([]);
  const topPlayerInfoContainer = useRef<HTMLDivElement>(null);
  const [levels, setLevels] = useState<Record<string, number>>({});
  const dispatch = useAppDispatch();
  const token = getToken();

  const updateAvatarProps: IAvatar = {
    imageRef: avatar.current,
    onClose: closeUploadWindow,
    show: isUpdateAvatarShown,
  }

  const topScoreProps: UserRecordsReq = {
    page: 1,
    limit: 10,
    sorting: "records.flexbox",
    order: 'desc',
  }

  const onTopPlayerClick = (e: React.MouseEvent<HTMLTableDataCellElement>, n: number) => {
    if(topPlayerInfoContainer.current) {
      e.stopPropagation();
      const container = topPlayerInfoContainer.current
      if(container.getAttribute("data-index") === n.toString(10)) {
        container.setAttribute("data-index", "");
        container.classList.remove("active");
        return;
      }
      container.innerHTML = topPlayersInfoElements[n];
      container.classList.add("active")
      container.setAttribute("data-index", n.toString(10));
      container.style.left = e.currentTarget.getBoundingClientRect().left-topPlayerInfoContainer.current.clientWidth-5+"px";
      container.style.top = e.currentTarget.getBoundingClientRect().top+window.scrollY+"px";
    }
  }

  const onTopPlayerTooltipClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if(e.target instanceof HTMLSpanElement && !e.target.classList.contains("score__info-user-username")){
      if(!Number.isNaN(Number(e.target.textContent))){
        dispatch(setLevelAction(Number(e.target.textContent)));
        dispatch(redirectToRoute(AppRoute.Game));
      }
    }
  }

  useEffect(() => {
    async function getTopScoreList(props: UserRecordsReq): Promise<void> {
      const items = (await getRecords(props)).items;
      setTopPlayers(items);
      const newLevels = {...levels};
      for (const user of items) {
        for (const level of Object.keys(user.records)) {
          if (!Object.keys(newLevels).includes(level)) {
            newLevels[level] = await getLevelCount(level);
          }
        }
      }
      setLevels({...newLevels})
      const elements = items.map((rec, i) => `
        <div class = "score__top-player-info-wrapper">
          <div class = "score__info-user-wrapper">
            <img src="https://rsclone-backend.adaptable.app/avatar/${rec.username}" alt="User avatar" class="score__info-user-img"/>
            <span class="score__info-user-username">${rec.username}</span>
          </div>
          ${Array(newLevels["flexbox"]).fill(0).map((x, i) => {return `<span class="${rec.records["flexbox"].includes(i+1) ? "on" : ""}">${i+1}</span>`}).join(" ")}
        </div>
      `);
      setTopPlayersInfoElements(elements);
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

  useEffect(() => {
    const closeContainer = () => {
      if (topPlayerInfoContainer.current) {
        topPlayerInfoContainer.current.setAttribute("data-index", "");
        topPlayerInfoContainer.current.classList.remove("active");
      }
    }
    const closeByKey = (e: KeyboardEvent) => {
      if(e.keyCode === 27){
        closeContainer();
      }
    }
    window.addEventListener('keydown', closeByKey)
    window.addEventListener('click', closeContainer);
  })

  if(!levels["flexbox"]) return (<LoadingScreen/>);

  return (
    <div className="UserPage">
      <UpdateAvatar {...updateAvatarProps}/>
      <main className="user-page">
        <h1 className="user__title">{t("profileLabel")}</h1>
        <section className="info user__info">
          <h2 className="info__title">{t("profileInfo")}</h2>
          <div className="avatar info__avatar">
            <img ref={avatar} src={urlForUserImage} alt="User avatar" className="avatar__img"/>
            <div className="edit" onClick={() => setIsUpdateAvatarShown(!isUpdateAvatarShown)}></div>
          </div>
          <div className="flex-container">
            <p className="name info__item">{t("profileName")}<span>{username}</span></p>
            <div className="edit" onClick={() => setIsUpdateUsernameShown(!isUpdateUsernameShown)}></div>
          </div>
            <p className="access info__item">{t("profileAccessLevel")}<span>{isAdmin ? t("admin") : t("user")}</span></p>
          <p className="level info__item">{t("profileGameProgress")}<span>{gameProgress} / {levels.flexbox}</span></p>
        </section>
        <UpdateUsername onClose={closeUpdateUsername} show={isUpdateUsernameShown}/>
        <section className="score user__score">
          <h2 className="score__title">{t("profileTop10")}</h2>
          <div className="score__table__wrapper">
            <table className="score__table">
              <thead>
                <tr>
                  <th>{t("usernameLabel")}</th>
                  <th>{t("profileLevelsPassed")}</th>
                </tr>
              </thead>
              <tbody>
              {
                topPlayers.map((record, i) => (
                  <tr key={i}>
                    <td onClick={(e) => onTopPlayerClick(e, i)}>
                      <span className={`top${i+1}`}>{record.username}</span>
                    </td>
                    <td>{record.length}</td>
                  </tr>))
              }
              </tbody>
            </table>
          </div>
        </section>
        <div className={"score__top-player-container"} ref={topPlayerInfoContainer} onClick={onTopPlayerTooltipClick}></div>
     </main>
    </div>
  )
}

export default UserPage;
