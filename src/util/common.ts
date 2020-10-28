import moment from 'moment';

export const dateDiff = (date: string) => {
    return moment.duration(moment(date).diff(moment())).days() + 1;
};
