import {
  BemMode,
  DefaultParam,
  NameSpace,
  ServiceParam,
} from '../../../../const/const';
import { SliderButtonName } from '../../../../const/const-button';
import { SliderButton, SliderButtonBem } from './slider-button';
import { useAppSelector } from '../../../../hooks/hooks';
import { getSimilarProducts } from '../../../../store/slices/products/products-selectors';
import { usePagination } from '../../../../hooks/use-pagination';

export function SliderButtons() {
  const similarProducts = useAppSelector(getSimilarProducts);
  const { currentPage, pagesCount, goToPage } = usePagination(
    NameSpace.SimilarPageSearchId,
    similarProducts,
    ServiceParam.ItemsPerSlide
  );


  const buttonsConfig = [
    {
      bemMode: BemMode.Prev,
      text: SliderButtonName.Prev,
      disabled: currentPage === DefaultParam.PageNumberOne,
      onClick: () => goToPage(currentPage - ServiceParam.PaginationStep),
    },
    {
      bemMode: BemMode.Next,
      text: SliderButtonName.Next,
      disabled: currentPage === pagesCount,
      onClick: () => goToPage(currentPage + ServiceParam.PaginationStep),
    },
  ];

  return (
    <>
      {buttonsConfig.map(({ bemMode, text, onClick, disabled }) => (
        <SliderButton
          key={bemMode}
          bemMode={bemMode as SliderButtonBem}
          text={text}
          onClick={onClick}
          disabled={disabled}
        />
      ))}
    </>
  );
}
