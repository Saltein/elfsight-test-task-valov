import styled from 'styled-components';

export function TextInput({ placeholder }) {
  return <StyledInput placeholder={placeholder} />;
}

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #83bf46;
  background-color: #263750;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 400;
  color: #f5f5f5;
  text-overflow: ellipsis;

  &::placeholder {
    color: #b3b3b3;
  }

  &:hover,
  &:focus {
    background-color: #334466;
    outline: none;
  }
`;
