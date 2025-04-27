import { FooterInfo } from './footer-info/footer-info';
import { FooterNav } from './footer-nav/footer-nav';

export function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="container" data-testid="container">
        <FooterInfo />
        <FooterNav />
      </div>
    </footer>
  );
}
