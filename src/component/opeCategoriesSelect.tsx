import * as React from 'react';
import { Trans } from 'react-i18next';

import inversify from '../common/inversify';
import { OperationCategoryUsecaseModel } from '../usecase/operation/model/operationCategory.usecase.model';

export const OpeCategoriesSelect = (props:any) => {
  const [categories, setCategories] = React.useState<OperationCategoryUsecaseModel[]>(null);
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
  } else if (categories === null) {
    setQry(qry => ({
      ...qry,
      loading: true
    }));
    inversify.getOpeCategoriesUsecase.execute()
      .then((response:OperationCategoryUsecaseModel[]) => {
        setCategories(response);
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
          categories.map((category) => {
            return <option 
                key={category.id} 
                value={category.id}
              ><Trans>{category.label}</Trans></option>;
          })
        }
      </select>
    )
  }

  return content;
}