import $ from "jquery";
import dayjs from 'dayjs';
import * as React from 'react';
import inversify from "../common/inversify";
import { ORDERS } from "../common/orders";
import styled from "styled-components";

const Button = styled.button<{ $primary?: boolean; }>`
  /* Adapt the colors based on primary prop */
  background: ${props => props.$primary ? "#BF4F74" : "white"};
  color: ${props => props.$primary ? "white" : "#BF4F74"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #BF4F74;
  border-radius: 3px;
`;


const App = () => {

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
    console.log('name', name);
    console.log('value', value);
    console.log('amount', amount);
    console.log('type', type);
    console.log('description', description);
    const response = await inversify.backgroundService.send({
      name: ORDERS.CREATE_OPERATION,
      data: {
        amount: parseFloat(amount??'0'),
        date: dayjs().format('YYYY-MM-DD'),
        description: description,
        account_id: 2,
        status_id:  2,
        type_id:  type,
        third_id:  2,
        category_id:  1
      }
    });
    console.log(response)
  }

  return (
    <div className='gold_injection gold_content_div'>
      <Button
        onClick={handleClick}
      >Importer</Button>
    </div>
  )
}

export default App;