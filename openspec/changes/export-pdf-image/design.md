## Context

当前应用已实现完整的八字命理分析流程，包括：
- 分步表单（基础信息→四柱→大运）
- AI 驱动的命理分析
- K线图可视化（Recharts 渲染）
- 结果展示页面（AnalysisResult 组件）

需要添加导出功能，将分析结果导出为 PNG 图片和 PDF 文档，便于用户分享。

## Goals / Non-Goals

**Goals:**
- 在结果页面顶部添加导出按钮（PNG + PDF）
- 导出内容包含：标题、K线图、命理分析卡片、底部水印
- 保持与现有水墨风格一致的设计

**Non-Goals:**
- 批量导出多个历史记录
- 邮件发送导出文件
- 打印样式优化（浏览器原生打印）

## Decisions

### 1. 导出库选择

| 方案 | 选择 | 理由 |
|------|------|------|
| html2canvas + jspdf | ✅ 采用 | 成熟稳定，社区支持好 |
| react-to-print | ❌ 排除 | 主要针对打印场景 |
| @react-pdf/renderer | ❌ 排除 | 需要重新构建 PDF 结构，工作量大 |

### 2. 导出范围

采用"截取全屏"方式：
- 创建一个专门的导出容器，包含所有需要的内容
- 隐藏导出按钮本身
- K线图使用 Recharts，内置 canvas 支持

### 3. 水印实现

```tsx
// 水印组件
<div className="text-center text-gray-400 text-xs py-4">
  卜算子 | 八字命理可视化
</div>
```

### 4. 文件名生成

```typescript
const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10).replace(/-/g, '');
};

const fileName = `卜算子_命理分析_${formatDate(new Date())}.${format}`;
```

### 5. 暗色模式处理

- 导出时检测当前主题
- 如果是暗色模式，强制使用亮色背景导出（更适合分享）
- 或者让用户选择导出主题

## Risks / Trade-offs

| 风险 | 缓解措施 |
|------|---------|
| K线图 canvas 导出可能模糊 | Recharts 支持高 DPI 渲染，设置 `devicePixelRatio` |
| 暗色主题导出效果差 | 添加主题选择，或默认亮色导出 |
| 大内容分页问题 | PDF 采用 A4 竖版，自动分页 |
| 中文文件名编码 | 使用 `encodeURIComponent` 处理 |

## Migration Plan

1. 安装依赖：`npm install html2canvas jspdf`
2. 创建 `ExportButton` 组件
3. 修改 `AnalysisResult.tsx`：添加导出容器和水印
4. 测试 PNG 和 PDF 导出效果
5. 部署到 Vercel

## Open Questions

1. **是否需要支持自定义导出内容？**（如只导出 K线图）
2. **暗色模式导出的默认行为？**（亮色 vs 保持原样）
3. **是否添加 Loading 状态？**（大页面导出可能需要几秒）
