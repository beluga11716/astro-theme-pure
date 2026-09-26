import { Icons } from 'astro-pure/libs'
import type { Element, ElementContent, Root, RootContent } from 'hast'
import { SKIP, visit } from 'unist-util-visit'

/**
 * Restores the three markdown extensions the Firefly theme adds on top of plain
 * markdown, so the articles migrated from it keep rendering the way they did.
 *
 *   > [!NOTE] Title        ->  .callout.callout-note  (coloured box + icon)
 *   :spoiler[hidden text]  ->  .spoiler               (revealed on hover)
 *   [grid] ... [/grid]     ->  .image-grid            (responsive columns)
 *
 * Matched by `src/assets/styles/app.css`; registered in `astro.config.ts`.
 */

// --- Callouts ---------------------------------------------------------------

type CalloutStyle = 'note' | 'tip' | 'important' | 'warning' | 'caution'

/** Aliases Firefly accepts, collapsed onto the five GitHub styles. */
const CALLOUT_STYLES: Record<string, CalloutStyle> = {
  note: 'note',
  info: 'note',
  todo: 'note',
  abstract: 'note',
  summary: 'note',
  tldr: 'note',
  question: 'note',
  help: 'note',
  faq: 'note',
  example: 'note',
  quote: 'note',
  cite: 'note',
  tip: 'tip',
  hint: 'tip',
  success: 'tip',
  check: 'tip',
  done: 'tip',
  important: 'important',
  attention: 'important',
  warning: 'warning',
  caution: 'caution',
  danger: 'caution',
  error: 'caution',
  failure: 'caution',
  missing: 'caution',
  fail: 'caution',
  bug: 'caution'
}

/** Same icon set `Aside.astro` uses, so callouts match the rest of the theme. */
const CALLOUT_ICONS: Record<CalloutStyle, string> = {
  note: Icons.info,
  tip: Icons.bulb,
  important: Icons.alert,
  warning: Icons.alert,
  caution: Icons.octangon
}

/** `[!TYPE]` plus any horizontal space after it, anchored to the line start. */
const MARKER_RE = /^\[!([A-Za-z]+)\][^\S\n]*/

/**
 * Raw HTML passes straight through to the serialized page, which saves building
 * an SVG node tree per icon.
 */
const raw = (value: string) => ({ type: 'raw', value }) as unknown as ElementContent

function calloutIcon(style: CalloutStyle): ElementContent {
  return raw(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true" class="callout-icon">${CALLOUT_ICONS[style]}</svg>`
  )
}

/**
 * A callout is a blockquote whose first paragraph opens with `[!TYPE]`. Whatever
 * follows the marker on that line is a custom title, everything after it is body.
 *
 * The paragraph is not necessarily the first child: the blockquote keeps the
 * whitespace that surrounded it, so a text node can come first.
 */
function convertCallout(node: Element) {
  const at = node.children.findIndex((child) => child.type === 'element' && child.tagName === 'p')
  if (at === -1) return

  const first = node.children[at] as Element
  const siblings = node.children.slice(at + 1)

  const lead = first.children[0]
  if (lead?.type !== 'text') return

  const match = MARKER_RE.exec(lead.value)
  if (!match) return

  const style = CALLOUT_STYLES[match[1].toLowerCase()]
  if (!style) return

  const afterMarker = lead.value.slice(match[0].length)
  const newline = afterMarker.indexOf('\n')
  const title = (newline === -1 ? afterMarker : afterMarker.slice(0, newline)).trim()
  lead.value = newline === -1 ? '' : afterMarker.slice(newline + 1)

  // Drop the marker text node and the hard break that ended the marker line.
  if (lead.value === '') first.children.shift()
  const breakAfterMarker = first.children[0]
  if (breakAfterMarker?.type === 'element' && breakAfterMarker.tagName === 'br') {
    first.children.shift()
  }

  node.tagName = 'div'
  node.properties = { className: ['callout', `callout-${style}`] }
  node.children = [
    {
      type: 'element',
      tagName: 'p',
      properties: { className: ['callout-title'] },
      children: [calloutIcon(style), { type: 'text', value: title || style.toUpperCase() }]
    },
    {
      type: 'element',
      tagName: 'div',
      properties: { className: ['callout-content'] },
      children: first.children.length ? [first, ...siblings] : siblings
    }
  ]
}

