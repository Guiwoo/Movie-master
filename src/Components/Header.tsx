import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import GuiFlix from "./GuiFlix";

const SHeader = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  height: 80px;
  font-size: 18px;
  color: white;
  padding: 20px 60px;
  font-weight: 600;
  z-index: 99;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: ${(props) => props.theme.red};
  border-radius: 50%;
  bottom: -15px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center; // 어디서 에니메이션 시작하는가?!
  position: absolute;
  right: 0px;
  padding: 7px 10px;
  padding-left: 20px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
  &::placeholder {
    color: white;
  }
  &:focus {
    border: 1px solid blue;
  }
`;

interface IForm {
  keyword: string;
}

const NavVar = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(0,0,0,1)",
  },
};

const Header = () => {
  const HomeMatch = useMatch("/");
  const TvMatch = useMatch("/tv");
  const MovieMatch = useMatch("/movie");
  const [search, setSearch] = useState(false);
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  const toggleSearch = () => {
    if (search) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearch((prev) => !prev);
  };
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY]);
  const navigation = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    navigation(`/search?keyword=${data.keyword}`);
  };
  return (
    <SHeader variants={NavVar} animate={navAnimation} initial={"top"}>
      <Col>
        <GuiFlix />
        <Items>
          <Item>
            <Link to="/">
              Home
              {HomeMatch ? <Circle layoutId="Circle" /> : null}
            </Link>
          </Item>
          <Item>
            <Link to="/movie">
              Movie
              {MovieMatch ? <Circle layoutId="Circle" /> : null}
            </Link>
          </Item>
          <Item>
            <Link to="/tv">
              Tv Shows
              {TvMatch ? <Circle layoutId="Circle" /> : null}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: search ? -205 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Search ..."
          />
        </Search>
      </Col>
    </SHeader>
  );
};

export default Header;
