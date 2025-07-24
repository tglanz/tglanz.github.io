---
title: Neovim Cheatsheet
categories:
- Cheatsheet
tags:
- Neovim
- Editor
- Vim
---

# Neovim Cheatsheet

My go-to commands for Neovim that I actually use daily.

## Getting Started

**Launch Neovim**
```bash
nvim                    # Open in current directory
nvim config.json        # Open specific file
nvim app.js server.js   # Open multiple files in buffers
```

**Open files in different layouts**
```bash
nvim -p index.html style.css script.js  # Each file in its own tab
nvim -o main.py utils.py                # Horizontal splits
nvim -O client.go server.go             # Vertical splits
```

## Window Splits & Navigation

**Creating splits:**
```vim
:split filename         # Horizontal split with file
:vsplit filename        # Vertical split with file
:sp                     # Horizontal split (same file)
:vsp                    # Vertical split (same file)
Ctrl+w s                # Horizontal split (same file)
Ctrl+w v                # Vertical split (same file)
```

**Navigating between splits:**
```vim
Ctrl+w h                # Move to left split
Ctrl+w j                # Move to bottom split
Ctrl+w k                # Move to top split
Ctrl+w l                # Move to right split
Ctrl+w w                # Cycle through splits
```

**Resizing splits:**
```vim
Ctrl+w =                # Make all splits equal size
Ctrl+w +                # Increase height
Ctrl+w -                # Decrease height
Ctrl+w >                # Increase width
Ctrl+w <                # Decrease width
:resize 20              # Set height to 20 lines
:vertical resize 80     # Set width to 80 columns
```

**Closing splits:**
```vim
Ctrl+w q                # Close current split
Ctrl+w o                # Close all splits except current
:only                   # Same as Ctrl+w o
```

## Navigation & Buffers

**Buffer management** (when you have multiple files open):
```vim
:buffers                # List all open buffers
:b 2                    # Switch to buffer 2 (main.py)
:bd                     # Close current buffer
:bd!                    # Force close without saving
```

**Quick file switching:**
```vim
Ctrl+^                  # Switch to previous buffer
:e routes.js            # Open/edit another file
```

## Marks

**Setting and using marks:**
```vim
ma                      # Set mark 'a' at current position
'a                      # Jump to mark 'a'
`a                      # Jump to exact position of mark 'a'
:marks                  # List all marks
```

**Automatic marks:**
```vim
''                      # Jump to previous position
'.                      # Jump to last edit
'^                      # Jump to last insert
```

**Example workflow:**
1. `ma` - mark current function as 'a'
2. Navigate elsewhere in file
3. `'a` - quickly return to that function

## Registers

**Using registers (clipboard system):**
```vim
"ay                     # Copy to register 'a'
"ap                     # Paste from register 'a'
"Ay                     # Append to register 'a'
:reg                    # Show all registers
:reg a                  # Show register 'a' contents
```

**Special registers:**
```vim
"0p                     # Paste last yanked text (not deleted)
"+y                     # Copy to system clipboard
"+p                     # Paste from system clipboard
"*y                     # Copy to selection clipboard (X11)
```

**Example workflow:**
1. `"ay3dd` - delete 3 lines into register 'a'
2. Navigate elsewhere
3. `"ap` - paste those 3 lines

## Text Selection & Ranges

These ranges work with most commands (`:delete`, `:substitute`, etc.):

| Range | What it selects | Example |
|-------|----------------|---------|
| `:5` | Line 5 only | `:5d` (delete line 5) |
| `:5,10` | Lines 5 through 10 | `:5,10s/var/let/g` |
| `:%` | Entire file | `:%s/TODO/DONE/g` |
| `:.` | Current line | `:.s/foo/bar/` |
| `:$` | Last line | `:$d` (delete last line) |
| `:'<,'>` | Visually selected text | Select text, then `:'<,'>s/old/new/g` |
| `:/function/` | Line matching pattern | `:/function/,/}/d` (delete function block) |

## Search & Replace

