import { BemClass } from '@/const/const';
import { Logo } from '../../header/logo';
import { FooterDescription } from './footer-description';
import { Social } from './social';

export function FooterInfo() {
  return (
    <div className="footer__info" data-testid="info-container">
      <Logo bemBlock={BemClass.Footer} data-testid="logo" />
      <FooterDescription data-testid="description" />
      <Social data-testid="social" />
    </div>
  );
}
