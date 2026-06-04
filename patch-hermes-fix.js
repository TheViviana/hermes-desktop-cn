const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const vm = require("vm");

const sourceAsar = process.env.HERMES_SOURCE_ASAR || "/Users/theviviana/.hermes/hermes-agent/apps/desktop/release/mac-arm64/Hermes.app/Contents/Resources/app.asar";
const outputAsar = process.env.HERMES_OUTPUT_ASAR || path.join(__dirname, "app.asar");
const outputHash = process.env.HERMES_OUTPUT_HASH || path.join(__dirname, "app.asar.sha256");
const targetBundle = process.env.HERMES_TARGET_BUNDLE || "dist/assets/index-DueRxpsT.js";
const zhI18nFile = process.env.HERMES_ZH_I18N || path.join(__dirname, "i18n", "zh.ts");
const enI18nFile = process.env.HERMES_EN_I18N || path.join(__dirname, "i18n", "en.ts");
const legacyPatchFile = process.env.HERMES_LEGACY_PATCH || path.join(__dirname, "legacy-translations.js");
const blockSize = 4194304;

function readSkillI18n(file) {
  const src = fs.readFileSync(file, "utf8");
  const start = src.indexOf("  skills: {");
  if (start < 0) throw new Error(`skills object not found in ${file}`);
  const open = src.indexOf("{", start);
  let depth = 0;
  let end = -1;
  for (let i = open; i < src.length; i += 1) {
    const ch = src[i];
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch;
      i += 1;
      for (; i < src.length; i += 1) {
        if (src[i] === "\\") i += 1;
        else if (src[i] === quote) break;
      }
      continue;
    }
    if (ch === "{") depth += 1;
    if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  return vm.runInNewContext(`(${src.slice(open, end)})`, {});
}

function readObjectLiteralAfter(src, marker) {
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`object marker not found: ${marker}`);
  const open = src.indexOf("{", start);
  let depth = 0;
  let end = -1;
  for (let i = open; i < src.length; i += 1) {
    const ch = src[i];
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch;
      i += 1;
      for (; i < src.length; i += 1) {
        if (src[i] === "\\") i += 1;
        else if (src[i] === quote) break;
      }
      continue;
    }
    if (ch === "{") depth += 1;
    if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end < 0) throw new Error(`object literal was not closed: ${marker}`);
  return vm.runInNewContext(`(${src.slice(open, end)})`, {});
}

function readLegacyTranslations(file) {
  try {
    return readObjectLiteralAfter(fs.readFileSync(file, "utf8"), "var zh =");
  } catch {
    return {};
  }
}

const zhSkills = readSkillI18n(zhI18nFile);
const enSkills = readSkillI18n(enI18nFile);
const legacyStrings = legacyPatchFile ? readLegacyTranslations(legacyPatchFile) : {};

