import * as moment from 'moment';

export const formatDate = (
  dateNum: any,
  isDue = false,
): string => {
  if (isDue) {
    return moment(dateNum).format('YYYY-MM-DD');
  } else {
    return moment(dateNum).format('YYYY-MM-DD HH:mm:ss');
  }
};

export const getDay = (date: Date = new Date()): string => {
  return moment(date).format('YYYY-MM-DD');
};

export const getTime = (): number => {
  return new Date().getTime();
};

export const formDateArray = (dateList: any[], isDue: boolean = false) => {
  return dateList.map((item: any) => {
    return formatDate(item, isDue);
  });
};
