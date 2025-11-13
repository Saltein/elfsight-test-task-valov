import styled from 'styled-components';
import { Button, SelectInput, TextInput } from './common';

const genderList = [
  {
    name: 'Мужчина',
    value: 'Male'
  },
  {
    name: 'Женщина',
    value: 'Female'
  },
  {
    name: 'Неизвестно',
    value: 'Unknown'
  }
];

export function FilterPanel() {
  return (
    <StyledFilter>
      <TextInput placeholder={'Name'} />
      <SelectInput options={genderList} filter={'gender'} />
      <SelectInput options={genderList} filter={'пол'} />
      <Container>
        <Button name={'Apply'} />
        <Button name={'Reset'} variant="red" />
      </Container>
    </StyledFilter>
  );
}

const StyledFilter = styled.div``;

const Container = styled.div`
  display: flex;
`;