const baseStrings = {
  "Advanced": "高级",
  "Appearance": "外观",
  "Bright desktop surfaces": "明亮桌面界面",
  "Choose Chinese or English for the Hermes interface.": "选择 Hermes 界面使用中文或英文。",
  "Color Mode": "颜色模式",
  "Configured": "已配置",
  "Dark": "深色",
  "Desktop palettes only. The selected mode is applied on top.": "仅用于桌面调色板。所选模式会叠加应用。",
  "Follow OS appearance": "跟随系统外观",
  "Human-friendly tool activity with concise summaries.": "以简明摘要展示便于阅读的工具活动。",
  "Language": "语言",
  "Last checked": "上次检查",
  "Light": "浅色",
  "Low-glare workspace": "低眩光工作区",
  "Include raw tool args/results and low-level details.": "包含原始工具参数、结果和底层细节。",
  "just now": "刚刚",
  "never": "从未",
  "Needs keys": "需要密钥",
  "Original English interface": "原始英文界面",
  "Pick a fixed mode or let Hermes follow your system setting.": "选择固定模式，或让 Hermes 跟随系统设置。",
  "Product": "产品",
  "Product hides raw tool payloads; Technical shows full input/output.": "产品模式隐藏原始工具负载；技术模式显示完整输入/输出。",
  "Release notes": "发布说明",
  "Simplified Chinese interface": "简体中文界面",
  "System": "系统",
  "Technical": "技术",
  "Theme": "主题",
  "These are desktop-only display preferences. Mode controls brightness; theme controls the accent palette and chat surface styling.": "这些是仅限桌面的显示偏好。模式控制明暗，主题控制强调色和聊天界面样式。",
  "Tool Call Display": "工具调用显示",
  "Toolsets failed to refresh": "工具集刷新失败",
  "Version": "版本",
  "Version unavailable": "版本不可用",
  "Workspace": "工作区",
  "You're on the latest version.": "已是最新版本。",
  "You’re on the latest version.": "已是最新版本。",
  "Safety": "安全",
  "Memory & Context": "记忆与上下文",
  "Voice": "语音",
  "Model": "模型"
};

const skillStrings = {};
for (const key of Object.keys(enSkills)) {
  if (typeof enSkills[key] === "string" && typeof zhSkills[key] === "string") {
    skillStrings[enSkills[key]] = zhSkills[key];
  }
}

const helper = [
  `var HCN_LANG_KEY="hermes.ui.language";`,
  `var HCN_STRINGS=${JSON.stringify({ ...legacyStrings, ...baseStrings, ...skillStrings })};`,
  `var HCN_SKILL_DESCRIPTIONS=${JSON.stringify(zhSkills.skillDescriptions || {})};`,
  `var HCN_TOOLSET_DESCRIPTIONS=${JSON.stringify(zhSkills.toolsetDescriptions || {})};`,
  `var HCN_CATEGORY_LABELS=${JSON.stringify(zhSkills.categoryLabels || {})};`,
  `function HCN_lang(){try{return localStorage.getItem(HCN_LANG_KEY)||"zh-CN"}catch(e){return"zh-CN"}}`,
  `function HCN_isZh(){return HCN_lang()!=="en"}`,
  `function HCN_setLang(e){try{localStorage.setItem(HCN_LANG_KEY,e==="en"?"en":"zh-CN")}catch(t){};try{window.location.reload()}catch(t){}}`,
  `function HCN_t(e){return HCN_isZh()?HCN_STRINGS[e]||e:e}`,
  `function HCN_ready(){return typeof HCN_STRINGS!="undefined"&&!!HCN_STRINGS}`,
  `function HCN_rText(e){if(!HCN_ready()||!HCN_isZh()||typeof e!="string"||!e||!/[A-Za-z]/.test(e))return e;var t=(e.match(/^\\s*/)||[""])[0],n=(e.match(/\\s*$/)||[""])[0],r=e.slice(t.length,e.length-n.length),i=r.replace(/\\s+/g," ").trim(),a=HCN_STRINGS[r]||HCN_STRINGS[i];if(!a){var o=i.match(/^Version (.+)$/);if(o)a="版本 "+o[1];o=i.match(/^Last checked (.+)$/);if(o)a="上次检查 "+HCN_rText(o[1]);o=i.match(/^(\\d+) min ago$/);if(o)a=o[1]+" 分钟前";o=i.match(/^(\\d+) hours ago$/);if(o)a=o[1]+" 小时前";o=i.match(/^(\\d+) days ago$/);if(o)a=o[1]+" 天前";o=i.match(/^A new update is ready \\((\\d+) changes? included\\)\\.$/);if(o)a="有新的更新可用（包含 "+o[1]+" 项变更）。";o=i.match(/^\\+\\s*(\\d+)\\s+more changes? included\\.$/);if(o)a="+"+o[1]+" 项变更";o=i.match(/^Branch (.+) · Commit (.+)$/);if(o)a="分支 "+o[1]+" · 提交 "+o[2];o=i.match(/^Configure (.+)$/);if(o)a="配置 "+o[1];o=i.match(/^Toggle (.+) toolset$/);if(o)a="切换 "+o[1]+" 工具集";o=i.match(/^Failed to update (.+)$/);if(o)a="更新 "+o[1]+" 失败"}return a?t+a+n:e}`,
  `function HCN_child(e){if(typeof e=="string")return HCN_rText(e);if(Array.isArray(e)){if(e.length===5&&e[0]==="+ "&&e[2]==" more change"&&e[4]==" included.")return["+ ",e[1]," 项变更"];return e.map(HCN_child)}return e}`,
  `function HCN_props(e){if(!HCN_ready()||!HCN_isZh()||!e||typeof e!="object")return e;var t=e,n=!1,r=["children","placeholder","title","aria-label","label","description","message"];for(var i=0;i<r.length;i++){var a=r[i];if(Object.prototype.hasOwnProperty.call(e,a)){var o=a==="children"?HCN_child(e[a]):HCN_rText(e[a]);if(o!==e[a]){n||(t={...e},n=!0),t[a]=o}}}return t}`,
  `function HCN_tpl(e,t){return HCN_t(e).replace("{label}",t).replace("{name}",t)}`,
  `function HCN_applies(e){return HCN_isZh()?String(e)+" 将在新会话中生效。":String(e)+" applies to new sessions."}`,
  `function HCN_updateFailed(e){return HCN_isZh()?"更新 "+String(e)+" 失败":"Failed to update "+String(e)}`,
  `function HCN_toolsetsEnabled(e,t){return HCN_isZh()?"已启用 "+e+"/"+t+" 个工具集":e+"/"+t+" toolsets enabled"}`,
  `function HCN_skillDesc(e,t){return HCN_isZh()?HCN_SKILL_DESCRIPTIONS[e]||HCN_STRINGS[t]||t:t}`,
  `function HCN_toolsetDesc(e,t){return HCN_isZh()?HCN_TOOLSET_DESCRIPTIONS[e]||HCN_STRINGS[t]||t:t}`,
  `function HCN_category(e){return HCN_isZh()?HCN_CATEGORY_LABELS[e]||O9(e):O9(e)}`
].join("");

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

