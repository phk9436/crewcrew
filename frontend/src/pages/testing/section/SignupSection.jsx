/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable indent */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import Button from '../../../components/common/Button';
import Textfield from '../../../components/common/TextfieldEmail';
import TextfieldSU from './SignupTextfield';
import TextfieldPW from '../../../components/common/TextfieldPW';
import delImage from '../../../assets/images/InputDel.png';
import Progress from './Progress';
import {
  sectionProgress1,
  nameState,
  emailIdState,
  emailState,
  codeState,
  passwordState,
} from '../../../atom/register';

const emailList = ['naver.com', 'gmail.com', 'daum.net', 'hanmail.net'];

function SignupSection({ IsClick, HandleClick }) {
  const [name, setName] = useRecoilState(nameState);
  const [nameValid, setNameValid] = useState(true);
  const [nameValidMsg, setNameValidMsg] = useState('이름을 입력해주세요');

  const [emailId, setEmailId] = useRecoilState(emailIdState);
  const [emailIdValid, setEmailIdValid] = useState(true);

  const [email, setEmail] = useRecoilState(emailState);
  const [emailValid, setEmailValid] = useState(true);
  const [emailValidMsg, setEmailValidMsg] = useState('가입할 이메일 주소를 입력해주세요');

  const [code, setCode] = useRecoilState(codeState);
  const [codeValid, setCodeValid] = useState(true);
  const [codeValidMsg, setCodeValidMsg] = useState('코드 전송 후, 입력창에 코드를 입력해주세요');

  const [password, setPassword] = useRecoilState(passwordState);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordValidMsg, setPasswordValidMsg] = useState('숫자/영문/특수문자 포함 8~20글자');

  const [IDFocus, setIDFocus] = useState(false);
  const [EmailFocus, setEmailFocus] = useState(false);
  const [CodeFocus, setCodeFocus] = useState(false);
  const [ProgressF, setProgressF] = useRecoilState(sectionProgress1);

  const [SendCode, setSendCode] = useState(false);
  const [CodeActive, setCodeActive] = useState(false);
  const [CodeComplete, setCodeComplete] = useState(false);
  const [StepActive, setStepActive] = useState(false);

  const EmailRef = useRef(null);
  const MailListRef = useRef(null);

  const HandleNameChange = useCallback((e) => {
    setName(e.target.value);
    if (e.target.value.length >= 2) {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  }, []);

  const HandleNameDelete = useCallback(() => {
    setName('');
    setNameValid(false);
  }, []);

  const HandleEmailIdChange = useCallback((e) => {
    setEmailId(e.target.value);
    if (e.target.value.length >= 5) {
      setEmailIdValid(false);
    } else {
      setEmailIdValid(true);
    }
  }, []);

  const HandleEmailIdDelete = useCallback((e) => {
    setEmailId('');
    setEmailIdValid(false);
  }, []);

  const HandleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
    if (e.target.value.length >= 5) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  }, []);

  const HandleEmailDelete = useCallback(() => {
    setEmail('');
    setEmailValid(false);
  }, []);

  const HandleCodeChange = (e) => {
    setCode(e.target.value);
    if (e.target.value.length >= 5) {
      setCodeValid(false);
    } else {
      setCodeValid(true);
    }
  };

  const HandleCodeDelete = useCallback(() => {
    setCode('');
    setCodeValid(false);
  }, []);

  const HandlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };

  const HandlePasswordDelete = useCallback(() => {
    setPassword('');
    setPasswordValid(false);
  }, []);

  const HandleInputFocus = useCallback(() => {
    setEmailFocus(true);
    const MailListLength = emailList.length;
    MailListRef.current.style.height = `${58 + 29 * MailListLength}px`;
  }, []);

  const HandleInputBlur = useCallback(() => {
    setEmailFocus(false);
    MailListRef.current.style.height = '50px';
  }, []);

  const ClickMailList = useCallback((e, m) => {
    e.preventDefault();
    setEmail(m);
    setEmailValid(false);
    EmailRef.current.blur();
  }, []);

  const CheckProgressF = useCallback(
    (index) => {
      const Check = ProgressF.map((p) => {
        if (p.index === index) {
          return {
            ...p,
            check: 1,
          };
        }
        return p;
      });
      setProgressF([...Check]);
    },
    [ProgressF],
  );

  const NotCheckProgressF = useCallback(
    (index) => {
      const Check = ProgressF.map((p) => {
        if (p.index === index) {
          return {
            ...p,
            check: 0,
          };
        }
        return p;
      });
      setProgressF([...Check]);
    },
    [ProgressF],
  );

  const CodeButtonTextRender = useCallback(() => {
    if (CodeComplete) {
      return '인증완료';
    }
    if (SendCode) {
      return '코드 재전송';
    }
    return '코드 전송';
  }, [CodeComplete, SendCode]);

  const HandleNextStep = useCallback(() => {
    if (!StepActive) {
      return 0;
    }
    HandleClick(2);
  }, [StepActive]);

  useEffect(() => {
    if (name.length >= 2 && !nameValid) {
      CheckProgressF(0);
    } else {
      NotCheckProgressF(0);
    }
  }, [nameValid, name]);

  useEffect(() => {
    if (emailId.length >= 5 && !emailIdValid && email.length >= 5 && !emailValid) {
      setCodeActive(true);
      CheckProgressF(1);
    } else {
      NotCheckProgressF(1);
      setCodeActive(false);
    }
  }, [emailIdValid, emailId, emailValid, email]);

  useEffect(() => {
    if (code.length >= 5 && !codeValid) {
      CheckProgressF(2);
    } else {
      NotCheckProgressF(2);
    }
  }, [codeValid, code]);

  useEffect(() => {
    if (password.length >= 8 && !passwordValid) {
      CheckProgressF(3);
    } else {
      NotCheckProgressF(3);
    }
  }, [password, passwordValid]);

  useEffect(() => {
    const stepComplete = ProgressF.filter((p) => p.check === 1).length;
    if (stepComplete >= 4) {
      setStepActive(true);
    } else {
      setStepActive(false);
    }
  }, [ProgressF]);

  useEffect(() => {
    if (IsClick === 0) {
      setName('');
      setEmailId('');
      setCode('');
      setEmail('');
      setPassword('');
      setCodeActive(false);
      setProgressF([
        {
          index: 0,
          check: 0,
        },
        {
          index: 1,
          check: 0,
        },
        {
          index: 2,
          check: 0,
        },
        {
          index: 3,
          check: 0,
        },
      ]);
    }
  }, [IsClick]);

  return (
    <SignupContents active={IsClick === 1}>
      <InputList>
        <InputLi>
          <Textfield
            type="text"
            onChange={HandleNameChange}
            value={name}
            label="이름"
            validMessage={nameValidMsg}
            valid={false}
            onDelete={HandleNameDelete}
          />
        </InputLi>
        <InputLi>
          <ListFlex>
            <div>
              <TextfieldSU
                type="text"
                onChange={HandleEmailIdChange}
                value={emailId}
                label="이메일"
                validMessage=""
                valid={false}
                onDelete={HandleEmailIdDelete}
                setFocus={setIDFocus}
              />
            </div>
            <MailList>
              <MailUList active={EmailFocus || !!email} ref={MailListRef}>
                <div>
                  <InputMail
                    type="text"
                    id="SignEmailDomain"
                    autoComplete="off"
                    placeholder="examle.com"
                    onFocus={HandleInputFocus}
                    onBlur={HandleInputBlur}
                    onChange={HandleEmailChange}
                    ref={EmailRef}
                    TextIn={!!email}
                    value={email}
                    active={EmailFocus || !!email}
                  />
                  <LabelMail htmlFor="SignEmailDomain" active={EmailFocus || !!email}>
                    @
                  </LabelMail>
                  <InputDel
                    onMouseDown={(e) => {
                      e.preventDefault();

                      HandleEmailDelete();
                      EmailRef.current.focus();
                    }}
                    TextIn={!!email}
                  />
                </div>
                {emailList.map((m) => (
                  <li key={m} onMouseDown={(e) => ClickMailList(e, m)}>
                    <p>{m}</p>
                  </li>
                ))}
              </MailUList>
            </MailList>
          </ListFlex>
          <InputText Focused={EmailFocus || IDFocus}>{emailValidMsg}</InputText>
        </InputLi>
        <InputLi>
          <ListFlex>
            <div>
              <TextfieldSU
                type="text"
                onChange={HandleCodeChange}
                value={code}
                label="코드입력"
                validMessage=""
                valid={false}
                onDelete={HandleCodeDelete}
                setFocus={setCodeFocus}
              />
            </div>
            <div>
              <Button size="fullregular" color="darkblue" disabled={!CodeActive}>
                {CodeButtonTextRender()}
              </Button>
            </div>
          </ListFlex>
          <InputText Focused={CodeFocus}>{codeValidMsg}</InputText>
        </InputLi>
        <InputLi>
          <TextfieldPW
            onChange={HandlePasswordChange}
            value={password}
            label="비밀번호"
            validMessage={passwordValidMsg}
            valid={false}
            onDelete={HandlePasswordDelete}
          />
        </InputLi>
      </InputList>
      <ButtonWrap>
        <Button size="fullregular" color="darkblue" disabled={!StepActive} onClick={HandleNextStep}>
          다음 단계로!
        </Button>
      </ButtonWrap>
      <Progress />
    </SignupContents>
  );
}

