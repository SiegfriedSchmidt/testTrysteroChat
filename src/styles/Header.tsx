import styled from "styled-components";

const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;

    padding: 18px 40px;
    border-radius: 0;
    background-color: rgba(58, 183, 246, 0.5);

    a {
        text-decoration: none;
        color: black;
    }

    p {
        line-height: 30pt;
        text-align: center;
        vertical-align: middle;
    }

    nav {
        display: flex;
        gap: 0.75rem;
    }
`

export default StyledHeader