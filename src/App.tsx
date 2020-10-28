import React, { useState, useEffect } from 'react';
import { Button, Layout, Collapse, Form, Empty, PageHeader, Tag, Modal, message } from 'antd';
import './styles/index.css';
import './App.css';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/rootReducer';
import { actions } from './store/rootAction';
import { Todo } from './interfaces';
import moment from 'moment';
import { dateDiff } from './util/common';
import { SideDrawer } from './components/SideDrawer';
import { modalConfirm } from './util/modal';

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
        const counts = list.reduce((acc, current) => {
            if (current.endDate && dateDiff(current.endDate) > 0 && dateDiff(current.endDate) < 4) {
                acc.approach += 1;
            } else if (current.endDate && dateDiff(current.endDate) <= 0) {
                acc.overdue += 1;
            }
            return acc;
        }, { overdue: 0, approach: 0 });

        if (counts.approach) {
            message.warning(`마감기한이 3일 앞으로 다가온 일정 ${counts.approach}건`);
        }
        if (counts.overdue) {
            message.error(`마감기한이 지난 일정 ${counts.overdue}건`);
        }
    }, [list.length]);

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
        if (todo.selected.id && todo.selected.completed) {
            dispatch(actions.todos.patchFinishTodo({ ...values, id: todo.selected.id, completed: false }));
        } else if (todo.selected.id) {
            dispatch(actions.todos.patchTodo({ ...values, id: todo.selected.id }));
        } else {
            dispatch(actions.todos.postTodo({ ...values, completed: false }));
        }

        setShowDrawer(false);
    };

    const onEdit = (event: React.MouseEvent<HTMLElement>, todo: Todo) => {
        event.stopPropagation();
        if (todo.id) {
            dispatch(actions.todos.getTodo(todo.id));
            onOpen();
        }
    };

    const onDelete = async (event: React.MouseEvent<HTMLElement>, todo: Todo) => {
        event.stopPropagation();
        modalConfirm({ title: '삭제하시겠습니까?', callback: res => setDelete(res, todo) });
    };

    const setDelete = (res: boolean, todo: Todo) => {
        if (res && todo.id) {
            dispatch(actions.todos.deleteTodo(todo.id));
        }
    };

    const onComplete = (event: React.MouseEvent<HTMLElement>, todo: Todo) => {
        event.stopPropagation();
        if (todo.id) {
            dispatch(actions.todos.patchFinishTodo({ ...todo, completed: true }));
        }
    };

    const genExtra = (todo: Todo) => (
        <>
            {todo.endDate ? <Tag color={dateDiff(todo.endDate) > 0 ? 'warning' : 'error'}>{Math.abs(dateDiff(todo.endDate))}{dateDiff(todo.endDate) > 0 ? '일 뒤' : '일 지남'}</Tag> : ''}
            {!todo.completed ? (
                <Button type="primary" danger size={'small'} onClick={event => onComplete(event, todo)}>완료하기</Button>) : ''}
            <Button type="primary" size={'small'} onClick={event => onEdit(event, todo)}>수정</Button>
            <Button type="primary" size={'small'} onClick={event => onDelete(event, todo)}>삭제</Button>
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
            <SideDrawer
                form={form}
                onFinish={onFinish}
                onClose={onClose}
                selected={todo.selected}
                showDrawer={showDrawer}
            />
        </>
    );
};

export default App;