// --- Image grids ------------------------------------------------------------

const GRID_OPEN = '[grid]'
const GRID_CLOSE = '[/grid]'
const MAX_GRID_COLS = 4

function buildGrid(items: ElementContent[]): Element {
  let columns = 0
  visit({ type: 'root', children: items } as Root, 'element', (node: Element) => {
    if (node.tagName === 'img') columns++
  })
  columns = Math.min(Math.max(columns, 1), MAX_GRID_COLS)

  return {
    type: 'element',
    tagName: 'div',
    properties: { className: ['image-grid'], style: `--image-grid-cols: ${columns}` },
    children: items
  }
}

/**
 * `[grid]` / `[/grid]` are ordinary paragraphs to remark, so the images land in
 * the same paragraph as the markers (or in the paragraphs between them).
 */
function convertImageGrids(tree: Root) {
  const out: RootContent[] = []
  let open: ElementContent[] | null = null

  const flush = () => {
    if (open?.length) out.push(buildGrid(open))
    open = null
  }

  for (const node of tree.children) {
    if (node.type !== 'element' || node.tagName !== 'p') {
      flush()
      out.push(node)
      continue
    }

    const first = node.children[0]
    const last = node.children[node.children.length - 1]
    const opens = first?.type === 'text' && first.value.trimStart().startsWith(GRID_OPEN)
    const closes = last?.type === 'text' && last.value.trimEnd().endsWith(GRID_CLOSE)

    if (opens && first.type === 'text') first.value = first.value.replace(/^\s*\[grid\]\s*/, '')
    if (closes && last.type === 'text') last.value = last.value.replace(/\s*\[\/grid\]\s*$/, '')
    // Line breaks around the images leave whitespace-only text nodes behind.
    node.children = node.children.filter((c) => c.type !== 'text' || c.value.trim() !== '')

    if (!open && opens) open = []
    if (open) {
      if (node.children.length) open.push(node)
      if (closes) flush()
      continue
    }

    out.push(node)
  }

  flush()
  tree.children = out
}

// --- Spoilers ---------------------------------------------------------------

const SPOILER_OPEN = ':spoiler['

/**
 * `:spoiler[...]` is plain text to remark, and its content may be split across
 * several nodes (a `]` can sit inside a `**bold**` run), so scan siblings until
 * the closing bracket turns up.
 */
function convertSpoilers(node: Element) {
  const children = node.children
  const out: ElementContent[] = []
  let i = 0

  while (i < children.length) {
    const child = children[i]
    if (child.type !== 'text') {
      out.push(child)
      i++
      continue
    }

    const start = child.value.indexOf(SPOILER_OPEN)
    if (start === -1) {
      out.push(child)
      i++
      continue
    }

    const before = child.value.slice(0, start)
    if (before) out.push({ type: 'text', value: before })

    const content: ElementContent[] = []
    let pending = child.value.slice(start + SPOILER_OPEN.length)
    let next = i + 1
    let remainder: string | null = null

    for (;;) {
      const end = pending.indexOf(']')
      if (end !== -1) {
        if (end > 0) content.push({ type: 'text', value: pending.slice(0, end) })
        remainder = pending.slice(end + 1)
        break
      }
      if (next >= children.length) break

      if (pending) content.push({ type: 'text', value: pending })
      const sibling = children[next]
      pending = sibling.type === 'text' ? sibling.value : ''
      if (sibling.type !== 'text') content.push(sibling)
      next++
    }

    // Unbalanced `:spoiler[` - leave the text exactly as it was.
    if (remainder === null) {
      out.push({ type: 'text', value: child.value.slice(start) })
      i++
      continue
    }

    out.push({
      type: 'element',
      tagName: 'span',
      properties: { className: ['spoiler'] },
      children: content
    })
    if (remainder) out.push({ type: 'text', value: remainder })
    i = next
  }

  node.children = out
}

// --- Entry point ------------------------------------------------------------

export default function rehypeFireflyCompat() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'pre') return SKIP
      if (node.tagName === 'blockquote') convertCallout(node)
    })

    convertImageGrids(tree)

    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'pre' || node.tagName === 'code') return SKIP
      convertSpoilers(node)
    })
  }
}
