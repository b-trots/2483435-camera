import { BemClass, DefaultParam, PICTURE_PARAMS } from '../../const/const';

type ProductImgProps = {
  bemClass: BemClass;
  previewImgWebp: string;
  previewImgWebp2x: string;
  previewImg: string;
  previewImg2x: string;
  name: string;
};

export function ProductImg({
  bemClass,
  previewImgWebp,
  previewImgWebp2x,
  previewImg,
  previewImg2x,
  name,
}: ProductImgProps) {
  const correctImgSize = (() => {
    const defaultSize = {
      imgWidth: DefaultParam.ProductImgWidth,
      imgHeight: DefaultParam.ProductImgHeight,
    };

    const pictureParams = PICTURE_PARAMS.find(
      (item) => item.bemClass === bemClass
    );

    return pictureParams
      ? { imgWidth: pictureParams.imgWidth, imgHeight: pictureParams.imgHeight }
      : defaultSize;
  })();

  return (
    <div className={`${bemClass}__img`}>
      <picture>
        <source
          type="image/webp"
          srcSet={`${previewImgWebp}, ${previewImgWebp2x}`}
        />
        <img
          src={previewImg}
          srcSet={previewImg2x}
          width={correctImgSize.imgWidth}
          height={correctImgSize.imgHeight}
          alt={name}
        />
      </picture>
    </div>
  );
}