function functionBounds(source, name) {
  const start = source.indexOf(`function ${name}(`);
  if (start < 0) throw new Error(`function ${name} not found`);
  let paren = source.indexOf("(", start);
  let parenDepth = 0;
  let brace = -1;
  for (let i = paren; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch;
      i += 1;
      for (; i < source.length; i += 1) {
        if (source[i] === "\\") i += 1;
        else if (source[i] === quote) break;
      }
      continue;
    }
    if (ch === "(") parenDepth += 1;
    if (ch === ")") {
      parenDepth -= 1;
      if (parenDepth === 0) {
        brace = source.indexOf("{", i);
        break;
      }
    }
  }
  let depth = 0;
  let end = -1;
  for (let i = brace; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch;
      i += 1;
      for (; i < source.length; i += 1) {
        if (source[i] === "\\") i += 1;
        else if (source[i] === quote) break;
      }
      continue;
    }
    if (ch === "{") depth += 1;
    if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  return { start, end };
}

function replaceOnce(source, from, to, label = from) {
  if (!source.includes(from)) throw new Error(`replacement target not found: ${label}`);
  return source.replace(from, to);
}

function patchAppearance(source) {
  let out = source;
  out = replaceOnce(out, "else r=n;return n=r.ref,", "else r=n;r=typeof HCN_props==`function`?HCN_props(r):r;return n=r.ref,", "react jsx props translator");
  out = replaceOnce(out, "function _un()", `${helper}function _un()`, "helper before _un");
  out = replaceOnce(out, "o=n.find(t=>t.name===e);return", "o=n.find(t=>t.name===e),s=HCN_lang();return", "language state");
  out = replaceOnce(out, "title:`Appearance`", "title:HCN_t(`Appearance`)");
  out = replaceOnce(out, "children:`These are desktop-only display preferences. Mode controls brightness; theme controls the accent palette and chat surface styling.`", "children:HCN_t(`These are desktop-only display preferences. Mode controls brightness; theme controls the accent palette and chat surface styling.`)");
  const colorSection = "(0,N9.jsxs)(`section`,{className:`rounded-xl border border-(--ui-stroke-tertiary) bg-(--ui-chat-bubble-background) p-3 shadow-sm`,children:[(0,N9.jsxs)(`div`,{className:`mb-3 flex items-center justify-between gap-3`,children:[(0,N9.jsxs)(`div`,{children:[(0,N9.jsx)(`div`,{className:`text-sm font-medium`,children:`Color Mode`}";
  const languageSection = "(0,N9.jsxs)(`section`,{className:`rounded-xl border border-(--ui-stroke-tertiary) bg-(--ui-chat-bubble-background) p-3 shadow-sm`,children:[(0,N9.jsxs)(`div`,{className:`mb-3 flex items-center justify-between gap-3`,children:[(0,N9.jsxs)(`div`,{children:[(0,N9.jsx)(`div`,{className:`text-sm font-medium`,children:HCN_t(`Language`)}),(0,N9.jsx)(`div`,{className:`mt-1 text-xs text-muted-foreground`,children:HCN_t(`Choose Chinese or English for the Hermes interface.`)})]}),(0,N9.jsx)(d9,{children:s===`en`?`English`:`中文`})]}),(0,N9.jsx)(`div`,{className:`grid gap-2 sm:grid-cols-2`,children:[{id:`zh-CN`,label:`中文`,description:HCN_t(`Simplified Chinese interface`)},{id:`en`,label:`English`,description:HCN_t(`Original English interface`)}].map(({id:e,label:t,description:n})=>{let r=s===e;return(0,N9.jsxs)(`button`,{className:R(`group rounded-lg border border-(--ui-stroke-tertiary) bg-(--ui-bg-quinary) p-2.5 text-left transition hover:bg-(--chrome-action-hover)`,r&&`border-(--ui-stroke-secondary) bg-(--ui-bg-tertiary)`),onClick:()=>{Yx(`selection`),HCN_setLang(e)},type:`button`,children:[(0,N9.jsxs)(`div`,{className:`flex items-start justify-between gap-3`,children:[(0,N9.jsx)(`div`,{className:`text-[length:var(--conversation-text-font-size)] font-medium`,children:t}),r&&(0,N9.jsx)(`span`,{className:`grid size-5 place-items-center rounded-full bg-primary text-primary-foreground`,children:(0,N9.jsx)(hy,{className:`size-3.5`})})]}),(0,N9.jsx)(`div`,{className:`mt-1 text-[length:var(--conversation-caption-font-size)] leading-(--conversation-caption-line-height) text-(--ui-text-tertiary)`,children:n})]},e)})})]}),";
  out = replaceOnce(out, colorSection, languageSection + colorSection.replace("children:`Color Mode`", "children:HCN_t(`Color Mode`)"), "insert language before color");
  out = replaceOnce(out, "children:`Pick a fixed mode or let Hermes follow your system setting.`", "children:HCN_t(`Pick a fixed mode or let Hermes follow your system setting.`)");
  out = replaceOnce(out, "children:O9(t)", "children:HCN_t(O9(t))");
  out = replaceOnce(out, "children:n}),(0,N9.jsx)(`div`,{className:`mt-1 text-[length:var(--conversation-caption-font-size)] leading-(--conversation-caption-line-height) text-(--ui-text-tertiary)`,children:r})", "children:HCN_t(n)}),(0,N9.jsx)(`div`,{className:`mt-1 text-[length:var(--conversation-caption-font-size)] leading-(--conversation-caption-line-height) text-(--ui-text-tertiary)`,children:HCN_t(r)})", "mode labels");
  out = replaceOnce(out, "children:`Tool Call Display`", "children:HCN_t(`Tool Call Display`)");
  out = replaceOnce(out, "children:`Product hides raw tool payloads; Technical shows full input/output.`", "children:HCN_t(`Product hides raw tool payloads; Technical shows full input/output.`)");
  out = replaceOnce(out, "children:a===`technical`?`Technical`:`Product`", "children:HCN_t(a===`technical`?`Technical`:`Product`)");
  out = replaceOnce(out, "[{id:`product`,label:`Product`,description:`Human-friendly tool activity with concise summaries.`},{id:`technical`,label:`Technical`,description:`Include raw tool args/results and low-level details.`}]", "[{id:`product`,label:HCN_t(`Product`),description:HCN_t(`Human-friendly tool activity with concise summaries.`)},{id:`technical`,label:HCN_t(`Technical`),description:HCN_t(`Include raw tool args/results and low-level details.`)}]", "tool display labels");
  out = replaceOnce(out, "children:`Theme`", "children:HCN_t(`Theme`)");
  out = replaceOnce(out, "children:`Desktop palettes only. The selected mode is applied on top.`", "children:HCN_t(`Desktop palettes only. The selected mode is applied on top.`)");
  out = replaceOnce(out, "children:t.label}),(0,N9.jsx)(`div`,{className:`mt-0.5 line-clamp-2 text-[length:var(--conversation-caption-font-size)] leading-(--conversation-caption-line-height) text-(--ui-text-tertiary)`,children:t.description})", "children:HCN_t(t.label)}),(0,N9.jsx)(`div`,{className:`mt-0.5 line-clamp-2 text-[length:var(--conversation-caption-font-size)] leading-(--conversation-caption-line-height) text-(--ui-text-tertiary)`,children:HCN_t(t.description)})", "theme labels");
  return out;
}

