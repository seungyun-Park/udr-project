import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoInput from '../components/InfoInput';
import { NavLink, useNavigate } from 'react-router-dom';
import SignUpButton from '../components/SignUpButton';
import axios from 'axios';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #D6CDBE; // 이미지 배경색과 동일하게 설정
`;

const StyledInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &::placeholder {
    color: #bbb; // 글자를 흐리게 설정
  }

`;

const Logo = styled.img`
  width: px; // 기존 크기에서 1.5배 증가
  margin-bottom: 20px;
`;
const LoginTitle = styled.h1`
  margin-bottom: 1px;
  font-family: 'Nunito';
`;

const Description = styled.div`
  display:flex;
  justify-content: center;
  color: #6c6c74;
  font-size: 12px;
`;

const MovePage = styled(NavLink)`
  margin-left: 5px;
  margin-bottom: 8px;
  color: red;
  font-size: 12px;
  text-decoration: none;
`
const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #6c6c74;
  font-size: 12px;
`;

const Checkbox = styled.input`
  margin-right: 5px;
`;

function SignUpPage() {
  const [NickName, setNickName] = useState("");
  const [Id, setID] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Agree, setAgree] = useState(false);

  const onNickNameHandler = (event) => {
    setNickName(event.currentTarget.value);
  }
  const onIDHandler = (event) => {
    setID(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }
  const onAgreeHandler = () => {
    setAgree(!Agree);
  }

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.post('http://localhost:3001/signup', {
      username: NickName,
      userid: Id,
      pw: Password,
      cpw: ConfirmPassword
    });

    if(response.status == 201){
      alert(`가입되었습니다. 아이디를 입력하여 로그인 해주세요! `);
      navigate(`/`);
    }
    else{
      alert(response.status);
      navigate(`/signup`);
    }
  }

  return (
    <Wrapper>
      <Logo src="https://sejong.korea.ac.kr/mbshome/mbs/kr/images/sub/s_img010201_logo1.png" alt="Logo" />
      <form onSubmit={onSubmitHandler} style={{ display: 'flex', flexDirection: 'column' }}>
        <LoginTitle>SignUp</LoginTitle>
        <br />
        <StyledInput 
              type='text' 
              placeholder='닉네임' 
              value={NickName} 
              onChange={onNickNameHandler} 
              onFocus={(e) => e.target.placeholder = ''} 
              onBlur={(e) => e.target.placeholder = '닉네임'}
        />
        <StyledInput 
              type='text' 
              placeholder='아이디' 
              value={Id} 
              onChange={onIDHandler} 
              onFocus={(e) => e.target.placeholder = ''} 
              onBlur={(e) => e.target.placeholder = '아이디'}
        />
        <StyledInput 
              type='text' 
              placeholder='비밀번호' 
              value={Password} 
              onChange={onPasswordHandler} 
              onFocus={(e) => e.target.placeholder = ''} 
              onBlur={(e) => e.target.placeholder = '비밀번호'}
        />
        <StyledInput 
              type='text' 
              placeholder='비밀번호 확인' 
              value={ConfirmPassword} 
              onChange={onConfirmPasswordHandler} 
              onFocus={(e) => e.target.placeholder = ''} 
              onBlur={(e) => e.target.placeholder = '비밀번호 확인'}
        />
        <CheckboxLabel>
          <Checkbox type="checkbox" checked={Agree} onChange={onAgreeHandler} />
          I agree to all the Terms and Privacy Policies
        </CheckboxLabel>
        <SignUpButton
          title="Sign Up"
          onClick={() => { }}
        />
      </form>
      <Description>
        Already have an account?
        <MovePage to="/">
          Login
        </MovePage>
      </Description>
    </Wrapper>
  )
}

export default SignUpPage;