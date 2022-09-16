import { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components/macro';

import RightArrow from './icons/RightArrow';
import LeftArrow from './icons/LeftArrow';

function Slideshow({
  children,
  controles = false,
  velocidad = '500',
  autoplay = false,
  intervaloAutoplay = 5000,
}) {
  const slideshowRef = useRef(null);

  //solo se definirá cuando haya cambios en la dependencia que le pasemos(en este caso velocidad) y no cuando se vuelva a renderizar el componente
  const next = useCallback(() => {
    //Preguntamos si hay slides
    if (slideshowRef.current.children.length > 0) {
      // Obtenemos el primer elemento del slideshow
      const primerElemento = slideshowRef.current.children[0];

      //Obteemos el tamaño del slide
      const tamanioSlide = slideshowRef.current.children[0].offsetWidth;

      // Establecemos una transicion
      slideshowRef.current.style.transition = `${velocidad}ms ease-out all`;
      // Movemos el slidehow
      slideshowRef.current.style.transform = `translateX(-${tamanioSlide}px)`;

      // se ejecutara cuando la transicion termine
      const transicion = () => {
        // reiniciamos la posicion del slideshow sin transicion
        slideshowRef.current.style.transition = 'none';
        slideshowRef.current.style.transform = 'translateX(0px)';

        // tomamos el primer elemento y lo mandamos al final
        slideshowRef.current.appendChild(primerElemento);
        slideshowRef.current.removeEventListener('transitionend', transicion);
      };

      slideshowRef.current.addEventListener('transitionend', transicion);

      //eliminamos el eventListener
    }
  }, [velocidad]);

  const prev = () => {
    if (slideshowRef.current.children.length > 0) {
      // Obtenemos el ultimo elemento
      const index = slideshowRef.current.children.length - 1;
      const ultimoElemento = slideshowRef.current.children[index];
      slideshowRef.current.insertBefore(ultimoElemento, slideshowRef.current.firstChild);

      //Obteemos el tamaño del slide
      const tamanioSlide = slideshowRef.current.children[index].offsetWidth;

      slideshowRef.current.style.transition = `none`;
      slideshowRef.current.style.transform = `translateX(-${tamanioSlide}px)`;

      setTimeout(() => {
        slideshowRef.current.style.transition = `${velocidad}ms ease-out all`;
        slideshowRef.current.style.transform = `translateX(0px)`;
      }, 30);

      // Movemos el slidehow
    }
  };

  useEffect(() => {
    if (autoplay) {
      let intervalo = setInterval(() => {
        next();
      }, intervaloAutoplay);

      //Eliminar intervalos
      slideshowRef.current.addEventListener('mouseenter', () => {
        clearInterval(intervalo);
      });

      // Reanudar
      slideshowRef.current.addEventListener('mouseleave', () => {
        intervalo = setInterval(() => {
          next();
        }, intervaloAutoplay);
      });
    }
  }, [intervaloAutoplay, autoplay, next]);

  return (
    <>
      <ContenedorPrincipal>
        {/* HERO IMAGE */}
        <ContenedorSlideshow ref={slideshowRef}>{children}</ContenedorSlideshow>
        {/* BUTTONS */}
        {controles && (
          <Controles>
            <Boton onClick={prev}>
              <LeftArrow />
            </Boton>

            <Boton right onClick={next}>
              <RightArrow />
            </Boton>
          </Controles>
        )}
      </ContenedorPrincipal>
    </>
  );
}

const ContenedorPrincipal = styled.div`
  position: relative;
  margin: 2rem auto;
`;

const ContenedorSlideshow = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const Controles = styled.div`
  position: absolute;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  pointer-events: none; // desactivamos los eventos del puntero, ya que esta por encima de las imagenes
`;

const Boton = styled.button`
  pointer-events: all; // activamos loe eventos nuevamente pero solo a los botones
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  width: 50px;
  height: 100%;
  text-align: center;
  position: absolute;
  transition: 0.3s ease all;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
    path {
      fill: #fff;
    }
  }
  path {
    filter: ${(props) =>
      props.right ? 'drop-shadow(-2px 0px 0px #fff)' : 'drop-shadow(2px 0px 0px #fff)'};
  }
  ${(props) => (props.right ? 'right: 0' : 'left: 0')}
`;

export { Slideshow };
