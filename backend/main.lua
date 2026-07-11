local logger = require("logger")
local millennium = require("millennium")
local utils = require("utils")

local function plugin_dir()
    local backend = (utils.get_backend_path() or "."):gsub("\\", "/")
    return backend:match("^(.+)/[^/]+$") or backend
end

local SETTINGS_FILE = plugin_dir() .. "/settings.json"

function GetSettings()
    return utils.read_file(SETTINGS_FILE) or "{}"
end

function SaveSettings(settings_json)
    if type(settings_json) ~= "string" or settings_json == "" then
        return "0"
    end
    if utils.write_file(SETTINGS_FILE, settings_json) then
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

return {
    on_load = on_load,
    on_unload = on_unload,
    GetSettings = GetSettings,
    SaveSettings = SaveSettings
}
