import { cookie } from '@bf/util';
import { APP_CONFIG_WIDGET_SIZE, APP_CONFIG_SIDEBAR_STATUS } from '@constants';

const Cookies = {
  get: cookie.getCookie,
  set: cookie.setCookie,
};
const state = {
  sidebar: {
    opened: true,
    withoutAnimation: false,
  },
  device: 'desktop',
  language: null,
  size: Cookies.get(APP_CONFIG_WIDGET_SIZE) || 'medium',
};

const mutations = {
  /**
   * toggle sidebar
   * @param state
   * @constructor
   */
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set(APP_CONFIG_SIDEBAR_STATUS, 1);
    } else {
      Cookies.set(APP_CONFIG_SIDEBAR_STATUS, 0);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set(APP_CONFIG_SIDEBAR_STATUS, 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  SET_SIZE: (state, size) => {
    state.size = size;
    Cookies.set(APP_CONFIG_WIDGET_SIZE, size, { path: '/' });
  },
};

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device);
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language);
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
