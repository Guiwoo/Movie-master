import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import styled from "styled-components";
import { homeVideo } from "../../api";
import React, { useEffect, useState } from "react";

const SBanner = styled.div<{ bgPhoto: string }>`
  height: 99vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: 600;
`;
const OverView = styled.span`
  font-size: 18px;
  font-weight: 500;
  background-color: black;
  border-radius: 10px;
  padding: 2px 5px;
  display: flex;
  width: 40%;
`;

const YouTube = styled.iframe`
  width: 100vw;
  height: 99vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: -80px;
  left: 0;
`;
const VideoBox = styled.div`
  z-index: 10;
  position: relative;
  padding-top: 25px;
  padding-bottom: 56.25%;
`;
const VideoInfo = styled.div`
  position: absolute;
  z-index: 11;
  top: 58%;
  left: 1%;
`;

const VideoTitle = styled(Title)`
  font-size: 38px;
  background-color: black;
  border-radius: 10px;
  padding: 2px 5px;
  display: flex;
  width: 40%;
`;

type BannerProps = {
  title: string;
  overview: string;
  id: number;
  bgPhoto: string;
};

const Banner: React.FC<BannerProps> = ({ title, overview, id, bgPhoto }) => {
  const { data, isLoading } = useQuery(["video", id], () => homeVideo(id));
  const onPlayBtn = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const frames = document.querySelector("iframe");
    const videos = document.querySelector("video");
    console.log(frames?.contentWindow?.document.querySelector("video"));
  };
  let moveTrack: any = null;
  const [move, setMove] = useState(false);
  const mouseMoving = () => {
    if (move) {
      clearTimeout(moveTrack);
      setTimeout(() => {
        setMove(false);
      }, 5000);
    }
    setMove(true);
    moveTrack = setTimeout(() => {
      setMove(false);
    }, 5000);
  };
  return (
    <>
      {isLoading ? (
        <SBanner bgPhoto={bgPhoto}>
          <Title>{title}</Title>
          <OverView>{overview}</OverView>
        </SBanner>
      ) : (
        <>
          <VideoBox>
            <YouTube
              onMouseMove={mouseMoving}
              style={{ pointerEvents: "auto" }}
              src={`https://www.youtube.com/embed/${data?.results[0].key}?controls=1&rel=0&autoplay=1&mute=1&enablejsapi=1&loop=1&playlist=${data?.results[0].key}`}
              allow="autoplay"
              allowFullScreen
            ></YouTube>
          </VideoBox>
          <VideoInfo onMouseUp={mouseMoving} style={{ marginBottom: "200px" }}>
            {move ? (
              <>
                <VideoTitle>{title}</VideoTitle>
                <OverView>{overview}</OverView>
              </>
            ) : null}
          </VideoInfo>
        </>
      )}
    </>
  );
};

export default Banner;
