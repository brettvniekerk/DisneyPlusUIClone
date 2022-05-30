import styled from 'styled-components'
import { useEffect } from 'react'
import { signInWithPopup, UserCredential } from 'firebase/auth' // GoogleAuthProvider -- ultimately unused
import { auth, provider } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUserName, selectUserPhoto, setUserLoginDetails, setSignOutState } from '../features/user/userSlice'

const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userName = useSelector(selectUserName)
  const userPhoto = useSelector(selectUserPhoto)

  // any time the userName changes -- check to see the user sign in state, and if they are signed in, keep their details and navigate them to /home -- otherwise just stay on the login page
  useEffect(() => {
    auth.onAuthStateChanged(async (user: any) => {
      if(user) {
        setUser(user) // keep this because it gets rid of the user data after redirecting without this
        navigate('/home') // go to home page
      }
    })
  }, [userName])

  const handleAuth = () => {
    if (!userName) {
      // authentication taken straight from firebase
      signInWithPopup(auth, provider)
        .then((result: UserCredential) => { // once the user has signed in ...
          // This gives you a Google Access Token. You can use it to access the Google API.
          // const credential = GoogleAuthProvider.credentialFromResult(result)
          // const token = credential?.accessToken
          // token ununsed because firebase gives login conditions

          // The signed-in user info -- what we actually use
          const user = result.user

          // sets the user info
          setUser(user)
        })
        .catch((error: any) => {
          // alert us with any errors
          alert(error)
        })
    } else {
      auth.signOut()
        .then(() => {
          dispatch(setSignOutState()) // once the user has signed out (promise resolved), then dispatch the reducer that resets the state
        })
        .catch((error: any) => {
          // catch errors
          alert(error)
        })
      navigate('/') // go back to landing
    }
  }

  const setUser = (user: any) => {
    dispatch(setUserLoginDetails({ // dispatch user details to reducer with values from user object
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    }))
  }

  const handleImgError = (e: any) => { // handle image loading errors due to asynchronicity
    dispatch(setUserLoginDetails({
      photo: userPhoto
    }))
  }

  return (
    <Nav>
      <Logo>
        <img src='/images/logo.svg' alt='Disney Plus JS logo' />
      </Logo>

      { !userName ? <Login onClick={handleAuth}>LOGIN</Login> : (
        <>
          <NavMenu>
            <a href='/home'>
              <img src='/images/home-icon.svg' alt='Icon for home button' />
              <span>HOME</span>
            </a>
            <a>
              <img src='/images/search-icon.svg' alt='Icon for search button' />
              <span>SEARCH</span>
            </a>
            <a>
              <img src='/images/watchlist-icon.svg' alt='Icon for watchlist button' />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src='/images/original-icon.svg' alt='Icon for originals button' />
              <span>ORIGINALS</span>
            </a>
            <a>
              <img src='/images/movie-icon.svg' alt='Icon for movie button' />
              <span>MOVIES</span>
            </a>
            <a>
              <img src='/images/series-icon.svg' alt='Icon for series button' />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <Logout>
            <UserImage src={userPhoto} alt={`User image for ${userName}`} onError={handleImgError} /> {/* if user image fails to load the first time due to asynchronicity, try to load the image again because the state would have updated by then */}
            <DropDown>
              <span onClick={handleAuth}>LOGOUT</span>
            </DropDown>
          </Logout>
          
        </>
      )}

    </Nav>
  )
}



// STYLED COMPONENTS

// nav container
const Nav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  height: 70px;

  background-color: #090b13;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 36px;

  letter-spacing: 16px;

  z-index: 3; // always on top
`

// logo
const Logo = styled.a`
  padding: 0;

  width: 80px;

  margin-top: 4px;
  max-height: 70px;

  font-size: 0;

  display: inline-block;

  img { // affect the child img tag
    display: block;

    width: 100%;
  }
`

// nav menu
const NavMenu = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  height: 100%;

  justify-content: flex-end;

  position: relative;
  margin: 0;
  margin-left: 25px;
  margin-right: auto;
  padding: 0;

  a { // child links
    display: flex;
    align-items: center;

    padding: 0 12px;

    img { // child link logos
      height: 20px;
      min-width: 20px;
      width: 20px;

      z-index: auto;
    }

    span { // child span tags
      color: rgb(249, 249, 249);

      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;

      padding: 2px 0;

      white-space: nowrap;

      position: relative;

      &::before { // generate span underline
        background-color: rgb(249, 249, 249);

        border-radius: 0 0 4px 4px;

        bottom: -6px;
        right: 0;
        left: 0;

        content: '';

        height: 2px;

        opacity: 0;

        position: absolute;

        transform-origin: left center;
        transform: scaleX(0);

        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s; // animated transition

        width: auto;
      }
    }
    
    &:hover { // hover over link not just span element
      cursor: pointer;

      span::before {
        transform: scaleX(1);
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 768px) { // hide it if the screen is too small
    display: none;
  }
`

// login button -- NOT the same as the login component that controls the page
const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);

  padding: 8px 16px;

  text-align: center;

  letter-spacing: 1.5px;

  border: 1px solid #f9f9f9;
  border-radius: 4px;

  transition: all 0.2s ease-out 0s;

  &:hover {
    cursor: pointer;

    color: #000;

    background-color: #f9f9f9;

    border-color: transparent;
  }
`

// Logout container
const Logout = styled.div`
  position: relative;

  height: 48px;
  width: auto;

  display: flex;

  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;

    div {
      opacity: 1;
      transition: opacity 0.3s;
    }
  }
`

// Logout text container
const DropDown = styled.div`
  position: absolute;

  top: 55px;
  right: 0;

  background: rgb(19, 19, 19);

  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;

  box-shadow: rgba(0, 0, 0, 0.5) 0 0 18px 0;

  padding: 10px;

  font-size: 14px;
  letter-spacing: 3px;

  width: auto;

  opacity: 0;
  transition: opacity 0.3s;
`

// user image that shows if they are logged in
const UserImage = styled.img`
  height: 100%;
  width: 100%;

  border-radius: 50%;
`

export default Header