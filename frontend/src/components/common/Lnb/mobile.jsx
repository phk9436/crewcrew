/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import useSWR from 'swr';
import ProfileNull from '@/assets/images/ProfileNull.png';
import LogoTxt from '@/assets/images/LogoTxt.png';
import IconNavHome from '@/assets/images/NavIcon1.png';
import IconNavHomeHover from '@/assets/images/NavIcon1_Hover.png';
import IconNavHomeActive from '@/assets/images/NavIcon1_Active.png';
import IconNavParti from '@/assets/images/NavIcon2.png';
import IconNavPartiHover from '@/assets/images/NavIcon2_Hover.png';
import IconNavPartiActive from '@/assets/images/NavIcon2_Active.png';
import IconNavRecru from '@/assets/images/NavIcon3.png';
import IconNavRecruHover from '@/assets/images/NavIcon3_Hover.png';
import IconNavRecruActive from '@/assets/images/NavIcon3_Active.png';
import IconNavChat from '@/assets/images/NavIcon4.png';
import IconNavChatHover from '@/assets/images/NavIcon4_Hover.png';
import IconNavChatActive from '@/assets/images/NavIcon4_Active.png';
import fetcher from '@/utils/fetcher';

function MobileNavButton({ icon, title, link = '/', selected }) {
  return (
    <NavLink to={link}>
      <MobileNavLi selected={selected}>
        {icon}
        {title}
      </MobileNavLi>
    </NavLink>
  );
}

function NavMobile({ path, openModal }) {
  const { pathname } = useLocation();
  const cookies = new Cookies();
  const {
    data: myData,
    error,
    mutate,
  } = useSWR(['/user/token', cookies.get('X-AUTH-TOKEN')], fetcher);

  return (
    <>
      <MobileGnb>
        <MobileGnbul>
          <MobileGnbli />
          <MobileGnbLogoli>
            <h2>
              <MobileGnbA to="/">
                <MobileLogoimg src={LogoTxt} alt="CrewCrew" />
              </MobileGnbA>
            </h2>
          </MobileGnbLogoli>
          <MobileGnbli>
            <NavProfileWrapper>
              {myData && myData.data ? (
                <>
                  <MobileGnbA to="/mypage">
                    <MobileProfileimg src={ProfileNull} alt="마이페이지" />
                  </MobileGnbA>
                  <Alarm />
                </>
              ) : (
                <MobileGnbB onClick={() => openModal()}>
                  <MobileProfileimg src={ProfileNull} alt="마이페이지" />
                </MobileGnbB>
              )}
            </NavProfileWrapper>
          </MobileGnbli>
        </MobileGnbul>
      </MobileGnb>
      <MobileNav>
        <MobileNavUl>
          <MobileNavButton
            icon={<HomeIcon selected={path === 'home'} />}
            title="홈"
            link="/"
            selected={path === 'home'}
          />
          <MobileNavButton
            icon={<PartIcon selected={pathname.startsWith('/post')} />}
            title="크루참여"
            link="/post"
            selected={pathname.startsWith('/post')}
          />
          <MobileNavButton
            icon={<RecruIcon selected={pathname.startsWith('/crew')} />}
            title="팀원모집"
            link="/"
            selected={pathname.startsWith('/crew')}
          />
          <MobileNavButton
            icon={<ChatIcon selected={pathname.startsWith('/chat')} />}
            title="채팅"
            link="/"
            selected={pathname.startsWith('/chat')}
          />
        </MobileNavUl>
      </MobileNav>
    </>
  );
}

export default NavMobile;

const HomeIcon = styled.span`
  display: block;
  width: 46px;
  height: 46px;
  background-size: 100% !important;
  transition: 0.2s;
  background: url(${IconNavHome});
  :hover {
    background: url(${IconNavHomeHover});
  }
  ${(props) =>
    props.selected &&
    css`
      background: url(${IconNavHomeActive});
      :hover {
        background: url(${IconNavHomeActive});
      }
    `}
  @media screen and (max-width: 820px) {
    display: block;
    width: 36px;
    height: 36px;
    background-size: 100% !important;
  }
`;

const PartIcon = styled.span`
  display: block;
  width: 46px;
  height: 46px;
  background-size: 100% !important;
  transition: 0.2s;
  background: url(${IconNavParti});
  :hover {
    background: url(${IconNavPartiHover});
  }
  ${(props) =>
    props.selected &&
    css`
      background: url(${IconNavPartiActive});
      :hover {
        background: url(${IconNavPartiActive});
      }
    `}
  @media screen and (max-width: 820px) {
    display: block;
    width: 36px;
    height: 36px;
    background-size: 100% !important;
  }
`;

const RecruIcon = styled.span`
  display: block;
  width: 46px;
  height: 46px;
  background-size: 100% !important;
  transition: 0.2s;
  background: url(${IconNavRecru});
  :hover {
    background: url(${IconNavRecruHover});
  }
  ${(props) =>
    props.selected &&
    css`
      background: url(${IconNavRecruActive});
      :hover {
        background: url(${IconNavRecruActive});
      }
    `}
  @media screen and (max-width: 820px) {
    display: block;
    width: 36px;
    height: 36px;
    background-size: 100% !important;
  }
`;

const ChatIcon = styled.span`
  display: block;
  width: 46px;
  height: 46px;
  background-size: 100% !important;
  transition: 0.2s;
  background: url(${IconNavChat});
  :hover {
    background: url(${IconNavChatHover});
  }
  ${(props) =>
    props.selected &&
    css`
      background: url(${IconNavChatActive});
      :hover {
        background: url(${IconNavChatActive});
      }
    `}
  @media screen and (max-width: 820px) {
    display: block;
    width: 36px;
    height: 36px;
    background-size: 100% !important;
  }
`;

const MobileNav = styled.nav`
  display: none;
  @media screen and (max-width: 820px) {
    display: block;
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    height: 70px;
    z-index: 90;
    background-color: #fff;
    bottom: 0;
    box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.05);
    bottom: 0;
    ul {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  @media screen and (max-width: 300px) {
    padding: 0 10px;
  }
`;

const MobileGnb = styled.div`
  display: none;
  @media screen and (max-width: 820px) {
    display: block;
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    height: 60px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.05);
    z-index: 90;
    background-color: #fff;
    top: 0;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.05);
  }
  @media screen and (max-width: 300px) {
    padding: 0 10px;
  }
`;

const MobileGnbul = styled.ul`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MobileGnbli = styled.li`
  width: 30px;
  span {
    display: block;
    width: 36px;
    height: 36px;
    background-size: 100% !important;
  }
`;

const MobileGnbLogoli = styled.li``;

const NavProfileWrapper = styled.div`
  position: relative;
`;

const Alarm = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ff0045;
  position: absolute;
  right: -4px;
  top: 32px;

  @media screen and (max-width: 820px) {
    width: 6px;
    height: 6px;
    top: 0;
  }
`;

const MobileGnbA = styled(NavLink)`
  display: block;
  height: 30px;
`;

const MobileGnbB = styled('div')`
  display: block;
  height: 30px;
`;

const MobileLogoimg = styled.img`
  width: 100px;
`;

const MobileProfileimg = styled.img`
  width: 30px;
`;

const MobileNavUl = styled.ul`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 7px;
`;

const MobileNavLi = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 36px;
  height: 50px;
  font-size: 10px;
  font-weight: 400;
  color: #000;

  ${(props) =>
    props.selected &&
    css`
      color: #00b7ff;
    `}
`;
