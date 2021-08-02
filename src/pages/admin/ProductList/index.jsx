import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  Row,
  Button,
  Table,
  Space,
  Popconfirm,
} from "antd";
import moment from 'moment';

import ModifyProductModal from './components/ModifyProductModal';

import {
  getCategoryListAction,
  getProductListAction,
  createProductAction,
  editProductAction,
  deleteProductAction,
} from '../../../redux/actions';

function ProductListPage(props) {
  // "", "create", "edit"
  const [isShowModifyModal, setIsShowModifyModal] = useState('');
  const [modifyProductData, setModifyProductData] = useState({});

  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { productList } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getProductListAction());
  }, []);

  function handleSubmitForm(values) {
    if (isShowModifyModal === 'create') {
      dispatch(createProductAction({
        data: values,
      }));
    } else {
      dispatch(editProductAction({
        id: modifyProductData.id,
        data: values,
      }));
    }
    setIsShowModifyModal('');
  }

  const tableColumn = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (value) => {
        const categoryData = categoryList.data.find((item) => item.id === value);
        if (categoryData) return categoryData.name;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value) => value.toLocaleString(),
    },
    {
      title: 'Create At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => value && moment(value).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              ghost
              onClick={() => {
                setIsShowModifyModal('edit');
                setModifyProductData(record);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete this product?"
              onConfirm={() => dispatch(deleteProductAction({ id: record.id }))}
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        )
      }
    },
  ];

  const tableData = productList.data.map((productItem, productIndex) => {
    return {
      key: productIndex,
      ...productItem,
    }
  })
  console.log('🚀 ~ file: index.jsx ~ line 114 ~ tableData ~ tableData', tableData);

  return (
    <div>
      <div style={{ padding: 16 }}>
        <div>Product Manage</div>
        <Row justify="end" style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={() => {
              setIsShowModifyModal('create');
              setModifyProductData({ name: '', price: 0 });
            }}
          >
            Add Product
          </Button>
        </Row>
        <Table
          columns={tableColumn}
          dataSource={tableData}
          loading={productList.load}
        />
      </div>
      <ModifyProductModal
        isShowModifyModal={isShowModifyModal}
        setIsShowModifyModal={setIsShowModifyModal}
        handleSubmitForm={handleSubmitForm}
        modifyProductData={modifyProductData}
        categoryList={categoryList}
      />
    </div>
  );
}

export default ProductListPage;
