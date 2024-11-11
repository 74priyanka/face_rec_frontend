import styled from "styled-components";

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bfeaf5;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #f9f9f9; /* Optional: Light background color for the header */

  .logo {
    width: 60px;
    margin: 16px;
    box-sizing: border-box;
  }

  .nav-items {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .nav-items-list {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .nav-items-list > li {
    padding: 10px;
    font-size: 24px;
    font-weight: 600;
  }

  .li-item {
    text-decoration: none;
    color: black;
    transition: color 0.3s;
    padding: 8px 12px;
    border-radius: 5px;
  }

  .li-item:hover {
    color: #007bff;
    background-color: #f1f1f1; /* Light background on hover */
  }

  .logout-btn {
    text-decoration: none;
    background-color: #eafdfc;
    color: black;
    border: none;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
  }

  .logout-btn:hover {
    background-color: #e0f7f9;
    color: #007bff;
  }
`;

// Optional styles for Modal if needed
export const ModalContent = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  max-width: 500px;
  margin: auto;
  text-align: center;

  .modal-close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #aaa;
    transition: color 0.3s;
  }

  .modal-close-button:hover {
    color: black;
  }
`;
