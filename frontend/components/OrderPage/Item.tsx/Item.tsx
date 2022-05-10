import React from 'react';
import type { FC } from 'react';
import * as S from './Item.style';
type ItemProps = {
  bgColor: string;
  textColor: string;
  content: string;
};
const Item: FC<ItemProps> = ({
  bgColor = 'white',
  textColor = 'black',
  content = '',
}) => {
  return (
    <S.Wrap color={bgColor}>
      <S.Text color={textColor}>
        <span>&#183;</span>
        {content}
      </S.Text>
    </S.Wrap>
  );
};

export default Item;