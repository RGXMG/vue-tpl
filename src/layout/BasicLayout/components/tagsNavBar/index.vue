<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <!--  tag上的contextmenu  -->
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <!-- 刷新 -->
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <!-- 关闭当前 -->
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭当前
      </li>
      <!-- 关闭其他 -->
      <li @click="closeOthersTags">关闭其他</li>
      <!-- 关闭所有 -->
      <li @click="closeAllTags(selectedTag)">全部关闭</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane';
import path from 'path';

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
    };
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsNavBar.visitedViews;
    },
    routes() {
      return this.$store.state.user.routes;
    },
  },
  watch: {
    $route() {
      this.addTags();
      this.moveToCurrentTag();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu);
      } else {
        document.body.removeEventListener('click', this.closeMenu);
      }
    },
  },
  mounted() {
    this.initTags();
    this.addTags();
  },
  methods: {
    /**
     * 当前route是否为激活状态
     * @return {boolean}
     */
    isActive(route) {
      return route.path === this.$route.path;
    },
    /**
     * 当前tag是否开启affix功能
     * @return {boolean}
     */
    isAffix(tag) {
      return tag.meta && tag.meta.affix;
    },
    /**
     * 筛选具有affix功能的tag
     * @return {array<{fullPath: string, path: string, name: string, meta: object}>}
     */
    filterAffixTags(routes, basePath = '/') {
      let tags = [];
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    },

    /**
     * 初始化tags
     * 1. 从routes筛选所有开启affix功能的route并添加到visited中
     */
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          console.log(tag.name);
          this.$store.dispatch('tagsNavBar/addVisitedView', tag);
        }
      }
    },
    /**
     * 将当前route添加为tag
     * 必须保证route配置了name
     * 且该name必须和component一致
     */
    addTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch('tagsNavBar/addView', this.$route);
      }
      return false;
    },
    /**
     * 找出应该被激活的tag，并激活
     */
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        const { path, fullPath } = this.$route;
        const curTag = tags.find(t => t.to.path === path);
        if (curTag) {
          this.$refs.scrollPane.moveToTarget(curTag);
          // 如果query不同，需要更新store中保存的view
          if (curTag.to.fullPath !== fullPath) {
            this.$store.dispatch('tagsNavBar/updateVisitedView', this.$route);
          }
        }
      });
    },
    /**
     * 刷新选择select tag
     * 利用redirect组件
     * @param view
     */
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsNavBar/delCachedView', view).then(() => {
        const { fullPath } = view;
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath,
          });
        });
      });
    },
    /**
     * 关闭tag
     * 需要选择的tag是否为激活状态
     * @param view
     * @returns {Promise<void>}
     */
    async closeSelectedTag(view) {
      const { visitedViews } = await this.$store.dispatch('tagsNavBar/delView', view);
      if (this.isActive(view)) {
        this.toLastView(visitedViews, view);
      }
    },
    /**
     * 关闭除当前tag之外的其他所有tag
     * 先将路由切换到当前选择的tag上
     */
    closeOthersTags() {
      this.$router.push(this.selectedTag);
      this.$store.dispatch('tagsNavBar/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag();
      });
    },
    /**
     * 关闭所有的tag并将位置移动到最后一个tag上
     * @param view
     */
    closeAllTags(view) {
      this.$store.dispatch('tagsNavBar/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return;
        }
        this.toLastView(visitedViews, view);
      });
    },
    /**
     * 移动到最后一个tag上
     * @param visitedViews
     * @param view
     */
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.fullPath);
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'home') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath });
        } else {
          this.$router.push('/');
        }
      }
    },
    /**
     * 打开tag上的contextmenu
     * @param tag
     * @param e
     */
    openMenu(tag, e) {
      const menuMinWidth = 105;
      // container margin left
      const offsetLeft = this.$el.getBoundingClientRect().left;
      // container width
      const offsetWidth = this.$el.offsetWidth;
      // left boundary
      const maxLeft = offsetWidth - menuMinWidth;
      // 15: margin right
      const left = e.clientX - offsetLeft + 15;
      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.clientY;
      this.visible = true;
      this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    },
    handleScroll() {
      this.closeMenu();
    },
  },
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
