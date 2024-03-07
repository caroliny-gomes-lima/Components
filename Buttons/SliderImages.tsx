import React from "react";
import Styles from "../styles/Styles";
import { useTransition, animated } from "@react-spring/web";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    justifyContent: "center",
    width: "140vh",
    height: "79vh",
  },
  Image: {
    alignSelf: "center",
    height: "auto",
    width: "100%",
    marginLeft: "20px",
    marginRight: "20px",
  }
});

interface Props {
  imagesArrayData: Array<{id: number, src: string}>
}

function SliderImages({ imagesArrayData }: Props): JSX.Element {
  const [index, setIndex] = React.useState<number>(0);
  const classes = useStyles();

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
    <div className={classes.container}>
      <animated.div style={{ ...style}}>
      <img className={classes.Image} alt="" src={item} />
      </animated.div>
    </div>
  ));

  return <div>{fragment}</div>;
}

export default SliderImages;
