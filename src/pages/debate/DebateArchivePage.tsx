import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import iconAlarm from '../../assets/icon_alarm.svg';
import iconMenu from '../../assets/icon_menu.svg';
import iconSearch from '../../assets/icon_search.svg';
import { useDebate } from '../../hooks/useDebate';
import type { Debate } from '../../types/debate';

type ArchiveCardItem = {
  id: string;
  title: string;
  description: string;
};

const FILTER_ITEMS = ['찬반토론', '합의토론', '댓글토론'];
const FILTER_TYPE_MAP: Record<string, 'PROS_CONS' | 'CONSENSUS' | 'FREE'> = {
  찬반토론: 'PROS_CONS',
  합의토론: 'CONSENSUS',
  댓글토론: 'FREE',
};

const mapToArchiveCard = (debate: Debate): ArchiveCardItem => ({
  id: debate.id,
  title: debate.title,
  description: debate.description,
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
  <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="31" cy="31" r="29.5" stroke="#A9A9A9" strokeWidth="2" />
    <path
      d="M19.7 27.4H39.3V36.1H26.7L19.7 41.4V27.4Z"
      stroke="#A9A9A9"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M23.5 19.6H43.1V28.3H31.4"
      stroke="#A9A9A9"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const DebateArchivePage = () => {
  const { debates, fetchArchivedDebates } = useDebate();
  const [activeFilter, setActiveFilter] = useState('찬반토론');
  const [listError, setListError] = useState('');

  useEffect(() => {
    const loadDebates = async () => {
      try {
        await fetchArchivedDebates({
          type: FILTER_TYPE_MAP[activeFilter],
          sort: 'archivedAt',
          direction: 'desc',
          limit: 20,
        });
        setListError('');
      } catch {
        setListError('보관 토론 목록을 불러오지 못했습니다.');
      }
    };
    void loadDebates();
  }, [activeFilter, fetchArchivedDebates]);

  const archiveCards = useMemo(() => debates.slice(0, 8).map(mapToArchiveCard), [debates]);

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
        {!listError && archiveCards.length === 0 && <ErrorText>보관된 토론이 없습니다.</ErrorText>}
        {archiveCards.map((card) => (
          <Card key={card.id}>
            <CardTop>
              <ClosedBadge>종결됨</ClosedBadge>
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
  border: none;
  background: transparent;
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
  margin-bottom: 16px;
`;

const FilterButton = styled.button`
  width: 44px;
  height: 30px;
  border-radius: 999px;
  border: 1.5px solid #ababab;
  background: #f3f3f3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const FilterChip = styled.button<{ $active: boolean }>`
  height: 32px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1.5px solid #ababab;
  background: #f3f3f3;
  color: #8f8f8f;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
`;

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ErrorText = styled.p`
  margin: 0;
  font-size: 12px;
  color: #f04444;
`;

const Card = styled.article`
  background: #f8f8f8;
  border-radius: 24px;
  padding: 16px 16px 14px;
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const ClosedBadge = styled.span`
  height: 30px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1.5px solid #b7b7b7;
  color: #9f9f9f;
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
`;

const CardTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 700;
  color: #2f3238;
  letter-spacing: -0.02em;
`;

const CardDesc = styled.p`
  margin: 0;
  font-size: 14px;
  color: #8f8f8f;
`;

export default DebateArchivePage;
