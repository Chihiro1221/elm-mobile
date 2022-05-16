<script setup lang='ts'></script>

<template>
  <suspense>
    <router-view v-slot='{ Component,route }'>
      <transition
        appear
        class='animate__animated'
        :enter-active-class='route.meta.animation?.enter ?? "animate__fadeIn"'
        :leave-active-class='route.meta.animation?.leave ?? "animate__fadeOut"'
        duration='150'
        mode='out-in'
      >
        <component :is='Component' />
      </transition>
    </router-view>
  </suspense>
</template>
