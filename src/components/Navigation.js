import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setActiveLanguage, Translate, getActiveLanguage } from 'react-localize-redux';
import { Icon, Menu, Button, Modal, Tabs, Input, Divider } from 'antd';
import LoginForm from './forms/LoginForm'
import RegistrationForm from './forms/RegistrationForm'
import ResetPasswordForm from './forms/ResetPasswordForm'
import DepositForm from "./forms/DepositForm";
import {getTranslate} from "react-localize-redux/lib/index";
import { notificate }  from './../functions';
import request from 'superagent';
import api from './../api';
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
class Navigation extends Component {

    constructor(props){
        super(props);

        this.state = {
            authModal: false,
            current: '2',
            mode: "horizontal",
            collapsed: false,
            loading:false
        };
        const browserLanguage = navigator.language.substring(0, 2);
        props.onChangeLocale(browserLanguage);
    }

    showModal = () => {
        this.setState({
            authModal: true,
        });
    };

    hideAuthModal = () => {
        this.setState({
            authModal: false,
        });
    };

    logOut = () => {
        this.setState({
            loading: true
        });
        request
            .post(api.auth.logout)
            //.send(values)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + this.props.appState.user.token)
            .set('Accept', 'application/json')
            .then((response) => {
                if(response.body.notifications){
                    notificate(response.body.response, response.body.notifications);
                }
                this.props.onLogOut();
                this.setState({
                    loading: false
                });
            })
            .catch((error) => {
                if(error.response){
                    notificate(error.response.body.response, error.response.body.errors)
                }else{
                    notificate("error", {"Error":  [error.message]});
                }
                this.props.onLogOut();
                this.setState({
                    loading: false
                });
            });
    };




    handleClick = (e) => {
        switch (e.key){
            case "auth" :
                this.showModal();
                break;
            case "faucet":
                this.faucetModal();
                break;
            case "cash-out":
                this.cashOutModal();
                break;
            case "deposit":
                this.depositModal();
                break;
            case "locale_en_US":
            case "locale_ru_RU":
            case "locale_fr_FR":
                this.props.onChangeLocale(e.item.props.code);
                break;
            case "log_out":
                this.logOut();
                break;
            default :
                this.props.onChangeLocale("en");
                break;

        }
        this.setState({
            current: e.key,
        });
    };

    updateDimensions = () => {
        this.setState({
            mode: (window.innerWidth >= 750) ?  "horizontal" : "inline",
            collapsed: (window.innerWidth < 750),
        })
    };
    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    faucetModal = () => {
        Modal.confirm({
            iconType: 'check-circle-o',
            title: this.props.translate('Faucet'),
            okText: 'Get It Free',
            closable: true,
            content: (
                <div>
                    <p> {this.props.translate("Get money for free, every n minutes")}</p>
                    <Input placeholder="Basic usage" disabled={true} value={"0.001 sat"} size={"large"} addonBefore={<Icon type="check-circle-o" />}/>
                    <Divider/>
                    <Input placeholder="Basic usage" disabled={true} value={"10 min"}addonBefore={<Icon type="clock-circle-o" />}/>
                </div>
            ),
            onOk() {

            },
            onCancel() {},
        });
    };

    cashOutModal = () => {
        Modal.confirm({
            iconType: 'check-circle-o',
            title:  this.props.translate('CashOut'),
            okText: 'Get It Free',
            closable: true,
            content: (
                <div>
                    <p>Get money for free, every 15 minutes</p>
                    <Input placeholder="Basic usage" disabled={true} value={"0.001 sat"} size={"large"} addonBefore={<Icon type="check-circle-o" />}/>
                    <Divider/>
                    <Input placeholder="Basic usage" disabled={true} value={"10 min"}addonBefore={<Icon type="clock-circle-o" />}/>
                </div>
            ),
            onOk()  {

            }
        });
    };


    depositModal = () => {
        Modal.info({
            iconType: 'wallet',
            title: this.props.translate('Deposit'),
            closable: true,
            okText: 'Cancel',
            okType: "dashed",
            content: (
                <DepositForm />
            ),
            onOk() {

            },
            onCancel() {},
        });
    };



    render() {

        return (
            <div>
                {this.state.mode === "inline" ?
                <Button type="primary" onClick={this.toggleCollapsed} className={"menu-collapse"}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                    : null}
            <Menu
                theme="dark"
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode={this.state.mode}
                className={"app-navigation"}
                inlineCollapsed={this.state.collapsed}
            >
                <Menu.Item key="cash-out">
                    <Icon type="upload" />
                    <span><Translate id={"CashOut"}/></span>
                </Menu.Item>
                <Menu.Item key="deposit">
                    <Icon type="wallet" />
                    <span><Translate id={"Deposit"}/></span>
                </Menu.Item>
                <Menu.Item key="faucet">
                    <Icon type="bell" />
                    <span><Translate id={"Faucet"}/></span>
                </Menu.Item>

                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu className={"desktop-right"} key="locale" title={<span><Icon type="global" /><span>{getActiveLanguage(this.props.appState.locale).name}</span></span>}>
                    <Menu.Item key="locale_en_US" locale="en_US" code="en" language="English">English</Menu.Item>
                    <Menu.Item key="locale_ru_RU" locale="ru_RU" code="ru" language="Русский">Русский</Menu.Item>
                    <Menu.Item key="locale_fr_FR" locale="fr_FR" code="fr" language="Français">Français</Menu.Item>
                </SubMenu>
                {(! this.props.appState.user.token)
                    ?
                        <Menu.Item key="auth" className={"auth desktop-right ant-menu-item-selected"} >
                            <Icon type="user" />
                            <span><Translate id={"Sign In"}/></span>
                        </Menu.Item>
                    :
                        <SubMenu className={"auth desktop-right ant-menu-item-selected"}  key="auth" title={<span><Icon type={this.state.loading ? "loading" : "user"}/><span>{this.props.appState.user.profile.name}</span></span>}>
                            <Menu.Item key="91">Option 9</Menu.Item>
                            <Menu.Item key="log_out">Log Out</Menu.Item>
                        </SubMenu>
                }
            </Menu>

                <Modal
                    title={<span><Icon type="user" /> <Translate id={"Authentication"}/></span>}
                    visible={this.state.authModal}
                    onCancel={this.hideAuthModal}
                    footer={null}
                >
                    <Tabs defaultActiveKey="login" >
                        <TabPane tab={<span><Icon type="user" /><Translate id={"Login"}/></span>} key="login">
                            <LoginForm hideAuthModal={this.hideAuthModal} />
                        </TabPane>
                        <TabPane tab={<span><Icon type="user-add" /><Translate id={"Registration"}/></span>} key="registration">
                            <RegistrationForm hideAuthModal={this.hideAuthModal}/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="lock" /><Translate id={"Reset password"}/></span>} key="reset">
                            <ResetPasswordForm  hideAuthModal={this.hideAuthModal}/>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        );
    }
}


export default connect(
    state => ({
        appState: state,
        translate: getTranslate(state.locale)
    }),
    dispatch => ({
        onChangeLocale: (locale) => {
            dispatch(setActiveLanguage(locale))
        },
        onLogOut: () => {
            dispatch({
                type: "AUTH",
                payload:{
                    token: null,
                    profile: null
                }
            })
        }
    })
)(Navigation);