import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import redux_mock_store from "redux-mock-store";

import Ship from '../components/ship';
import '../setupTests';
import thunk from 'redux-thunk';
import App from '../App';

const configureStore = redux_mock_store;
let store
describe('Ship List test', () => {
  beforeEach(() => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    store = mockStore([
      {
        ship:{
            list:[
            {
        name: 'test name',
        length: 'test desc',
        width: 'test price',
        code:'abc'
            }
        ]}

      }
    ]);
  })

  it('should render the component ship list from store', () => {
    const wrapper = shallow(<Provider store={store}><Ship /></Provider>);
    expect(wrapper).not.toBe(null)
  })
})