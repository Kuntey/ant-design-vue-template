<template>
  <a-select v-model:value="value" :options="options" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { isAsyncFunction } from '@/utils/is';
import { DefaultOptionType, SelectValue } from 'ant-design-vue/es/select';

defineOptions({
  name: 'ProSelect',
});

export interface ProSelectProps {
    modelValue?: SelectValue;
    request?: (() => DefaultOptionType[]) | (() => Promise<DefaultOptionType[]>);
}

const props = defineProps<ProSelectProps>();
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(v: SelectValue) {
    emit('update:modelValue', v);
  },
});
const data = reactive<{
    options: DefaultOptionType[];
}>({
  options: [],
});
const { options } = toRefs(data);

const getOptions = () => {
  if (isAsyncFunction(props.request)) {
    // @ts-ignore
    props.request().then((response) => {
      options.value = response;
    });
  } else {
    // @ts-ignore
    options.value = props.request();
  }
};

if (props.request) {
  getOptions();
}
</script>

<style lang="" scoped></style>
