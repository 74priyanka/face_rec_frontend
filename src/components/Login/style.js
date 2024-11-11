import styled from "styled-components";

export const StyledLogin = styled.div`
  body {
    font-family: Arial, sans-serif;
    background: #b6eeff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }

  .container {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }

  h2 {
    text-align: center;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }

  button {
    background-color: #007bff;
    color: #ffffff;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #0056b3;
  }

  .signup-link {
    text-align: center;
    margin-top: 15px;
  }

  .signup-link a {
    color: #007bff;
    text-decoration: none;
  }

  .signup-link a:hover {
    text-decoration: underline;
  }
`;
