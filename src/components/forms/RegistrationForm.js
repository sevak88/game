import React, { Component } from 'react';
import { Icon,  Button,   Form,  Input  } from 'antd';
import {connect} from "react-redux";
import { notificate }  from './../../functions';
import {getTranslate} from "react-localize-redux/lib/index";
import { Translate } from 'react-localize-redux';
import request from 'superagent';
import api from './../../api';
const FormItem = Form.Item;
class RegistrationForm extends Component {

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
                    .post(api.auth.register)
                    .send(values)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .then((response) => {
                        this.setState({
                            loading: false,
                        });
                        this.props.authenticate(response.body.payload.auth.access_token, response.body.payload.user);
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
        const { getFieldDecorator } = this.props.form;
        return(
            <Translate>
                {(translate, activeLanguage, languages) =>
                    <Form onSubmit={this.handleSubmit} className="registration-form">
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{required: true, message: translate('Please input your email!')}],
                            })(
                                <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Email"/>
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: translate('Please input your username!')}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder={translate("name")}/>
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
                            {getFieldDecorator('password_confirmation', {
                                rules: [{required: true, message: translate('Please confirm your Password!')}],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                       placeholder={translate("Confirm Password")}/>
                            )}
                        </FormItem>
                        <FormItem>


                            <Button type="primary" icon="user-add" htmlType="submit" className="block" loading={this.state.loading} >
                                {translate("Register")}
                            </Button>
                        </FormItem>
                    </Form>
                }
            </Translate>
        )
    }
}


const WrappedNormalRegistrationForm = Form.create()(RegistrationForm);
export default connect(
    state => ({
        appState: state,
        translate: getTranslate(state.locale)
    }),
    dispatch => ({
        authenticate: (token, profile) => {
            dispatch({
                type: "AUTH",
                payload:{
                    token,
                    profile
                }
            })
        }
    })
)(WrappedNormalRegistrationForm);


