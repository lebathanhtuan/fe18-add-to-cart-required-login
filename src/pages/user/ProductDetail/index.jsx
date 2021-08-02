import { useEffect } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import history from '../../../utils/history';

import { getProductDetailAction } from '../../../redux/actions';

function ProductDetailPage(props) {
  const { match } = props;
  const productId = parseInt(match.params.id);

  const { productDetail } = useSelector((state) => state.productReducer);
  console.log('🚀 ~ file: index.jsx ~ line 18 ~ ProductDetailPage ~ productDetail', productDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetailAction({ id: productId }));
  }, []);

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
      <Button onClick={() => history.push('/login')}>
        Đăng nhập để mua
      </Button>
    </>
  );
}

export default ProductDetailPage;
