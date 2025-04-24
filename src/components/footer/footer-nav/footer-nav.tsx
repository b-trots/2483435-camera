import { FOOTER_NAVIGATE } from '@/const/const-navigate';
import { FooterNavItem } from './footer-nav-item';

export function FooterNav() {
  return (
    <ul className="footer__nav">
      {FOOTER_NAVIGATE.map(({ title, navigate }) => (
        <FooterNavItem title={title} navigate={navigate} key={title} />
      ))}
    </ul>
  );
}
