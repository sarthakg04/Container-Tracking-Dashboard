<template>
  <v-app id="inspire">
    <v-navigation-drawer
    class="grey darken-4"
      v-model="drawer"
      :mini-variant.sync="mini"
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title style='color:white;' >Sarthak Gupta</v-list-item-title>
        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style='color:white;'>{{ item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> 
    </v-navigation-drawer>
    
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Dashboard</v-toolbar-title>
    </v-app-bar>
<v-main style="padding: 0px 0px 0px;">
<router-view></router-view>
</v-main>
  </v-app>
</template>
<style>
</style>
<script>
  export default {
    
    data: () => ({ 
      drawer: null,

      items: [
          { title: 'Home', icon: 'mdi-home-city', to:'/' },
          { title: 'My Account', icon: 'mdi-airballoon-outline', to:'/vessels' },
          { title: 'Users', icon: 'mdi-satellite-variant', to:'' },
        ],
        mini: true,
       }),
  }
</script>