import Loader from '@/components/common/Loader';
import axios from 'axios';
import qs from 'qs';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

function Naver() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const myCookies = new Cookies();
  const { mutate } = useSWR(['/auth/token', myCookies.get('X-AUTH-TOKEN')], fetcher);

  useEffect(() => {
    const getToken = async () => {
      try {
        const { code } = qs.parse(search, {
          ignoreQueryPrefix: true,
        });

        const params = new URLSearchParams();
        params.append('code', code);

        const context = {
          params,
        };

        const { data } = await axios.get('/oauth/naver/redirect', context, {
          withCredentials: true,
        });

        switch (data.status) {
          case 200:
            console.log(data);
            mutate('/auth/token');
            navigate('/');
            break;

          default:
            break;
        }
      } catch (error) {
        console.dir(error);
      }
    };

    getToken();
  }, []);
  return (
    <LoadingList>
      <Loader></Loader>
    </LoadingList>
  );
}

export default Naver;

const LoadingList = styled('div')`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
