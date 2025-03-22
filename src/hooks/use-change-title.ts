import { useEffect } from 'react';
import { DefaultParam, SymbolParam, TitleName } from '../const/const';
function useChangeTitle(title: string) {
  useEffect(() => {
    const initialTitle = document.title;

    const isEmptyTitle = title ? SymbolParam.Dash : DefaultParam.EmptyString;

    document.title = title + isEmptyTitle + TitleName.StoreName;

    return () => {
      document.title = initialTitle;
    };
  }, [title]);
}

export { useChangeTitle };
