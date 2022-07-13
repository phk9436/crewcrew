import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import LogInCheckOff from '@/assets/images/LogInCheck_off.png';
import LogInCheckOn from '@/assets/images/LogInCheck_on.png';
import { BtnOpened, DataLists } from '@/atoms/timeline';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

function SettingBar({ data }) {
  const [btnOpen, setBtnOpen] = useRecoilState(BtnOpened);
  const [dataLists, setDataLists] = useRecoilState(DataLists);
  const [isCheck, setIsCheck] = useState(false);

  const changePropAll = (e) => {
    if (e.target.checked) {
      const checkedItemsArray = [];
      data.forEach((e) => checkedItemsArray.push(`${e.announcementId}`));
      setDataLists(checkedItemsArray);
    } else {
      setDataLists([]);
    }
  };

  useEffect(() => {
    data.length && dataLists.length === data.length ? setIsCheck(true) : setIsCheck(false);
  }, [dataLists]);

  return (
    <Container isOpen={btnOpen}>
      <TLSetBox>
        <InputHide
          type={'checkbox'}
          id="checkAll"
          onChange={(e) => changePropAll(e)}
          checked={isCheck}
        />
        <LabelCheck htmlFor="checkAll">
          <span />
        </LabelCheck>
        <p>전체 선택</p>
      </TLSetBox>
      <SetBtn type="reset">선택취소</SetBtn>
      <SetBtn>읽음처리</SetBtn>
      <SetBtn roll={'Del'}>삭제</SetBtn>
    </Container>
  );
}

export default SettingBar;

const Container = styled('div')`
  position: fixed;
  bottom: 0;
  width: calc(100% - 142px);
  height: 0;
  overflow: hidden;
  border-top: 1px solid #e2e2e2;
  background-color: #fff;
  padding: 0 calc((100% - 992px) / 2);
  box-sizing: border-box;
  transition: 0.5s;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;

  @media screen and (max-width: 820px) {
    width: 100%;
    margin-left: -20px;
    bottom: 70px;
    padding: 0 20px;
    height: 0;
  }

  @media screen and (max-width: 300px) {
    width: calc(100% + 20px);
  }

  ${(props) =>
    props.isOpen &&
    css`
      height: 90px;

      @media screen and (max-width: 820px) {
        height: 60px;
      }
    `}
`;

const TLSetBox = styled('div')`
  margin-right: auto;
  width: 46px;
  height: 100%;
  display: flex;
  border-right: 1px solid #e2e2e2;
  box-sizing: border-box;
  position: relative;

  label {
    margin-top: 22px;
  }

  p {
    position: absolute;
    color: #a8a8a8;
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    bottom: 22px;
    left: -32%;
  }

  @media screen and (max-width: 820px) {
    align-items: center;
    width: 40px;

    label {
      margin: 0;
    }

    p {
      display: none;
    }
  }

  @media screen and (max-width: 300px) {
    width: 36px;
  }
`;

const LabelCheck = styled('label')`
  display: block;
  line-height: 21px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;

  span {
    display: block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background: url(${LogInCheckOff}) center/100% no-repeat;
    transition: background 0.2s;
  }
`;

const InputHide = styled('input')`
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute;
  display: none;

  &:checked ~ ${LabelCheck} span {
    background: url(${LogInCheckOn});
    background-size: 100%;
  }
`;

const SetBtn = styled('button')`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #c4c4c4;
  width: 113px;
  height: 50px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  transition: 0.3s;

  &:hover {
    background-color: #b0b0b0;
  }

  @media screen and (max-width: 820px) {
    width: 50px;
    height: 30px;
    font-size: 13px;
    border-radius: 5px;
  }

  ${(props) =>
    props.roll === 'Del' &&
    css`
      background-color: #f95884;

      &:hover {
        background-color: #e9416e;
      }
    `}
`;
