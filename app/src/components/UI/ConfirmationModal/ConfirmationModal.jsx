import { Modal, Card} from 'antd';
import classes from './ConfirmationModal.module.css';

function ConfirmationModal(props){

return (
  <Modal 
    title={props.title}
    open={props.open} 
    onOk={props.onOk} 
    onCancel={props.onCancel}
    okText={props.okText}
    cancelText='Cancel'
    >
    <Card className={classes.wrapper}>
      <h1>{props.content}</h1>
      </Card>
    </Modal>
)
 }

 export default ConfirmationModal;