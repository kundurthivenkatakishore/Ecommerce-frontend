import styled from "styled-components";
import { mobile } from "../responsive";
import { useState,useCallback } from "react";
import { useDispatch,useSelector} from "react-redux";
import {register} from "../redux/apiCalls"
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man-model-wearing-jeans-clothes-fashion-man_158538-5025.jpg?w=2000")
      center;
  background-size: cover;
  display: flex;
  flex-direction:column;
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
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction:column;
`;

const Input = styled.input`
  flex: 1;
  width:80%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #6495ED;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleRegister = useCallback(
    (e) => {
      e.preventDefault();
      register(dispatch, { username, email, password });
      navigate("/login");
    },
    [username, password, email]
  );
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
          <Input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Input type="password" placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleRegister}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
