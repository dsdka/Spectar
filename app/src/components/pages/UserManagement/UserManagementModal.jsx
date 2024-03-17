import { Modal, Input, Card, Select } from "antd";
import classes from './UserManagement.module.css';

function UserManagementModal(props){

  const userRoleOptions = [
    {
      value: 1,
      label: 'Администратор',
    },
    {
      value: 2,
      label: 'Подител',
    },
    {
      value: 3,
      label: 'Терапевт',
    }
  ]
  return (
    <Modal 
      title={props.title}
      open={props.open} 
      onOk={props.handleOk} 
      onCancel={props.handleCancel}
      okText='Submit'
      cancelText='Cancel'
      >
      <Card className={classes.wrapper}>
        <div className={classes.flex}>
          <div>Потребител</div>
          <div className={classes.form}>
            <Input 
              type='text'
              name='user_name'
              value={props.data.user_name || ''}
              onChange={props.handleChangeInput}
            />
          </div>
        </div>
        <div className={classes.flex}>
          <div>Парола</div>
          <div className={classes.form}>
            <Input 
              type='text'
              name='password'
              value={props.data.password || ''}
              onChange={props.handleChangeInput}
            />
          </div>
        </div>
        <div className={classes.flex}>
          <div>Име</div>
          <div className={classes.form}>
            <Input 
              type='text'
              name='first_name'
              value={props.data.first_name || ''}
              onChange={props.handleChangeInput}
            />
          </div>
        </div>
        <div className={classes.flex}>
          <div>Фамилия</div>
          <div className={classes.form}>
            <Input 
              type='text'
              name='last_name'
              value={props.data.last_name || ''}
              onChange={props.handleChangeInput}
            />
          </div>
        </div>
        <div className={classes.flex}>
          <div>Телефон:</div>
          <div className={classes.form}>
            <Input 
              type='text'
              name='phone'
              value={props.data.phone}
              onChange={props.handleChangeInput || ''}
            />
          </div>
        </div>
        <div className={classes.flex}>
          <div>Роля:</div>
          <div className={classes.form}>
            <Select 
              options={userRoleOptions}
              name='user_role_id'
              value={props.data.user_role_id}
              onChange={props.handleChangeSelect}
              style={{
                width: '100%',
              }}
            />
          </div>
        </div>
      </Card>
      </Modal>
  )

}

export default UserManagementModal;