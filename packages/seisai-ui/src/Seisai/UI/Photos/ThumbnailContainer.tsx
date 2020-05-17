import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  box-sizing: content-box;
  position: relative;
  width: 100%;
  margin-bottom: 0.8em;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const ThumbnailContainer: FC = ({ children }) => (
  <Wrapper>
    <Container>{children}</Container>
  </Wrapper>
);