local logger = require("logger")
local millennium = require("millennium")

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
