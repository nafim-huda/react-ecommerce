import styled, { css } from 'styled-components'

const subColor = 'grey';
const mainColor = 'black';

/* 
  When thinking about the order of declaring styled components ->
  think in terms of declaring first what will be rendered within a nested 
  styled component 
  ex.) We need to define the FormInputLabel styled component first since
  we will reference it within the Input styled component
*/


const shrinkLabelStyles = css `
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  // when there is a valid shrink value passed in as a prop -> render shrinkLabelStyles css component
  ${({shrink}) => shrink && shrinkLabelStyles}
`;

export const Input = styled.input`
   background: none;
    background-color: white;
    color: ${subColor};
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${subColor};
    margin: 25px 0;

    &:focus {
      outline: none
    }
    // when we focus on an input, we want to find nearest sibling to target
    &:focus ~ ${FormInputLabel} {
     ${shrinkLabelStyles};
    }
`;

export const Group = styled.div`
  position: relative;
  margin: 45px 0;

  input[type='password'] {
  letter-spacing: 0.3em;
  }
`;

