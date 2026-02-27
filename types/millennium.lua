local millennium = {}

function millennium.ready() end
function millennium.version() return "" end
function millennium.cmp_version(a, b) return 0 end
function millennium.call_frontend_method(method, args) return nil end

return millennium
