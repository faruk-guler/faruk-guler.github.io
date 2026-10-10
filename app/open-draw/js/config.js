/* OpenDraw WebUI v.3.1 - shared constants and tiny helpers - loaded first, everything else reads these
   Classic script (no import/export) so the page keeps working from file://.
   Load order is defined in index.html; this file expects: nothing.
   Every other js/ module reads the constants declared here. */
// Single source of truth for the version shown in the title bar, the About dialog and the
// document title, and for the autosave payload.
const APP_VERSION = '3.1';
const STORAGE_KEYS = { theme: 'opendraw.theme', session: 'opendraw.session' };
const SVG_NS = 'http://www.w3.org/2000/svg';
const XLINK_NS = 'http://www.w3.org/1999/xlink';
const MAX_HISTORY = 100;        // undo snapshots kept (each snapshot is the whole drawing)
const MAX_HISTORY_CHARS = 12 * 1024 * 1024;   // ...and the total size of those snapshots
const MIN_SHAPE_SIZE = 4;       // world units; a shorter drag counts as a click, not a shape
const TEXT_LINE_HEIGHT = 1.2;   // must match the line-height of .text-input so both align
const TEXT_DEFAULT_SIZE = 24;
const TEXT_MIN_WIDTH = 20;      // a label keeps a clickable box even when it is short
const TEXT_MIN_FONT = 4;
const TEXT_MAX_FONT = 512;
// A freshly clicked label needs a visible target to type into, not a caret-sized sliver
const EDITOR_MIN_WIDTH = 160;   // world units
const EDITOR_WIDTH_PER_FONT = 6;   // ... or this many characters of the label's font size
const EDITOR_PAD_X = 12;        // room for the caret and the last typed glyph
const EDITOR_PAD_Y = 8;
const EDITOR_MIN_LINES = 1.6;   // the box shows that a second line would fit
const HANDLE_SIZE = 8;          // on-screen size of a resize handle, in CSS pixels
const HANDLE_GRAB_PADDING = 4;  // extra reach around a handle so it is easy to grab
const FONT_STACK = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
const VALID_TYPES = ['rectangle', 'circle', 'line', 'triangle', 'cylinder', 'cloud', 'arrow', 'pen', 'text', 'image'];
const TOOL_SHORTCUTS = { v: 'select', r: 'rectangle', c: 'circle', l: 'line', a: 'arrow', p: 'pen', t: 'text', e: 'eraser' };
// Defaults used when the theme changes: a black stroke would be invisible on the dark canvas.
const THEME_DEFAULTS = {
    light: { stroke: '#000000', canvas: '#ffffff' },
    dark: { stroke: '#f5f5f5', canvas: '#2c2c2c' }
};
const HANDLE_CURSORS = {
    tl: 'nwse-resize', br: 'nwse-resize',
    tr: 'nesw-resize', bl: 'nesw-resize',
    tm: 'ns-resize', bm: 'ns-resize',
    ml: 'ew-resize', mr: 'ew-resize'
};
const SELECTION_COLOR = '#3b82f6';   // matches --btn-active-bg
const EXPORT_FORMATS = ['png', 'jpg', 'svg', 'pdf', 'json'];   // the choices the export dialog offers
const EXPORT_PADDING = 16;           // CSS pixels of breathing room around an exported drawing
// Arrow head: grows with the line thickness, keeps a sharp angle, and shrinks on short arrows
const ARROW_HEAD_BASE = 18;
const ARROW_HEAD_PER_STROKE = 2;
const ARROW_HEAD_ANGLE = Math.PI / 7;      // ~26 degrees half angle
const ARROW_HEAD_MAX_RATIO = 0.4;          // never eat more than 40% of the shaft
const LEGACY_ARROW_HEAD = 10;              // size older projects stored for every arrow
// Short numeric form for the SVG writer - raw floats make the files hard to read
const round = (value) => Math.round(Number(value) * 100) / 100;
