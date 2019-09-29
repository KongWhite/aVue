<template>
  <main
    class="site-content"
    :class="{
      'site-content--tabs': $route.meta.isTab,
      'min-width': $route.meta.isTab
    }"
  >
    <el-tabs
      v-if="$route.meta.isTab"
      v-model="mainTabsActiveName"
      closable
      @tab-click="selectedTabHandle"
      @tab-remove="removeTabHandle"
    >
      <el-dropdown class="site-tabs__tools" :show-timeout="0">
        <i class="el-icon-arrow-down el-icon--right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="tabsCloseCurrentHandle">
            关闭当前标签页
          </el-dropdown-item>
          <el-dropdown-item @click.native="tabsCloseOtherHandle">
            关闭其它标签页
          </el-dropdown-item>
          <el-dropdown-item @click.native="tabsCloseAllHandle">
            关闭全部标签页
          </el-dropdown-item>
          <el-dropdown-item @click.native="tabsRefreshCurrentHandle">
            刷新当前标签页
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tab-pane
        :key="item.name"
        v-for="item in mainTabs"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
      <el-card style="min-height:800px;">
        <transition name="fade">
          <keep-alive>
            <router-view :key="key" v-show="show"></router-view>
          </keep-alive>
        </transition>
      </el-card>
    </el-tabs>
    <el-card style="min-height:800px;" v-else>
      <transition name="fade">
        <router-view :key="key" v-show="show"></router-view>
      </transition>
    </el-card>
  </main>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  },
  mounted() {
    this.show = true;
  },
  computed: {
    key() {
      return this.$route.path + Math.random();
    },
    mainTabsActiveName: {
      get() {
        return this.$store.state.common.mainTabsActiveName;
      },
      set(val) {
        this.$store.commit("common/updateMainTabsActiveName", val);
      }
    },
    mainTabs: {
      get() {
        return this.$store.state.common.mainTabs;
      },
      set(val) {
        this.$store.commit("common/updateMainTabs", val);
      }
    }
  },
  methods: {
    // 关闭当前标签页
    tabsCloseCurrentHandle() {
      this.removeTabHandle(this.mainTabsActiveName);
    },

    // 关闭其它标签页
    tabsCloseOtherHandle() {
      this.mainTabs = this.mainTabs.filter(
        item => item.name === this.mainTabsActiveName
      );
    },

    // 关闭全部标签页
    tabsCloseAllHandle() {
      this.mainTabs = [];
      this.mainTabsActiveName = "";
      this.$router.push({ path: "/" });
    },

    // 刷新当前标签页
    tabsRefreshCurrentHandle() {
      let tempTabName = this.mainTabsActiveName;
      this.removeTabHandle(tempTabName);
      this.$nextTick(() => {
        this.$router.push({ name: tempTabName });
      });
    },

    // 选择标签页
    selectedTabHandle(tab) {
      tab = this.mainTabs.filter(item => item.name === tab.name);
      if (tab.length >= 1) {
        this.$router.push({ path: "/" + tab[0].name });
      }
    },

    // 关闭标签页
    removeTabHandle(tabName) {
      this.mainTabs = this.mainTabs.filter(item => item.name !== tabName);
      if (this.mainTabs.length >= 1) {
        // 当前选中tab被删除
        if (tabName === this.mainTabsActiveName) {
          this.$router.push(
            { name: this.mainTabs[this.mainTabs.length - 1].name },
            () => {
              this.mainTabsActiveName = this.$route.name;
            }
          );
        }
      } else {
        this.menuActiveName = "";
        this.$router.push({ path: "/" });
      }
    }
  }
};
</script>
