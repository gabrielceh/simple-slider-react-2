import './styles.css';
import styled from 'styled-components/macro';

import Img1 from './assets/1.jpg';
import Img2 from './assets/2.jpg';
import Img3 from './assets/3.jpg';
import Img4 from './assets/4.jpg';

import { Slideshow } from './components/Slideshow';

const imagesSlide1 = [
  { id: 1, img: Img1, titulo: 'Titulo para img 1', colorFondo: '#a4052f80' },
  { id: 2, img: Img2, titulo: 'Titulo para img 2' },
  { id: 3, img: Img3, titulo: 'Titulo para img 3' },
  { id: 4, img: Img4, titulo: 'Titulo para img 4', colorFondo: '#777F6880' },
];

function App() {
  return (
    <>
      <main>
        <Title>Productos Destacados</Title>
        <Slideshow controles velocidad="500">
          {imagesSlide1.map((image) => (
            <Slide key={image.id}>
              <img src={image.img} />
              <TextoSlide colorFondo={image.colorFondo ? image.colorFondo : false}>
                <p>{image.titulo}</p>
              </TextoSlide>
            </Slide>
          ))}
        </Slideshow>

        <Title>Productos Nuevos</Title>
        <Slideshow controles velocidad="1000" autoplay>
          {imagesSlide1.map((image) => (
            <Slide key={image.id}>
              <img src={image.img} />
              <TextoSlide colorFondo={image.colorFondo ? image.colorFondo : false}>
                <p>{image.titulo}</p>
              </TextoSlide>
            </Slide>
          ))}
        </Slideshow>
      </main>
    </>
  );
}

const Title = styled.p`
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const Slide = styled.div`
  min-width: 100%;
  overflow: hidden;
  transition: 0.3s ease all;
  z-index: 10;
  max-height: 500px; // para que todos los slides sean del mismo alto
  position: relative;

  img {
    width: 100%;
    vertical-align: top;
  }
`;

const TextoSlide = styled.div`
  background: ${(props) => (props.colorFondo ? props.colorFondo : 'rgba(0,0,0,.3)')};
  color: ${(props) => (props.colorTexto ? props.colorTexto : '#fff')};
  width: 100%;
  padding: 10px 60px;
  text-align: center;
  position: absolute;
  bottom: 0;
  @media screen and (max-width: 700px) {
    position: relative;
    background: #000;
  }
`;

export default App;
