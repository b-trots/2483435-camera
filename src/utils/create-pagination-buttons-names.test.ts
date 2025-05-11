import { ServiceParam } from '@/const/const';
import { createPaginationButtonsNames } from './create-pagination-buttons-names';
import { PaginationButton } from '@/const/const-button';

describe('createPaginationButtonsNames', () => {
  it('should return an empty array when pagesCount is less than or equal to MinimalPagesCount', () => {
    const pagesCount = ServiceParam.MinimalPagesCount;
    const currentPage = '1';

    const result = createPaginationButtonsNames(pagesCount, currentPage);

    expect(result).toEqual([]);
  });

  it('should return only current page button if there is only one page', () => {
    const pagesCount = 1;
    const currentPage = '1';

    const result = createPaginationButtonsNames(pagesCount, currentPage);

    expect(result).toEqual([]);
  });

  it('should correctly generate pagination buttons for the first block of pages', () => {
    const pagesCount = 10;
    const currentPage = '1';

    const result = createPaginationButtonsNames(pagesCount, currentPage);

    expect(result).toEqual(['1', '2', '3', PaginationButton.Next]);
  });

  it('should correctly generate pagination buttons for the middle block of pages', () => {
    const pagesCount = 20;
    const currentPage = '6';

    const result = createPaginationButtonsNames(pagesCount, currentPage);

    expect(result).toEqual([
      PaginationButton.Back,
      '4',
      '5',
      '6',
      PaginationButton.Next,
    ]);
  });

  it('should correctly generate pagination buttons for the last block of pages', () => {
    const pagesCount = 30;
    const currentPage = '29';

    const result = createPaginationButtonsNames(pagesCount, currentPage);

    expect(result).toEqual([PaginationButton.Back, '28', '29', '30']);
  });

  it('should handle the case when the last page is in the first block', () => {
    const pagesCount = 3;
    const currentPage = '3';

    const result = createPaginationButtonsNames(pagesCount, currentPage);

    expect(result).toEqual(['1', '2', '3']);
  });

});
