import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from '../../assets/icons/dropdown-arrow.svg';
import { ReactComponent as CrossIcon } from '../../assets/icons/cross.svg';
import { useEffect, useRef, useState } from 'react';

export function SelectInput({ filter, options, placeholder = 'Select' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(null);
  const optionsRef = useRef(null);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  function handleSelect(option) {
    setCurrentOption(option);
    setIsOpen(false);

    const params = new URLSearchParams(window.location.search);
    if (option?.value) {
      params.set(filter, option.value);
    } else {
      params.delete(filter);
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }

  function handleClear(e) {
    e.stopPropagation();
    setCurrentOption(null);

    const params = new URLSearchParams(window.location.search);
    params.delete(filter);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCurrentOption(options.find((item) => item.value === params.get(filter)));
  }, [filter, options]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Wrapper ref={optionsRef}>
      <StyledSelect onClick={handleToggle}>
        {currentOption ? (
          <span>{currentOption?.name}</span>
        ) : (
          <StyledPlaceholder>{placeholder}</StyledPlaceholder>
        )}

        {currentOption && !isOpen ? (
          <StyledCrossIcon onClick={handleClear} />
        ) : (
          <StyledArrowIcon isOpen={isOpen} />
        )}
      </StyledSelect>
      {isOpen && (
        <ListWrapper>
          <OptionList>
            {options.map((option, index) => {
              return (
                <Option
                  key={index + option}
                  onClick={() => {
                    handleSelect(option);
                  }}
                  value={option?.value}
                  currentOptionValue={currentOption?.value}
                >
                  {option?.name}
                </Option>
              );
            })}
          </OptionList>
        </ListWrapper>
      )}
    </Wrapper>
  );
}

const StyledPlaceholder = styled.span`
  color: #b3b3b3;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelect = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 1px solid #83bf46;
  background-color: #263750;
  border-radius: 8px;
  padding: 0 32px 0 16px;
  font-size: 16px;
  font-weight: 400;
  color: #f5f5f5;
  text-overflow: ellipsis;
  appearance: none;

  &:hover,
  &:focus {
    background-color: #334466;
    outline: none;
  }
`;

const ListWrapper = styled.div`
  position: absolute;
  background-color: white;
  width: 100%;
  height: fit-content;
  padding-right: 2px;

  top: 44px;
  left: 0;

  border: 1px solid #d9d9d9;
  border-radius: 8px;
  box-shadow: 0 1px 4px #0c0c0d0d;

  z-index: 1000;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: calc(35px * 5);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 4px;
  }
`;

const Option = styled.div`
  color: #1e1e1e;
  font-size: 16px;
  font-weight: ${(props) =>
    props?.value === props.currentOptionValue ? '600' : '400'};
  padding: 8px;

  &:hover {
    background-color: #83bf4633;
  }
`;

const StyledArrowIcon = styled(ArrowIcon)`
  color: ${(props) => (props.isOpen ? 'white' : '#b2b2b2')};
  width: 16px;
  height: 16px;
  position: absolute;
  top: calc(50% - 8px);
  right: 12px;
  pointer-events: none;
  transform: rotate(${(props) => (props.isOpen ? '180deg' : '0')});
`;

const StyledCrossIcon = styled(CrossIcon)`
  color: white;
  width: 16px;
  height: 16px;
  position: absolute;
  top: calc(50% - 8px);
  right: 12px;

  &:hover {
    color: #83bf46;
  }
`;
