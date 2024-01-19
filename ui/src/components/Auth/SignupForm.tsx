import { Button, Form, Input, Select } from 'antd'
import { useAppDispatch } from '../../hooks/store'
import { appSlice } from '../../store/app.reducer'
import { usePostUserMutation } from '../../store/users.api'
import { IUserPostBody } from '../../utils/interfaces/user'
import { errorNotification } from '../../utils/notifications'
import { validationRules } from '../../utils/validation'
import { useNavigate } from 'react-router-dom'

export default function SignupForm({ setIsSignUp }: { setIsSignUp: any }) {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const [postUser] = usePostUserMutation()

    function onFinish(user: IUserPostBody) {
        postUser(user).then((value: any) => {
            if (value.data) {
                const token = value.data.result
                dispatch(appSlice.actions.setToken(token))

                navigate('/forbidden')
            } else {
                // TODO: Handle validation errors
                const error = value.error?.msg || value.error?.data?.error
                errorNotification(
                    value.error?.originalStatus === 503 ? 'Signup is not available' : error,
                    'Signup Error'
                )
            }
        })
    }

    return (
        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off" className="auth-form">
            <Form.Item
                name="name"
                rules={[
                    validationRules.REQUIRED('please enter your name'),
                    validationRules.NAME('please enter your name'),
                ]}
            >
                <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
                name="company"
                rules={[
                    validationRules.REQUIRED('please enter your company'),
                    validationRules.NAME('please enter your company'),
                ]}
            >
                <Input placeholder="Company" />
            </Form.Item>

            <Form.Item name="role" rules={[validationRules.REQUIRED('please enter your role')]}>
                <Select placeholder="Role">
                    <Select.Option value="manager">Manager</Select.Option>
                    <Select.Option value="ceo">CEO</Select.Option>
                    <Select.Option value="engineer">Engineer</Select.Option>
                    <Select.Option value="qa">QA</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="email"
                rules={[
                    validationRules.EMAIL('invalid email'),
                    validationRules.REQUIRED('please enter your email!'),
                ]}
            >
                <Input type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    validationRules.REQUIRED('please enter your password'),
                    validationRules.PASSWORD(
                        'Password should contain from 6 to 20 chars, at lease one digit, lower and upper case letters and a special char: -#$.%&@(){}[]!?+*'
                    ),
                ]}
            >
                <Input.Password placeholder="Password" visibilityToggle={false} />
            </Form.Item>

            <div className="button">
                <Button className="button" htmlType="submit" type="primary">
                    Sign up
                </Button>

                <Button
                    style={{ color: '#1677ff' }}
                    className="button"
                    onClick={() => setIsSignUp(false)}
                    type="text"
                >
                    Sign in
                </Button>
            </div>
        </Form>
    )
}
