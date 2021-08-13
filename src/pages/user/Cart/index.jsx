import { Card, Row, Col, Input, Button, notification } from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import history from '../../../utils/history';

import {
  minusItemCountAction,
  plusItemCountAction,
  deleteCartItemAction,
} from '../../../redux/actions';

function CartPage() {
  const { cartList } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  let totalPrice = 0;

  function handlePlusCount(index) {
    dispatch(plusItemCountAction({ index }));
  }

  function handleMinusCount(index) {
    if (cartList.data[index].count === 1) return null;
    dispatch(minusItemCountAction({ index }));
  }

  function handleDeleteItem(index) {
    dispatch(deleteCartItemAction({ index }));
  }

  function handleCheckout() {
    if (!userInfo.data.id) {
      notification.warn({
        message: 'Bạn chưa đăng nhập',
      });
    } else {
      history.push('/checkout');
    }
  }

  function renderCartItems() {
    return cartList.data.map((cartItem, cartIndex) => {
      totalPrice = totalPrice + cartItem.price * cartItem.count;
      return (
        <Card key={`cart-${cartItem.id}`} size="small" style={{ marginBottom: 8 }}>
          <Row>
            <Col span={8}>
              {cartItem.name}
            </Col>
            <Col span={4}>
              {cartItem.price.toLocaleString()}
            </Col>
            <Col span={6}>
              <Input.Group compact>
                <Button
                  icon={<MinusOutlined />}
                  onClick={() => handleMinusCount(cartIndex)}
                />
                <Input value={cartItem.count} readOnly style={{ width: 40, textAlign: 'center' }} />
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => handlePlusCount(cartIndex)}
                />
              </Input.Group>
            </Col>
            <Col span={4}>
              {(cartItem.price * cartItem.count).toLocaleString()}
            </Col>
            <Col span={2}>
              <Button
                type="text"
                danger
                icon={<CloseOutlined />}
                onClick={() => handleDeleteItem(cartIndex)}
              />
            </Col>
          </Row>
        </Card>
      );
    })
  }

  return (
    <div style={{ padding: 24 }}>
      Cart Page
      {cartList.data.length > 0
        ? (
          <>
            {renderCartItems()}
            <Row justify="end">
              Tổng: {totalPrice.toLocaleString()}
            </Row>
            <Button onClick={() => handleCheckout()}>Thanh Toán</Button>
          </>
        )
        : <div>Giỏ hàng trống</div>
      }
    </div>
  );
}

export default CartPage;
