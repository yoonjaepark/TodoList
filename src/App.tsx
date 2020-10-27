import React, { useState, useEffect } from 'react';
import { Button, Layout, Collapse, Drawer, Input, DatePicker, Form, Select, Empty, PageHeader } from 'antd';
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
    const { list, finishList } = todo;
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(actions.todos.fetchTodoList());
        dispatch(actions.todos.fetchTodoFinishList());
    }, []);

    useEffect(() => {
        form.setFieldsValue({ ...todo.selected, endDate: todo.selected.endDate ? moment(todo.selected.endDate) : '' });
    }, [todo.selected]);

    const onClose = () => {
        dispatch(actions.todos.emptySelected());
        setShowDrawer(false);
    };

    const onCreated = () => {
        onOpen();
    };

    const onOpen = () => {
        setShowDrawer(true);
    };

    const onFinish = (values: Todo) => {
        if (todo.selected.id) {
            dispatch(actions.todos.patchTodo({ ...values, id: todo.selected.id }));
        } else {
            dispatch(actions.todos.postTodo({ ...values, completed: false }));
        }
        setShowDrawer(false);
    };

    const genExtra = (todo: Todo) => (
        <>
            {!todo.completed ? <Button
                type="primary" danger size={'small'} onClick={event => {
                event.stopPropagation();
                if (todo.id) {
                    dispatch(actions.todos.patchFinishTodo({ ...todo, completed: true }));
                }
            }}
            >완료하기</Button> : ''}
            <Button
                type="primary" size={'small'} onClick={event => {
                event.stopPropagation();
                if (todo.id) {
                    dispatch(actions.todos.getTodo(todo.id));
                    onOpen();
                }
            }}
            >수정</Button>
            <Button
                type="primary" size={'small'} onClick={event => {
                event.stopPropagation();
                if (todo.id) {
                    dispatch(actions.todos.deleteTodo(todo.id));
                }
            }}
            >삭제</Button>
        </>
    );

    const renderTodos = () => {
        if (!list.length) {
            return;
        }

        const result = list.map((value, index, array) => {
            return (
                <Panel
                    header={<span>{value.title}</span>}
                    key={value.id || ''}
                    extra={genExtra(value)}
                    disabled={value.completed}
                >
                    <p>{value.body}</p>
                </Panel>
            );
        });

        return (
            <Collapse>
                {result}
            </Collapse>
        );
    };

    const renderTodosFinish = () => {
        if (!finishList.length) {
            return;
        }

        const result = finishList.map((value, index, array) => {
            return (
                <Panel
                    header={<span>{value.title}</span>}
                    key={value.id || ''}
                    extra={genExtra(value)}
                    disabled={value.completed}
                >
                    <p>{value.body}</p>
                </Panel>
            );
        });

        return (
            <Collapse>
                {result}
            </Collapse>
        );
    };

    const renderEmpty = () => {
        return (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'일정이 없습니다.'}>
                <Button onClick={onCreated}>만들기</Button>
            </Empty>
        );
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
                    <PageHeader className="site-page-header-responsive" title={'일정'}/>
                    {list.length ? renderTodos() : renderEmpty()}
                    {finishList.length ? <PageHeader className="site-page-header-responsive" title={'완료일정'}/> : ''}
                    {finishList.length ? renderTodosFinish() : ''}
                </Content>
            </Layout>
            <Form
                form={form}
                initialValues={todo.selected}
                name="form"
                onFinish={onFinish}
            >
                <Drawer
                    title={
                        <Form.Item name={'title'} style={{ marginBottom: 0 }} label={'제목'}><Input disabled={todo.selected.completed}/></Form.Item>}
                    width={300}
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={showDrawer}
                >
                    <Form.Item name={'body'} label={'내용'}>
                        <TextArea disabled={todo.selected.completed}/>
                    </Form.Item>
                    <Form.Item name={'priority'} label={'우선순위'}>
                        <Select disabled={todo.selected.completed} style={{ width: 120 }} allowClear>
                            <Select.Option value="HIGH">높음</Select.Option>
                            <Select.Option value="MEDIUM">보통</Select.Option>
                            <Select.Option value="LOW">낮음</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={'endDate'} label={'마감기한'}>
                        <DatePicker
                            disabled={todo.selected.completed}
                            placeholder={'마감기한'}
                            onChange={() => {
                            }}
                        />
                    </Form.Item>
                    {todo.selected.completed ?
                        <Button
                            block
                            type="ghost"
                            disabled
                            size={'large'}
                            htmlType="submit"
                            onClick={form.submit}
                            style={{
                                position: 'absolute',
                                bottom: '0px',
                                left: 0,
                                padding: '0px 10px',
                            }}
                        >완료됨</Button> :
                        <Button
                            block
                            type="primary"
                            size={'large'}
                            htmlType="submit"
                            onClick={form.submit}
                            style={{
                                position: 'absolute',
                                bottom: '0px',
                                left: 0,
                                padding: '0px 10px',
                            }}
                        >저장</Button>
                    }
                </Drawer>
            </Form>
        </>
    );
};

export default App;
