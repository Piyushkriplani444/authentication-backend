import dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(utc.default);
dayjs.extend(localizedFormat.default);
dayjs.extend(timezone.default);

export const getCurrentJST = () => {
  // TODO format must be 'YYYY-MM-DD HH:mm:ss'
  return dayjs.tz(dayjs(), 'Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss');
};

export const getAddToCurrentJST = (num: number, unit: dayjs.ManipulateType) => {
  // TODO
  return dayjs.tz(dayjs(), 'Asia/Tokyo').add(num, unit).format('YYYY-MM-DD HH:mm:ss');
};

export const isAfterCurrentJST = (time: string) => {
  // TODO
  const currentTimeJST = dayjs.tz(dayjs(), 'Asia/Tokyo');
  const inputTime = dayjs.tz(dayjs(time), 'Asia/Tokyo');
  return inputTime.isAfter(currentTimeJST);
};
