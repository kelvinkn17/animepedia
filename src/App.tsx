import 'normalize.css';
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from '@emotion/styled';

// theme
// components
import Main from './Main';
import Navbar from './layouts/Navbar';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

function App() {
  const MainStyle = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100vw;
  `

  return (
    <MainStyle>      
      <Header />

      <Main />

      <Navbar />
      <Footer />
    </MainStyle>
  );
}

export default App;
