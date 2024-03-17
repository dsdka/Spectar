import { useEffect, useState } from "react";

import userManagementRequestHandler from "../../../api/userManagementRequestHandler";
import UserManagementModal from "./UserManagementModal";
import AntTable from "../../AntTable/AntTable";
import { Button, Tooltip} from "antd";

import ConfirmationModal from "../../UI/ConfirmationModal/ConfirmationModal";

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import classes from './UserManagement.module.css';

function UserManagement(){

  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
const [id, setId] = useState(null);

  const columns = [
    {
      title: 'Потребител',
      width: 100,
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: 'Име',
      width: 100,
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Фамилия',
      width: 100,
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Телефон',
      width: 100,
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Роля',
      width: 100,
      dataIndex: 'user_role',
      key: 'user_role',
    },
    {
      title: 'Действия',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (dataRow) => (
        <div className={classes.actionWrapper}>
          <Tooltip placement="bottom" title="Изтриване" color='#157eb2'>
          <DeleteOutlined style={{ fontSize: '24px', color: '#157eb2' }} onClick={(_e) => deleteUser(dataRow)}/>
          </Tooltip>
          <Tooltip placement="bottom" title="Актуализиране" color='#157eb2'>
        <EditOutlined style={{ fontSize: '24px', color: '#157eb2' }} onClick={(_e)=> {editUser(dataRow)}} />
        </Tooltip>
        </div>
      ),
    },
  ]

  const createNewUser = () => {
    setIsNew(true);
    setOpenModal(true)
  }

  const handleOk = () => {
    const request = isNew ? userManagementRequestHandler.createUser(userData) : userManagementRequestHandler.updateUser(userData)
    request.then(resp => {
      console.log(resp)
      loadData();
      setIsNew(false);
      setUserData({})
      setOpenModal(false);
    }, (error) => {
      console.log(error)
    }).catch((error) => {
      console.log('Error', error)
    })
  }

  const handleCancel = () => {
    setIsNew(false);
    setUserData({})
    setOpenModal(false);
  }

  const deleteUser = (dataRow) => {
    const id = dataRow.id;
    setId(id);
    setOpenConfirmation(true);
  }

  const deleteUserConfirmation = () => {
   
    userManagementRequestHandler.deleteUser(id).then(resp => {
      console.log(resp)
      loadData();
      setId(null);
      setOpenConfirmation(false)
    },(error) => {
      console.log(error)
    }).catch((error) => {
      console.log('Error', error)
    })
  }
  const editUser = ( dataRow) => {
    console.log('dataRow', dataRow)
    setUserData(dataRow);
    setIsNew(false);
    setOpenModal(true);
  }

  useEffect(()=> {
    loadData();
  }, [])

  const loadData = () => {
    userManagementRequestHandler.getUsers().then(res => {
      if (res) {
        console.log('resData',res)
        setData(res)
      }
    }, (error)=>{
      console.log(error)
    })
  }

  const handleChangeInput = (event) => {
const { name, value} = event.target;
const newUserData = {
  ...userData,
  [name]: value
}
setUserData(newUserData);
  }

  const handleChangeSelect = (value) => {
    const newUserData = {
      ...userData,
      user_role_id: value
    }
    setUserData(newUserData)
  }

  const onCancelConfirmation = () => {
    setId(null);
    setOpenConfirmation(false)
  }
  return (
    <div>
      <div className={classes.addBtn}>
      <Button onClick={createNewUser}>Create User</Button>
      </div>
   <AntTable 
      columns={columns}
      data={data}
   />

<UserManagementModal 
  title={isNew? 'Create User' : 'Update User'}
  open={openModal}
  handleOk={handleOk}
  handleCancel={handleCancel}
  data={userData}
  handleChangeInput={handleChangeInput}
  handleChangeSelect={handleChangeSelect}
/>
<ConfirmationModal 
  title='Warning'
  open={openConfirmation} 
  onOk={deleteUserConfirmation} 
  onCancel={onCancelConfirmation}
  okText='Delete'
  content='Are you shure to delete user'
/>
 </div>
  )
}

export default UserManagement;