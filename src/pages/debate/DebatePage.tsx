import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import iconAlarm from '../../assets/icon_alarm.svg';
import iconMenu from '../../assets/icon_menu.svg';
import iconSearch from '../../assets/icon_search.svg';
import { useDebate } from '../../hooks/useDebate';
import type { Debate } from '../../types/debate';

type DebateRoomCard = {
  id: string;
  title: string;
  description: string;
  statusLabel: '준비중' | '진행중';
};

const FILTER_ITEMS = ['찬반토론', '합의토론', '댓글토론'];
const FILTER_TYPE_MAP: Record<string, 'PROS_CONS' | 'CONSENSUS' | 'FREE'> = {
  찬반토론: 'PROS_CONS',
  합의토론: 'CONSENSUS',
  댓글토론: 'FREE',
};

const mapToRoomCard = (debate: Debate): DebateRoomCard => ({
  id: debate.id,
  title: debate.title,
  description: debate.description,
  statusLabel: debate.status === 'OPEN' ? '진행중' : '준비중',
});

const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H21" stroke="#9C9C9C" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M3 12H21" stroke="#9C9C9C" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M3 18H21" stroke="#9C9C9C" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="8" cy="6" r="1.8" fill="#F4F4F4" stroke="#9C9C9C" strokeWidth="1.8" />
    <circle cx="14.5" cy="12" r="1.8" fill="#F4F4F4" stroke="#9C9C9C" strokeWidth="1.8" />
    <circle cx="11" cy="18" r="1.8" fill="#F4F4F4" stroke="#9C9C9C" strokeWidth="1.8" />
  </svg>
);

const ChatCircleIcon = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="19" cy="19" r="18" stroke="#A9A9A9" strokeWidth="1.5" />
    <path d="M12 16.8H24V22.3H16.3L12 25.5V16.8Z" stroke="#A9A9A9" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14.5 12H26.5V17.4H19.3" stroke="#A9A9A9" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const DebatePage = () => {
  const { debates, fetchDebates } = useDebate();
  const [activeFilter, setActiveFilter] = useState('찬반토론');
  const [listError, setListError] = useState('');

  useEffect(() => {
    const loadDebates = async () => {
      try {
        await fetchDebates({
          status: 'OPEN',
          type: FILTER_TYPE_MAP[activeFilter],
          sort: 'updatedAt',
          direction: 'desc',
          limit: 20,
        });
        setListError('');
      } catch {
        setListError('토론 목록을 불러오지 못했습니다.');
      }
    };
    void loadDebates();
  }, [activeFilter, fetchDebates]);

  const cards = useMemo(
    () => debates.slice(0, 8).map(mapToRoomCard),
    [debates],
  );

  return (
    <Wrapper>
      <Logo>정명</Logo>

      <HeaderRow>
        <SideButton type="button" aria-label="메뉴">
          <TopIcon src={iconMenu} alt="" />
        </SideButton>
        <HeaderRight>
          <SideButton type="button" aria-label="검색">
            <TopIcon src={iconSearch} alt="" />
          </SideButton>
          <SideButton type="button" aria-label="알림">
            <TopIcon src={iconAlarm} alt="" />
          </SideButton>
        </HeaderRight>
      </HeaderRow>

      <FilterRow>
        <FilterButton type="button" aria-label="필터">
          <FilterIcon />
        </FilterButton>
        {FILTER_ITEMS.map((item) => (
          <FilterChip
            key={item}
            type="button"
            $active={activeFilter === item}
            onClick={() => setActiveFilter(item)}
          >
            {item}
          </FilterChip>
        ))}
      </FilterRow>

      <ListWrap>
        {listError && <ErrorText>{listError}</ErrorText>}
        {!listError && cards.length === 0 && <ErrorText>등록된 토론이 없습니다.</ErrorText>}
        {cards.map((card) => (
          <Card key={card.id}>
            <CardTop>
              <StatusBadge $running={card.statusLabel === '진행중'}>
                {card.statusLabel}
              </StatusBadge>
              <ChatCircleIcon />
            </CardTop>
            <CardTitle>{card.title}</CardTitle>
            <CardDesc>{card.description}</CardDesc>
          </Card>
        ))}
      </ListWrap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100dvh;
  background: #f5f5f5;
  padding: 62px 14px 90px;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 36px;
  font-weight: 800;
  color: #4dc891;
  text-align: center;
  margin-bottom: 16px;
  letter-spacing: -1px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SideButton = styled.button`
  width: 34px;
  height: 34px;
  background: transparent;
  border: none;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const TopIcon = styled.img`
  width: 28px;
  height: 28px;
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const FilterButton = styled.button`
  width: 56px;
  height: 38px;
  border-radius: 999px;
  border: 1.5px solid #9f9f9f;
  background: #f3f3f3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const FilterChip = styled.button<{ $active: boolean }>`
  height: 38px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1.5px solid ${({ $active }) => ($active ? '#2dcd97' : '#9f9f9f')};
  background: ${({ $active }) => ($active ? '#2dcd97' : '#f3f3f3')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#8f8f8f')};
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
`;

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ErrorText = styled.p`
  margin: 0;
  font-size: 12px;
  color: #f04444;
`;

const Card = styled.article`
  background: #f8f8f8;
  border-radius: 20px;
  padding: 12px 14px 14px;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const StatusBadge = styled.span<{ $running: boolean }>`
  height: 30px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1.5px solid #2dcd97;
  background: ${({ $running }) => ($running ? '#2dcd97' : 'transparent')};
  color: ${({ $running }) => ($running ? '#ffffff' : '#2dcd97')};
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
`;

const CardTitle = styled.h3`
  margin: 0 0 6px;
  font-size: 20px;
  line-height: 1.15;
  color: #333333;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const CardDesc = styled.p`
  margin: 0;
  font-size: 14px;
  color: #8f8f8f;
`;

export default DebatePage;
