import styled from 'styled-components'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

const Carousel = () => {

  // carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }

  return (
    <CarouselSlider {...settings}> {/* spread through the settings as Carousel attributes */}
      <Wrap>
        <a>
          <img src='/images/slider-1.jpg' alt='Onward slider image' />
        </a>
      </Wrap>
      <Wrap>
        <a>
          <img src='/images/slider-2.jpg' alt={`Children's animated show slider image`} />
        </a>
      </Wrap>
      <Wrap>
        <a>
          <img src='/images/slider-3.jpg' alt='Wandavision slider image 1' />
        </a>
      </Wrap>
      <Wrap>
        <a>
          <img src='/images/slider-4.jpg' alt='Wandavision slider image 2' />
        </a>
      </Wrap>
    </CarouselSlider>
  )
}

// STYLED COMPONENTS

// creates CarouselSlider as an extension of Slider (inherits css)
const CarouselSlider = styled(Slider)`
  margin-top: 20px;

  &> button { // child buttons
    transition: opacity 0.4s;
    opacity: 0;

    height: 100%;
    width: 5vw;

    z-index: 1;

    &:hover {
      opacity: 1;
    }
  }

  ul li button { // carousel select buttons
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before { // active button
    color: white;
  }

  .slick-list {
    overflow: initial; // allows us to see upcoming image
  }

  .slick-prev {
    left: -75px;
  }

  .slick-next {
    right: -75px;
  }
`

// image wrapper
const Wrap = styled.div`
  border-radius: 4px;
  
  cursor: pointer;

  position: relative;

  a {
    border-radius: 4px;

    box-shadow: rgba(0, 0, 0, 0.7) 0 26px 30px -10px, rgba(0, 0, 0, 0.75) 0 16px 10px -10px;

    display: block;

    padding: 4px;

    img {
      width: 100%;
      height: 100%;
    }

    &:hover {
      padding: 0;

      border: 4px solid rgba(249, 249, 249, 0.8);
    }
  }
`

export default Carousel