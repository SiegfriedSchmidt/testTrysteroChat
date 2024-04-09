import React, {FC} from 'react';
import styled from "styled-components";

interface CheckboxWithLabelParams {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 1rem;

    p {
        font-size: 15pt;
    }
    
    input {
        width: 20px;
        height: 20px;
    }
`

const CheckboxWithLabel: FC<CheckboxWithLabelParams> = ({label, checked, onChange}) => {
  return (
    <StyledDiv>
      <p>{label}</p>
      <input defaultChecked={checked} onChange={(e) => onChange(e.target.checked)} type='checkbox'/>
    </StyledDiv>
  );
};

export default CheckboxWithLabel;