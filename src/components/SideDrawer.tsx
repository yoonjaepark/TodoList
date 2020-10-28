import { Form, Drawer, Input, Select, DatePicker, Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { FormInstance } from 'antd/lib/form';
import { Todo } from '../interfaces';
import styled from 'styled-components';

interface Props {
    form: FormInstance,
    selected: Todo,
    showDrawer: boolean,
    onFinish: (values: Todo) => void,
    onClose: () => void,
}

const BottomButton = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
`;

export const SideDrawer = ({ selected, form, showDrawer, onClose, onFinish }: Props) => {
    const renderTitle = () => {
        return (
            <Form.Item
                name={'title'}
                style={{ marginBottom: 0 }}
                label={'제목'}
            >
                <Input disabled={selected.completed}/>
            </Form.Item>
        );
    };

    return (
        <Form
            form={form}
            initialValues={selected}
            name="form"
            onFinish={onFinish}
        >
            <Drawer
                title={renderTitle()}
                width={300}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={showDrawer}
            >
                <Form.Item name={'body'} label={'내용'}>
                    <TextArea disabled={selected.completed}/>
                </Form.Item>
                <Form.Item name={'priority'} label={'우선순위'}>
                    <Select disabled={selected.completed} style={{ width: 120 }} allowClear>
                        <Select.Option value="HIGH">높음</Select.Option>
                        <Select.Option value="MEDIUM">보통</Select.Option>
                        <Select.Option value="LOW">낮음</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name={'endDate'} label={'마감기한'}>
                    <DatePicker
                        disabled={selected.completed}
                        placeholder={'마감기한'}
                    />
                </Form.Item>
                {selected.completed ?
                    <BottomButton>
                        <Button
                            block
                            danger
                            type="primary"
                            size={'large'}
                            htmlType="submit"
                            onClick={form.submit}
                        >완료취소</Button>
                    </BottomButton> :
                    <BottomButton>
                        <Button
                            block
                            type="primary"
                            size={'large'}
                            htmlType="submit"
                            onClick={form.submit}
                        >저장</Button>
                    </BottomButton>
                }
            </Drawer>
        </Form>
    );
};
