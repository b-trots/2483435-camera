import { ShutterStyle } from '@/components/page-404/page-404';
import {
  SHUTTER_FLAPS,
  FLAPS_COUNT,
  LoaderStatus,
  LoaderParam,
} from '@/const/const';
import css from './loader.module.css';

type LoaderProps = {
  status: LoaderStatus;
};

export function Loader({ status }: LoaderProps) {
  const infoMessage = LoaderParam[status].info;
  const actionMessage = LoaderParam[status].action;
  return (
    <div className={css.lens}>
      <div className={css['hoop-frame']}></div>
      <div className={css['message-container']}>
        <div className={css.message}>
          <span className={css.actionName}>{infoMessage}</span>
          <p className={css.actionMessage}>{actionMessage}</p>
        </div>
      </div>
      <div className={css.shutter}>
        {SHUTTER_FLAPS.map((i) => (
          <div
            key={i}
            className={css.flap}
            style={
              {
                '--i': i,
                '--flaps': FLAPS_COUNT,
              } as ShutterStyle
            }
          />
        ))}
      </div>
    </div>
  );
}
