import React, { Component } from 'react';
import {connect} from "react-redux";
import api from './../../api';
import { notificate }  from './../../functions';
import { Icon,  Button,   Form, Checkbox, Input  } from 'antd';
import { Translate } from 'react-localize-redux';
import request from 'superagent';
import {getTranslate} from "react-localize-redux/lib/index";
const FormItem = Form.Item;

class LoginForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true,
                });
                request
                    .post(api.auth.login)
                    .send(values)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .then((response) => {
                        this.setState({
                            loading: false,
                        });
                        this.props.authenticate(response.body.payload);
                        this.props.rates(response.body.payload);
                        this.props.hideAuthModal();
                        if(response.body.notifications){
                            notificate(response.body.response, response.body.notifications);
                        }
                    })
                    .catch((error) => {
                        if(error.response){
                            notificate(error.response.body.response, error.response.body.errors)
                        }else{
                            notificate("error", {"Error":  [error.message]});
                        }
                        this.setState({
                            loading: false,
                        });
                    });


            }
        });
    };
    render(){

        console.log("appState", this.props.appState);
        const { getFieldDecorator } = this.props.form;
        return(
            <Translate>
                {(translate, activeLanguage, languages) =>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{required: true, message: translate('Please input your email!')}],
                            })(
                                <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Email"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: translate('Please input your Password!')}],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                       placeholder={translate("Password")}/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>{translate("Remember me")}</Checkbox>
                            )}

                            <Button type="primary" icon={"user"} htmlType="submit" className="block" loading={this.state.loading} >
                                {translate("Log in")}
                            </Button>

                        </FormItem>
                    </Form>
                }
            </Translate>
        )
    }
}


const WrappedNormalLoginForm = Form.create()(LoginForm);


export default connect(
    state => ({
        appState: state,
        translate: getTranslate(state.locale)
    }),
    dispatch => ({
        authenticate: (payload) => {
            dispatch({
                type: "AUTH",
                payload:{
                    token:      payload.auth.access_token,
                    profile:    payload.user,
                    rates:      payload.rates
                }
            })
        },
        rates: (payload) => {
            dispatch({
                type: "RATES",
                payload:{
                    rates:      payload.rates
                }
            })
        }
    })
)(WrappedNormalLoginForm);