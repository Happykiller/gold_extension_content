import $ from "jquery";
import dayjs from 'dayjs';
import * as React from 'react';
import inversify from "../common/inversify";
import { ORDERS } from "../common/orders";
import styled from "styled-components";
import { BackgroundServiceModel } from '../services/models/background.service.model';

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
        <select
          value={currentCategory}
          onChange={(e) => { 
            e.preventDefault();
            setCurrentCategory(e.target.value);
          }}
        >
          <option value='2'>Alimentation</option>
          <option value='1'>Autre catégorie</option>
          <option value='19'>Assurance</option>
          <option value='4'>Cadeau</option>
          <option value='20'>Charges</option>
          <option value='9'>Fabrice</option>
          <option value='16'>FAI</option>
          <option value='10'>Frais	banquaire, etc</option>
          <option value='21'>Geek</option>
          <option value='8'>Illidan</option>
          <option value='17'>Immobilier</option>
          <option value='15'>Impôts</option>
          <option value='14'>Jeux</option>
          <option value='6'>Mobilité</option>
          <option value='5'>Prêt</option>
          <option value='13'>Régulation</option>
          <option value='12'>Revenue</option>
          <option value='18'>Salaire</option>
          <option value='3'>Santé</option>
          <option value='11'>Sortie</option>
          <option value='7'>Vacances</option>
        </select>
      </div>
      <div>
        <select
          value={currentThird}
          onChange={(e) => { 
            e.preventDefault();
            setCurrentThird(e.target.value);
          }}
        >
          <option value='20'>Amazon</option>
          <option value='26'>Aréa</option>
          <option value='11'>Aurore Mondésir</option>
          <option value='8'>Banque</option>
          <option value='35'>BBCEP</option>
          <option value='10'>Blizzard</option>
          <option value='40'>Botanic</option>
          <option value='34'>Boursorama</option>
          <option value='25'>Carrefour</option>
          <option value='14'>Castorama</option>
          <option value='31'>Cinéma</option>
          <option value='28'>CPAM</option>
          <option value='15'>Darty</option>
          <option value='18'>Decathlon</option>
          <option value='21'>Delivroo</option>
          <option value='9'>Employeur</option>
          <option value='4'>Epicerie Asiatique</option>
          <option value='2'>Entreprise créditrice</option>
          <option value='1'>Entreprise débitrice</option>
          <option value='39'>Essence</option>
          <option value='43'>FitnessBoutique</option>
          <option value='3'>Géant</option>
          <option value='6'>Généraliste</option>
          <option value='42'>Google</option>
          <option value='16'>Ikea</option>
          <option value='23'>Le verre à soi</option>
          <option value='38'>LeroyMerlin</option>
          <option value='37'>Locataires</option>
          <option value='19'>Mac Donald</option>
          <option value='36'>Médecin</option>
          <option value='17'>Micromania</option>
          <option value='29'>Mutuelle</option>
          <option value='13'>Nano Mireille</option>
          <option value='5'>Ophtalmologue</option>
          <option value='30'>Orange</option>
          <option value='24'>Parking</option>
          <option value='22'>Pharmacie</option>
          <option value='32'>Restauration</option>
          <option value='7'>Shopping</option>
          <option value='33'>Syndic</option>
          <option value='41'>TIER</option>
          <option value='12'>Trésor public</option>
          <option value='27'>Vinted</option>
        </select>
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