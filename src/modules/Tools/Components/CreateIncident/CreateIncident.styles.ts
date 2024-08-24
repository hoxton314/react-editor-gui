import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1000px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin-top: 32px;
  margin-left: auto;
  margin-right: auto;

  button {
    align-self: flex-end;
  }

  label {
    color: inherit;
  }
`

export const PeopleOnCallTitle = styled.h2`
  margin-left: auto;
  margin-right: auto;
  color: inherit;
`

export const PeopleOnCallContainer = styled.div`
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const PeopleOnCallRow = styled.div`
  display: flex;
  flex-direction: column;
  color: inherit;
  gap: 8px;

  & > div:first-child {
    font-weight: 700;
  }
`
