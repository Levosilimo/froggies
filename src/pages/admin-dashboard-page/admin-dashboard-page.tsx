import "./admin-dashboard-page.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useEffect, useRef, useState} from "react";
import {UserRecordsItem, UserRecordsReq} from "../../types/user-data";
import {getLevelCount, getRecords, setUserDataAction} from "../../store/api-action";
import UpdateAvatar from "../../components/update-avatar/update-avatar";
import {useAppDispatch} from "../../hooks";
import {useTranslation} from "react-i18next";

function AdminDashboardPage() {

  const [users, setUsers] = useState<Array<UserRecordsItem>>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [recordsReqParams, setRecordsReqParams] = useState<Required<UserRecordsReq>>({page: 1, limit: 10, sorting: 'username', order: 'desc', fullInfo: true})
  const [usersCount, setUsersCount] = useState<number>(Infinity);
  const [isShownUpdateAvatar, setShownUpdateAvatar] = useState<boolean>(false);
  const [updateAvatarUsername, setUpdateAvatarUsername] = useState<string>('');
  const [updateAvatarImageRef, setUpdateAvatarImageRef] = useState<HTMLImageElement | null>();
  const [levels, setLevels] = useState<Record<string, number>>({});
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  useEffect(() => {
    fetchData();
  }, [])

  const {t} = useTranslation();

  async function fetchData(): Promise<void> {
    if (!hasMore || usersCount <= (recordsReqParams.page-1) * recordsReqParams.limit) {
      setHasMore(false);
      return;
    }
    const {items, totalCount} = await getRecords(recordsReqParams);
    const newLevels = {...levels};
    for (const user of items) {
      for (const level of Object.keys(user.records)) {
        if (!Object.keys(newLevels).includes(level)) {
          newLevels[level] = await getLevelCount(level);
        }
      }
    }
    setLevels({...newLevels})
    setUsersCount(totalCount);
    setUsers([...users, ...items])
    setRecordsReqParams({...recordsReqParams, page: recordsReqParams.page+1});
  }

  const dispatch = useAppDispatch();

  const onUserLevelsFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const checkedLevels: Record<string, Array<number>> = {};
    let submitElement: HTMLInputElement | undefined;
    for (const element of e.currentTarget.elements){
      if (element instanceof HTMLInputElement) {
        if (element.checked) {
          const level = element.getAttribute('data-level');
          if (level) {
            if (checkedLevels[level]) checkedLevels[level] = [...checkedLevels[level], Number(element.value)];
            else checkedLevels[level] = [Number(element.value)];
          }
        }
        if (element.type === "submit") submitElement = element;
      }
    }
    if(submitElement) {
      submitElement.value = t("userUpdating");
      submitElement.disabled = true;
    }
    dispatch(setUserDataAction({records: checkedLevels, username: e.currentTarget.name})).then(() => {
      if(submitElement) {
        submitElement.value = t("userUpdate");
        submitElement.disabled = false;
      }
    });
  }

  return (
    <div className="page">
      <section className="">
        <h1>{t("usersPage")}</h1>
        <hr/>
        <InfiniteScroll
          className='user-records-scroll-wrapper'
          dataLength={users.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>{t("loading")}</h4>}
        >
          {users.map((user, index) => (
            <div className='user-record-wrapper' key={user.username}>
              <div className='user-record-info-wrapper'>
                <div className='user-record-user-wrapper' key={user.username +'-user'+index}>
                  <img src={`https://rsclone-backend.adaptable.app/avatar/${user.username}`}
                       ref={el => imagesRef.current[index] = el} width="30" height="30"
                       alt={user.username + "'s avatar"}/>
                  <div className={'user-record-user-data'}>
                    <div className={'user-record-user-data-title'}>
                      <h3>{user.username}</h3>
                      {(user.authData?.isAdmin) ? <span className={'user-record-admin'}>{t("admin")}</span>: ''}
                    </div>
                    <h4>{user.authData?.email}</h4>
                  </div>
                </div>
                <div className='user-record-form-wrapper' key={user.username+'-buttons'+index}>
                  <form onSubmit={onUserLevelsFormSubmit} name={user.username}>
                  {
                    Object.keys(user.records).map((level, recIndex) => {
                    return (
                      <div className={'user-record-checkboxes-wrapper'} key={user.username+level+'-checkboxes-wrapper'+recIndex}>
                        <span>{level}</span>
                        {
                          Array(levels[level]).fill(0).map((x, i) => (
                            <label key={user.username+level+'-checkbox-label'+i+recIndex}><input type="checkbox" value={i+1} data-level={level} defaultChecked={user.records[level].includes(i+1)} className="level-checkbox"/></label>
                          ))
                        }
                      </div>
                    )})
                  }
                  <div className={'user-record-form-buttons'}>
                    <input type="submit" value={t("userUpdate").toString()}/>
                    <button type="button" onClick={() => {
                      setUpdateAvatarUsername(user.username);
                      setUpdateAvatarImageRef(imagesRef.current[index])
                      setShownUpdateAvatar(true);
                    }}>{t("changeAvatar")}
                    </button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </section>
      <UpdateAvatar username={updateAvatarUsername} onClose={() => setShownUpdateAvatar(false)} imageRef={updateAvatarImageRef} show={isShownUpdateAvatar}></UpdateAvatar>
    </div>
  )
}

export default AdminDashboardPage;
