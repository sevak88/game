import React, { Component } from 'react';
import {connect} from "react-redux";
import { Icon, Button,  Form,  Input  } from 'antd';
import { Translate } from 'react-localize-redux';
import request from 'superagent';
import api from './../../api';
import {getTranslate} from "react-localize-redux/lib/index";
import { notificate }  from './../../functions';
const FormItem = Form.Item;
class ResetPasswordForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            url: api.auth.forgot,
            reset:false
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
                    .post(this.state.url)
                    .send(values)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .then((response) => {
                        if(this.state.reset){
                            this.props.authenticate(response.body.payload.auth.access_token, response.body.payload.user);
                            this.props.hideAuthModal();
                        }

                        this.setState({
                            loading: false,
                            reset:true,
                            url:api.auth.reset,
                        });
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

                        <Form onSubmit={this.handleSubmit} className="reset-form">
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: translate('Please input your email!') }],
                        })(
                            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Email" readOnly={this.state.reset}/>
                        )}
                    </FormItem>
                            {this.state.reset ?
                                <div>
                                    <FormItem>
                                        {getFieldDecorator('reset_token', {
                                            rules: [{ required: true, message: translate('Please input key!') }],
                                        })(
                                            <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Key"/>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: translate('Please input new password!') }],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="New Password"/>
                                        )}
                                    </FormItem>
                                </div>
                                :null}
                    <FormItem>


                        <Button type="primary" htmlType="submit" className="block" icon={"lock"} loading={this.state.loading}>
                            {translate("Send")}
                        </Button>
                    </FormItem>
                </Form>}
            </Translate>
        )
    }
}


const WrappedNormalResetPasswordForm = Form.create()(ResetPasswordForm);

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
)(WrappedNormalResetPasswordForm);
