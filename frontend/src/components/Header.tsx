import { FC } from "react";
import Navbar from "react-bootstrap/Navbar";
import styled from "styled-components";

const Header: FC = () => {
  const HeroContainer = styled(Navbar.Brand)`
    padding: 0 10px;
    margin: 0 30px;
  `;

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <HeroContainer title="Quiz Pro">Quiz Pro</HeroContainer>
      </Navbar>
    </>
  );
};

export default Header;
