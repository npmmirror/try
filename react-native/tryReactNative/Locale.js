import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  List,
  Provider,
  Picker,
  DatePicker,
  SearchBar,
  Pagination,
} from '@ant-design/react-native';
import zhCN from '@ant-design/react-native/es/locale-provider/zh_CN';
import enUS from '@ant-design/react-native/es/locale-provider/en_US';
import ruRU from '@ant-design/react-native/es/locale-provider/ru_RU';
import esES from '@ant-design/react-native/es/locale-provider/es_ES';

const languages = [
  {
    value: '中国',
    label: '中国',
    language: zhCN,
  },
  {
    value: 'English',
    label: 'English',
    language: enUS,
  },
  {
    value: 'Русский',
    label: 'Русский',
    language: ruRU,
  },
  {
    value: 'Español',
    label: 'Español',
    language: esES,
  },
];
const maxDate = new Date(2018, 11, 3, 22, 0);
const minDate = new Date(2015, 7, 6, 8, 30);
const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];

class Locale extends Component {
  state = {
    locale: 'English',
  };

  handleChange = locale => {
    console.log(locale);
    this.setState({
      locale: locale[0],
    });
  };

  render() {
    const { locale } = this.state;
    const currentLocale = languages.find(item => item.value === locale)
      .language;
    console.log(currentLocale);
    return (
      <Provider locale={currentLocale}>
        <View>
          <Text>hello world</Text>
        </View>
        <Pagination total={5} current={1} />
        <View>
          <Text>{locale}</Text>
        </View>
        <Picker
          data={languages}
          cols={1}
          value={[locale]}
          onChange={this.handleChange}>
          <List.Item arrow="horizontal">Choose language</List.Item>
        </Picker>
        <DatePicker
          mode="date"
          title="Select date"
          minDate={minDate}
          maxDate={maxDate}>
          <List.Item arrow="horizontal">DatePicker</List.Item>
        </DatePicker>
        <Picker data={seasons} cascade={false}>
          <List.Item arrow="horizontal">Picker</List.Item>
        </Picker>
        <SearchBar placeholder="Search" showCancelButton />
      </Provider>
    );
  }
}

export default Locale;
