import { ShutterStyle } from '@/components/page-404/page-404';
import { SHUTTER_FLAPS, FLAPS_COUNT, ExplanationWord } from '@/const/const';
import css from './loader.module.css';

export function Loading() {
  return (
    <div className={css.lens}>
      <div className={css['hoop-frame']}></div>
      <div className={css['message-container']}>
        <div className={css.message}>
          <span className={css.actionName}>{ExplanationWord.CreatingOrder}</span>
          <p className={css.actionMessage}>{ExplanationWord.Wait}</p>
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
