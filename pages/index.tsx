import React, { useState, useEffect, SetStateAction, Dispatch } from 'react'
import { useRouter } from 'next/router'

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';

import { FormData, GENDER, LOCATION, formSchema, User } from '../type/type'

import { addUserAndTimeline, getAllUser, deleteTimeline } from '../services/user.service'

const errorMessage = (msg: string) => {
  return <p className="error__message">* {msg}</p>
}

export type UserItemType = {
  user: User
  active: boolean, 
  setActive: Dispatch<SetStateAction<boolean>>
}

const UserItem = (args: UserItemType) => {
  const router = useRouter()
  const { user, active, setActive } = args
  return (
    <>
      <ul>
        <li onClick={() => setActive(state => !state)}>
          <div className="timeline__list">
            <span>{user.occupation}, {user.gender}, {user.age} years old</span>
          </div>
        </li>
      </ul>

      <div className="timeline__card" style={{ display: active ? 'block' : 'none' }}>
        {user.timelines.map((t, idx) => {
          return (
            <div key={idx} className="timeline__card--entry">
              <div className="entry__title">
                <h4>{dayjs(t.from).format('DD-MM-YYYY')}</h4>
              </div>
              <div className="entry__body">
                <div>
                  <p>{dayjs(t.from).format('HH:mm')} - {t.to}</p>
                </div>
                <div className="entry__body--detail">
                  <p className="desc">{t.detail}</p>
                  <p className="location">{t.locationName}</p>
                </div>
                <i className="cil-x " onClick={async () => {
                    await deleteTimeline(user.citizenId, t._id)
                    router.reload()
                  }}></i>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}


export default function Home() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormData>({
    resolver: yupResolver(formSchema)
  });
  const [activeTimeline, setActiveTimeline] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    getAllUser()
      .then(res => setUsers(res.data))
      .catch(e => {
        setUsers([])
        alert('fetch data failed.')
      })
  },[])

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await addUserAndTimeline(data)
    router.reload()
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="patient-info__container">
            <h1 className="patient-info__text--primary">Patient Information</h1>

            <div className="patient-info__box">
              <div className="patient-info__box--1 mb-2 mr-2">
                <label className="label">Citizen ID</label>
                <input {...register("citizenId")} type="text" className="input"/>
                {errors.citizenId?.message && errorMessage(errors.citizenId?.message)}
              </div>

              <div className="patient-info__box--1 mb-2 mr-2">
                <label className="label">Gender</label>
                <select {...register("gender")} className="input">
                  <option value={GENDER.MALE}>Male</option>
                  <option value={GENDER.FEMALE}>Female</option>
                </select>
                {errors.gender?.message && errorMessage(errors.gender?.message)}
              </div>

              <div className="patient-info__box--2 mb-2 mr-2">
                <label className="label">Age</label>
                <input {...register("age")} type="number" className="input" />
                {errors.age?.message && errorMessage(errors.age?.message)}
              </div>

              <div className="patient-info__box--3">
                <label className="label">Occupation</label>
                <input {...register("occupation")} type="text" className="input"/>
                {errors.occupation?.message && errorMessage(errors.occupation?.message)}
              </div>
            </div>
          </div>

          <div className="timeline__container">
            <h1 className="timeline__text--primary">Timeline</h1>

            <div className="timeline__flex">
              <div className="timeline__flex--1 mb-2 mr-2">
                {users.length > 0 && users.map((user) => <UserItem key={user.citizenId} user={user} active={activeTimeline} setActive={setActiveTimeline}/>)}
              </div>

              <div className="timeline__flex--2">
                <div className="box mb-2">
                  <div className="from mr-2">
                    <label className="label">From</label>
                    <input {...register("from")} type="datetime-local" className="input" />
                    {errors.from?.message && errorMessage(errors.from?.message)}
                  </div>

                  <div className="to">
                    <label className="label">To</label>
                    <input {...register("to")} type="time" className="input"/>
                    {errors.to?.message && errorMessage(errors.to?.message)}
                  </div>
                </div>

                <div className="mb-2">
                  <label className="label">Detail</label>
                  <textarea {...register("detail")} className="textarea"/>
                  {errors.detail?.message && errorMessage(errors.detail?.message)}
                </div>

                <div className="box mb-2">
                  <div className="location-type mr-2">
                    <label className="label">Location Type</label>
                    <select {...register("locationType")} className="input">
                      <option value={LOCATION.INDOOR}>INDOOR</option>
                      <option value={LOCATION.OUTDOOR}>OUTDOOR</option>
                      <option value={LOCATION.HOME}>HOME</option>
                      <option value={LOCATION.TRAVELLING}>TRAVELLING</option>
                    </select>
                    {errors.locationType?.message && errorMessage(errors.locationType?.message)}
                  </div>

                  <div className="location-name">
                    <label className="label">Location Name</label>
                    <input {...register("locationName")} type="text" className="input"/>
                    {errors.locationName?.message && errorMessage(errors.locationName?.message)}
                  </div>
                </div>

                <button type="submit" className="submit__button">+ Add Entry</button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}
