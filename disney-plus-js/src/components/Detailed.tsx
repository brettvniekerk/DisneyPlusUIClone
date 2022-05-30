import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import db from '../firebase'
import { doc, DocumentSnapshot, getDoc } from 'firebase/firestore'

// makes sure param is of type string
interface ParamInterface {
  id: string
}

const Detailed = () => {

  const { id }: ParamInterface = useParams() // id is the :id in the page route given by whatever movie is selected on the home screen
  const [detailData, setDetailData] = useState({}) // state starts as empty object

  // get current movie by the id param
  const movieRef = doc(db, 'movies', id)

  // async function for retrieval
  async function getCurrentMovie() {
    return await getDoc(movieRef)
  }

  useEffect(() => {
    // on movie retrieval promise resolution
    getCurrentMovie().then((resolved: DocumentSnapshot) => {
      setDetailData(resolved.data()) // set the state to be the resolved data
    }).catch((error: any) => {
      alert(`No movie with that id exists!`) // catch errors
    })
  }, [id]) // only update on id change but that would be if the page is left therefor unloading data anyway

  return (
    <Container>
      <Background>
        <img src={detailData.backgroundImg} alt={`Background image for ${detailData.title}`} />
      </Background>
      <ImageTitle>
        <img src={detailData.titleImg} alt={`Logo for ${detailData.title}`} />
      </ImageTitle>
      <ContentMeta>
        <Controls>
          <Player>
            <img src='/images/play-icon-black.png' alt='Play button' />
            <span>PLAY</span>
          </Player>
          <Trailer>
            <img src='/images/play-icon-white.png' alt='Trailer button' />
            <span>TRAILER</span>
          </Trailer>
          <AddList>
            <span />
            <span />
          </AddList>
          <GroupWatch>
            <div>
              <img src='/images/group-icon.png' alt='Group watch button' />
            </div>
          </GroupWatch>
        </Controls>
        <SubTitle>
          {detailData.subTitle}
        </SubTitle>
        <Description>
          {detailData.description}
        </Description>
      </ContentMeta>
    </Container>
  )
}

// STYLED COMPONENTS

// container
const Container = styled.div`
  position: relative;

  min-height: calc(100vh - 250px);

  overflow-x: hidden;

  display: block;

  top: 72px;

  padding: 0 calc(3.5vw + 5px);
`

// background image
const Background = styled.div`
  left: 0;
  right: 0;
  top: 0;

  opacity: 0.8;

  position: fixed;

  z-index: -1;

  img {
    width: 100vw;
    height: 100vh;

    @media (max-width: 768px) {
      width: initial;
    }
  }
`

// movie logo
const ImageTitle = styled.div`
  display: flex;

  align-items: flex-end;
  -webkit-box-pack: start;
  justify-content: flex-start;

  margin: 0 auto;

  height: 30vw;
  width: 100%;

  min-height: 170px;

  padding-bottom: 24px;

  img {
    min-width: 200px;
    max-width: 600px;
    width: 35vw;
  }
`

// detailed content
const ContentMeta = styled.div`
  max-width: 874px;
`

// controls
const Controls = styled.div`
  align-items: center;

  display: flex;

  flex-flow: row nowrap;

  margin: 24px 0;

  min-height: 56px;
`

// play button
const Player = styled.button`
  font-size: 15px;

  margin: 0 22px 0 0;

  padding: 0 24px;

  height: 56px;

  border-radius: 4px;

  cursor: pointer;

  display: flex;

  align-items: center;
  justify-content: center;

  letter-spacing: 1.8px;

  text-align: center;

  background: rgb(249, 249, 249);

  border: none;

  color: rgb(0, 0, 0);

  img {
    width: 32px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 45px;

    padding: 0 12px;

    font-size: 12px;

    margin: 0 10px 0 0;

    img {
      width: 25px;
    }
  }
`

// trailer button
const Trailer = styled(Player)` // trailer button inherits play button styling
  background: rgba(0, 0, 0, 0.3);

  border: 1px solid rgb(249, 249, 249);

  color: rgb(249, 249, 249);
`

// add list button
const AddList = styled.div`
  margin-right: 16px;

  height: 44px;
  width: 44px;

  display: flex;

  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.6);

  border-radius: 50%;

  border: 2px solid white;

  cursor: pointer;

  // fun way of making a plus sign -- icon never gets blurry as zoom increases -- would definitely swap out for svg
  span {
    background-color: rgb(249, 249, 249);

    display: inline-block;

    &:first-child {
      height: 2px;

      transform: translate(1px, 0) rotate(0);

      width: 16px;
    }

    &:nth-child(2) {
      height: 16px;

      transform: translateX(-8px) rotate(0);

      width: 2px;
    }
  }
`

// group watch button
const GroupWatch = styled.div`
  height: 44px;
  width: 44px;

  border-radius: 50%;

  display: flex;

  justify-content: center;
  align-items: center;

  cursor: pointer;

  background: white;

  div {
    height: 40px;
    width: 40px;

    background: rgb(0, 0, 0);

    border-radius: 50%;

    img {
      width: 100%;
    }
  }
`

// subtitle
const SubTitle = styled.div`
  color: rgb(249, 249, 249);

  font-size: 15px;

  min-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`

// description
const Description = styled.div`
  line-height: 1.4;

  font-size: 20px;

  padding: 16px 0;

  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`

export default Detailed