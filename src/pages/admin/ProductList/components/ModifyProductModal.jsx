import { useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
} from "antd";

function ModifyProductModal({
  isShowModifyModal,
  setIsShowModifyModal,
  handleSubmitForm,
  modifyProductData,
  categoryList,
}) {
  const [modifyProductForm] = Form.useForm();

  useEffect(() => {
    if (isShowModifyModal) {
      modifyProductForm.resetFields();
    }
  }, [isShowModifyModal]);

  function renderCategoryOptions() {
    return categoryList.data.map((categoryItem, categoryIndex) => (
      <Select.Option value={categoryItem.id} key={`category-${categoryItem.id}`}>
        {categoryItem.name}
      </Select.Option>
    ))
  }

  return (
    <Modal
      title={isShowModifyModal === "create" ? "Create Product" : "Edit Product"}
      visible={!!isShowModifyModal}
      onOk={() => modifyProductForm.submit()}
      onCancel={() => setIsShowModifyModal('')}
    >
      <Form
        form={modifyProductForm}
        name="modify-product"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={modifyProductData}
        onFinish={(values) => handleSubmitForm(values)}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Please input your category!" }]}
        >
          <Select>
            {renderCategoryOptions()}
          </Select>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input your price!" }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModifyProductModal;
