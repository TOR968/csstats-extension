local logger = require("logger")
local millennium = require("millennium")

local function _plugin_dir()
    local src = debug.getinfo(1, "S").source or ""
    if src:sub(1, 1) == "@" then
        src = src:sub(2)
    end
    src = src:gsub("\\", "/")
    return src:match("^(.+)/backend/") or "."
end

local _SETTINGS_FILE = _plugin_dir() .. "/settings.json"

local function _read_file(path)
    local f = io.open(path, "r")
    if not f then
        return nil
    end
    local body = f:read("*a")
    f:close()
    return body
end

local function _write_file(path, content)
    local f = io.open(path, "w")
    if not f then
        return false
    end
    f:write(content)
    f:close()
    return true
end

function GetSettings()
    return _read_file(_SETTINGS_FILE) or "{}"
end

function SaveSettings(settings_json)
    if type(settings_json) ~= "string" or settings_json == "" then
        return "0"
    end
    if _write_file(_SETTINGS_FILE, settings_json) then
        return "1"
    end
    return "0"
end

local function on_load()
    millennium.ready()
    logger:info("csstats loaded")
end

local function on_unload()
    logger:info("csstats unloaded")
end

local function on_frontend_loaded()
end

return {
    on_frontend_loaded = on_frontend_loaded,
    on_load = on_load,
    on_unload = on_unload
}
