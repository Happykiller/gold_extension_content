import $ from "jquery";
import dayjs from 'dayjs';
import * as React from 'react';
import { Trans } from "react-i18next";
import styled from "styled-components";

import { ORDERS } from "../common/orders";
import inversify from "../common/inversify";
import { OpeThirdsSelect } from "../component/opeThirdsSelect";
import { OpeCategoriesSelect } from "../component/opeCategoriesSelect";
import { BackgroundServiceModel } from '../service/models/background.service.model';

const Button = styled.button`
  background: white;
  color: #42A5F5;
  font-size: 0.8rem;
  margin: 0.8rem;
  padding: 0.25em 0.8rem;
  border: 2px solid #42A5F5;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
  }
`;

const Msg = styled.span`
  font-size: 15px;
  font-weight: 400;
`;

const Box = styled.div`
  display: flex;
  flex-flow: column;
`
const Import = () => {
  const [currentMsg, setCurrentMsg] = React.useState('');
  const [currentCategory, setCurrentCategory] = React.useState('1');
  const [currentThird, setCurrentThird] = React.useState('2');

  const handleClick = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const name = $('.transaction-name').text();
    const value = $('.transaction-amount').attr('title');
    const description = $('.cell-content-subtitle:first').text();
    let type = 1;
    if (value?.includes('-')) {
      type = 2;
    }
    const amount = value?.replaceAll('-', '').replaceAll(',', '.');
    const response:BackgroundServiceModel = await inversify.backgroundService.send({
      name: ORDERS.CREATE_OPERATION,
      data: {
        amount: parseFloat(amount??'0'),
        date: dayjs().format('YYYY-MM-DD'),
        description: description,
        account_id: 2,
        status_id: 2,
        type_id: type,
        third_id: parseInt(currentThird),
        category_id: parseInt(currentCategory)
      }
    });
    if(response.data.id) {
      setCurrentMsg(`Operation crée avec l'id:${response.data.id}`);
    }
  }

  return (
    <Box className='gold_injection gold_content_div'>
      <div>
        <OpeCategoriesSelect
          value={currentCategory}
          label={<Trans>import.category</Trans>}
          onChange={(e:any) => { 
            e.preventDefault();
            setCurrentCategory(e.target.value);
          }}
        />
      </div>
      <div>
        <OpeThirdsSelect
          value={currentThird}
          label={<Trans>import.third</Trans>}
          onChange={(e:any) => { 
            e.preventDefault();
            setCurrentThird(e.target.value);
          }}
        />
      </div>
      <div>
        <Button
          onClick={handleClick}
        >Importer</Button>
      </div>
      <div>
        <Msg>{currentMsg}</Msg>
      </div>
    </Box>
  )
}

export default Import;