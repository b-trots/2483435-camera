import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';
import { FLAPS_COUNT, SHUTTER_FLAPS, TitleName } from '@/const/const';
import { useChangeTitle } from '@/hooks/use-change-title';
import css from './page-404.module.css';

interface ShutterStyle extends React.CSSProperties {
  '--i': number;
  '--flaps': number;
}

export function Page404() {
  useChangeTitle(TitleName.Page404);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className={`page-content ${css['page-content']}`}>
          <div className="container">
            <div className="page-content__columns">
              <div className="catalog__content">
                <div className={css['error-container']}>
                  <div className={css.lens}>
                    <div className={css['hoop-frame']}></div>
                    <div className={css['message-container']}>
                      <div className={css.message}>
                        <span className={css.errorCode}>404 ERROR</span>
                        <p className={css.errorMessage}>PAGE NOT FOUND</p>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
