# Hermes Desktop 简体中文汉化包

## 使用方法

### 前置条件
- macOS (Apple Silicon / ARM64)
- Node.js (>=18)
- 已安装 Hermes Desktop（在 /Applications 中）
- Hermes Agent 仓库已克隆到 `~/.hermes/hermes-agent/`

### 一键汉化

```bash
~/hermes-cn-pack/reapply.sh
```

### 如果仓库路径不同

```bash
~/hermes-cn-pack/reapply.sh /path/to/hermes-agent
```

### 汉化后
1. ⌘Q 完全退出 Hermes
2. 重新打开
3. Settings → Appearance → Language → **简体中文**

---

## 给别人的三种分享方式

### 方式一：分享这个文件夹（最简单）
压缩 `~/hermes-cn-pack/` 发给别人，对方解压后运行 `reapply.sh` 即可。
要求对方的 Hermes 版本与制作补丁时的版本接近，否则补丁可能无法应用。

### 方式二：Fork Hermes 仓库（推荐）
```bash
# 1. 在 GitHub 上 fork NousResearch/hermes-agent
# 2. 克隆你的 fork
git clone https://github.com/YOUR_USERNAME/hermes-agent.git
cd hermes-agent

# 3. 复制 i18n 目录
cp -r ~/hermes-cn-pack/i18n/ apps/desktop/src/i18n/

# 4. 手动修改三个文件（用 patch 或对照 diff）
# apps/desktop/src/app/messaging/index.tsx
# apps/desktop/src/app/settings/config-settings.tsx
# apps/desktop/src/app/skills/index.tsx

# 5. 提交并推送
git add -A
git commit -m "chore: add Chinese (Simplified) UI translations"
git push
```

这样别人直接克隆你的 fork 就能获得完整的汉化。

### 方式三：仅分享 i18n 翻译文件
如果对方已经修改过那三个源文件（或用的版本差异太大），可以只替换翻译文件：

```bash
cp ~/hermes-cn-pack/i18n/*.ts /path/to/hermes-agent/apps/desktop/src/i18n/
```

然后需要手动修改三个源文件中的引用（参照 `hermes-cn-patch.diff`）。

---

## 文件说明

| 文件 | 说明 |
|------|------|
| `i18n/types.ts` | 翻译类型定义 |
| `i18n/en.ts` | 英文翻译（占位，与原版基本一致） |
| `i18n/zh.ts` | 简体中文翻译 |
| `i18n/context.tsx` | I18n 上下文 Provider |
| `i18n/index.ts` | 导出入口 |
| `hermes-cn-patch.diff` | 三个源文件的修改补丁 |
| `reapply.sh` | 一键重新汉化脚本 |

## 更新后重新汉化

Hermes 升级后，只需重新运行：

```bash
~/hermes-cn-pack/reapply.sh
```

如果补丁因版本变更无法应用，请提 Issue 告知新版本号。
