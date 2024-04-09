import React, {FC} from 'react';
import styled from "styled-components";

interface SelectWithLabelParams {
  label: string
  selection: string[]
  default_val: string;
  onChange: (value: string) => void;
}

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 0.5rem;

    p {
        font-size: 15pt;
    }
    
    select {
        font-size: 12pt;
        padding: 0.3rem;
    }
`

const SelectWithLabel: FC<SelectWithLabelParams> = ({label, default_val, selection, onChange}) => {

  return (
    <StyledDiv>
      <p>{label}</p>
      <select onChange={(e) => onChange(e.target.value)} defaultValue={default_val}>
        {selection.map((elem, idx) => <option key={idx}>{elem}</option>)}
      </select>
    </StyledDiv>
  );
};

export default SelectWithLabel;