import { Space, Button, Dropdown, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { compose } from 'redux';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import history from '../../utils/history';
import i18n from '../../utils/locales/i18n';

import { logoutAction, changeThemeAction } from '../../redux/actions';

import * as Style from './styles';

function Header({
  type,
  isShowSidebar,
  setIsShowSidebar,
  logout,
  userInfo,
}) {
  const { theme } = useSelector((state) => state.commonReducer);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  function handleChangeLanguage(value) {
    i18n.changeLanguage(value)
  }

  function handleLogout() {
    localStorage.removeItem('userInfo');
    logout();
    if (type === 'admin') {
      history.push('/login');
    }
  }

  function renderUserDropdown() {
    return (
      <Menu>
        <Menu.Item onClick={() => history.push('/admin')}>Admin</Menu.Item>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item onClick={() => handleLogout()}>Logout</Menu.Item>
      </Menu>
    )
  }

  return (
    <Style.HeaderContainer>
      <Space>
        {type === 'admin' && (
          <Button
            type="text"
            icon={isShowSidebar
              ? <MenuFoldOutlined style={{ color: 'white' }} />
              : <MenuUnfoldOutlined style={{ color: 'white' }} />
            }
            onClick={() => setIsShowSidebar(!isShowSidebar)}
          >
          </Button>
        )}
        <Style.Logo>LOGO</Style.Logo>
      </Space>
      {type === 'user' && (
        <Space>
          <Link to="/">
            <Button type="link">Home</Button>
          </Link>
          <Link to="/about">
            <Button type="link">About</Button>
          </Link>
        </Space>
      )}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Style.CustomSelect
          onChange={(value) => handleChangeLanguage(value)}
          value={i18n.language}
        >
          <Style.CustomSelect.Option value="vi">VI</Style.CustomSelect.Option>
          <Style.CustomSelect.Option value="en">EN</Style.CustomSelect.Option>
        </Style.CustomSelect>
        <Style.CustomSelect
          onChange={(value) => dispatch(changeThemeAction(value))}
          value={theme}
        >
          <Style.CustomSelect.Option value="light">Light</Style.CustomSelect.Option>
          <Style.CustomSelect.Option value="dark">Dark</Style.CustomSelect.Option>
        </Style.CustomSelect>
        {userInfo.data.name
          ? (
            <Dropdown overlay={renderUserDropdown()} trigger={['click']}>
              <h3 style={{ margin: 0, color: 'white' }}>
                {userInfo.data.name}
              </h3>
            </Dropdown>
          )
          : (
            <Link to="/login">
              <Button type="primary">{t('header.login')}</Button>
            </Link>
          )
        }
      </div>
    </Style.HeaderContainer>
  );
}

const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  return {
    userInfo: userInfo,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  }
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Header);
