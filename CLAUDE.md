# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A [Millennium](https://steambrew.app/) plugin that injects a CSStats.gg profile button into Steam community profile pages. It runs inside the Steam client using the Millennium framework. The button links to `https://csstats.gg/player/{steamId64}`.

## Commands

```bash
bun install           # install dependencies
bun run dev           # build for development (one-shot)
bun run watch         # rebuild on file changes
bun run build         # production build
```

There are no automated tests.

## Architecture

The plugin has two active execution contexts:

**`frontend/index.tsx`** — Millennium plugin entrypoint. Registers the plugin via `definePlugin` from `@steambrew/client`, then sets up CDP (Chrome DevTools Protocol) injection into the Steam community browser. This is the only file that does real work.

**`frontend/inject.ts`** — Contains `csstatsInjectMain()`, a self-contained vanilla JS function that runs in the community browser via `Runtime.evaluate`. Exported as `INJECTION_CODE` string using `csstatsInjectMain.toString()`. Must have zero imports and no references to outer-scope variables — everything it needs is inside the function body.

**`webkit/index.tsx`** — Stub only. Required by the build system but does nothing.

**`backend/main.lua`** — Minimal Lua backend required by `plugin.json` (`backendType: "lua"`). Just signals `millennium.ready()`.

## Why CDP instead of webkit injection

In Millennium v3.2.0+, the webkit bundle runs in the Steam main UI (`steamloopback.host`), **not** in the community browser (`steamcommunity.com`). The community browser is a separate CEF process with no Millennium injection. CDP (`window.MILLENNIUM_API.ChromeDevToolsProtocol`) from the frontend context is the only way to reach it. React is **not** available in the community browser — `csstatsInjectMain()` uses vanilla DOM only.

## CDP injection flow

1. `Target.setDiscoverTargets` — enables target discovery
2. Listen on `Target.targetCreated` / `Target.targetInfoChanged` — detect profile URLs matching `/steamcommunity\.com\/(id|profiles)\//`
3. 200ms debounce per `targetId` — prevents double-injection from rapid duplicate events (`targetInfoChanged` can fire twice for the same URL) while allowing re-injection on refresh/navigation
4. `Target.attachToTarget` → `Runtime.evaluate` with `INJECTION_CODE` — injects the button into the community browser's main world

## Key details

- SteamID resolution order (inside `csstatsInjectMain`): `g_rgProfileData.steamid64` / `.steamid` → `data-miniprofile` attribute (converted via `BigInt('76561197960265728') + BigInt(accountId)`) → Steam profile XML fetch (`/?xml=1`)
- Do **not** use `g_steamID` — that is the logged-in user's ID, not the viewed profile
- Button is inserted into `.profile_rightcol` via `col.insertBefore(div, col.children[1] ?? null)`; if the column is not present yet, a `MutationObserver` waits for it (15s timeout)
- Idempotency guards: `.csstats-extension-container` (button) and `#csstats-extension-style` (styles)
- `plugin.json` version must stay in sync with `package.json`; `scripts/sync-version.ts` does this
- `plugin.json` must include `"webkitApiVersion": "2.0.0"` — without it Millennium does not load the webkit bundle at all
- Build tool is `millennium-ttc` from `@steambrew/ttc`
