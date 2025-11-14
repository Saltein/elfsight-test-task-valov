import styled from 'styled-components';
import { Button, SelectInput, TextInput } from './common';
import { useData } from './providers';

export function FilterPanel() {
  const {
    statuses,
    genders,
    species,
    setFilters,
    setActivePage,
    setApiURL,
    API_URL
  } = useData();

  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    let paramsObject = '';

    params.forEach((value, key) => {
      paramsObject += `&${key.toLowerCase()}=${value}`;
    });

    return paramsObject.toString();
  }

  function handleApply() {
    const params = getUrlParams();
    setActivePage(0);
    setApiURL(API_URL);
    setFilters(params);
  }

  function handleReset() {
    setActivePage(0);
    setApiURL(API_URL);
    setFilters('');
  }

  return (
    <StyledFilter>
      <SelectInput
        options={statuses}
        filter={'Status'}
        placeholder={'Status'}
      />
      <SelectInput options={genders} filter={'Gender'} placeholder={'Gender'} />
      <SelectInput
        options={species}
        filter={'Species'}
        placeholder={'Species'}
      />

      <TextInput placeholder={'Name'} />
      <TextInput placeholder={'Type'} />
      <Container>
        <Button name={'Apply'} onClick={handleApply} />
        <Button name={'Reset'} variant="red" onClick={handleReset} />
      </Container>
    </StyledFilter>
  );
}

const StyledFilter = styled.div`
  display: grid;
  width: 560px;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 1520px) {
    width: 482px;
    gap: 15px;
  }

  @media (max-width: 530px) {
    width: 240px;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 1fr;
  }
`;

const Container = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 530px) {
    flex-direction: column;
    gap: 15px;
  }
`;
