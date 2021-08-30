import Users from "./../src/components/Users/index";
import styled from "styled-components";

export default function Countries() {
  return (
    <MainWrapper>
      <Users />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  margin: 10px;
`;
