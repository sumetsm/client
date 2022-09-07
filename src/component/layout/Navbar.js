import { AppstoreOutlined, LoginOutlined, SettingOutlined ,HomeOutlined ,LogoutOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import {Link,useNavigate} from 'react-router-dom';
import Login from '../pages/auth/Login';
// Redux
import {useDispatch,useSelector} from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>({...state}))
  const navigate = useNavigate()
  const logout=()=>{
    console.log('logout already')
    dispatch({
      type:'LOGOUT',
      payload: null
    })
    navigate('/');
  }
  console.log('Navbar hello',user)
  return (
    <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to='/'>home</Link>
        </Menu.Item>
        <Menu.Item key="person"  icon={<AppstoreOutlined />}>
          <Link to='/person'>person</Link>
        </Menu.Item>
        {!user && (
        <Menu.Item key="login"  icon={<SettingOutlined />}>
          <Link to='/login'>login</Link>
        </Menu.Item>
        )}
        {!user && (
        <Menu.Item key="register"  icon={<LoginOutlined />}>
          <Link to='/register'>register</Link>
        </Menu.Item>
        )}
        {user && (
        <Menu.SubMenu key='submenu' title={user.name}>
          <Menu.Item key="logout"  icon={<LogoutOutlined />} onClick={logout}>
            logout
          </Menu.Item>
        </Menu.SubMenu>
        )}
        
    </Menu>
  )
  
}

export default Navbar;