#!/usr/bin/env bash
set -euo pipefail

HERMES_AGENT_DIR="${1:-$HOME/.hermes/hermes-agent}"
PACK_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== Hermes Desktop 简体中文汉化补丁 ==="
echo "目标目录: $HERMES_AGENT_DIR"
echo ""

# 检测项目
if [ ! -f "$HERMES_AGENT_DIR/apps/desktop/package.json" ]; then
  echo "错误: 未找到 Hermes 桌面端项目（apps/desktop/package.json）"
  echo "请确认 hermes-agent 仓库路径正确"
  exit 1
fi

# 1. 创建 i18n 目录（如果不存在）
mkdir -p "$HERMES_AGENT_DIR/apps/desktop/src/i18n"

# 2. 复制翻译文件
echo "[1/3] 复制翻译文件..."
cp -v "$PACK_DIR/i18n/types.ts"   "$HERMES_AGENT_DIR/apps/desktop/src/i18n/types.ts"
cp -v "$PACK_DIR/i18n/en.ts"      "$HERMES_AGENT_DIR/apps/desktop/src/i18n/en.ts"
cp -v "$PACK_DIR/i18n/zh.ts"      "$HERMES_AGENT_DIR/apps/desktop/src/i18n/zh.ts"
cp -v "$PACK_DIR/i18n/context.tsx" "$HERMES_AGENT_DIR/apps/desktop/src/i18n/context.tsx"
cp -v "$PACK_DIR/i18n/index.ts"   "$HERMES_AGENT_DIR/apps/desktop/src/i18n/index.ts"

# 3. 应用源文件补丁
echo "[2/3] 应用源文件补丁..."
cd "$HERMES_AGENT_DIR"

if patch -p1 -N --dry-run < "$PACK_DIR/hermes-cn-patch.diff" 2>/dev/null; then
  patch -p1 -N < "$PACK_DIR/hermes-cn-patch.diff"
  echo "    补丁应用成功"
else
  echo "    警告: 补丁无法自动应用（版本可能已变更）"
  echo "    尝试强制应用..."
  if patch -p1 < "$PACK_DIR/hermes-cn-patch.diff" 2>/dev/null; then
    echo "    补丁应用成功（部分行号已调整）"
  else
    echo "    补丁应用失败，请手动修改以下文件："
    echo "      - apps/desktop/src/app/messaging/index.tsx"
    echo "      - apps/desktop/src/app/settings/config-settings.tsx"
    echo "      - apps/desktop/src/app/skills/index.tsx"
    echo "    详情请参照: $PACK_DIR/hermes-cn-patch.diff"
    exit 1
  fi
fi

# 4. 编译并部署
echo "[3/3] 编译并部署..."
cd "$HERMES_AGENT_DIR/apps/desktop"

# 检查依赖
if ! command -v npx &>/dev/null; then
  echo "错误: 未找到 Node.js/npx，请先安装 Node.js"
  exit 1
fi

# 类型检查
echo "    运行 TypeScript 类型检查..."
if ! npx tsc --noEmit; then
  echo "错误: TypeScript 类型检查失败"
  exit 1
fi

# 构建
echo "    构建 Vite 前端..."
if ! npx vite build; then
  echo "错误: Vite 构建失败"
  exit 1
fi

# 打包
echo "    打包 electron-builder..."
if ! npx electron-builder --dir; then
  echo "错误: electron-builder 打包失败"
  exit 1
fi

# 部署
cp release/mac-arm64/Hermes.app/Contents/Resources/app.asar /Applications/Hermes.app/Contents/Resources/app.asar

echo ""
echo "=== 汉化完成！==="
echo ""
echo "接下来："
echo "  1. 完全退出 Hermes（⌘Q）"
echo "  2. 重新打开 Hermes"
echo "  3. 进入 Settings → Appearance → Language"
echo "  4. 选择「简体中文」"
echo ""
echo "如果遇到问题，请重新运行此脚本："
echo "  $0"
