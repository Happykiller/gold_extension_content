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

    /**
     * Get value — nouveau DOM : [data-e2e="balance"] dans le header du panel
     * Les spans enfants contiennent la partie entière puis ",00 €"
     */
    const $balanceContainer = $('[data-e2e="transaction-layer-v2-level-1-header-balance"] [data-e2e="balance"]');
    inversify.loggerService.debug('$balanceContainer', $balanceContainer);
    // Concatène tous les spans pour reconstituer le montant complet, ex: "-30,00 €"
    const value = $balanceContainer.text().trim();
    inversify.loggerService.debug('value', value);

    /**
     * Get description — nouveau DOM : dt[data-e2e="...original-label-title"] + dd suivant
     */
    const $labelDt = $('[data-e2e="transaction-layer-v2-level-1-type-card-original-label-value"]');
    inversify.loggerService.debug('$labelDt', $labelDt);
    const description = $labelDt.text().trim() ?? 'Sans description';
    inversify.loggerService.debug('description', description);

    /**
     * Get date — nouveau DOM : p[data-e2e="...header-date"], ex: "mer. 18 févr."
     * On tente de parser cette date relative pour produire YYYY-MM-DD.
     * En cas d'échec on retombe sur la date du jour.
     */
    const FRENCH_MONTHS: Record<string, string> = {
      'janv': '01', 'févr': '02', 'mars': '03', 'avr': '04',
      'mai': '05', 'juin': '06', 'juil': '07', 'août': '08',
      'sept': '09', 'oct': '10', 'nov': '11', 'déc': '12'
    };
    let date = dayjs().format('YYYY-MM-DD');
    const rawDate = $('[data-e2e="transaction-layer-v2-level-1-header-date"]').text().trim();
    inversify.loggerService.debug('rawDate', rawDate);
    if (rawDate) {
      // format attendu : "mer. 18 févr." — on extrait le jour et le mois
      const match = rawDate.match(/(\d{1,2})\s+([a-zéû]+)\.?/i);
      if (match) {
        const day = match[1].padStart(2, '0');
        const monthKey = match[2].toLowerCase().replace(/\.$/, '');
        const month = FRENCH_MONTHS[monthKey];
        if (month) {
          const year = dayjs().month() < parseInt(month) - 1
            ? dayjs().subtract(1, 'year').year()
            : dayjs().year();
          date = `${year}-${month}-${day}`;
        }
      }
    }
    inversify.loggerService.debug('date', date);

    // Define type
    let type = 1;
    if (value?.includes('-')) {
      type = 2;
    }
    inversify.loggerService.debug('type', type)

    // Define amount
    const amount = value?.replaceAll('+', '').replaceAll('-', '').replaceAll(',', '.').replaceAll('€', '').replaceAll('\u00a0', '').replaceAll(' ', '');
    inversify.loggerService.debug('amount', amount)

    const data = {
      name: ORDERS.CREATE_OPERATION,
      data: {
        amount: parseFloat(amount ?? '0'),
        date: date,
        description: description,
        account_id: 2,
        status_id: 2,
        type_id: type,
        third_id: parseInt(currentThird),
        category_id: parseInt(currentCategory)
      }
    };
    inversify.loggerService.debug('data', data);
    const response: BackgroundServiceModel = await inversify.backgroundService.send(data);
    if (response.data.id) {
      setCurrentMsg(`Operation crée avec l'id:${response.data.id}`);
    }
  }

  return (
    <Box className='gold_injection gold_content_div'>
      <div>
        <OpeCategoriesSelect
          value={currentCategory}
          label={<Trans>import.category</Trans>}
          onChange={(e: any) => {
            e.preventDefault();
            setCurrentCategory(e.target.value);
          }}
        />
      </div>
      <div>
        <OpeThirdsSelect
          value={currentThird}
          label={<Trans>import.third</Trans>}
          onChange={(e: any) => {
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