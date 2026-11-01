# Strict Rule: NEVER Add Fake Window Titlebars, Fake Chrome, or Traffic Light Buttons

## Context & User Mandate
The user has issued a strict rule: **DO NOT put fake window chrome, fake titlebars, fake macOS traffic light dots (🔴🟡🟢), fake playback buttons, or artificial header bars around application screen recordings, screenshots, or UI components anywhere on the site.**

## Why This Rule Exists
1. **Double Titlebars:** Real application screen recordings and native screenshots already contain their own authentic OS titlebar, minimize/maximize buttons, window titles, and controls. Adding an artificial HTML/CSS titlebar creates an awkward, fake "double titlebar" that ruins design credibility.
2. **Artificial Clutter:** Fake traffic light dots (red, yellow, green circles) and fake status text (`0.4ms Local SQLite`, `PAUSE`, `MUTE`) look cheap, gimmicky, and template-like.
3. **Purity of Media:** Media should speak for itself. Display video recordings and screenshots in clean, border-radiused, high-fidelity containers without any artificial wrapper chrome.

## Strict Don'ts
- ❌ NEVER inject `div`s with `red/yellow/green` traffic light dots.
- ❌ NEVER add fake titlebars with window title text above videos or screenshots.
- ❌ NEVER overlay fake play/pause or mute buttons on top of native video elements unless explicitly instructed.
- ❌ NEVER wrap clean UI demos in artificial OS shells.
