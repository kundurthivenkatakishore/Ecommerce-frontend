import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import {useSelector,useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import {logout} from "../redux/userRedux"
import { Logout } from "@mui/icons-material";
import Popup from "reactjs-popup";
import { AccountCircle } from "@material-ui/icons";


const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
  text-decoration:none;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 15px;
  display:flex;
  flex-direction:row;
  align-items:center;
  text-align:center;
  cursor: pointer;
  margin-left: 15px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Button=styled.div`
  padding:5px;
  margin:5px;
  background-color:lightblue;
  color:black
`

const Navbar = () => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const quantity=useSelector(state=>state.cart.quantity)
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  

  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo ><Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">E-SHOP</span>
        </Link></Logo>
        </Center>
        <Right>
        {/* {!user && (
            <>
                <MenuItem><Link to="/register">REGISTER</Link></MenuItem>
                <MenuItem><Link to="/login">SIGN IN</Link></MenuItem>
            </>
          )}
          {user && (
            <>
            <MenuItem>
              <div
                onClick={() => setShowPopup((prev) => !prev)}
                className="relative cursor-pointer ml-[5px] border  space-x-2 rounded p-1 flex row justify-between items-center"
              >
                <AccountCircle className="w-8 h-8" />
                <div className="text-[20px] sm:text-[20px] tracking-wide">
                  {user?.username.toUpperCase()}
                </div>
                
                <div
                  onClick={handleLogout}
                  className={`bg-white absolute bottom-[-50px] ${
                    showPopup && 'opacity-0'
                  } z-[1] p-0 rounded-md flex items-center
                  transition duration-300 ease-in-out `}
                >
                  <Logout className="h-[10px]"/>
                  <button className="bg-white p-0 border ">
                    LOGOUT
                  </button>
                </div>
              </div>
              </MenuItem>
            </>
          )} */}
          {user ? <Button onClick={handleLogout} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ cursor:"pointer" }}>{user.username} {isHovering && <p>Logout</p>}</Button> : (
          <div>
            <MenuItem>
            <Button><Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>
          <span>Register</span>
        </Link></Button>
            <Button><Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
          <span>Signin</span>
        </Link></Button>
        </MenuItem>
          </div>
          
        )}
          <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;