export default SignupSection;

const FadeIn = keyframes`
    from{
        opacity:0;
    } to {
        opacity:1;
    }
`;

const SignupContents = styled.div`
  transition: 0.5s;
  display: none;

  animation-duration: 0.5s;
  animation-timing-function: ease-out;

  animation-fill-mode: forwards;

  ${(props) =>
    props.active &&
    css`
      display: block;
      animation-name: ${FadeIn};
    `}
`;

const InputList = styled.ul`
  overflow-y: auto;
  overflow-x: hidden;
  height: 320px;
  box-sizing: content-box;
  padding: 25px 0 20px;
  scroll-behavior: smooth;
  @media screen and (max-width: 768px) {
    height: calc(100vh - 393px);
  }
`;

const InputLi = styled.li`
  position: relative;
  height: 75px;
`;

const ButtonWrap = styled.div`
  display: inline-block;
  width: 100%;
  margin: 30px 0 10px;
  @media screen and (max-width: 768px) {
    margin-top: 15px;
  }
`;

const ListFlex = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  & > div {
    width: 100%;
    margin-right: 10px;
  }

  & > div:last-child {
    margin-right: 0;
  }
`;

const MailList = styled.div`
  z-index: 1;
  position: relative;
  height: 75px;
`;

const MailUList = styled.ul`
  width: 100%;
  border: 1px solid #e2e2e2; // black5
  border-radius: 10px;
  height: 50px;
  transition: height 0.5s;
  overflow: hidden;
  background-color: #fff;

  &:hover {
    border: 1px solid #000; // black1

    ${(props) =>
      props.active &&
      css`
        border: 1px solid #00b7ff;
      `}
  }

  ${(props) =>
    props.active &&
    css`
      border: 1px solid #00b7ff;
    `}

  li {
    width: 100%;
    cursor: pointer;
    box-sizing: content-box;

    &:first-child {
      height: 50px;

      &::after {
        content: '';
        display: block;
        height: 1px;
        width: calc(100% - 24px);
        background-color: #e2e2e2;
        margin: 0 auto;
      }
    }

    &:not(:first-child) {
      height: 21px;
      padding: 8px 36px 0;
      padding-right: 0;
    }

    &:hover p {
      background-color: #00b7ff;
      color: #fff;
    }

    p {
      width: fit-content;
      padding: 2px 4px;
      border-radius: 4px;
      font-size: 13px;
      color: #000;
      transition: 0.2s;
    }
  }
