import { useEffect, useLayoutEffect, useState } from 'react';

export const useWindowSize = (modalWrap, modalBack, wrapHeight, children) => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([modalBack.current.offsetHeight, modalWrap.current.offsetHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [
    modalWrap.current,
    modalWrap.current ? modalWrap.current.offsetHeight : 0,
    modalWrap.current ? modalWrap.current.innerHTML : 0,
    modalBack.current,
    modalBack.current ? modalBack.current.offsetHeight : 0,
    modalBack.current ? modalBack.current.innerHTML : 0,
    wrapHeight,
    children,
  ]);
  return size;
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export const getNowDate = () => {
  const date = new Date();
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
