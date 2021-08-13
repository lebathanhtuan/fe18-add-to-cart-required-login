import { useState, useEffect } from 'react';
import { Button, InputNumber } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import history from '../../../utils/history';

import {
  getProductDetailAction,
  addToCartAction,
} from '../../../redux/actions';

function ProductDetailPage({ match }) {
  const [productCount, setProductCount] = useState(1);

  const productId = parseInt(match.params.id);

  const { productDetail } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetailAction({ id: productId }));
  }, []);

  function handleAddToCart() {
    dispatch(addToCartAction({
      id: productDetail.data.id,
      name: productDetail.data.name,
      price: productDetail.data.price,
      count: productCount,
    }))
  }

  return (
    <>
      <Button onClick={() => history.goBack()}>
        Quay lại
      </Button>
      <div>Tên sản phẩm: {productDetail.data.name}</div>
      <div>Hãng: {productDetail.data.category?.name}</div>
      <div>
        Giá: {productDetail.data.price >= 0 && productDetail.data.price.toLocaleString()}
      </div>
      <InputNumber
        min={1}
        onChange={(value) => setProductCount(value)}
        value={productCount}
      />
      <div>
        <Button type="primary" onClick={() => handleAddToCart()}>
          Thêm vào giỏ
        </Button>
      </div>
    </>
  );
}

export default ProductDetailPage;