`;

const InputMail = styled.input`
  padding: 15px 37px 17px;
  width: 100%;
  border: none;
  outline: none;
  box-sizing: border-box;
  font-size: 13px;
  line-height: 1;

  ${(props) =>
    props.active &&
    css`
      caret-color: #00b7ff;
    `}
`;

const LabelMail = styled.label`
  position: absolute;
  font-size: 13px;
  line-height: 13px;
  top: 18px;
  left: 16px;
  color: #e2e2e2;
  transition: 0.5s;
  user-select: none;

  ${(props) =>
    props.active &&
    css`
      color: #00b7ff;
    `}
`;

const InputDel = styled.i`
  width: 18px;
  height: 18px;
  background-image: url(${delImage});
  background-size: 100%;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 15px;
  display: none;
  user-select: none;

  ${(props) =>
    props.TextIn &&
    css`
      display: block;
    `};
`;

const InputText = styled.div`
  font-size: 10px;
  text-align: center;
  font-weight: 300;
  position: absolute;
  width: 100%;
  top: 50px;
  opacity: 0;
  transition: 0.5s;
  user-select: none;

  ${(props) =>
    props.Focused &&
    css`
      opacity: 1;
      top: 54px;
      color: #00b7ff;
    `};
  ${(props) =>
    props.Valid &&
    css`
      color: #ff0045;
    `}
`;
