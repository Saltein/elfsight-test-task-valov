import styled from 'styled-components';

export function Button({ name, variant = 'green' }) {
  return <StyledButton variant={variant}>{name}</StyledButton>;
}

const StyledButton = styled.button`
  width: 100%;
  height: 40px;
  border: 1px solid
    ${(props) => (props.variant === 'red' ? '#FF5152' : '#83bf46')};
  border-radius: 8px;
  color: ${(props) => (props.variant === 'red' ? '#FF5152' : '#83bf46')};
  background-color: transparent;
  font-weight: 400;
  font-size: 16px;

  &:hover {
    color: white;
    background-color: ${(props) =>
      props.variant === 'red' ? '#FF5152' : '#83bf46'};
  }
`;
