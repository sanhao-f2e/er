import { queryCommodity, removeCommodity, addCommodity, updateCommodity } from '@/services/api';

export default {
  namespace: 'commodity',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(queryCommodity, payload);
      yield put({
        type: 'save',
        payload: response,
      })
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addCommodity, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeCommodity, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *submit({payload}, {call, put}) {
      let callback
      if(payload.id) {
        callback = Object.keys(payload).length === 1 ? removeCommodity : updateCommodity
      } else {
        callback = addCommodity
      }
      const response = yield call(callback, payload)
      yield put({
        type: 'queryList',
        payload: response,
      })
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        data: action.payload,
      }
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
}