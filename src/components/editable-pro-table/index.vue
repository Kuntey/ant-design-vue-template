<script lang="tsx">
import {
  CheckOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue';
import { cloneDeep } from '@/utils';
import { ButtonProps } from 'ant-design-vue/es/button/buttonTypes';
import { CSSProperties, VNode } from 'vue';
import { DefaultOptionType } from 'ant-design-vue/es/select';
import { DataIndex, RenderedCell } from 'ant-design-vue/es/vc-table/interface';
import {
  Button, Table, Input, DatePicker, InputNumber,
} from 'ant-design-vue';
import { v4 as uuidV4 } from 'uuid';
import ProSelect from '@/components/pro-select/index.vue';
import { ColumnType } from 'ant-design-vue/es/table';
import style from './index.module.less';

interface DataItem {
  [key: string]: {
    key: string;
  };
}

interface ValueEnum {}

export type ProColumns<RecordType = any> = {
  /**
   * @default text
   */
  valueType?: 'text' | 'number' | 'select' | 'date' | 'option' | 'custom';
  readonly?: boolean;
  valueEnum?: ValueEnum;
  /**
   * 示例：
   * ```js
   *
   * // 直接获取
   * request: () => {
   *  return []
   * }
   *
   * // 异步获取1
   * request: async () => {
   *  return []
   * }
   *
   * // 异步获取2
   * request: async () => {
   *  return Promise.resolve([})
   * }
   *
   * // 异步获取3
   * request: async () => {
   *  const result = await getOpt()
   *  return result
   * }
   *
   * ```
   *
   */
  request?: (() => DefaultOptionType[]) | (() => Promise<DefaultOptionType[]>);

  render?: (opt: {
    value: any;
    text: any;
    record: RecordType;
    index: number;
    // renderIndex: number;
    column: ColumnType<RecordType>;
  }) => any | RenderedCell<RecordType>;
  children?: ProColumns<RecordType>[];
} & ColumnType;

interface RecordCreatorProps {
  /** 顶部添加还是末尾添加 */
  position?: 'top' | 'bottom';
  /** 设置按钮文案 */
  creatorButtonText?: string;
  style?: CSSProperties;
}

interface TableRowEditable {
  type: 'single' | 'multiple';
  actionRender?: () => VNode;
}

export interface EditableProTableProps<T = any> {
  /** 同 dataSource，传入一个数组,是 table 渲染的元数据 */
  value: T[];
  /** 新建一行数据的相关配置 */
  recordCreatorProps?: RecordCreatorProps & ButtonProps;
  /** 最大的行数，到达最大行数新建按钮会自动消失 */
  maxLength?: number;
  /** 可编辑表格的相关配置 */
  editable?: TableRowEditable;
  /** 是否受控, 如果受控每次编辑都会触发 onChange，并且会修改 dataSource */
  controlled?: boolean;
  rowKey: string | number;
  columns: ProColumns[];
}

export default defineComponent({
  props: {
    value: {
      type: Array,
      required: true,
    },
    recordCreatorProps: {
      type: Object as PropType<RecordCreatorProps & ButtonProps>,
      required: false,
    },
    rowKey: {
      type: [String, Number],
      required: true,
    },
    editable: {
      type: Object as PropType<TableRowEditable>,
      required: false,
    },
    columns: {
      type: Array as PropType<ProColumns[]>,
      required: true,
    },
  },
  emits: ['change'],
  setup(this, props, ctx) {
    const { rowKey, editable } = props;
    const recordCreatorProps = computed(() => ({
      ...({
        creatorButtonText: '新增一行',
        type: 'dashed',
        block: true,
      } as RecordCreatorProps & ButtonProps),
      ...props.recordCreatorProps,
    }));

    const dataSource = computed({
      get() {
        return props.value.map((item: any) => {
          item.key = item[rowKey] || uuidV4();
          return item;
        });
      },
      set(tableValue: any) {
        ctx.emit('change', tableValue);
      },
    });

    const editColumns = ref<any[]>([]);
    const data = reactive<{
      editableData: Record<string, DataItem>;
    }>({
      editableData: {},
    });

    const { editableData } = toRefs(data);

    /** 编辑 */
    const edit = (key: string, dataIndex?: DataIndex) => {
      if (editColumns.value.length) {
        for (const editableDataKey in editableData.value) {
          dataSource.value = Object.assign(
            dataSource.value.filter(
              (item: any) => editableDataKey === item.key,
            )[0],
            editableData.value[editableDataKey],
          );
          delete editableData.value[editableDataKey];
        }
        editColumns.value = [];
      }
      if (
        dataIndex
        && editColumns.value.findIndex((i) => i === dataIndex) === -1
      ) {
        editColumns.value.push(dataIndex);
      }
      editableData.value[key] = cloneDeep(
        dataSource.value.filter((item: any) => key === item.key)[0],
      );
    };

    /** 添加数据 */
    const handleAdd = () => {
      const newData = {
        [rowKey]: uuidV4(),
      };
      dataSource.value = newData;
    };

    /** 保存 */
    const save = (key: string) => {
      dataSource.value = Object.assign(
        dataSource.value.filter((item: any) => key === item.key)[0],
        editableData.value[key],
      );
      delete editableData.value[key];
      editColumns.value = [];
    };

    // const onDelete = (key: string) => {
    //     dataSource.value = dataSource.value.filter(item => item[rowKey] !== key);
    // };

    // 输入框
    const readerInputCell = ({
      record,
      column,
    }: {
      record: any;
      column: ProColumns;
    }) => (
        <Input
          v-model:value={
            editableData.value[record.key][column.dataIndex as any]
          }
          style={'width: 100%;'}
          onPressEnter={() => save(record.key)}
        ></Input>
    );

    // 数字输入框
    const readerInputNumberCell = ({
      record,
      column,
    }: {
      record: any;
      column: ProColumns;
    }) => (
        <InputNumber
          v-model:value={
            editableData.value[record.key][column.dataIndex as any]
          }
          style={'width: 100%;'}
          onPressEnter={() => save(record.key)}
        ></InputNumber>
    );

    // 下拉框
    const readerSelectCell = ({
      record,
      column,
    }: {
      record: any;
      column: ProColumns;
    }) => (
        <ProSelect
          v-model={editableData.value[record.key][column.dataIndex as any]}
          request={column.request}
          style={'width: 100%;'}
        ></ProSelect>
    );

    // 日期选择
    const readerDatePickerCell = ({
      record,
      column,
    }: {
      record: any;
      column: ProColumns;
    }) => (
        <DatePicker
          v-model:value={
            editableData.value[record.key][column.dataIndex as any]
          }
          style={'width: 100%;'}
          valueFormat={'YYYY-MM-DD'}
        ></DatePicker>
    );

    const getCell = {
      text: readerInputCell,
      select: readerSelectCell,
      number: readerInputNumberCell,
      date: readerDatePickerCell,
    };

    /** 渲染列 */
    const readerColumn = ({
      column,
      text,
      record,
    }: {
      column: ProColumns;
      text: any;
      record: any;
      value: any;
      index: number;
    }) => {
      if (
        editable?.type === 'single'
        && column.valueType !== 'option'
        && column.valueType !== 'custom'
      ) {
        if (
          editableData.value[record.key]
          && editableData.value[record.key].key === record.key
          && editColumns.value.includes(column.dataIndex)
        ) {
          return column.valueType ? (
            <div class={style['editable-cell']}>
              <div class={`${style['editable-cell-input-wrapper']}`}>
                {getCell[column.valueType]({ record, column })}
                <CheckOutlined
                  class={`${style['editable-cell-icon']} ${style['editable-cell-icon-check']}`}
                  onClick={() => save(record.key)}
                />
              </div>
            </div>
          ) : (
            <div class={style['editable-cell']}>
              <div class={`${style['editable-cell-input-wrapper']}`}>
                {getCell.text({ record, column })}
                <CheckOutlined
                  class={`${style['editable-cell-icon']} ${style['editable-cell-icon-check']}`}
                  onClick={() => save(record.key)}
                />
              </div>
            </div>
          );
        }
        return (
          <div class={style['editable-cell']}>
            <div class={`${style['editable-cell-text-wrapper']}`}>
              {text || ' '}
              <EditOutlined
                class={`${style['editable-cell-icon']}`}
                onClick={() => edit(record.key as string, column.dataIndex)}
              />
            </div>
          </div>
        );
      }
      if (
        editable?.type === 'multiple'
        && column.valueType !== 'option'
        && column.valueType !== 'custom'
      ) {
        if (
          editableData.value[record.key]
          && editableData.value[record.key].key === record.key
        ) {
          return column.valueType ? (
            <div class={style['editable-cell']}>
              <div
                class={`${style['editable-cell']} ${style['editable-cell-input-wrapper']}`}
              >
                {getCell[column.valueType]({ record, column })}
                <CheckOutlined
                  class={
                    style['editable-cell-icon']
                    + style['editable-cell-icon-check']
                  }
                  onClick={() => save(record.key)}
                />
              </div>
            </div>
          ) : (
            <div class={style['editable-cell']}>
              <div
                class={`${style['editable-cell']} ${style['editable-cell-input-wrapper']}`}
              >
                {getCell.text({ record, column })}
                <CheckOutlined
                  class={
                    style['editable-cell-icon']
                    + style['editable-cell-icon-check']
                  }
                  onClick={() => save(record.key)}
                />
              </div>
            </div>
          );
        }
        return (
          <div class={style['editable-cell']}>
            <div class={`${style['editable-cell-text-wrapper']}`}>
              {text || ' '}
              <EditOutlined
                class={`${style['editable-cell-icon']}`}
                onClick={() => edit(record.key as string, column.dataIndex)}
              />
            </div>
          </div>
        );
      }

      return null;
    };

    /** 渲染列 */
    const readerCustomColumn = ({
      column,
      text,
      record,
      index,
      value,
    }: {
      column: ProColumns;
      text: any;
      record: any;
      value: any;
      index: number;
    }) => {
      if (
        editable?.type === 'single'
        && column.valueType !== 'option'
        && column.valueType !== 'custom'
        && column.render
      ) {
        if (
          editableData.value[record.key]
          && editableData.value[record.key].key === record.key
          && editColumns.value.includes(column.dataIndex)
        ) {
          return column.valueType ? (
            <div class={style['editable-cell']}>
              <div class={`${style['editable-cell-input-wrapper']}`}>
                {column.render({
                  column, text, record, index, value,
                })}
                <CheckOutlined
                  class={`${style['editable-cell-icon']} ${style['editable-cell-icon-check']}`}
                  onClick={() => save(record.key)}
                />
              </div>
            </div>
          ) : (
            <div class={style['editable-cell']}>
              <div class={`${style['editable-cell-input-wrapper']}`}>
                {column.render({
                  column, text, record, index, value,
                })}
                <CheckOutlined
                  class={`${style['editable-cell-icon']} ${style['editable-cell-icon-check']}`}
                  onClick={() => save(record.key)}
                />
              </div>
            </div>
          );
        }
        return (
          <div class={style['editable-cell']}>
            <div class={`${style['editable-cell-text-wrapper']}`}>
              {text || ' '}
              <EditOutlined
                class={`${style['editable-cell-icon']}`}
                onClick={() => edit(record.key as string, column.dataIndex)}
              />
            </div>
          </div>
        );
      }
      if (
        editable?.type === 'multiple'
        && column.valueType !== 'option'
        && column.valueType !== 'custom'
        && column.render
      ) {
        if (
          editableData.value[record.key]
          && editableData.value[record.key].key === record.key
        ) {
          return column.valueType ? (
            <div class={style['editable-cell']}>
              <div
                class={`${style['editable-cell']} ${style['editable-cell-input-wrapper']}`}
              >
                {column.render({
                  column, text, record, index, value,
                })}
                <CheckOutlined
                  class={
                    style['editable-cell-icon']
                    + style['editable-cell-icon-check']
                  }
                  onClick={() => save(record.key)}
                />
              </div>
            </div>
          ) : (
            <div class={style['editable-cell']}>
              <div
                class={`${style['editable-cell']} ${style['editable-cell-input-wrapper']}`}
              >
                {column.render({
                  column, text, record, index, value,
                })}
                <CheckOutlined
                  class={
                    style['editable-cell-icon']
                    + style['editable-cell-icon-check']
                  }
                  onClick={() => save(record.key)}
                />
              </div>
            </div>
          );
        }
        return (
          <div class={style['editable-cell']}>
            <div class={`${style['editable-cell-text-wrapper']}`}>
              {text || ' '}
              <EditOutlined
                class={`${style['editable-cell-icon']}`}
                onClick={() => edit(record.key as string, column.dataIndex)}
              />
            </div>
          </div>
        );
      }

      return null;
    };

    return () => (
      <div class={style['editable-table-wrapper']}>
        {recordCreatorProps.value.position === 'top' ? (
          <Button
            class={style['editable-add-btn']}
            style={{
              ...{ 'margin-bottom': '8px' },
              ...recordCreatorProps.value.style,
            }}
            onClick={handleAdd}
            icon={<PlusOutlined />}
            {...recordCreatorProps.value}
          >
            {recordCreatorProps.value.creatorButtonText}
          </Button>
        ) : null}
        <Table
          dataSource={dataSource.value}
          columns={props.columns as any}
          pagination={false}
          {...ctx.attrs}
        >
          {{
            bodyCell: ({
              column,
              text,
              record,
              value,
              index,
            }: {
              column: ProColumns;
              text: any;
              record: any;
              value: any;
              index: number;
            }) => (column.dataIndex && !column.readonly
              ? readerColumn({
                column, text, record, value, index,
              })
              : readerCustomColumn({
                column, text, record, value, index,
              })),
          }}
        </Table>
        {recordCreatorProps.value.position === 'bottom' ? (
          <Button
            class={style['editable-add-btn']}
            style={{
              ...{ 'margin-top': '8px' },
              ...recordCreatorProps.value.style,
            }}
            onClick={handleAdd}
            icon={<PlusOutlined />}
            {...recordCreatorProps.value}
          >
            {recordCreatorProps.value.creatorButtonText}
          </Button>
        ) : null}
      </div>
    );
  },
});
</script>
