import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectOriginals } from '../features/movie/movieSlice'

const Originals = () => {

  // get original movies
  const movies = useSelector(selectOriginals)

  return (
    <Container>
      <h4>Disney+ Originals</h4>
      <Content>
        {/* generate originals section */}
        {
          movies && movies.map((movie: any, key: any) => (
            <Wrap key={key}>
              <Link to={'/details/' + movie.id}>
                <img src={movie.cardImg} alt={`Card for ${movie.title}`} />
              </Link>
            </Wrap>
          ))
        }
      </Content>
    </Container>
  )
}

// STYLED COMPONENTS

// container
const Container = styled.div`
  padding: 0 0 26px;
`

// content
const Content = styled.div`
  display: grid;
  
  grid-gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

// wrapper
const Wrap = styled.div`
  padding-top: 56.25%;

  border-radius: 10px;

  box-shadow: rgba(0, 0, 0, 0.7) 0 26px 30px -10px, rgba(0, 0, 0, 0.75) 0 16px 10px -10px;

  overflow: hidden;

  position: relative;

  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0;

  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0;
    
    display: block;

    top: 0;

    height: 100%;
    width: 100%;

    object-fit: cover;

    opacity: 1;

    position: absolute;

    transition: opacity 0.5s ease-in-out 0;

    z-index: 1;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.8) 0 40px 58px -16px, rgba(0, 0, 0, 0.72) 0 30px 22px -10px;
    
    transform: scale(1.05);

    border-color: rgba(249, 249, 249, 0.8);
  }
`

export default Originals