import styled from 'styled-components'

const Login = () => {
  return (
    <Container>
      <Content>
        <CTA>
          <CTALogoOne src='/images/cta-logo-one.svg' alt='Disney Plus JS logos'/> {/* it's cool that this is actually an img tag but styled components lets it be its own tag */}
          <SignUp>GET IT ALL THERE</SignUp>
          <Description>
            Get Premier Access to Raya and the Last Dragon for an additional fee with a Disney+ subscription. As of 03/26/21, the price of Disney+ and The Disney Bundle will increase by $1.
          </Description>
          <CTALogoTwo src='/images/cta-logo-two.png' alt='Disney Plus JS additional logos' />
        </CTA>
        <BgImage />
      </Content>
    </Container>
  )
}

// styled component lets us dictate styles in the component itself -- makes life so easy -- would've been helpful in my calculator app
// section tag good practise as its grouping a bunch of related divs
const Container = styled.section`
  overflow: hidden;

  display: flex;
  flex-direction: column;

  text-align: center;

  height: 100vh;
`

// styling for the content of the page -- could use grid but since its all in the center column sequentially it would be a waste of time sorting out rows
const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;

  box-sizing: border-box;
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`

// styling for the background image
const BgImage = styled.div`
  height: 100%;

  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('/images/login-background.jpg');

  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  
  z-index: -1; // out of the way
`

// call to action div, the center content
const CTA = styled.div`
  max-width: 650px;
  width: 100%;

  display: flex;
  flex-direction: column;
`

// logos
const CTALogoOne = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;

  display: block;

  width: 100%;
`

// big button
const SignUp = styled.a`
  font-weight: bold;
  color: #f9f9f9;

  background-color: #0063e5;

  margin-bottom: 12px;
  width: 100%;

  letter-spacing: 1.5px;
  font-size: 18px;

  padding: 16.5px 0;
  border: 1px solid transparent;
  border-radius: 4px;

  cursor: pointer;

  &:hover {
    background-color: #0483ee;
  }
`

// subtitle
const Description = styled.p`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 11px;

  margin: 0 0 24px;

  line-height: 1.5;
  letter-spacing: 1.5px;
`

// additional logos
const CTALogoTwo = styled.img`
  max-width: 600px;

  margin-bottom: 20px;

  width: 100%;
`

export default Login