function patchSkillsFunction(src) {
  let out = src;
  const pairs = [
    ["sx(e,`Skills failed to load`)", "sx(e,HCN_t(`Skills failed to load`))"],
    ["sx(e,`Toolsets failed to refresh`)", "sx(e,HCN_t(`Toolsets failed to refresh`))"],
    ["title:t?`Skill enabled`:`Skill disabled`,message:`${e.name} applies to new sessions.`", "title:t?HCN_t(`Skill enabled`):HCN_t(`Skill disabled`),message:HCN_applies(e.name)"],
    ["sx(t,`Failed to update ${e.name}`)", "sx(t,HCN_updateFailed(e.name))"],
    ["title:t?`Toolset enabled`:`Toolset disabled`,message:`${E9(e.label||e.name)} applies to new sessions.`", "title:t?HCN_t(`Toolset enabled`):HCN_t(`Toolset disabled`),message:HCN_applies(E9(e.label||e.name))"],
    ["sx(t,`Failed to update ${E9(e.label||e.name)}`)", "sx(t,HCN_updateFailed(E9(e.label||e.name)))"],
    ["children:`Skills`", "children:HCN_t(`Skills`)"],
    ["children:`Toolsets`", "children:HCN_t(`Toolsets`)"],
    ["children:[`All `,(0,Q9.jsx)(N5,{children:E})]", "children:[HCN_t(`All`),` `,(0,Q9.jsx)(N5,{children:E})]"],
    ["children:[O9(e.key),` `,(0,Q9.jsx)(N5,{children:e.count})]", "children:[HCN_category(e.key),` `,(0,Q9.jsx)(N5,{children:e.count})]"],
    ["searchPlaceholder:n===`skills`?`Search skills...`:`Search toolsets...`", "searchPlaceholder:n===`skills`?HCN_t(`Search skills...`):HCN_t(`Search toolsets...`)"],
    ["\"aria-label\":f?`Refreshing skills`:`Refresh skills`", "\"aria-label\":f?HCN_t(`Refreshing skills`):HCN_t(`Refresh skills`)"],
    ["title:f?`Refreshing skills`:`Refresh skills`", "title:f?HCN_t(`Refreshing skills`):HCN_t(`Refresh skills`)"],
    ["label:`Loading capabilities...`", "label:HCN_t(`Loading capabilities...`)"],
    ["description:`Try a broader search or different category.`,title:`No skills found`", "description:HCN_t(`Try a broader search or different category.`),title:HCN_t(`No skills found`)"],
    ["children:O9(e)", "children:HCN_category(e)"],
    ["children:E9(e.description)||`No description.`", "children:HCN_skillDesc(e.name,E9(e.description))||HCN_t(`No description`)"],
    ["description:`Try a broader search query.`,title:`No toolsets found`", "description:HCN_t(`Try a broader search query.`),title:HCN_t(`No toolsets found`)"],
    ["children:[D,`/`,c.length,` toolsets enabled`]", "children:HCN_toolsetsEnabled(D,c.length)"],
    ["\"aria-label\":`Configure ${n}`", "\"aria-label\":HCN_tpl(`Configure {label}`,n)"],
    ["children:e.configured?`Configured`:`Needs keys`", "children:e.configured?HCN_t(`Configured`):HCN_t(`Needs keys`)"],
    ["\"aria-label\":`Toggle ${n} toolset`", "\"aria-label\":HCN_tpl(`Toggle {label} toolset`,n)"],
    ["children:E9(e.description)||`No description.`", "children:HCN_toolsetDesc(e.name,E9(e.description))||HCN_t(`No description`)"]
  ];
  for (const [from, to] of pairs) out = replaceOnce(out, from, to);
  return out;
}

