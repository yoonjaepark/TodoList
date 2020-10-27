import { http } from './http';
import * as _ from 'lodash';

export const getTodos = async () => {
  return await http<any[] | any>({
    url: 'todos',
  })
    .then((res) => {
      if (_.isArray(res)) {
        return res;
      } else {
        return [res];
      }
    });
};
