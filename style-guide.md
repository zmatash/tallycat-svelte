# Catppuccin Style Guide for Web Applications

## Color Palette Overview

The Catppuccin palette offers a soothing pastel theme with vibrant accent colors and carefully graded neutrals. This style guide will help you implement this palette consistently across your web application.

## Base Structure

### Background Hierarchy

- **Primary Background**: `--base` (#1e1e2e) - Main application background
- **Secondary Background**: `--mantle` (#181825) - Sidebars, navigation areas
- **Tertiary Background**: `--crust` (#11111b) - Modal backgrounds, cards, popups

### Surface Elements

- **Surface Primary**: `--surface0` (#313244) - Cards, containers, modals
- **Surface Secondary**: `--surface1` (#45475a) - Elevated elements, hover states
- **Surface Tertiary**: `--surface2` (#585b70) - Active elements, selected items

## Typography

### Text Colors

- **Primary Text**: `--text` (#cdd6f4) - Main body text
- **Secondary Text**: `--subtext1` (#bac2de) - Subheadings, less important content
- **Tertiary Text**: `--subtext0` (#a6adc8) - Placeholders, disabled text
- **Subtle Text**: `--overlay2` (#9399b2) - Hints, captions, timestamps

### Text Hierarchy

- **Headers**: `--text` or `--lavender` for emphasis
- **Body Text**: `--text`
- **Captions**: `--subtext1`
- **Disabled Text**: `--subtext0`

## Interactive Elements

### Buttons

- **Primary Button**: Background: `--mauve` (#cba6f7), Text: `--crust`
- **Secondary Button**: Background: `--surface1`, Text: `--text`
- **Danger Button**: Background: `--red` (#f38ba8), Text: `--crust`
- **Success Button**: Background: `--green` (#a6e3a1), Text: `--crust`
- **Disabled Button**: Background: `--surface0`, Text: `--overlay0`

### Links

- **Default**: `--blue` (#89b4fa)
- **Visited**: `--lavender` (#b4befe)
- **Hover**: `--sapphire` (#74c7ec)
- **Active**: `--sky` (#89dceb)

### Input Fields

- **Background**: `--surface0`
- **Border**: `--overlay0`
- **Text**: `--text`
- **Placeholder**: `--overlay1`
- **Focus Border**: `--lavender`

### Toggle/Switch

- **Off State**: `--surface1` (track), `--overlay1` (thumb)
- **On State**: `--mauve` (track), `--text` (thumb)

## Status and Feedback

### Alerts and Notifications

- **Info**: `--blue` (#89b4fa)
- **Success**: `--green` (#a6e3a1)
- **Warning**: `--peach` (#fab387)
- **Error**: `--red` (#f38ba8)

### Progress Indicators

- **Loading Spinner**: `--lavender`
- **Progress Bar Background**: `--surface0`
- **Progress Bar Fill**: `--mauve`

## Component-Specific Guidelines

### Navigation

- **Nav Background**: `--mantle`
- **Nav Item Default**: `--subtext1`
- **Nav Item Hover**: `--text`
- **Nav Item Active**: `--lavender` or `--mauve`
- **Nav Divider**: `--surface0`

### Cards/Panels

- **Card Background**: `--surface0`
- **Card Border**: `--surface1` (subtle) or none
- **Card Heading**: `--text`
- **Card Content**: `--subtext1`

### Tables

- **Table Header Background**: `--surface1`
- **Table Header Text**: `--text`
- **Table Row Background**: `--surface0`
- **Table Row Alternate**: `--base`
- **Table Cell Border**: `--surface1`
- **Table Row Hover**: `--surface1`

### Tooltips

- **Background**: `--surface2`
- **Text**: `--text`
- **Border**: `--overlay0` (optional)

### Modals/Dialogs

- **Overlay Background**: `--crust` with opacity
- **Modal Background**: `--surface0`
- **Modal Border**: `--surface2` or none
- **Close Button**: `--overlay1`, hover: `--red`

## Semantic Color Usage

### Functionality Colors

- **Create/Add**: `--green`
- **Edit/Modify**: `--sapphire`
- **Delete/Remove**: `--red`
- **View/Details**: `--blue`

### Accent Colors Guide

- **Primary Accent**: `--mauve` - Main brand color
- **Secondary Accent**: `--blue` or `--lavender` - Complementary to primary

### Data Visualization

- **Charts**: `--blue`, `--lavender`, `--mauve`, `--red`, `--peach`, `--yellow`, `--green`, `--teal`, `--sky`, `--sapphire`
- **Positive Values**: `--green`
- **Negative Values**: `--red`
- **Neutral Values**: `--blue`

## Accessibility Considerations

- Use sufficient contrast between text and background
- Ensure focus states are clearly visible using `--lavender` or `--mauve`
- Provide alternate visual cues beyond color for important states

## CSS Implementation Examples

### Button Styles

```css
.button-primary {
	background-color: var(--mauve);
	color: var(--crust);
	border: none;
	padding: 8px 16px;
	border-radius: 4px;
}

.button-primary:hover {
	background-color: var(--lavender);
}

.button-secondary {
	background-color: var(--surface1);
	color: var(--text);
	border: 1px solid var(--overlay0);
	padding: 8px 16px;
	border-radius: 4px;
}

.button-secondary:hover {
	background-color: var(--surface2);
}
```

### Card Component

```css
.card {
	background-color: var(--surface0);
	border-radius: 8px;
	padding: 16px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-title {
	color: var(--text);
	font-size: 18px;
	margin-bottom: 12px;
}

.card-content {
	color: var(--subtext1);
}
```

### Form Elements

```css
.input-field {
	background-color: var(--surface0);
	border: 1px solid var(--overlay0);
	color: var(--text);
	padding: 8px 12px;
	border-radius: 4px;
}

.input-field:focus {
	border-color: var(--lavender);
	outline: none;
	box-shadow: 0 0 0 2px rgba(180, 190, 254, 0.3);
}

.input-field::placeholder {
	color: var(--overlay1);
}
```

## Dark/Light Mode Adaptation

While Catppuccin is primarily a dark theme, if you need to support light mode:

- Consider using the Catppuccin Latte variant for light mode
- Or create custom mappings between the Mocha (dark) and your light theme variables

## Recommended Font Pairings

- Sans-serif fonts like Inter, Manrope, or Work Sans complement this aesthetic
- For monospace sections: JetBrains Mono, Fira Code, or Space Mono
