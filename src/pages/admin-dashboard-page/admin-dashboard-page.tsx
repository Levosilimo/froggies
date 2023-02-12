import "./admin-dashboard-page.scss";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useEffect, useRef, useState} from "react";
import {UserRecordsItem, UserRecordsReq} from "../../types/user-data";
import {getLevelCount, getRecords, updateUserData} from "../../store/api-action";
import UpdateAvatar from "../../components/update-avatar/update-avatar";

function AdminDashboardPage() {

  const [users, setUsers] = useState<Array<UserRecordsItem>>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [recordsReqParams, setRecordsReqParams] = useState<Required<UserRecordsReq>>({page: 1, limit: 10, sorting: 'username', order: 'asc'})
  const [usersCount, setUsersCount] = useState<number>(Infinity);
  const [isShownUpdateAvatar, setShownUpdateAvatar] = useState<boolean>(false);
  const [updateAvatarUsername, setUpdateAvatarUsername] = useState<string>('');
  const [updateAvatarImageRef, setUpdateAvatarImageRef] = useState<HTMLImageElement | null>();
  const [levels, setLevels] = useState<Record<string, number>>({});
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData(): Promise<void> {
    if (!hasMore || usersCount <= recordsReqParams.page * recordsReqParams.limit) {
      setHasMore(false);
      return;
    }
    const {items, totalCount} = await getRecords(recordsReqParams);
    const newLevels = {...levels};
    for (const user of items) {
      for (const level of Object.keys(user.records)) {
        if (level === '_id') continue;
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

  const onUserLevelsFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      submitElement.value = "Updating...";
      submitElement.disabled = true;
    }
    updateUserData({records: checkedLevels, username: e.currentTarget.name}).then(() => {
      if(submitElement) {
        submitElement.value = "Update user";
        submitElement.disabled = false;
      }
    });
  }

  return (
    <div className="">
      <Header/>
      <section className="">
        <h1>Users</h1>
        <hr/>
        <InfiniteScroll
          className='user-records-scroll-wrapper'
          dataLength={users.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {users.map((user, index) => (
            <div className='user-record-wrapper' key={user.username}>
              <div className='user-record-user-wrapper' key={user.username +'-user'+index}>
                <img src={`https://rsclone-backend.adaptable.app/avatar/${user.username}`}
                     ref={el => imagesRef.current[index] = el} width="30" height="30"
                     alt={user.username + "'s avatar"}/>
                <h3>{user.username}</h3>
                <button onClick={() => {
                  setUpdateAvatarUsername(user.username);
                  setUpdateAvatarImageRef(imagesRef.current[index])
                  setShownUpdateAvatar(true);
                }}>Change Avatar
                </button>
              </div>
              <div className='user-record-form-wrapper' key={user.username+'-buttons'+index}>
                <form onSubmit={onUserLevelsFormSubmit} name={user.username}>
                {
                  Object.keys(user.records).map((level, recIndex) => {
                  if (level === '_id') return;
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
                <input type="submit" value="Update user"/>
                </form>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </section>
      <Footer/>
      <UpdateAvatar username={updateAvatarUsername} onClose={() => setShownUpdateAvatar(false)} imageRef={updateAvatarImageRef} show={isShownUpdateAvatar}></UpdateAvatar>
    </div>
  )
}

export default AdminDashboardPage;
