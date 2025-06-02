import { describe, it, expect } from 'vitest';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {
  capitalize,
  correctPrice,
  countPages,
  formatPrice,
  reviewDate,
  selectCameras,
} from './utils';
import { generateAllCameras } from './mock/mock';
import { ServiceParam } from '@/const/const';

describe('Utility Functions', () => {

  describe('reviewDate', () => {
    it('should format a date to the correct format', () => {
      const testDate = '2023-04-01';
      const expected = dayjs(testDate)
        .locale('ru')
        .format(ServiceParam.DateFormat);
      expect(reviewDate(testDate)).toBe(expected);
    });
  });

  describe('selectCameras', () => {
    it('should select the correct slice of cameras for the page', () => {
      const cameras = generateAllCameras(5);
      expect(selectCameras(cameras, '1', 2)).toEqual([cameras[0],cameras[1]]);
      expect(selectCameras(cameras, '2', 2)).toEqual([cameras[2],cameras[3]]);
    });

    it('should return an empty array for out-of-bounds pages', () => {
      const cameras = generateAllCameras(2);
      expect(selectCameras(cameras, '10', 2)).toEqual([]);
    });
  });

  describe('countPages', () => {
    it('should return the correct number of pages', () => {
      expect(countPages([1, 2, 3, 4], 2)).toBe(2);
      expect(countPages([1, 2, 3, 4, 5], 2)).toBe(3);
    });

    it('should return 0 for empty arrays', () => {
      expect(countPages([], 2)).toBe(0);
    });
  });

  describe('formatPrice', () => {
    it('should format the price with a ruble symbol', () => {
      expect(formatPrice(12345)).toBe('12 345 ₽');
    });
  });

  describe('correctPrice', () => {
    it('should remove invalid characters from the price string', () => {
      expect(correctPrice('12,345.67')).toBe('1234567');
      expect(correctPrice('12345')).toBe('12345');
    });
  });

  describe('capitalize', () => {
    it('should capitalize the first letter of the string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });

    it('should return an empty string if input is empty', () => {
      expect(capitalize('')).toBe('');
    });
  });
});
