import { mockProducts } from '../../mock/mock';


export function ProductDescription() {
  const product = mockProducts[0];
  return (<div className="product__tabs-text">{product.description}</div>);
}
