import { useState, useEffect } from "react";
import { Space, Row, Col, Card, Tag, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import {
  getProductListAction,
  getCategoryListAction,
} from '../../../redux/actions';

function HomePage() {
  const [categorySelected, setCategorySelect] = useState(undefined);
  const [searchKey, setSearchKey] = useState('');

  const { productList } = useSelector((state) => state.productReducer);
  const { categoryList } = useSelector((state) => state.categoryReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getProductListAction());
  }, []);

  function handleFilterCategory(categoryId) {
    setCategorySelect(categoryId);
    dispatch(getProductListAction({
      categoryId,
      searchKey,
    }));
  }

  function handleSearchProduct(value) {
    setSearchKey(value);
    dispatch(getProductListAction({
      searchKey: value,
      categoryId: categorySelected,
    }));
  }

  function renderCategoryFilter() {
    const categorySelectedData = categoryList.data.find((item) => item.id === categorySelected);
    if (!categorySelected && !searchKey) return null;
    return (
      <Space style={{ marginBottom: 16 }}>
        Đang filter theo:
        {categorySelected && (
          <Tag
            closable
            onClose={() => {
              setCategorySelect(undefined);
              dispatch(getProductListAction({
                categoryId: undefined,
                searchKey: searchKey
              }));
            }}>
            {categorySelectedData.name}
          </Tag>
        )}
        {searchKey && (
          <Tag
            closable
            onClose={() => {
              setSearchKey('');
              dispatch(getProductListAction({
                categoryId: categorySelected,
                searchKey: undefined,
              }));
            }}>
            {`Tìm theo từ khóa: ${searchKey}`}
          </Tag>
        )}
      </Space>
    )
  }

  function renderCategoryList() {
    return categoryList.data.map((categoryItem, categoryIndex) => {
      return (
        <p
          key={`category-item-${categoryItem.id}`}
          onClick={() => handleFilterCategory(categoryItem.id)}
          style={{
            color: categorySelected === categoryItem.id ? 'red' : 'black',
            cursor: 'pointer',
          }}
        >
          {categoryItem.name}
        </p>
      )
    })
  }

  function renderProductList() {
    return productList.data.map((productItem, productIndex) => {
      return (
        <Col span={6} key={`product-item-${productItem.id}`}>
          <Link to={`/product/${productItem.id}`}>
            <Card
              size="small"
              title={productItem.name}
            >
              <div>{productItem.price.toLocaleString()}</div>
            </Card>
          </Link>
        </Col>
      )
    })
  }

  return (
    <div>
      <div>Home Page</div>
      <div style={{ padding: 16 }}>
        <Row gutter={16}>
          <Col span={4}>
            <Card title="Category Filter" size="small">
              {renderCategoryList()}
            </Card>
          </Col>
          <Col span={20}>
            <Input
              placeholder="Search..."
              onChange={(e) => handleSearchProduct(e.target.value)}
              value={searchKey}
              suffix={<SearchOutlined />}
              style={{ marginBottom: 16 }}
            />
            {renderCategoryFilter()}
            <Row gutter={[16, 16]}>
              {renderProductList()}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
