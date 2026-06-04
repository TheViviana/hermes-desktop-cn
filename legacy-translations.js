const fs = require("fs");
const crypto = require("crypto");

const sourceAsar = "/Applications/Hermes.app/Contents/Resources/app.asar";
const outputAsar = "/private/tmp/hermes-localize/app.asar";
const outputHash = "/private/tmp/hermes-localize/app.asar.sha256";
const targetBundle = "dist/assets/index-C6YXuumE.js";
const blockSize = 4194304;

const patchStart = "/* Hermes zh-CN localization patch start */";
const patchEnd = "/* Hermes zh-CN localization patch end */";

const localizationPatch = String.raw`
${patchStart}
(function(){
  "use strict";
  var STORAGE_KEY = "hermes.ui.language";
  var DEFAULT_LANG = "zh-CN";
  var zh = {
    ".env": ".env",
    "[Open filter with CMD+SHIFT+L]": "[用 CMD+SHIFT+L 打开筛选器]",
    "0 9 * * * or weekdays at 9am": "0 9 * * * 或 weekdays at 9am",
    "123456:ABC...": "123456:ABC...",
    "A new version of Hermes is ready to install.": "Hermes 新版本已准备好安装。",
    "Access token": "访问令牌",
    "account": "账号",
    "add": "添加",
    "Add a stdio or HTTP server to expose MCP tools.": "添加 stdio 或 HTTP 服务器来暴露 MCP 工具。",
    "Add context": "添加上下文",
    "Add provider…": "添加提供商…",
    "Advanced Hermes environments for separate personas, config, skills, and SOUL.md.": "用于独立人格、配置、技能和 SOUL.md 的高级 Hermes 环境。",
    "Allowed Discord user IDs": "允许的 Discord 用户 ID",
    "Allowed Matrix user IDs": "允许的 Matrix 用户 ID",
    "Allowed Signal users": "允许的 Signal 用户",
    "Allowed Slack user IDs": "允许的 Slack 用户 ID",
    "Allowed Telegram user IDs": "允许的 Telegram 用户 ID",
    "Allowed user IDs": "允许的用户 ID",
    "Allowed WhatsApp users": "允许的 WhatsApp 用户",
    "API calls": "API 调用",
    "API Keys": "API 密钥",
    "Applies to new sessions. Use the model picker in the composer to hot-swap the active chat.": "适用于新会话。可在输入区使用模型选择器热切换当前聊天。",
    "Approval": "审批",
    "Archived Chats": "已归档聊天",
    "Archived chats are hidden from the sidebar but keep all their messages. Ctrl/⌘-click a chat in the sidebar to archive it.": "已归档聊天会从侧边栏隐藏，但保留全部消息。在侧边栏中 Ctrl/⌘ 点击聊天即可归档。",
    "Archived sessions": "已归档会话",
    "Attach": "附加",
    "Attach a URL": "附加 URL",
    "Audit the current change for regressions, dropped edge cases, and missing tests.": "审查当前改动是否有回归、遗漏的边界情况和缺失测试。",
    "Automatic updates": "自动更新",
    "Auxiliary models": "辅助模型",
    "Backend stopped": "后端已停止",
    "Base URL for the remote dashboard backend. Path prefixes are supported, for example /hermes.": "远程仪表盘后端的基础 URL。支持路径前缀，例如 /hermes。",
    "Bot token": "机器人令牌",
    "Bot user ID": "机器人用户 ID",
    "Branch": "分支",
    "Bridge mode": "桥接模式",
    "Change": "更改",
    "Change working directory": "更改工作目录",
    "Clear console": "清空控制台",
    "Clear value": "清除值",
    "Click to select · shift-click to extend · drag to composer": "点击选择 · Shift 点击扩展选择 · 拖到输入区",
    "Clone from default": "从默认配置克隆",
    "Close preview pane": "关闭预览面板",
    "Code review": "代码审查",
    "Collapse all folders": "折叠所有文件夹",
    "comma-separated values": "逗号分隔值",
    "Common commands": "常用命令",
    "Compression": "压缩",
    "Config imported": "配置已导入",
    "Configure speech-to-text to use voice mode.": "配置语音转文字以使用语音模式。",
    "Connect this desktop shell to a remote Hermes backend using its session token.": "使用会话令牌将此桌面外壳连接到远程 Hermes 后端。",
    "Connecting live desktop gateway": "正在连接实时桌面网关",
    "Context usage": "上下文用量",
    "Copy": "复制",
    "Copy config, skills, and SOUL.md from your default profile.": "从默认配置档复制配置、技能和 SOUL.md。",
    "Copy ID": "复制 ID",
    "Copy this entry": "复制此条目",
    "Could not copy console output": "无法复制控制台输出",
    "Could not create a new session": "无法创建新会话",
    "Couldn’t check for updates": "无法检查更新",
    "Credential removed": "凭据已移除",
    "Credential saved": "凭据已保存",
    "Cron created": "定时任务已创建",
    "Cron deleted": "定时任务已删除",
    "Cron expression, or phrases like \"every hour\" or \"weekdays at 9am\".": "Cron 表达式，或类似 \"every hour\"、\"weekdays at 9am\" 的短语。",
    "Cron triggered": "定时任务已触发",
    "Cron updated": "定时任务已更新",
    "Curator": "策展人",
    "Current turn elapsed": "当前轮次耗时",
    "Custom": "自定义",
    "Custom schedule": "自定义计划",
    "Daily": "每日",
    "Daily tokens": "每日 token",
    "DashScope (Qwen)": "DashScope（通义千问）",
    "default": "默认",
    "Default": "默认",
    "Default project directory": "默认项目目录",
    "Default project directory updated": "默认项目目录已更新",
    "Delete cron job?": "删除定时任务？",
    "Delete permanently": "永久删除",
    "Delete profile?": "删除配置档？",
    "Delete queued turn": "删除排队轮次",
    "Delete session": "删除会话",
    "Deliver to": "发送到",
    "Desktop commands": "桌面命令",
    "Diagnostics": "诊断",
    "disabled": "已禁用",
    "discard": "丢弃",
    "Discord": "Discord",
    "Displays the mobile sidebar.": "显示移动端侧边栏。",
    "Docs": "文档",
    "Edit message": "编辑消息",
    "Edit Models…": "编辑模型…",
    "Edit queued turn": "编辑排队轮次",
    "Editable checkpoint": "可编辑检查点",
    "Editing in composer": "正在输入区编辑",
    "Editing queued turn in composer": "正在输入区编辑排队轮次",
    "Effort": "强度",
    "Email": "邮件",
    "Empty": "空",
    "Enable WhatsApp bridge": "启用 WhatsApp 桥接",
    "End": "结束",
    "End voice conversation": "结束语音对话",
    "Enter a remote URL and session token before switching to remote.": "切换到远程前请输入远程 URL 和会话令牌。",
    "Enter a remote URL and session token before testing.": "测试前请输入远程 URL 和会话令牌。",
    "env override": "环境变量覆盖",
    "Environment variables are controlling this desktop session.": "环境变量正在控制此桌面会话。",
    "Est. cost": "预计费用",
    "Every 15 minutes": "每 15 分钟",
    "everything": "全部",
    "Everything here is pinned. Unpin a chat to show it in recents.": "这里的所有内容都已固定。取消固定聊天后会显示在最近列表中。",
    "Explain this": "解释这段",
    "Export": "导出",
    "Export config": "导出配置",
    "Export session": "导出会话",
    "Failed to create profile": "创建配置档失败",
    "Failed to load SOUL.md": "加载 SOUL.md 失败",
    "Failed to rename profile": "重命名配置档失败",
    "Failed to save cron job": "保存定时任务失败",
    "Failed to save SOUL.md": "保存 SOUL.md 失败",
    "Faster": "更快",
    "File system": "文件系统",
    "files": "文件",
    "Files": "文件",
    "Files…": "文件…",
    "Fixed": "固定",
    "Folder…": "文件夹…",
    "Frequency": "频率",
    "Gateway settings unavailable": "网关设置不可用",
    "Gateway unavailable": "网关不可用",
    "Generated images and file outputs will appear here as sessions produce them.": "会话生成的图片和文件输出会显示在这里。",
    "Get your credentials": "获取你的凭据",
    "Give this chat a memorable title. Leave empty to clear.": "给这个聊天起一个好记的标题。留空则清除。",
    "Give this MCP server a config key.": "为这个 MCP 服务器设置一个配置键。",
    "Go forward": "前进",
    "Helper tasks run on the main model by default. Assign a dedicated model to any task to override.": "辅助任务默认使用主模型。可为任意任务指定专用模型来覆盖。",
    "HERMES AGENT": "HERMES 代理",
    "Hermes background process exited.": "Hermes 后台进程已退出。",
    "Hermes checks for updates automatically in the background and lets you know when one is ready.": "Hermes 会在后台自动检查更新，并在可用时通知你。",
    "Hermes Desktop": "Hermes 桌面版",
    "Hermes Desktop starts its own local gateway by default. Use a remote gateway when you want this app to control an already-running Hermes backend on another machine or behind a trusted proxy.": "Hermes 桌面版默认启动自己的本地网关。当你想让本应用控制另一台机器或受信任代理后方已运行的 Hermes 后端时，请使用远程网关。",
    "Hermes error": "Hermes 错误",
    "Hermes finished": "Hermes 已完成",
    "Hermes is loading a response": "Hermes 正在加载回复",
    "Hermes is working in the background. Watch the preview console for progress.": "Hermes 正在后台工作。可查看预览控制台了解进度。",
    "Hermes will close to apply the update.": "Hermes 将关闭以应用更新。",
    "Hermes will fetch the page and include it as context for this turn.": "Hermes 会获取该页面，并将其作为本轮上下文。",
    "Hermes will pick up the new version next time you launch it.": "下次启动 Hermes 时会使用新版本。",
    "High": "高",
    "Homeserver URL": "Homeserver URL",
    "Hotkeys": "快捷键",
    "Hourly": "每小时",
    "Images…": "图片…",
    "Implementation plan": "实现计划",
    "Import config": "导入配置",
    "Improved": "已改进",
    "In this update": "本次更新",
    "Included with a Nous subscription — sign in to Nous Portal to activate.": "包含在 Nous 订阅中，请登录 Nous Portal 激活。",
    "Indexing recent session artifacts": "正在索引最近会话工件",
    "LLM providers": "LLM 提供商",
    "loading": "加载中",
    "Loading API keys and credentials...": "正在加载 API 密钥和凭据...",
    "Loading archived sessions…": "正在加载已归档会话…",
    "Loading capabilities...": "正在加载能力...",
    "Loading cron jobs...": "正在加载定时任务...",
    "Loading files...": "正在加载文件...",
    "Loading gateway settings...": "正在加载网关设置...",
    "Loading Hermes configuration...": "正在加载 Hermes 配置...",
    "Loading Hermes settings": "正在加载 Hermes 设置",
    "Loading MCP servers...": "正在加载 MCP 服务器...",
    "Loading messaging platforms...": "正在加载消息平台...",
    "Loading model configuration...": "正在加载模型配置...",
    "Loading preview…": "正在加载预览…",
    "Loading profiles...": "正在加载配置档...",
    "Loading recent sessions": "正在加载最近会话",
    "Loading SOUL.md...": "正在加载 SOUL.md...",
    "Loading status...": "正在加载状态...",
    "Loading usage...": "正在加载用量...",
    "Loading…": "加载中…",
    "Local gateway": "本地网关",
    "Looking for updates…": "正在查找更新…",
    "Main model": "主模型",
    "Manage profiles": "管理配置档",
    "Max": "最大",
    "Maybe later": "稍后再说",
    "MCP server saved": "MCP 服务器已保存",
    "MCP servers": "MCP 服务器",
    "MCP tools reloaded": "MCP 工具已重新加载",
    "Medium": "中",
    "Messaging": "消息",
    "Messaging gateway stopped": "消息网关已停止",
    "Messaging platforms": "消息平台",
    "Minimal": "最小",
    "Models": "模型",
    "Monthly": "每月",
    "More actions": "更多操作",
    "Morning briefing": "晨间简报",
    "Name": "名称",
    "Name required": "需要名称",
    "Navigate": "导航",
    "new": "新建",
    "New name": "新名称",
    "New profile": "新配置档",
    "New server": "新服务器",
    "New session": "新会话",
    "New sessions start in this folder unless you pick another. Leave it unset to use your home directory.": "除非另选目录，新会话会从此文件夹开始。留空则使用主目录。",
    "New tool schemas apply to fresh turns.": "新的工具架构会应用到新的轮次。",
    "New update available": "有新更新可用",
    "Next": "下一项",
    "No API key required.": "无需 API 密钥。",
    "No artifacts found": "未找到工件",
    "No console messages yet.": "暂无控制台消息。",
    "No daily activity.": "暂无每日活动。",
    "No inline preview": "暂无内联预览",
    "No live subagents": "暂无实时子代理",
    "No matching results found.": "未找到匹配结果。",
    "No matching settings": "没有匹配的设置",
    "No matching themes.": "没有匹配的主题。",
    "No MCP servers": "暂无 MCP 服务器",
    "No model usage yet.": "暂无模型用量。",
    "No models found": "未找到模型",
    "No options for this model": "此模型没有选项",
    "No profiles yet.": "暂无配置档。",
    "No project": "无项目",
    "No sessions yet.": "暂无会话。",
    "No skill activity yet.": "暂无技能活动。",
    "No skills found": "未找到技能",
    "No speech detected": "未检测到语音",
    "No toolsets found": "未找到工具集",
    "normal": "普通",
    "Not now": "暂不",
    "Not set": "未设置",
    "Nothing archived": "暂无归档",
    "Nothing to branch": "没有可分支内容",
    "Open cron jobs": "打开定时任务",
    "Open docs": "打开文档",
    "Open logs": "打开日志",
    "Open provider docs": "打开提供商文档",
    "Open settings": "打开设置",
    "Optional": "可选",
    "Options": "选项",
    "Other improvements": "其他改进",
    "Outline an approach before touching code so the diff stays focused.": "在修改代码前先概述方案，让改动保持聚焦。",
    "Paste image": "粘贴图片",
    "Phone number": "电话号码",
    "Pick a starter prompt to drop into the composer.": "选择一个起始提示放入输入区。",
    "pin": "固定",
    "Pinned": "已固定",
    "Prev": "上一项",
    "Preview": "预览",
    "Preview anyway": "仍然预览",
    "Preview restart failed": "预览重启失败",
    "Preview server restarted": "预览服务器已重启",
    "Preview unavailable": "预览不可用",
    "Profile created": "配置档已创建",
    "Profile deleted": "配置档已删除",
    "Profile renamed": "配置档已重命名",
    "Profiles": "配置档",
    "Profiles are independent Hermes environments: separate config, skills, and SOUL.md.": "配置档是独立的 Hermes 环境：拥有独立配置、技能和 SOUL.md。",
    "Prompt": "提示",
    "Prompt snippets": "提示片段",
    "Prompt snippets…": "提示片段…",
    "Provider": "提供商",
    "Provider selected": "已选择提供商",
    "Proxy URL": "代理 URL",
    "Recent activity": "最近活动",
    "Recent logs": "最近日志",
    "Recommended": "推荐",
    "Reconnect the gateway before reloading MCP.": "重新加载 MCP 前请先重新连接网关。",
    "Refresh tree": "刷新文件树",
    "Reload window": "重新加载窗口",
    "Remote gateway": "远程网关",
    "Remote gateway incomplete": "远程网关信息不完整",
    "Remote gateway reachable": "远程网关可达",
    "Remote URL": "远程 URL",
    "Rename": "重命名",
    "Rename profile": "重命名配置档",
    "Rename session": "重命名会话",
    "Renamed": "已重命名",
    "Reply style": "回复风格",
    "Required": "必填",
    "Reset all to main": "全部重置为主模型",
    "Reset to defaults": "恢复默认值",
    "Restart messaging": "重启消息服务",
    "Restart the desktop backend to apply cwd changes to this active session.": "重启桌面后端以将工作目录变更应用到当前活动会话。",
    "Restart the gateway for this change to take effect.": "重启网关后此更改才会生效。",
    "Restart the gateway to reconnect with the new credentials.": "重启网关以使用新凭据重新连接。",
    "Restarting preview server": "正在重启预览服务器",
    "Restore checkpoint": "恢复检查点",
    "Restore next checkpoint": "恢复下一个检查点",
    "Restore previous checkpoint": "恢复上一个检查点",
    "Restored": "已恢复",
    "Results": "结果",
    "Reveal desktop.log in your file manager — useful when the gateway fails to start.": "在文件管理器中显示 desktop.log，可用于排查网关启动失败。",
    "Reveal value": "显示值",
    "Runtime session elapsed": "运行时会话耗时",
    "Save for next restart": "保存到下次重启",
    "Saved": "已保存",
    "Saving…": "正在保存…",
    "Search models": "搜索模型",
    "Search sessions, views, and actions": "搜索会话、视图和操作",
    "Search sessions…": "搜索会话…",
    "See what's new": "查看新内容",
    "Select a profile to view its details.": "选择一个配置档以查看详情。",
    "Send edited message": "发送编辑后的消息",
    "Send queued turn now": "立即发送排队轮次",
    "Send this entry to chat": "发送此条目到聊天",
    "Sent to chat": "已发送到聊天",
    "Server JSON": "服务器 JSON",
    "Server URL": "服务器 URL",
    "Session": "会话",
    "Session actions": "会话操作",
    "Session busy": "会话忙碌中",
    "Session exported": "会话已导出",
    "Session search": "会话搜索",
    "Session token": "会话令牌",
    "Session unavailable": "会话不可用",
    "Sessions panel": "会话面板",
    "Set to main": "设为主模型",
    "Setup command copied": "设置命令已复制",
    "Shift-click a chat to pin · drag to reorder": "Shift 点击聊天可固定 · 拖动可重新排序",
    "Showing first 512 KB.": "正在显示前 512 KB。",
    "Sidebar": "侧边栏",
    "Signal bridge URL": "Signal 桥接 URL",
    "Skills hub": "技能中心",
    "Slack app token": "Slack 应用令牌",
    "Slack bot token": "Slack 机器人令牌",
    "Something broke in the interface": "界面出现错误",
    "SOUL.md saved": "SOUL.md 已保存",
    "Spawn tree": "生成树",
    "Start a private Hermes backend on localhost. This is the default and works offline.": "在 localhost 启动私有 Hermes 后端。这是默认设置，可离线使用。",
    "Start or resume a chat before branching.": "分支前请先开始或恢复聊天。",
    "Start voice conversation": "开始语音对话",
    "Starting desktop connection": "正在启动桌面连接",
    "Stop listening and send": "停止聆听并发送",
    "Stop the current turn before branching this chat.": "分支此聊天前请先停止当前轮次。",
    "Summarize my unread Slack threads and email me the top 5...": "总结我未读的 Slack 线程，并把前 5 条发邮件给我...",
    "System panel": "系统面板",
    "The dashboard session token used for REST and WebSocket access. Leave blank to keep the saved token.": "用于 REST 和 WebSocket 访问的仪表盘会话令牌。留空则保留已保存令牌。",
    "The desktop IPC bridge does not expose gateway settings.": "桌面 IPC 桥未暴露网关设置。",
    "The Hermes updater will take over in its own window and reopen Hermes when it’s done.": "Hermes 更新器会在自己的窗口中接管，并在完成后重新打开 Hermes。",
    "The system prompt and persona instructions baked into this profile.": "内置在此配置档中的系统提示和人格指令。",
    "The view hit an unexpected error. Your chats and settings are safe - try again, or reload the window.": "此视图遇到意外错误。你的聊天和设置是安全的，请重试或重新加载窗口。",
    "This desktop": "此桌面",
    "This message has no text to branch from.": "此消息没有可用于分支的文本。",
    "This platform does not need a token here. Use the setup guide above, then enable it below.": "此平台不需要在这里填写令牌。请先使用上方设置指南，然后在下方启用。",
    "Title gen": "标题生成",
    "Tokens in/out": "输入/输出 token",
    "Too many files": "文件过多",
    "Toolsets": "工具集",
    "Top models": "热门模型",
    "Top skills": "热门技能",
    "Tree error": "文件树错误",
    "Trigger now": "立即触发",
    "Try a broader search or different category.": "尝试更宽泛的搜索或不同分类。",
    "Try a broader search query.": "尝试更宽泛的搜索词。",
    "Try a different search term or choose another section.": "尝试其他搜索词或选择其他分区。",
    "Try recording again.": "请重新录音。",
    "Unarchive": "取消归档",
    "Unreadable": "无法读取",
    "Unsaved changes": "未保存更改",
    "Untitled session": "未命名会话",
    "Update didn’t finish": "更新未完成",
    "Update from your terminal": "从终端更新",
    "Update now": "立即更新",
    "Usage panel": "用量面板",
    "View all logs →": "查看所有日志 →",
    "Vision": "视觉",
    "Voice transcription is not available yet.": "语音转写尚不可用。",
    "Voice unavailable": "语音不可用",
    "Walk through how the selected code works and link to the key files.": "讲解所选代码如何工作，并链接到关键文件。",
    "Web extract": "网页提取",
    "Weekdays": "工作日",
    "Weekly": "每周",
    "What's new": "新内容",
    "When a turn delegates work, child agents stream their progress here.": "当某个轮次委派工作时，子代理会在这里流式显示进度。",
    "Working directory staged": "工作目录已暂存",
    "Workspace changed, reloading preview": "工作区已变更，正在重新加载预览",
    "You installed Hermes from the command line, so updates run there too. Paste this into your terminal:": "你是从命令行安装 Hermes 的，因此也需要在那里更新。将这段粘贴到终端：",
    "You’re all set": "已全部设置完成",
    "About": "关于",
    "About Hermes Desktop": "关于 Hermes Desktop",
    "Actions": "操作",
    "Advanced": "高级",
    "Agents": "代理",
    "All": "全部",
    "Allow Private URLs": "允许私有 URL",
    "API Retries": "API 重试次数",
    "Appearance": "外观",
    "Approval Mode": "审批模式",
    "Approval Timeout": "审批超时",
    "Archive": "归档",
    "Archive failed": "归档失败",
    "Archived": "已归档",
    "Artifacts": "工件",
    "Ask": "提问",
    "Auto-Compression": "自动压缩",
    "Backup provider:model entries to try if the default model fails.": "默认模型失败时尝试的备用 provider:model 条目。",
    "Browser Private URLs": "浏览器私有 URL",
    "Cancel": "取消",
    "Chat": "聊天",
    "Check now": "立即检查",
    "Checkpoint Limit": "检查点上限",
    "Clear": "清除",
    "Close": "关闭",
    "Code Execution Mode": "代码执行模式",
    "Color Mode": "颜色模式",
    "Command Allowlist": "命令白名单",
    "Command Timeout": "命令超时",
    "Compression Target": "压缩目标",
    "Compression Threshold": "压缩阈值",
    "Confirm MCP Reloads": "确认 MCP 重新加载",
    "Connected": "已连接",
    "Connecting": "正在连接",
    "Context Engine": "上下文引擎",
    "Context Window": "上下文窗口",
    "Create rollback snapshots before file edits.": "在编辑文件前创建可回滚快照。",
    "Cron": "定时任务",
    "Dark": "深色",
    "Default Model": "默认模型",
    "Default assistant style for new sessions.": "新会话默认使用的助手风格。",
    "Default project folder for tool and terminal work.": "工具和终端工作的默认项目文件夹。",
    "Delete": "删除",
    "Delete failed": "删除失败",
    "Desktop palettes only. The selected mode is applied on top.": "仅用于桌面调色板。所选模式会叠加应用。",
    "Disconnected": "未连接",
    "Done": "完成",
    "Edit": "编辑",
    "Edge Voice": "Edge 语音",
    "ElevenLabs Language": "ElevenLabs 语言",
    "ElevenLabs Model": "ElevenLabs 模型",
    "ElevenLabs STT Model": "ElevenLabs 语音转文字模型",
    "ElevenLabs Voice": "ElevenLabs 声音",
    "Enable local or provider-backed speech transcription.": "启用本地或提供商支持的语音转文字。",
    "Enabled Toolsets": "已启用工具集",
    "Environment Passthrough": "环境变量传递",
    "Environment variables to pass into tool execution.": "传递给工具执行环境的环境变量。",
    "Error": "错误",
    "Execution Backend": "执行后端",
    "Fallback Models": "备用模型",
    "Failed": "失败",
    "File Checkpoints": "文件检查点",
    "File Page Limit": "文件分页上限",
    "File Read Limit": "文件读取上限",
    "Follow OS appearance": "跟随系统外观",
    "Gateway": "网关",
    "Gateway connection...": "搜索网关连接...",
    "High": "高",
    "How Hermes handles commands that need explicit approval.": "Hermes 如何处理需要明确审批的命令。",
    "How long approval prompts wait before timing out.": "审批提示在超时前等待的时长。",
    "How strictly code execution is scoped to the current project.": "代码执行限定在当前项目中的严格程度。",
    "Human-friendly tool activity with concise summaries.": "以简明摘要展示便于阅读的工具活动。",
    "Image Attachments": "图片附件",
    "Include raw tool args/results and low-level details.": "包含原始工具参数、结果和底层细节。",
    "Keys": "密钥",
    "Language": "语言",
    "Light": "浅色",
    "Line Length Limit": "行长度上限",
    "Loading": "加载中",
    "Local Browser For Private URLs": "私有 URL 使用本地浏览器",
    "Local Transcription Model": "本地语音转文字模型",
    "Low": "低",
    "Low-glare workspace": "低眩光工作区",
    "Main": "主界面",
    "Max Agent Steps": "最大代理步骤数",
    "Max Recording Length": "最长录音时长",
    "MCP": "MCP",
    "Memory": "记忆",
    "Memory & Context": "记忆与上下文",
    "Memory Budget": "记忆预算",
    "Memory Provider": "记忆提供商",
    "Model": "模型",
    "New": "新建",
    "New Session": "新建会话",
    "No": "否",
    "No description.": "暂无描述。",
    "Off": "关闭",
    "Open": "打开",
    "Open Settings": "打开设置",
    "OpenAI TTS Model": "OpenAI 文字转语音模型",
    "OpenAI Voice": "OpenAI 声音",
    "Optional ISO-639-3 language code. Blank lets ElevenLabs auto-detect.": "可选 ISO-639-3 语言代码。留空则让 ElevenLabs 自动检测。",
    "Parallel Subagents": "并行子代理",
    "Persistent Memory": "持久记忆",
    "Persistent Shell": "持久 Shell",
    "Personality": "个性",
    "Pick a fixed mode or let Hermes follow your system setting.": "选择固定模式，或让 Hermes 跟随系统设置。",
    "Pin session": "固定会话",
    "Product": "产品",
    "Product hides raw tool payloads; Technical shows full input/output.": "产品模式隐藏原始工具载荷；技术模式显示完整输入和输出。",
    "Profile Budget": "用户资料预算",
    "Protected Recent Messages": "受保护的最近消息",
    "Read Responses Aloud": "朗读回复",
    "Reasoning Blocks": "推理区块",
    "Redact Secrets": "隐藏敏感密钥",
    "Refresh": "刷新",
    "Remove": "移除",
    "Retry": "重试",
    "Running": "运行中",
    "Safety": "安全",
    "Save": "保存",
    "Save durable memories that can help future sessions.": "保存有助于未来会话的持久记忆。",
    "Search": "搜索",
    "Search API keys...": "搜索 API 密钥...",
    "Search archived sessions...": "搜索已归档会话...",
    "Search MCP servers...": "搜索 MCP 服务器...",
    "Search settings...": "搜索设置...",
    "Sessions": "会话",
    "Settings": "设置",
    "Show reasoning sections when the backend provides them.": "当后端提供推理内容时显示推理区块。",
    "Skills": "技能",
    "Skills & Tools": "技能与工具",
    "Speech To Text": "语音转文字",
    "Speech-To-Text Provider": "语音转文字提供商",
    "Speaker Diarization": "说话人分离",
    "Start": "启动",
    "Status": "状态",
    "Stop": "停止",
    "Subagent Model": "子代理模型",
    "Subagent Provider": "子代理提供商",
    "Subagent Reasoning Effort": "子代理推理强度",
    "Subagent Timeout": "子代理超时",
    "Subagent Turn Limit": "子代理轮次上限",
    "Summarize older context when conversations get large.": "当会话变大时摘要较早的上下文。",
    "System": "系统",
    "Tag Audio Events": "标记音频事件",
    "Technical": "技术",
    "Terminal": "终端",
    "Terminal Output Limit": "终端输出上限",
    "Text-To-Speech Provider": "文字转语音提供商",
    "These are desktop-only display preferences. Mode controls brightness; theme controls the accent palette and chat surface styling.": "这些是仅限桌面的显示偏好。模式控制明暗，主题控制强调色和聊天界面样式。",
    "Theme": "主题",
    "Timezone": "时区",
    "Tool Call Display": "工具调用显示",
    "Tool-Use Enforcement": "工具使用约束",
    "Tools": "工具",
    "Transcription Language": "转写语言",
    "Try again": "重试",
    "Update Hermes": "更新 Hermes",
    "Updates": "更新",
    "Upper bound for tool-calling turns before Hermes stops a run.": "Hermes 停止一次运行前允许的工具调用轮次上限。",
    "Used for new chats unless you pick a different model in the composer.": "除非在输入区选择其他模型，否则新聊天会使用此模型。",
    "Used when Hermes needs local time context. Blank uses the system timezone.": "Hermes 需要本地时间上下文时使用。留空则使用系统时区。",
    "User Profile": "用户资料",
    "Voice": "语音",
    "Voice Shortcut": "语音快捷键",
    "Workspace": "工作区",
    "Working Directory": "工作目录",
    "Yes": "是",
    "auto": "自动",
    "base": "基础",
    "builtin": "内置",
    "compressor": "压缩器",
    "concise": "简洁",
    "creative": "创意",
    "custom": "自定义",
    "default": "默认",
    "helpful": "乐于助人",
    "high": "高",
    "large-v3": "large-v3",
    "low": "低",
    "manual": "手动",
    "medium": "中",
    "minimal": "最小",
    "native": "原生",
    "none": "无",
    "off": "关闭",
    "on": "开启",
    "product": "产品",
    "project": "项目",
    "smart": "智能",
    "strict": "严格",
    "technical": "技术",
    "text": "文本",
    "tiny": "tiny",
    "xhigh": "极高"
  };
  var reverse = {};
  Object.keys(zh).forEach(function(key){ reverse[zh[key]] = key; });
  var textOriginals = new WeakMap();
  var attrOriginals = new WeakMap();
  var scheduled = false;
  var applying = false;
  var observer = null;

  function lang(){
    try { return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; }
    catch (_) { return DEFAULT_LANG; }
  }

  function isChinese(){
    return lang() !== "en";
  }

  function setLang(value){
    var next = value === "en" ? "en" : "zh-CN";
    try { localStorage.setItem(STORAGE_KEY, next); } catch (_) {}
    applyNow();
  }

  function splitOuter(text){
    var leading = (text.match(/^\s*/) || [""])[0];
    var trailing = (text.match(/\s*$/) || [""])[0];
    var core = text.slice(leading.length, text.length - trailing.length);
    return { leading: leading, core: core, trailing: trailing };
  }

  function translateCore(core){
    if (!core) return core;
    if (zh[core]) return zh[core];
    var compact = core.replace(/\s+/g, " ").trim();
    if (zh[compact]) return zh[compact];
    var m = compact.match(/^(\d+)\s+more\s+files?$/i);
    if (m) return m[1] + " 个更多文件";
    m = compact.match(/^(\d+)\s+more\s+changes?$/i);
    if (m) return m[1] + " 个更多改动";
    m = compact.match(/^(\d+)\s+actions?$/i);
    if (m) return m[1] + " 个操作";
    m = compact.match(/^(\d+)\s+sessions?$/i);
    if (m) return m[1] + " 个会话";
    m = compact.match(/^(\d+)\s+toolsets?\s+enabled$/i);
    if (m) return "已启用 " + m[1] + " 个工具集";
    m = compact.match(/^(.+)\s+failed$/i);
    if (m && zh[m[1]]) return zh[m[1]] + "失败";
    return core;
  }

  function translate(text){
    if (typeof text !== "string" || !text || !/[A-Za-z]/.test(text)) return text;
    var parts = splitOuter(text);
    var translated = translateCore(parts.core);
    return translated === parts.core ? text : parts.leading + translated + parts.trailing;
  }

  function shouldSkipElement(el){
    if (!el || el.nodeType !== 1) return false;
    if (el.closest("[data-hermes-i18n-skip]")) return true;
    if (el.closest("textarea,input,select,option,pre,code,kbd,samp,[contenteditable='true'],.xterm,.cm-editor,.monaco-editor")) return true;
    return false;
  }

  function translateTextNode(node){
    var parent = node.parentElement;
    if (!parent || shouldSkipElement(parent)) return;
    var raw = node.nodeValue || "";
    if (!raw.trim()) return;
    var original = textOriginals.get(node);
    if (!original) {
      original = reverse[raw.trim()] || raw;
      textOriginals.set(node, original);
    }
    var desired = isChinese() ? translate(original) : original;
    if (node.nodeValue !== desired) node.nodeValue = desired;
  }

  function translateAttributes(root){
    var attrs = ["placeholder", "title", "aria-label"];
    var nodes = [];
    if (root.nodeType === 1) nodes.push(root);
    root.querySelectorAll && root.querySelectorAll("[placeholder],[title],[aria-label]").forEach(function(el){ nodes.push(el); });
    nodes.forEach(function(el){
      if (shouldSkipElement(el)) return;
      var store = attrOriginals.get(el);
      if (!store) {
        store = {};
        attrOriginals.set(el, store);
      }
      attrs.forEach(function(attr){
        if (!el.hasAttribute(attr)) return;
        var raw = el.getAttribute(attr);
        if (!raw) return;
        if (!store[attr]) store[attr] = reverse[raw.trim()] || raw;
        var desired = isChinese() ? translate(store[attr]) : store[attr];
        if (raw !== desired) el.setAttribute(attr, desired);
      });
    });
  }

  function walkText(root){
    if (!root || !document.body) return;
    if (root.nodeType === 3) {
      translateTextNode(root);
      return;
    }
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node){
        return shouldSkipElement(node.parentElement) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var node;
    while ((node = walker.nextNode())) translateTextNode(node);
  }

  function findColorModeSection(){
    var sections = Array.prototype.slice.call(document.querySelectorAll("section"));
    return sections.find(function(section){
      var text = (section.textContent || "").replace(/\s+/g, " ").trim();
      return text.indexOf("Color Mode") >= 0 || text.indexOf("颜色模式") >= 0;
    }) || null;
  }

  function injectLanguageSwitch(){
    var colorSection = findColorModeSection();
    if (!colorSection || !colorSection.parentElement) return;
    var existing = document.getElementById("hermes-language-switch");
    if (existing) existing.remove();
    var zhActive = isChinese();
    var section = document.createElement("section");
    section.id = "hermes-language-switch";
    section.setAttribute("data-hermes-i18n-skip", "true");
    section.className = "rounded-xl border border-(--ui-stroke-tertiary) bg-(--ui-chat-bubble-background) p-3 shadow-sm";
    section.innerHTML = [
      '<div class="mb-3 flex items-center justify-between gap-3">',
      '<div>',
      '<div class="text-sm font-medium">' + (zhActive ? "语言" : "Language") + '</div>',
      '<div class="mt-1 text-xs text-muted-foreground">' + (zhActive ? "选择 Hermes 界面使用中文或英文。" : "Choose Chinese or English for the Hermes interface.") + '</div>',
      '</div>',
      '<div class="rounded-md bg-(--ui-bg-quinary) px-2 py-1 text-xs">' + (zhActive ? "中文" : "English") + '</div>',
      '</div>',
      '<div class="grid gap-2 sm:grid-cols-2">',
      '<button type="button" data-hermes-lang="zh-CN" class="' + buttonClass(zhActive) + '"><div class="text-[length:var(--conversation-text-font-size)] font-medium">中文</div><div class="mt-1 text-[length:var(--conversation-caption-font-size)] leading-(--conversation-caption-line-height) text-(--ui-text-tertiary)">简体中文界面</div></button>',
      '<button type="button" data-hermes-lang="en" class="' + buttonClass(!zhActive) + '"><div class="text-[length:var(--conversation-text-font-size)] font-medium">English</div><div class="mt-1 text-[length:var(--conversation-caption-font-size)] leading-(--conversation-caption-line-height) text-(--ui-text-tertiary)">Original English interface</div></button>',
      '</div>'
    ].join("");
    section.querySelectorAll("[data-hermes-lang]").forEach(function(button){
      button.addEventListener("click", function(){ setLang(button.getAttribute("data-hermes-lang")); });
    });
    colorSection.parentElement.insertBefore(section, colorSection);
  }

  function buttonClass(active){
    return "group rounded-lg border border-(--ui-stroke-tertiary) bg-(--ui-bg-quinary) p-2.5 text-left transition hover:bg-(--chrome-action-hover)" + (active ? " border-(--ui-stroke-secondary) bg-(--ui-bg-tertiary)" : "");
  }

  function applyNow(){
    if (!document.body) return;
    applying = true;
    try {
      injectLanguageSwitch();
      walkText(document.body);
      translateAttributes(document.body);
      document.documentElement.lang = isChinese() ? "zh-CN" : "en";
    } finally {
      applying = false;
    }
  }

  function schedule(){
    if (applying || scheduled) return;
    scheduled = true;
    requestAnimationFrame(function(){
      scheduled = false;
      applyNow();
    });
  }

  function start(){
    if (!document.body) {
      document.addEventListener("DOMContentLoaded", start, { once: true });
      return;
    }
    applyNow();
    observer = new MutationObserver(schedule);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "title", "aria-label"]
    });
  }

  window.__hermesI18n = { apply: applyNow, setLanguage: setLang, getLanguage: lang };
  start();
})();
${patchEnd}
`;

