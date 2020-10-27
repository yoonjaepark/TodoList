import React, { useState, useEffect } from 'react';
import { Button, Layout, Collapse, Drawer, Input, DatePicker, Form, Select } from 'antd';
import './styles/index.css';
import { EditOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/rootReducer';
import { actions } from './store/rootAction';
import TextArea from 'antd/es/input/TextArea';
import { Todo } from './interfaces';
import moment from 'moment';

const { Panel } = Collapse;

const { Header, Content } = Layout;

const App = () => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const todo = useSelector((state: RootState) => state.todo);
  const { list } = todo;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(actions.todos.fetchTodoList());
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ...todo.selected, endDate: todo.selected.endDate ? moment(todo.selected.endDate) : '' });
  }, [todo.selected]);

  const onClose = () => {
    setShowDrawer(false);
  };

  const onCreated = () => {
    dispatch(actions.todos.emptySelected());
    onOpen();
  };

  const onOpen = () => {
    setShowDrawer(true);
  };

  const onFinish = (values: Todo) => {
    if (todo.selected.id) {
      dispatch(actions.todos.patchTodo({ ...values, id: todo.selected.id }));
    } else {
      dispatch(actions.todos.postTodo(values));
    }
    setShowDrawer(false);
  };

  const genExtra = (id: number | undefined) => (
    <>
      <EditOutlined
        onClick={event => {
          event.stopPropagation();
          dispatch(actions.todos.getTodo(id));
          onOpen();
        }}
      />
      <DeleteOutlined
        onClick={event => {
          event.stopPropagation();
        }}
      />
    </>
  );

  const renderTodos = () => {
    return list.map((value, index, array) => {
      return (
        <Panel header={value.title} key={value.id || ''} extra={genExtra(value!.id)}>
          <p>{value.body}</p>
        </Panel>
      );
    });
  };

  return (
    <>
      <Header>
        <Button onClick={onCreated} icon={<PlusCircleOutlined/>}>
          추가하기
        </Button>
      </Header>
      <Layout>
        <Content>
          <Collapse
            onChange={() => {
            }}
          >
            {renderTodos()}
          </Collapse>
        </Content>
      </Layout>
      <Form
        form={form}
        initialValues={todo.selected}
        name="form"
        onFinish={onFinish}
      >
        <Drawer
          title={<Form.Item name={'title'} style={{ marginBottom: 0 }} label={'제목'}><Input/></Form.Item>}
          width={300}
          placement="right"
          closable={false}
          onClose={onClose}
          visible={showDrawer}
        >
          <Form.Item name={'body'} label={'내용'}>
            <TextArea/>
          </Form.Item>
          <Form.Item name={'priority'} label={'우선순위'}>
            <Select style={{ width: 120 }} allowClear>
              <Select.Option value="HIGH">높음</Select.Option>
              <Select.Option value="MEDIUM">보통</Select.Option>
              <Select.Option value="LOW">낮음</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={'endDate'} label={'마감기한'}>
            <DatePicker
              placeholder={'마감기한'}
              onChange={() => {
              }}
            />
          </Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            onClick={form.submit}
            style={{
              position: 'absolute',
              bottom: '0px',
              left: 0,
              padding: '0px 10px',
            }}
          >저장</Button>
        </Drawer>
      </Form>
    </>
  );
};

export default App;
