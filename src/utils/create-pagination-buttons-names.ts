import { DefaultParam, ServiceParam } from '@/const/const';
import { PaginationButton } from '@/const/const-button';

const createPaginationButtonsNames = (
  pagesCount: number,
  currentPage: string
): string[] => {
  if (pagesCount <= ServiceParam.MinimalPagesCount) {
    return DefaultParam.EmptyArray;
  }

  const currentPageNum = Number(currentPage);
  const currentBlock = Math.ceil(
    currentPageNum / ServiceParam.PaginationButtonsPack
  );
  const startPage =
    (currentBlock - ServiceParam.PaginationStep) *
      ServiceParam.LastNumberPageInPack +
    ServiceParam.PaginationStep;
  const endPage = Math.min(
    startPage + ServiceParam.DoublePaginationStep,
    pagesCount
  );

  const buttons: string[] = [];

  if (currentBlock > DefaultParam.PageNumberOne) {
    buttons.push(PaginationButton.Back);
  }

  for (let i = startPage; i <= endPage; i++) {
    buttons.push(String(i));
  }

  if (endPage < pagesCount) {
    buttons.push(PaginationButton.Next);
  }

  return buttons;
};
export { createPaginationButtonsNames };
