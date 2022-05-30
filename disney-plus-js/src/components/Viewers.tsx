import styled from 'styled-components'

const Viewers = () => {
  return (
    <Container>
      <Wrap>
          <img src='/images/viewers-disney.png' alt='Disney preview' />
          <video autoPlay muted loop playsInline> {/* muted attribute needs to be true needs to be added in order for autoPlay to work */}
            <source src='/videos/disney.mp4' type='video/mp4' />
          </video>
      </Wrap>
      <Wrap>
          <img src='/images/viewers-marvel.png' alt='Marvel preview' />
          <video autoPlay muted loop playsInline>
            <source src='/videos/marvel.mp4' type='video/mp4' />
          </video>
      </Wrap>
      <Wrap>
          <img src='/images/viewers-national.png' alt='National Geographic preview' />
          <video autoPlay muted loop playsInline>
            <source src='/videos/national.mp4' type='video/mp4' />
          </video>
      </Wrap>
      <Wrap>
          <img src='/images/viewers-pixar.png' alt='Pixar preview' />
          <video autoPlay muted loop playsInline>
            <source src='/videos/pixar.mp4' type='video/mp4' />
          </video>
      </Wrap>
      <Wrap>
          <img src='/images/viewers-starwars.png' alt='Star Wars preview' />
          <video autoPlay muted loop playsInline>
            <source src='/videos/starwars.mp4' type='video/mp4' />
          </video>
      </Wrap>
    </Container>
  )
}

// STYLED COMPONENTS

// container
const Container = styled.div`
  margin-top: 30px;

  padding: 30px 0 26px;

  display: grid;

  grid-gap: 25px;
  grid-template-columns: repeat(5, minmax(0, 1fr)); // fraction unit is a cool way of dividing the columns up -- essentially creates columns of 1/x width (x = 5 in our case)

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr)); // if on phone only repeat one column -- use rows insteaed basically
  }
`

// wrapper
const Wrap = styled.div`
  padding-top: 56.25%;

  border-radius: 10px;

  box-shadow: rgba(0, 0, 0, 0.7) 0 26px 30px -10px, rgba(0, 0, 0, 75%) 0 16px 10px -10px;

  overflow: hidden;

  position: relative;

  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0;

  border: 3px solid rgba(249, 249, 249, 0.1);

  cursor: pointer;

  img {
    inset: 0;

    top: 0;

    display: block;

    height: 100%;
    width: 100%;

    object-fit: cover;

    opacity: 1;

    position: absolute;

    transition: opacity 0.5s ease-in-out 0;

    z-index: 1;
  }

  video {
    width: 100%;
    height: 100%;

    position: absolute;

    top: 0;

    border-radius: 4px;

    opacity: 0;

    z-index: 0;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.8) 0 40px 58px -16px, rgba(0, 0, 0, 0.72) 0 30px 22px -10px;

    transform: scale(1.05);

    border-color: rgba(249, 249, 249, 0.8);

    video {
      opacity: 1;
      transform: scale(1.05);
    }
  }
`

export default Viewers