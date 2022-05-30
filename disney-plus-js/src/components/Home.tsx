// functionality
import styled from 'styled-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { collection, DocumentData, getDocs, QuerySnapshot } from 'firebase/firestore'
import db from '../firebase'
import { setMovies } from '../features/movie/movieSlice'
import { selectUserName } from '../features/user/userSlice'

// components
import Carousel from './Carousel'
import Viewers from './Viewers'
import Recommended from './Recommended'
import NewDisney from './NewDisney'
import Originals from './Originals'
import Trending from './Trending'

const Home = () => {

  // set up redux functionality
  const dispatch = useDispatch()
  const userName = useSelector(selectUserName)

  // declare arrays to be passed to store
  let recommends: any,
      newDisneys: any,
      originals: any,
      trendings: any
  recommends = newDisneys = originals = trendings = []

  // get movie selection
  const dbCollection = collection(db, 'movies')
  
  // get the results asynchronously as per firestore docs
  async function getDbResults() {
    return await getDocs(dbCollection)
  }

  useEffect(() => {
    // once resolved, map thru the array and store the data in variables
    getDbResults().then((resolved: QuerySnapshot) => {

      // using .docs allows us to use the map method
      resolved.docs.map((doc: DocumentData) => {
        // switch case for the type field from firestore db
        switch(doc.data().type) {
          case 'recommend':
            recommends = [...recommends, { id: doc.id, ...doc.data() }] // declare new recommends because push method was throwing mutability errors
            break
          case 'new':
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }]
            break
          case 'original':
            originals = [...originals, { id: doc.id, ...doc.data() }]
            break
          case 'trending':
            trendings = [...trendings, { id: doc.id, ...doc.data() }]
            break
        }
      })

      // dispatch data to store -- must keep dispatch in callback or else arrays dont store value and therefor dont update state
      dispatch(setMovies({
        recommend: recommends,
        newDisney: newDisneys,
        original: originals,
        trending: trendings
      }))

    })

  }, [userName]) // only update when userName changes (when the user logs out, but they get sent to the login page anyway)

  return (
    <Container>
      <Carousel />
      <Viewers />
      <Recommended />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  )
}

const Container = styled.main`
  position: relative;

  min-height: calc(100vh - 250px);

  overflow-x: hidden;

  display: block;

  top: 72px;

  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url('/images/home-background.png') center center / cover no-repeat fixed;

    content: '';

    position: absolute;

    inset: 0;

    opacity: 1;

    z-index: -1;
  }
`

export default Home