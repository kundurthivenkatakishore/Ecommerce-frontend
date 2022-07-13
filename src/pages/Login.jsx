import { useState,useCallback } from "react";
import styled from "styled-components";
import {mobile} from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://www.liveabout.com/thmb/FkQ7RaPHL1yI0uCqkgDR9IWHoBc=/1887x1415/smart/filters:no_upscale()/GettyImages-487149250-58c71e5b3df78c353c0577eb.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align:center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #6495ED;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    color:green,
    cursor:not-allowed;
  }
`;

// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 12px;
//   text-decoration: underline;
//   cursor: pointer;
// `;

const Error=styled.span`
  color:red;    
`
const SUggestion=styled.span`
  color:blue;
`

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      login(dispatch, { username, password });
    },
    [username, password]
    
  );

  if (currentUser) {
    navigate('/');
    return null;
  }



  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button
            onClick={handleLogin}
            disabled={isFetching}
          >LOGIN</Button>
          {error && <Error>Something went wrong..</Error>}
          <SUggestion>Doesn't have account</SUggestion> 
          <Link to="/register">Register</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
