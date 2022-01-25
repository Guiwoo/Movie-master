import { useQuery } from "react-query";
import styled from "styled-components";
import { homeVideo } from "../../api";

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
  font-size: 22px;
  width: 50%;
`;

type BannerProps = {
  title: string;
  overview: string;
  id: number;
  bgPhoto: string;
};

const Banner: React.FC<BannerProps> = ({ title, overview, id, bgPhoto }) => {
  const { data, isLoading } = useQuery(["video", id], () => homeVideo(id));
  if (data) {
    console.log(data?.results[0].key);
  }
  return (
    <SBanner bgPhoto={bgPhoto}>
      <Title>{title}</Title>
      <OverView>{overview}</OverView>
    </SBanner>
  );
};

export default Banner;
