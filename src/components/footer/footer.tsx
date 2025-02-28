import { FooterInfo } from './footer-info/footer-info';
import { FooterNav } from './footer-nav/footer-nav';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <FooterInfo />
        <FooterNav />
      </div>
    </footer>
  );
}
