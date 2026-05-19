import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../../stores/authStore';
import { authService } from '../../services/authService';

const MENU_ITEMS = ['앱 테마', '고대비', '알림설정', '개인/보안', '공지사항', '세부정보'];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayName = isAuthenticated ? user?.nickname ?? '사용자' : '사용자 이름';
  const helperText = isAuthenticated
    ? `${user?.nickname ?? '사용자'}님, 환영합니다`
    : '로그인을 먼저 진행해주세요';

  const handleLogout = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (isAuthenticated) {
        await authService.logout();
      }
    } catch (error) {
      if (!isAxiosError(error)) {
        console.error(error);
      }
    } finally {
      localStorage.removeItem('accessToken');
      clearAuth();
      setIsSubmitting(false);
      navigate('/login');
    }
  };

  return (
    <Wrapper>
      <TopSpacing />

      <ProfileRow>
        <Avatar />
        <NameWrap>
          <Name>{displayName}</Name>
          <SubText>{helperText}</SubText>
        </NameWrap>
      </ProfileRow>

      {!isAuthenticated && (
        <AuthActionRow>
          <SignUpButton type="button" onClick={() => navigate('/signup')}>
            회원가입
          </SignUpButton>
          <LoginButton type="button" onClick={() => navigate('/login')}>
            로그인
          </LoginButton>
        </AuthActionRow>
      )}

      <MenuCard>
        {MENU_ITEMS.map((item) => (
          <MenuItem key={item}>{item}</MenuItem>
        ))}
      </MenuCard>

      <LogoutButton type="button" onClick={handleLogout} disabled={isSubmitting}>
        로그아웃
      </LogoutButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100dvh;
  background: #f5f5f5;
  padding: 0 14px 90px;
`;

const TopSpacing = styled.div`
  height: 62px;
`;

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
`;

const Avatar = styled.div`
  width: 148px;
  height: 148px;
  border-radius: 50%;
  background: #d4d4d6;
  flex-shrink: 0;
`;

const NameWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Name = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #2f3238;
`;

const SubText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #8f8f8f;
`;

const AuthActionRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 22px;
`;

const SignUpButton = styled.button`
  flex: 1;
  height: 54px;
  border-radius: 999px;
  border: 1.5px solid #1b1b1b;
  background: #f5f5f5;
  color: #2f3238;
  font-size: 18px;
  font-weight: 700;
`;

const LoginButton = styled.button`
  flex: 1;
  height: 54px;
  border-radius: 999px;
  border: none;
  background: #2dcd97;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
`;

const MenuCard = styled.section`
  background: #efefef;
  border-radius: 24px;
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MenuItem = styled.button`
  text-align: left;
  border: none;
  background: transparent;
  color: #8f8f8f;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.45;
  padding: 0;
`;

const LogoutButton = styled.button`
  display: block;
  margin: 32px auto 0;
  border: none;
  background: transparent;
  color: #d84c4c;
  font-size: 18px;
  text-decoration: underline;
  text-underline-offset: 4px;

  &:disabled {
    opacity: 0.6;
  }
`;

export default ProfilePage;
