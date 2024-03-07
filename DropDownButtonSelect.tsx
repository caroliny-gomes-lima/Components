import React from "react";
import { useTransition, animated } from "@react-spring/web";
import styled from "styled-components";

const ImageContiner = styled.div(() => {
  return {
    justifyContent: "center",
    width: "140vh",
    height: "79vh",
  };
});

const Image = styled.img(() => {
  return {
    alignSelf: "center",
    height: "auto",
    width: "100%",
    marginLeft: "20px",
    marginRight: "20px",
  };
});

interface Props {
  imagesArrayData: Array<{id: number, src: string}>
}

function SliderImages({ imagesArrayData }: Props): JSX.Element {
  const [index, setIndex] = React.useState<number>(0);

  React.useEffect(() => {
    const slideInterval = setInterval(() => {
      setIndex((i) => (i + 1) % imagesArrayData.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  const transition = useTransition(imagesArrayData[index].src, {
    from: { opacity: 0, transform: "translateX(250px)" },
    enter: { opacity: 1, transform: "translateX(-20px)" },
  });

  const fragment = transition((style, item) => (
    <ImageContiner>
      <animated.div style={{ ...style}}>
        <Image src={item} />
      </animated.div>
    </ImageContiner>
  ));

  return <div>{fragment}</div>;
}

export default SliderImages;
