import React, { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";

const LandingPageLoader = ({ ...props }) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const width =
    windowSize.innerWidth > 1023
      ? windowSize.innerWidth - 200
      : windowSize.innerWidth;
  const heading = { width: 140, height: 24 };
  const row = 2;
  let column = 5;
  if (windowSize.innerWidth < 768) {
    column = 1;
  } else if (windowSize.innerWidth < 1024) {
    column = 2;
  } else {
    column = 5;
  }
  //   const column = windowSize.innerWidth < 768 ? 1 ? (windowSize.innerWidth < 1024 ? 2 : 4);
  const padding = 12;
  const borderRadius = 4;

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    console.log(innerWidth, innerHeight);
    return { innerWidth, innerHeight };
  }

  const list = [];

  let height;

  for (let i = 1; i <= row; i++) {
    for (let j = 0; j < column; j++) {
      const itemWidth = (width - padding * (column + 1)) / column;

      const x = padding + j * (itemWidth + padding);

      const height1 = itemWidth;

      const height2 = 20;

      const height3 = 20;

      const space =
        padding + height1 + (padding / 2 + height2) + height3 + padding * 4;

      const y1 = padding + heading.height + padding * 2 + space * (i - 1);

      const y2 = y1 + padding + height1;

      const y3 = y2 + padding / 2 + height2;

      list.push(
        <>
          <rect
            x={x}
            y={y1}
            rx={borderRadius}
            ry={borderRadius}
            width={itemWidth}
            height={height1}
          />
          <rect x={x} y={y2} rx={0} ry={0} width={itemWidth} height={height2} />
          <rect
            x={x}
            y={y3}
            rx={0}
            ry={0}
            width={itemWidth * 0.6}
            height={height3}
          />
        </>
      );

      if (i === row) {
        height = y3 + height3;
      }
    }
  }

  return (
    <ContentLoader
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      {...props}
    >
      {heading && (
        <rect
          x={padding}
          y={padding}
          rx={0}
          ry={0}
          width={heading.width}
          height={heading.height}
        />
      )}
      {list}
    </ContentLoader>
  );
};

LandingPageLoader.metadata = {
  name: "I am Doong - I come from Việt Nam",
  github: "toiladoong",
  description: "CatalogMagic",
  filename: "CatalogMagic",
};

export default LandingPageLoader;
