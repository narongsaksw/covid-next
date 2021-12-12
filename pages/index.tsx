import React, { useState } from 'react'

export default function Home() {
  const [activeTimeline, setActiveTimeline] = useState(true)
  return (
    <>
      <header className="header">
        <div className="header__box">
          <h1 className="header__text--primary">
              COVID Timeline Generator
          </h1>
        </div>
      </header>

      <main>
        <div className="patient-info__container">
          <h1 className="patient-info__text--primary">Patient Information</h1>

          <div className="patient-info__box">
            <div className="patient-info__box--1">
              <label className="label">Gender</label>
              <select className="input">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="patient-info__box--2">
              <label className="label">Age</label>
              <input type="number" className="input" />
            </div>

            <div className="patient-info__box--3">
              <label className="label">Occupation</label>
              <input type="text" className="input"/>
            </div>
          </div>
        </div>

        <div className="timeline__container">
          <h1 className="timeline__text--primary">Timeline</h1>

          <div className="timeline__flex">
            <div className="timeline__flex--1">
              <ul>
                <li onClick={() => setActiveTimeline(state => !state)}>
                  <div className="timeline__list">
                    <span>Software Engineer, Female, 32 years old</span>
                  </div>
                </li>
              </ul>

              <div className="timeline__card" style={{ display: activeTimeline ? 'block' : 'none' }}>
                <div className="timeline__card--entry">
                  <div className="entry__title">
                    <h4>01/03/2021</h4>
                  </div>
                  <div className="entry__body">
                    <div>
                      <p>16:00 - 23:00</p>
                    </div>
                    <div className="entry__body--detail">
                      <p className="desc">Watch &quot;Gray&apos;s Anatomy&ldquo; until late</p>
                      <p className="location">Home</p>
                    </div>
                    <i className="cil-x "></i>
                  </div>
                </div>
                <div className="timeline__card--entry">
                  <div className="entry__title">
                    <h4>01/03/2021</h4>
                  </div>
                  <div className="entry__body">
                    <div>
                      <p>16:00 - 23:00</p>
                    </div>
                    <div className="entry__body--detail">
                      <p className="desc">Watch &apos;Gray&apos;s Anatomy&apos; until late</p>
                      <p className="location">Home</p>
                    </div>
                    <i className="cil-x "></i>
                  </div>
                </div>
                <div className="timeline__card--entry">
                  <div className="entry__title">
                    <h4>01/03/2021</h4>
                  </div>
                  <div className="entry__body">
                    <div>
                      <p>16:00 - 23:00</p>
                    </div>
                    <div className="entry__body--detail">
                      <p className="desc">Watch &apos;Gray&apos;s Anatomy&apos; until late</p>
                      <p className="location">Home</p>
                    </div>
                    <i className="cil-x "></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline__flex--2">
              <div className="box">
                <div className="from">
                  <label className="label">From</label>
                  <input type="date" className="input" />
                </div>

                <div className="to">
                  <label className="label">To</label>
                  <input type="time" className="input"/>
                </div>
              </div>

              <label className="label">Detail</label>
              <textarea className="textarea" />

              <div className="box">
                <div className="location-type">
                  <label className="label">Location Type</label>
                  <select className="input">
                    <option>INDOOR</option>
                    <option>OUTDOOR</option>
                  </select>
                </div>

                <div className="location-name">
                  <label className="label">Location Name</label>
                  <input type="text" className="input"/>
                </div>
              </div>

              <button className="submit__button">+ Add Entry</button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