**Basic search:**
```vim
/import                 # Search forward for "import"
?export                 # Search backward for "export"
n                       # Next match
N                       # Previous match
```

**Find and replace:**
```vim
:%s/var/let/g           # Replace all "var" with "let" in file
:5,10s/console.log/logger.info/g  # Replace in lines 5-10 only
:%s/TODO/DONE/gc        # Replace with confirmation for each
:%s/\<old\>/new/g       # Replace whole word "old" with "new"
```

**Real examples I use:**
```vim
:%s/localhost:3000/api.example.com/g  # Update API endpoints
:%s/== null/=== null/g                # Fix equality comparisons
```

## Command Line Tricks

**Insert from registers in command mode:**
```vim
Ctrl+r "                # Insert unnamed register
Ctrl+r a                # Insert register 'a'
Ctrl+r +                # Insert system clipboard
Ctrl+r %                # Insert current filename
Ctrl+r /                # Insert last search pattern
```

**Example:** Type `:e ` then `Ctrl+r %` to edit file in same directory.

**Other command line operations:**
```vim
:!ls -la                # Run shell command
:!git status            # Check git status
:r !date                # Insert current date/time
:r !curl -s api.com/data | jq  # Insert API response
:w !sudo tee %          # Save file as root (when you forgot sudo)
```

## External Commands

**Filter text through external commands:**
```vim
:%!jq                   # Format entire file as JSON
:%!sort                 # Sort all lines alphabetically
:'<,'>!sort             # Sort only selected lines
:%!prettier --stdin-filepath %  # Format with Prettier
```

**Real examples:**
```vim
:%!avro-tools tojson % | jq    # Convert Avro to formatted JSON
:%!python -m json.tool         # Format JSON using Python
:'<,'>!column -t               # Align selected columns
```

## Key Bindings & Configuration

**Finding existing key mappings:**
```vim
:map                    # Show all mappings
:nmap                   # Show normal mode mappings
:imap                   # Show insert mode mappings
:map <leader>           # Show all leader key mappings
:verbose map <C-p>      # Show where Ctrl+P mapping was defined
```

**Creating custom mappings in your config:**
```lua
-- In ~/.config/nvim/init.lua
vim.keymap.set('n', '<leader>w', ':w<CR>', { desc = 'Save file' })
vim.keymap.set('n', '<C-h>', '<C-w>h', { desc = 'Move to left split' })
vim.keymap.set('i', 'jk', '<Esc>', { desc = 'Exit insert mode' })
vim.keymap.set('v', '<leader>s', ':sort<CR>', { desc = 'Sort selection' })
```

**Which-Key plugin (shows available keybindings):**
```lua
-- Add to your config
require('which-key').register({
  ['<leader>f'] = { name = '+file' },
  ['<leader>g'] = { name = '+git' },
  ['<leader>s'] = { name = '+search' },
})
```

When you press `<leader>` and wait, Which-Key shows available completions.

## Essential Movements

```vim
gg                      # Go to top of file
G                       # Go to bottom of file
0                       # Beginning of line (column 0)
$                       # End of line
w                       # Next word start
b                       # Previous word start
}                       # Next empty line (paragraph)
{                       # Previous empty line
15G                     # Go to line 15
```

## Quick Edits

```vim
dd                      # Delete current line
3dd                     # Delete 3 lines starting from current
yy                      # Copy current line
5yy                     # Copy 5 lines
p                       # Paste after cursor
P                       # Paste before cursor
u                       # Undo last change
Ctrl+r                  # Redo
.                       # Repeat last command
```

## Visual Mode

```vim
v                       # Character-wise visual
V                       # Line-wise visual (select whole lines)
Ctrl+v                  # Block visual (select columns)
```

**Example workflow:**
1. `V` to enter line visual mode
2. `5j` to select 5 lines down
3. `:s/old/new/g` to replace in selection

**Useful file operations:**
```vim
:w backup.js            # Save copy as backup.js
:saveas config-new.json # Save current buffer with new name
```