function patchBundle(buffer) {
  let source = buffer.toString("utf8");
  if (source.includes("Hermes zh-CN localization patch start")) {
    throw new Error("source bundle is already patched; expected clean backup");
  }
  source = patchAppearance(source);
  source = replaceOnce(source, "D9(e.name,r)||D9(e.description,r)||D9(e.category,r)", "D9(e.name,r)||D9(e.description,r)||D9(HCN_skillDesc(e.name,E9(e.description)),r)||D9(e.category,r)||D9(HCN_category(e.category),r)", "skill search");
  source = replaceOnce(source, "D9(e.name,n)||D9(e.label,n)||D9(e.description,n)||k9(e).some(e=>D9(e,n))", "D9(e.name,n)||D9(e.label,n)||D9(e.description,n)||D9(HCN_toolsetDesc(e.name,E9(e.description)),n)||k9(e).some(e=>D9(e,n))", "toolset search");
  const bounds = functionBounds(source, "rdn");
  const patched = patchSkillsFunction(source.slice(bounds.start, bounds.end));
  return Buffer.from(source.slice(0, bounds.start) + patched + source.slice(bounds.end), "utf8");
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
  if (!previous || previous.path !== current.path) throw new Error(`ASAR entry order changed around ${current.path}`);
  const start = parsed.dataOffset + Number(previous.node.offset);
  let content = original.subarray(start, start + previous.node.size);
  if (current.path === targetBundle) content = patchBundle(content);
  current.node.size = content.length;
  current.node.offset = String(offset);
  current.node.integrity = integrityFor(content, current.node.integrity);
  chunks.push(content);
  offset += content.length;
}

const packed = Buffer.concat([headerBuffer(header), ...chunks]);
fs.writeFileSync(outputAsar, packed);
const hash = crypto.createHash("sha256").update(packed).digest("hex");
fs.writeFileSync(outputHash, `${hash}\n`);
console.log(`Wrote ${outputAsar}`);
console.log(`SHA256 ${hash}`);
