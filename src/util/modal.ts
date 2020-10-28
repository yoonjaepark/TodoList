import { Modal } from 'antd';

interface IModalConfirm {
    title: string;
    content?: string;
    callback: (res: boolean) => void;
}

export const modalConfirm = ({ title, content = '확인해주세요', callback }: IModalConfirm) => {
    Modal.confirm({
        title: title,
        content: content,
        okText: '확인',
        cancelText: '취소',
        onOk: () => callback(true),
        onCancel: () => callback(false),
    });
};


