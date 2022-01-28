import { useQuery } from "react-query";
import styled from "styled-components";
import { homeVideo } from "../../api";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { trimText } from "../../utils";
import { motion } from "framer-motion";

const SBanner = styled.div<{ bgPhoto: string }>`
  height: 77vh;
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
  border-radius: 10px;
  padding: 2px 5px;
  display: flex;
  width: 40%;
  margin-bottom: 20px;
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
  position: relative;
  padding-top: 25px;
  padding-bottom: 50%;
`;

const VideoTitle = styled(Title)`
  font-size: 38px;
  text-shadow: 0 0 5px black;
  border-radius: 10px;
  padding: 2px 5px;
  display: flex;
  width: 40%;
`;

const DetailBox = styled(motion.div)`
  cursor: pointer;
  font-size: 24px;
  max-width: 10%;
  background-color: ${(props) => props.theme.black.lighter};
  text-align: center;
  border-radius: 7px;
  padding: 5px 3px;
`;
const LinkToYoutube = styled.a`
  font-size: 24px;
  max-width: 10%;
  background-color: ${(props) => props.theme.black.lighter};
  text-align: center;
  border-radius: 7px;
  padding: 5px 3px;
  cursor: pointer;
`;

type BannerProps = {
  title: string;
  overview: string;
  id: number;
  bgPhoto: string;
  onBoxClicked: (id: number) => void;
};

const Banner: React.FC<BannerProps> = ({
  title,
  overview,
  id,
  bgPhoto,
  onBoxClicked,
}) => {
  const { data } = useQuery(["video", id], () => homeVideo(id));
  const [showPoster, setShowPoster] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowPoster(true);
    }, 5000);
    return clearTimeout();
  }, []);
  return (
    <>
      {showPoster ? (
        <SBanner bgPhoto={bgPhoto}>
          <VideoTitle>{title}</VideoTitle>
          <OverView>{trimText(overview)}</OverView>
          <div style={{ display: "flex" }}>
            <LinkToYoutube
              style={{ marginRight: "10px" }}
              href={`https://www.youtube-nocookie.com/embed/${data?.results[0].key}?&autoplay=1&mute=1`}
              target="_blank"
            >
              <FontAwesomeIcon icon={faPlay} style={{ marginRight: "10px" }} />
              <span>재생</span>
            </LinkToYoutube>
            <DetailBox layoutId={id + ""} onClick={() => onBoxClicked(id)}>
              <FontAwesomeIcon
                icon={faExclamationCircle}
                style={{ marginRight: "10px" }}
              />
              <span>상세정보</span>
            </DetailBox>
          </div>
        </SBanner>
      ) : (
        <VideoBox>
          <YouTube
            style={{ pointerEvents: "auto" }}
            src={`https://www.youtube-nocookie.com/embed/${data?.results[0].key}?controls=0&rel=0&autoplay=1&mute=1&enablejsapi=1&playlist=${data?.results[0].key}`}
            allow="autoplay"
            allowFullScreen
          ></YouTube>
        </VideoBox>
      )}
    </>
  );
};

export default Banner;
