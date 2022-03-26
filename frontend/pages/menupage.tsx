import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { IoDocumentTextOutline } from "react-icons/io5";
import { ImPlus } from "react-icons/im";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

import Nav from "../components/Nav";
import MenuModal from "../components/MenuModal";
import axios from "axios";

interface Props {
  foodGetData: {
    name: string;
    price: number;
    content: string;
  }[];
}

const MenuPage: NextPage<Props> = ({ foodGetData }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  const handleQr = () => {
    router.push({
      pathname: "/qrpage",
    });
  };

  return (
    <div>
      <Nav />
      <Wrapper>
        <MenuInfoWrap>
          {/* 메뉴 입력 창 */}
          <MenuInputWrap>
            <p>메뉴판 명</p>
            <div>
              <input placeholder="메뉴판명을 입력해주세요"></input>
              <button>저장</button>
            </div>
          </MenuInputWrap>
          {/* 정보수정 창 */}
          <MenuEditWrap>
            <MenuEditSideMenu>
              <li>
                <Link href={""}>
                  <DocumentIcon />
                </Link>
              </li>
            </MenuEditSideMenu>
            <MenuEditContent>
              <div className="menuedit-content__header">
                <p>메뉴 추가</p>
                <EditPlusBtn onClick={() => setModalOpen(true)} />
              </div>
              {/* 추가된 메뉴가 나올 부분 */}
              <FoodCardWrap>
                {foodGetData.map((val, idx) => (
                  <FoodCard key={idx}>
                    <div className="foodcard-top">
                      <Image
                        src="/images/image2.png"
                        alt="음식 사진"
                        width="64"
                        height="64"
                      />
                      <div className="foodcard_top__content">
                        <p className="foodcard_top__name">{val.name}</p>
                        <ul className="foodcard_top__list">
                          <li>
                            <span>가격</span>
                            {val.price}
                          </li>
                          <li>
                            <span>알레르기 정보</span>
                            연어, 토마토
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="foodcard_btm">
                      <ul>
                        <li>메뉴 소개</li>
                        <li>{val.content}</li>
                      </ul>
                    </div>
                  </FoodCard>
                ))}
              </FoodCardWrap>
            </MenuEditContent>
          </MenuEditWrap>
        </MenuInfoWrap>
        <MenuPre>
          <MenuPreContent>
            {/* 메뉴 주문 들어가면 각 페이지별로 나올 부분 */}
          </MenuPreContent>
        </MenuPre>
      </Wrapper>
      {modalOpen && <MenuModal setModalOpen={setModalOpen} />}
    </div>
  );
};

export async function getStaticProps() {
  try {
    const response = await axios.get("http://localhost:3000/api/getFood");
    const data = response.data;
    return {
      props: {
        foodGetData: data,
      },
    };
  } catch (err) {
    console.log(err);
  }
}

export default MenuPage;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const MenuInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const MenuInputWrap = styled.div`
  margin-bottom: 20px;
  padding: 20px 20px 0px 20px;
  p {
    font-size: 0.825rem;
    color: gray;
  }

  div {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  input {
    flex: 1;
    padding: 5px 0px;
    margin-right: 20px;
    border-bottom: 1px solid black;
  }

  input:focus {
    outline: none;
  }

  button {
    color: var(--color-orange);
    font-size: 1.25rem;
    font-weight: 700;
  }
`;
const MenuEditWrap = styled.div`
  display: flex;
  height: 100vh;
`;

const DocumentIcon = styled(IoDocumentTextOutline)`
  font-size: 32px;
  color: white;
`;

const MenuEditSideMenu = styled.ul`
  background-color: var(--color-gray);
  width: 42px;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  li {
    padding: 20px 0px;
  }
`;

const MenuEditContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 20px 0px 10px;
  margin-right: 20px;
  border-top-right-radius: 20px;
  background-color: var(--color-light-gray);

  .menuedit-content__header {
    display: flex;
    justify-content: space-between;

    p {
      font-weight: 700;
      line-height: 42px;
    }
  }
`;

const EditPlusBtn = styled(ImPlus)`
  background-color: white;
  border-radius: 50%;
  font-size: 42px;
  padding: 12px;
  /* #19 */
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const MenuPre = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  padding-top: 55px;
  background-color: var(--color-mid-gray);
`;

const MenuPreContent = styled.div``;

const FoodCardWrap = styled.div``;

const FoodCard = styled.div`
  margin: 11px 0 30px 16px;
  padding: 15px;
  box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.04);
  background-color: #fff;
  border-radius: 20px;

  .foodcard-top {
    display: flex;
  }
  Image {
  }

  .foodcard_top__content {
    margin-left: 10px;
    flex: 1;
  }

  .foodcard_top__name {
    text-align: center;
    font-size: 17px;
    font-weight: 600;
  }

  .foodcard_top__list {
    margin-left: 10px;
    margin-top: 10px;

    li {
      font-size: 13px;
      margin-left: auto;
      color: gray;
      margin-bottom: 5px;

      :last-child {
        margin: 0;
      }
      span {
        display: inline-block;
        width: 100px;
        color: #000;
      }
    }
  }

  .foodcard_btm {
    margin-top: 10px;
    font-size: 13px;

    li {
      margin-bottom: 5px;
      :last-child {
        color: gray;
        margin: 0;
      }
    }
  }
`;