function parseAsar(buffer) {
  const headerPickleSize = buffer.readUInt32LE(4);
  const jsonSize = buffer.readUInt32LE(12);
  const header = JSON.parse(buffer.subarray(16, 16 + jsonSize).toString("utf8"));
  const dataOffset = 8 + headerPickleSize;
  return { header, dataOffset };
}

function fileEntries(root) {
  const entries = [];
  function walk(node, prefix) {
    if (node.files) {
      for (const [name, child] of Object.entries(node.files)) {
        walk(child, prefix ? `${prefix}/${name}` : name);
      }
      return;
    }
    entries.push({ path: prefix, node });
  }
  walk(root, "");
  return entries;
}

function integrityFor(buffer, previous) {
  const size = previous?.blockSize || blockSize;
  const blocks = [];
  for (let offset = 0; offset < buffer.length; offset += size) {
    blocks.push(crypto.createHash("sha256").update(buffer.subarray(offset, offset + size)).digest("hex"));
  }
  if (buffer.length === 0) {
    blocks.push(crypto.createHash("sha256").update(Buffer.alloc(0)).digest("hex"));
  }
  return {
    algorithm: "SHA256",
    hash: crypto.createHash("sha256").update(buffer).digest("hex"),
    blockSize: size,
    blocks
  };
}

