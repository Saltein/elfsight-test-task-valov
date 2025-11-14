import { useEffect, useState } from 'react';
import styled from 'styled-components';

export function TextInput({ placeholder }) {
  const [currentText, setCurrentText] = useState();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCurrentText(params.get(placeholder));
  }, [placeholder]);

  function onChange(e) {
    const value = e.target.value;
    const params = new URLSearchParams(window.location.search);
    if (e.target.value) {
      params.set(placeholder, value);
    } else {
      params.delete(placeholder);
    }

    window.history.replaceState({}, '', `?${params.toString()}`);
    setCurrentText(value);
  }

  return (
    <StyledInput
      placeholder={placeholder}
      value={currentText}
      onChange={onChange}
    />
  );
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
