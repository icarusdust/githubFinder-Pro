import React, { useState, useEffect, useContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext()

const GithubProvider = ({children}) => {
    const [githubUser, setGithubUser] = useState(mockUser)
    const [githubRepos, setGithubRepos] = useState(mockRepos)
    const [githubFollowers, setGithubFollowers] = useState(mockFollowers)
    const [request, setRequest] = useState(0)
    const [limit, setLimit] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({show:false, msg:''})

    const setSubmitUser = async (user) => {
      setErrorMsg()
      setLoading(true)
      const response = await axios(`${rootUrl}/users/${user}`).catch(err => console.log(err)) 
      if(response){ 
        setGithubUser(response.data)
        const { login, followers_url } = response.data

        // await axios(`${rootUrl}/users/${login}/repos?per_page=100`).then(data => setGithubRepos(data.data))
        // await axios(`${followers_url}?per_page=100`).then(data => setGithubFollowers(data.data))
        
        await Promise.allSettled([
          axios(`${rootUrl}/users/${login}/repos?per_page=100`),
          axios(`${followers_url}?per_page=100`)
        ]).then(result => {
          const [repos, followers] = result
          const status = 'fulfilled'
          if(repos.status === status) {
             setGithubRepos(repos.value.data)
          }
          if(followers.status === status){
            setGithubFollowers(followers.value.data)
          }
            }).catch(err => console.log(err))
          } else {
            setErrorMsg(true, 'The user is not found!')
          }
          checkRequest()
          setLoading(false)
    }
   
   const checkRequest = async () => {
     const response = await axios(`${rootUrl}/rate_limit`).catch(err => console.log(err))
     const {rate:{remaining, limit}} = response.data
     setRequest(remaining)
     console.log(remaining)
     setLimit(limit)
     if(remaining === 0){
       setErrorMsg(true, 'You exceeded your hourly limit!')
     }
   }
    useEffect(() => {
      checkRequest()
    }, [])

    const setErrorMsg = (show = false, msg = "") => {
        setError({show, msg})
    }
  return (
  <GithubContext.Provider value ={{githubUser, githubRepos, githubFollowers, request,limit,error,setSubmitUser,setErrorMsg, loading }}>
      {children}
  </GithubContext.Provider>
  )
}

export {GithubContext, GithubProvider}
