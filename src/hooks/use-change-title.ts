import { useEffect } from 'react';
import { TitleName } from '../const/const';

const restoreTitle = () => {
  const initialTitle = document.title;
  return () => {
    document.title = initialTitle;
  };
};

function useChangeTitle(title: string) {
  useEffect(restoreTitle, []);

  useEffect(() => {
    document.title = `${title} - ${TitleName.StoreName}`;
  }, [title]);
}

export { useChangeTitle };
