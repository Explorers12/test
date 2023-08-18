import React from "react"
import Activity from '../../component/Mypage/Activity'
import Settings from '../../component/Mypage/Settings'
import { useState } from "react"
import { Section } from './Mypage.styled'


export default function Mypage() {
  const [addClass, setAddClass] = useState(true);
  return (
    <Section>
      <div className="profile">
        <article className="profile_img">
          <span>이미지</span>
        </article>
        <div className="profile_info">
          <h2 className="profile_user_name">유저네임</h2>
          <div className="profile_user_state">
            <button className="logout-btn">Logout</button>

          </div>
        </div>
      </div>
      <div className="mypage_status">
        <div className="status_button">
          <button onClick={() => setAddClass(true)} className={addClass ? "active" : ""}>Activity</button>
          <button onClick={() => setAddClass(false)} className={addClass ? "" : "active"}>Settings</button>
        </div>
        <div className="state_main_wrap">
          { addClass ? <Activity/> : <Settings />}
        </div>
      </div>
    </Section>
  )
}