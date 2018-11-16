<template>
    <switch-temp :on="checked" @click.native="onClick"> </switch-temp>
</template>
<script>
import switchTemp from "./switch.vue";
export default {
  props: {
    on: {
      type: Boolean,
            default: false
    }
  },
  data() {
    return {
      checked: false
    };
  },
  methods: {
    onClick() {
      this.checked = !this.checked;
      this.$emit("toggled", this.checked);
    }
  },
  mounted() {
    this.checked = this.on;
  },
  components: {
    switchTemp
  }
};
</script>

