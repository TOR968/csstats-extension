import Millennium  # pyright: ignore[reportMissingImports]
from logger import logger


class Plugin:
    def _load(self) -> None:
        try:
            logger.info("CSStats Extension: Starting plugin initialization...")
            Millennium.ready()
            logger.info("CSStats Extension: Plugin loaded successfully")
        except Exception as e:
            logger.error(f"CSStats Extension: Failed to load plugin: {str(e)}")
            raise

    def _front_end_loaded(self) -> None:
        try:
            logger.info("CSStats Extension: Frontend loaded successfully")
            # Add any frontend-specific initialization logic here if needed
        except Exception as e:
            logger.error(f"CSStats Extension: Error during frontend load: {str(e)}")

    def _unload(self) -> None:
        try:
            logger.info("CSStats Extension: Plugin unloading...")
            # Add any cleanup logic here if needed
            logger.info("CSStats Extension: Plugin unloaded successfully")
        except Exception as e:
            logger.error(f"CSStats Extension: Error during plugin unload: {str(e)}")
