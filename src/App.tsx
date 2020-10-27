import React, { useState } from 'react';
import { Button, Layout, Collapse, Drawer } from 'antd';
import './styles/index.css';
import { EditOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const { Header, Content, Footer } = Layout;

const App = () => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const onClose = () => {
    setShowDrawer(false);
  };

  const genExtra = () => (
    <>
      <EditOutlined
        onClick={event => {
          event.stopPropagation();
          setShowDrawer(true);
        }}
      />
      <DeleteOutlined
        onClick={event => {
          event.stopPropagation();
        }}
      />
    </>
  );

  return (
    <>
      <Header>
        <Button icon={<PlusCircleOutlined/>}>
          추가하기
        </Button>
      </Header>
      <Layout>
        <Content>
          <Collapse
            defaultActiveKey={['1']} onChange={() => {
          }}
          >
            <Panel header="This is panel header 1" key="1" extra={genExtra()}>
              <p>1</p>
            </Panel>
            <Panel header="This is panel header 2" key="2" extra={genExtra()}>
              <p>2</p>
            </Panel>
          </Collapse>
        </Content>
      </Layout>
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={showDrawer}
      >
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;
