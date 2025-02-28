import { BemClass } from '../../../const/const';
import { Logo } from '../../header/logo';
import { FooterDescription } from './footer-description';
import { Social } from './social';

export function FooterInfo() {
  return (
    <div className="footer__info">
      <Logo bemBlock={BemClass.Footer} />
      <FooterDescription />
      <Social />
    </div>
  );
}