function headerBuffer(header) {
  const json = Buffer.from(JSON.stringify(header), "utf8");
  const padding = (4 - ((4 + json.length) % 4)) % 4;
  const innerPayloadSize = 4 + json.length + padding;
  const inner = Buffer.alloc(4 + innerPayloadSize);
  inner.writeUInt32LE(innerPayloadSize, 0);
  inner.writeUInt32LE(json.length, 4);
  json.copy(inner, 8);
  const outer = Buffer.alloc(8);
  outer.writeUInt32LE(4, 0);
  outer.writeUInt32LE(inner.length, 4);
  return Buffer.concat([outer, inner]);
}

function patchBundle(buffer) {
  let source = buffer.toString("utf8");
  const existing = source.indexOf(patchStart);
  if (existing >= 0) source = source.slice(0, existing).trimEnd();
  source = `${source}\n;${localizationPatch}\n`;
  return Buffer.from(source, "utf8");
}

const original = fs.readFileSync(sourceAsar);
const parsed = parseAsar(original);
const header = JSON.parse(JSON.stringify(parsed.header));
const originalEntries = fileEntries(parsed.header);
const patchedEntries = fileEntries(header);
const chunks = [];
let offset = 0;

for (let index = 0; index < patchedEntries.length; index += 1) {
  const current = patchedEntries[index];
  const previous = originalEntries[index];
  if (!previous || previous.path !== current.path) {
    throw new Error(`ASAR entry order changed around ${current.path}`);
  }
  const start = parsed.dataOffset + Number(previous.node.offset);
  let content = original.subarray(start, start + previous.node.size);
  if (current.path === targetBundle) {
    content = patchBundle(content);
  }
  current.node.size = content.length;
  current.node.offset = String(offset);
  current.node.integrity = integrityFor(content, current.node.integrity);
  chunks.push(content);
  offset += content.length;
}

if (!patchedEntries.some((entry) => entry.path === targetBundle)) {
  throw new Error(`Missing target bundle: ${targetBundle}`);
}

const packed = Buffer.concat([headerBuffer(header), ...chunks]);
fs.writeFileSync(outputAsar, packed);
const hash = crypto.createHash("sha256").update(packed).digest("hex");
fs.writeFileSync(outputHash, `${hash}\n`);
console.log(`Wrote ${outputAsar}`);
console.log(`SHA256 ${hash}`);
