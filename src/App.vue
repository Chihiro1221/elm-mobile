<script setup lang="ts"></script>

<template>
  <suspense>
    <router-view v-slot="{ Component }">
      <transition
        appear
        class="animate__animated"
        enter-active-class="animate__fadeIn"
        leave-active-class="animate__fadeOut"
        :duration="{ enter: 150, leave: 150 }"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </suspense>
</template>
