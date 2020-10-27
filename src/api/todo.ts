import { http } from './http';
import * as _ from 'lodash';
import { Todo } from '../interfaces';

export const getTodoList = async () => {
  return await http<any[] | any>({
    url: 'todos?_sort=id&_order=desc',
  })
    .then((res) => {
      if (_.isArray(res)) {
        return res;
      } else {
        return [res];
      }
    });
};

export const addTodo = async (data: Todo) => {
  return await http<any[] | any>({
    url: 'todos',
    method: 'post',
    data: data,
  })
    .then((res) => {

    });
};
