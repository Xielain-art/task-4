import React, {useContext, useState} from 'react'
import {Button, Card, Col, Container, Form, OverlayTrigger, Popover, Row} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, USERS_LIST_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useToasts} from "react-toast-notifications";


const AuthPage = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const path = useLocation().pathname
    let isLogin
    if (path === LOGIN_ROUTE || path === '/') {
        isLogin = true
    }
    const {addToast} = useToasts()
    const click = async () => {
        let data
        try {
            if (isLogin) {
                data = await login(email, password)
            }
            if (!isLogin) {
                data = await registration(email, password)
            }
            setEmail('')
            setPassword('')
            user.setUser(data)
            user.setIsAuth(true)
            navigate(USERS_LIST_ROUTE)
        } catch (e) {
            setEmail('')
            setPassword('')
            addToast(e.response.data.message, {
                appearance: 'error',
                autoDismiss: true
            })

        }
    }
    return (
        <Container className='d-flex'>
            <Container className={'d-flex justify-content-center align-items-center'}
                       style={{height: window.innerHeight - 54}}>
                <Card style={{width: 600}}
                      className='p-5'>
                    <h2 className='m-auto'>{isLogin ? 'Authorization' : 'Registration'}</h2>
                    <h3>{}</h3>
                    <Form className='d-flex flex-column'>
                        <Form.Control className='mt-3'
                                      placeholder='Enter your email'
                                      value={email}
                                      onChange={e => setEmail(e.target.value)}
                                      type='email'/>
                        <Form.Control className='mt-2'
                                      placeholder='Enter your password'
                                      value={password}
                                      onChange={e => setPassword(e.target.value)}
                                      type='password'/>
                        <Row xs={"auto"}
                             className={'d-flex justify-content-between mt-3 align-items-center'}>
                            <Col>{isLogin ? 'Don\'t have an account?' : 'Have an account?\n'}
                                {isLogin ? <Link to={REGISTRATION_ROUTE}
                                                 className='ms-3'>Register</Link> :
                                    <Link to={LOGIN_ROUTE}
                                          className='ms-3'>Войти</Link>}
                            </Col>
                            <Col>

                                <Button onClick={click}>
                                    {isLogin ? 'Login' : 'Register'}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Container>
        </Container>
    )
})

export default AuthPage