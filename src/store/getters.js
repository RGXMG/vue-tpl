/**
 * Created with JavaScript.
 * User: RGXMG
 * Email: rickgrimes9229@gmail.com/759237309@qq.com
 * Date: 2020/6/17
 * Time: 22:35
 *
 */

export default {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsNavBar.visitedViews,
  cachedViews: state => state.tagsNavBar.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  hasRoles: state => state.user.roles && state.user.roles.length > 0,
  permissionRoutes: state => state.user.routes,
};
