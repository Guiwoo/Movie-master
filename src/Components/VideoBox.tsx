import styled from "styled-components";

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
const SVideoBox = styled.div`
  position: relative;
  padding-top: 25px;
  padding-bottom: 50%;
`;

type VideoBoxId = {
  videoId: string;
};

const VideoBox = ({videoId}: VideoBoxId) => {
  return (
    <SVideoBox>
      <YouTube
        style={{pointerEvents: "auto"}}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?controls=0&rel=0&autoplay=1&mute=1&enablejsapi=1&playlist=${videoId}`}
        allow="autoplay"
        allowFullScreen
      ></YouTube>
    </SVideoBox>
  );
};

export default VideoBox;
