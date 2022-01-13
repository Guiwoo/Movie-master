import { useParams } from "react-router";

const Coin = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <h1>Coin</h1>
    </>
  );
};

export default Coin;
