# Hermes Desktop 简体中文汉化包

适配版本：Hermes 本地仓库 `main`，提交 `b91c382035631a07ac12606b8e19cff908a3131d`

当前汉化包 SHA256：

```text
bf63a2cc9613ac81cff530b4149986ff46236370049c80c7a5ee56f7f74b7f0f
```

这个仓库保存当前完整汉化成果，可直接安装，也保留了生成脚本和 Skills & Tools 翻译源。

## 直接安装

默认安装到 `/Applications/Hermes.app`：

```bash
./install-localization-no-codesign.sh
```

也可以指定 Hermes.app 路径：

```bash
./install-localization-no-codesign.sh /Applications/Hermes.app
```

兼容旧入口：

```bash
./reapply.sh
```

## 重要说明

- 安装脚本只替换 `Contents/Resources/app.asar`，并更新 `Info.plist` 里的 `ElectronAsarIntegrity` hash。
- 安装脚本不会执行 `codesign`。
- 修改 `app.asar` 后，原版签名/应用内更新能力会受影响。需要更新时，先恢复或重新构建干净 Hermes，再重新安装本汉化包。

## 文件说明

| 文件 | 说明 |
|------|------|
| `app.asar` | 当前完整汉化后的 Hermes 前端资源包 |
| `app.asar.sha256` | `app.asar` 的 SHA256 |
| `install-localization-no-codesign.sh` | 直接安装汉化资源，不执行 codesign |
| `patch-hermes-fix.js` | 基于更新后的干净 `app.asar` 重新生成汉化包的脚本 |
| `legacy-translations.js` | 旧版全局文本翻译源，用于复现当前汉化包 |
| `i18n/` | Skills & Tools 等界面的中英文翻译源 |
| `hermes-cn-patch.diff` | 旧版源码补丁参考 |
| `reapply.sh` | 兼容入口，调用无签名安装脚本 |

## 重新生成 app.asar

默认读取当前本机更新后构建出的干净资源包，并生成与仓库内 `app.asar` 相同 hash 的汉化包：

```bash
node patch-hermes-fix.js
```

可用环境变量覆盖路径：

```bash
HERMES_SOURCE_ASAR=/path/to/clean/app.asar \
HERMES_OUTPUT_ASAR=/tmp/app.asar \
HERMES_OUTPUT_HASH=/tmp/app.asar.sha256 \
HERMES_TARGET_BUNDLE=dist/assets/index-DueRxpsT.js \
node patch-hermes-fix.js
```
