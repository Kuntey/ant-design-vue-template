import {
  AliasToken,
  MapToken,
  OverrideToken,
  SeedToken,
} from 'ant-design-vue/es/theme/interface';

interface Theme {
  token: Partial<AliasToken>;
  inherit: boolean;
  algorithm: (
    sToken: SeedToken,
  ) => MapToken | ((token: SeedToken) => MapToken)[];
  components: OverrideToken;
}

const TOKEN: Partial<Theme> = {
  token: {

  },
  components: {
    Menu: {

    },
  },
};

export default TOKEN;
