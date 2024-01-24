import { Form, Input, Modal, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { usePostDoc } from '../../hooks/store/docs.api'
import { validationRules } from '../../utils/validation'

interface IProps {
    isModalOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export default function AddDocModal({ isModalOpenState }: IProps) {
    const [form] = useForm()
    const postDoc = usePostDoc()

    const handleOk = () => {
        form.validateFields()
            .then(async (data: any) => {
                const body: any = {}

                Object.keys(data).forEach(key => {
                    if (data[key] !== undefined && key !== 'id') {
                        body[key] = data[key]
                    }
                })

                postDoc(body)
                form.resetFields()

                isModalOpenState[1](false)
            })
            .catch(() => {})
    }

    const handleCancel = () => {
        isModalOpenState[1](false)
    }
    return (
        <Modal title="New doc" open={isModalOpenState[0]} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Form.Item
                        style={{ width: '100%' }}
                        name="title"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder="Title" maxLength={100} />
                    </Form.Item>
                </div>
                <Form.Item name="type" rules={[validationRules.REQUIRED()]}>
                    <Select placeholder="Type">
                        <Select.Option value="google-sheets">Google Sheets</Select.Option>
                        <Select.Option value="google-docs">Google Docs</Select.Option>
                        <Select.Option value="web-page">Web Page</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="reference">
                    <Input placeholder="Reference" maxLength={500} />
                </Form.Item>
            </Form>
        </Modal>
    )
}
