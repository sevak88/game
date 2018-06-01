import React, { Component } from 'react';
import { connect } from 'react-redux'
import Stairs from './components/games/stairs/Stairs';
import Navigation from './components/Navigation';
import { initialize, getActiveLanguage, addTranslation, Translate  } from 'react-localize-redux';
import { LocaleProvider } from 'antd';
import en_US from  'antd/lib/locale-provider/en_US';
import fr_FR from  'antd/lib/locale-provider/fr_FR';
import ru_RU from 'antd/lib/locale-provider/ru_RU';

const locales = {
    en:en_US,
    fr:fr_FR,
    ru:ru_RU,
};
class App extends Component {

    constructor(props) {
        super(props);
        const languages = [
            { name: 'English', code: 'en' },
            { name: 'Русский', code: 'ru' },
            { name: 'Français', code: 'fr' },
        ];


        props.initLocales(initialize(languages, { defaultLanguage: "en" }));

        const menu = require('./translations/menu');
        const account = require('./translations/account');
        const forms = require('./translations/forms');
        const notifications = require('./translations/notifications');
        const games = require('./translations/games');
        const app = require('./translations/app');
        props.translate(addTranslation(Object.assign(menu, account, forms, notifications, games, app)))
    }


    render() {
        let currentLanguageCode = {};
        if(getActiveLanguage(this.props.appState.locale)){
            currentLanguageCode = getActiveLanguage(this.props.appState.locale).code
        }

        return (
            <LocaleProvider locale={locales[currentLanguageCode]}>
                  <div className="App">
                      <Navigation/>
                      <Stairs/>
                  </div>
            </LocaleProvider>
        );
    }
}

export default connect(
    state => ({
        appState: state
    }),
    dispatch => ({
        initLocales: (languages) => {
            dispatch(languages)
        },
        translate: (translations) => {
            dispatch(translations)
        }
    })
)(App);