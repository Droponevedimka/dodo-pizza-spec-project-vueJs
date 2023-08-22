<template>
  <PizzaComponent />
  <ProviderComponent />
</template>

<script>
import PizzaComponent from '@/components/Pizza/Pizza.vue';
import ProviderComponent from '@/components/Provider/Provider.vue';

export default {
  name: 'MainView',
  components: {
    PizzaComponent,
    ProviderComponent,
  },
};
</script>
