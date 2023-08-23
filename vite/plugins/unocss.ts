import Unocss from 'unocss/vite';

export default function createUnocss() {
  return Unocss({
    // presets: [], // disable default preset
    // rules: [
    //   // your custom rules
    //   // @ts-ignore
    //   //   [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}px` })],
    //   //   // @ts-ignore
    //   //   [/^p-(\d+)$/, (match) => ({ padding: `${match[1] / 4}px` })],
    // ],
  });
}
