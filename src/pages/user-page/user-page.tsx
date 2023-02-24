import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import SettingsWindow from "../../components/setting-window/settings-window";
import "./user-page.scss";
import { useAppSelector } from "../../hooks";
import { getUserData } from "../../services/local-storage";
import { getIsAdmin } from "../../store/user/selectors";
import UpdateAvatar from "../../components/update-avatar/update-avatar";
import { useRef, useState } from "react";
import { IAvatar } from "../../types/user-data";

function UserPage(): JSX.Element {

  const isAdmin = useAppSelector(getIsAdmin);
  const userName = getUserData()?.username || '';
  const urlForUserImage = `https://rsclone-backend.adaptable.app/avatar/${userName}`;
  const avatar = useRef<HTMLImageElement>(null);
  const [isShow, setIsShow] = useState(false);
  const showUploadWindow = () => setIsShow(!isShow);

  const updateAvatarProps: IAvatar = {
    username: userName,
    imageRef: avatar.current,
    onClose: showUploadWindow,
    show: isShow,
  }

  return (
    <div className="UserPage">
      <Header/>
      <SettingsWindow/>
      <UpdateAvatar {...updateAvatarProps}/>
      <main className="user">
        <h1 className="user__title">Profile</h1>
        <section className="info user__info">
          <h2 className="info__title">Info</h2>
          <div className="avatar info__avatar" onClick={showUploadWindow}>
            <img ref={avatar} src={urlForUserImage} alt="User avatar" className="avatar__img"/>
          </div>
          <p className="info__item">Name<span>{userName}</span></p>
          <p className="info__item">Access level<span>{isAdmin ? "Administrator" : "User"}</span></p>
          <p className="info__item">Level<span>VAR</span></p>
        </section>
        <section className="score user__score">
          <h2 className="score__title">Top 10 score</h2>
          <ol className="score__list">
            <li className="score__item"><span>Username</span> | <span>time</span></li>
            <li className="score__item"><span>Username</span> | <span>time</span></li>
            <li className="score__item"><span>Username</span> | <span>time</span></li>
            <li className="score__item"><span>Username</span> | <span>time</span></li>
            <li className="score__item"><span>Username</span> | <span>time</span></li>
            <li className="score__item"><span>Username</span> | <span>time</span></li>
            <li className="score__item"><span>Username</span> | <span>time</span></li>
            <li className="score__item"><span>Username</span> | <span>time</span></li>
            <li className="score__item"><span>Username</span> | <span>time</span></li>
            <li className="score__item"><span>Username</span> | <span>time</span></li>
          </ol>
        </section>
     </main>
      <Footer/>
    </div>
  )
}

export default UserPage;
