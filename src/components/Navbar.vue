<template>
  <v-navigation-drawer v-if="$store.state.isUserLoggedIn" app v-model="$store.state.drawer">
    <v-toolbar flat class="light-blue darken-4" dark>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">SiSuper Admin</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list v-for="item in items" :key="item.title" dense>
      <v-list-group :value="item.title == $store.state.item" v-if="item.items != null" :prepend-icon="item.action" no-action >
        <v-list-tile slot="activator" :value="item.title == $store.state.item">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-for="subItem in item.items"
          :key="subItem.title"
          @click="navigateTo(subItem.to, item.title)"
          :value="subItem.to == $store.state.subItem"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>{{ subItem.action }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
      <v-list-tile
        v-else
        @click="navigateTo(item.to, item.to)"
        :value="item.to == $store.state.item"
      >
        <v-list-tile-action>
          <v-icon>{{ item.action }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          action: "dashboard",
          title: "Dashboard",
          to: "dashboard",
          items: null
        },
        {
          action: "event",
          title: "Event",
          items: [
            {
              title: "Buat Event",
              to: "eventCreate"
            },
            {
              title: "Daftar Event",
              to: "eventList"
            }
          ]
        },
        {
          action: "store_mall_directory",
          title: "UKM",
          items: [
            { 
                title: "Produk UKM",
                to: "ukmProduct"
            },
            { 
                title: "Daftar UKM",
                to: "ukmList"
            },
            { 
                title: "Daftar Pengusaha",
                to: "ukmListPengusaha"
            }
          ]
        }
      ],
      right: null
    };
  },
  methods: {
    navigateTo(route, item) {
      this.$router.push({name: route});
      this.$store.dispatch('setItem', item)
      this.$store.dispatch('setSubItem', route)
    }
  },
  watch:{

  }
};
</script>