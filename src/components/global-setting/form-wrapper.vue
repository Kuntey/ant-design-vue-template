<!-- eslint-disable vue/valid-v-model -->
<template>
  <a-input-number
    v-if="type === 'number'"
    v-model:value="defaultValue as number"
    :style="{ width: '80px' }"
    size="small"
    @change="handleChange"
  />
  <a-switch
    v-else
    v-model:checked="defaultValue as boolean"
    size="small"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  defaultValue: {
    type: [String, Boolean, Number],
    default: "",
  },
});
const emit = defineEmits(["inputChange"]);
const handleChange = (value: unknown) => {
  emit("inputChange", {
    value,
    key: props.name,
  });
};
</script>
