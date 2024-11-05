import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import pkg from "./package.json" assert { type: "json" }; // 如果使用 ES 模块，确保按此方式导入

const input = "src/index.tsx";

const deps = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies });
const external = (id) => deps.some((dep) => id.startsWith(dep));

const plugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  typescript({
    tsconfig: "./tsconfig.json", // 使用 TypeScript 配置文件
    declaration: true, // 生成声明文件
    declarationDir: "dist", // 生成声明文件并输出到 dist 目录
  }),
];

const cjsOutput = { file: pkg.main, format: "cjs", exports: "auto" };
const esmOutput = { file: pkg.module, format: "es" };
const dtsOutput = { file: pkg.types, format: "es" };

export default [
  { input, output: cjsOutput, external, plugins },
  { input, output: esmOutput, external, plugins },
  { input, output: dtsOutput, plugins: [dts()] },
];
