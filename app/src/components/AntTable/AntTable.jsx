import { Table } from 'antd';

function AntTable(props){
  return(
    <Table 
      columns={props.columns}
      dataSource={props.data}
      bordered
      rowKey={record => record.id}
    />
  )
}

export default AntTable;