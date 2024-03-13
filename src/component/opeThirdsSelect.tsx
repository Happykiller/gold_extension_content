import * as React from 'react';
import { Trans } from 'react-i18next';

import inversify from '../common/inversify';
import { OperationThridUsecaseModel } from '../usecase/operation/model/operationThrid.usecase.model';

export const OpeThirdsSelect = (props:any) => {
  const [thirds, setThirds] = React.useState<OperationThridUsecaseModel[]>(null);
  const [qry, setQry] = React.useState({
    loading: null,
    data: null,
    error: null
  });

  let content = <div></div>;

  if(qry.loading) {
    content = <div><Trans>common.loading</Trans></div>;
  } else if(qry.error) {
    content = <div><Trans>common.{qry.error}</Trans></div>
  } else if (thirds === null) {
    setQry(qry => ({
      ...qry,
      loading: true
    }));
    inversify.getOpeThirdsUsecase.execute()
      .then((response:OperationThridUsecaseModel[]) => {
        setThirds(response);
      })
      .catch((error:any) => {
        setQry(qry => ({
          ...qry,
          error: error.message
        }));
      })
      .finally(() => {
        setQry(qry => ({
          ...qry,
          loading: false
        }));
      });
  } else {
    content = (
      <select
        value={props.value}
        onChange={(e) => { 
          e.preventDefault();
          props.onChange(e);
        }}
      >
        <option value=''><Trans>common.clear</Trans></option>
        {
          thirds.map((third) => {
            return <option 
                key={third.id} 
                value={third.id}
              ><Trans>{third.label}</Trans></option>;
          })
        }
      </select>
    )
  }

  return content;
}