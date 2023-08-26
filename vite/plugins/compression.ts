import compression from "vite-plugin-compression";

export default function createCompression(env: { VITE_BUILD_COMPRESS: any }) {
  const { VITE_BUILD_COMPRESS } = env;
  const plugin = [];
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(",");
    if (compressList.includes("gzip")) {
      // 使用gzip解压缩静态文件
      plugin.push(
        compression({
          ext: ".gz",
          deleteOriginFile: false,
        })
      );
    }
    if (compressList.includes("brotli")) {
      plugin.push(
        compression({
          ext: ".br",
          algorithm: "brotliCompress",
          deleteOriginFile: false,
        })
      );
    }
  }
  return plugin;
}