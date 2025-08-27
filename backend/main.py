import Millennium  # pyright: ignore[reportMissingImports]

class Plugin:
    def _load(self) -> None:
        # Silent plugin loading - no logs to avoid red formatting in Millennium
        Millennium.ready()

    def _unload(self) -> None:
        # Silent plugin unloading
        pass
