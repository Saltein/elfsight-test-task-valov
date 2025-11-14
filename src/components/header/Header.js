import styled from 'styled-components';
import { Logo } from './Logo';
import { FilterPanel } from '..';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <FilterPanel />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1520px) {
    flex-direction: column;
  }
`;
