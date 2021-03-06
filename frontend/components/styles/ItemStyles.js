import styled from 'styled-components';

const Item = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offwhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    padding-top: 3px;
    width: 300px;
    margin: auto;
    object-fit: cover;
    cursor: pointer;
  }
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1rem;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border: ${props => props.theme.offwhite};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    text-align: center;
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

export default Item;
